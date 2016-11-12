import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import './../common/rxjs-extensions';

import { TypedJSON } from 'typedjson-npm';

import { DialogProvider, Dialog } from './../common/dialog.provider';

export interface Response {
  id: number,
  isSuccessful: boolean,
  data: string
}

export interface Message {
  action: string,
  data: any
}

@Injectable()
export class Service {
  private socket: WebSocket;
  private currentId: number = 1;
  private promises: {} = {};
  private queue: any[] = [];

  private parsers: {} = {};

  private subscriptions: {} = {};

  public onmessage: EventEmitter<Message> = new EventEmitter<Message>();

  constructor(private dialogProvider: DialogProvider) {
    this.open();
  }

  public registerParser(action: string, parser: (data: any) => any) {
    this.parsers[action] = parser;
  }

  private toUpper(o) {
    if (o == null) return null;

    let build, key, destKey, value;

    if (o instanceof Array) {
      build = [];
      for (key in o) {
        value = o[key];

        if (typeof value === "object") {
          value = this.toUpper(value);
        }
        build.push(value);
      }
    } else {
      build = {};
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          destKey = (key.charAt(0).toUpperCase() + key.slice(1) || key).toString();
          value = o[key];
          if (value !== null && typeof value === "object") {
            value = this.toUpper(value);
          }

          build[destKey] = value;
        }
      }
    }
    return build;
  }

  private toCamel(o) {
    if (o == null) return null;

    let build, key, destKey, value;

    if (o instanceof Array) {
      build = [];
      for (key in o) {
        value = o[key];

        if (typeof value === "object") {
          value = this.toCamel(value);
        }
        build.push(value);
      }
    } else {
      build = {};
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          destKey = (key.charAt(0).toLowerCase() + key.slice(1) || key).toString();
          value = o[key];
          if (value !== null && typeof value === "object") {
            value = this.toCamel(value);
          }

          build[destKey] = value;
        }
      }
    }
    return build;
  }

  private open() {
    this.socket = new WebSocket(window.location.href.replace(window.location.protocol, 'ws:') + '/socket');

    this.socket.onopen = (() => {
      console.log('WS opened...');

      for (var message of this.queue) {
        this.socket.send(JSON.stringify(message));
      }
    });

    this.socket.onerror = (() => {
      console.log('WS error.');
    });

    this.socket.onclose = (() => {
      console.log('WS closed.');
    });

    this.socket.onmessage = ((e) => {
      let data = <Response>this.toCamel(JSON.parse(e.data));

      if (data.id && this.promises[data.id]) {
        let promise = this.promises[data.id];
        if (data.isSuccessful) {
          let message;
          if (this.parsers[promise.parser]) {
            message = promise.parser(data.data);
          } else if (this.parsers[promise.action]) {
            message = this.parsers[promise.action](data.data);
          } else {
            message = data.data && data.data[0] == '{' ? this.toCamel(JSON.parse(data.data)) : data.data;
          }
          this.promises[data.id].resolve(message);
        } else {
          this.promises[data.id].reject(data.data);
        }
      } else {
        let message = <Message><any>data;

        this.notify(message);

        if (message.data) {
          message.data = this.toCamel(JSON.parse(message.data));
          if (this.parsers[message.action]) {
            message.data = this.parsers[message.action](message.data);
          }
        }

        this.onmessage.emit(message);
      }
    });
  }

  private handleError(error: any) {
    console.warn('An error occurred', error);
    this.dialogProvider.message('Oops...', error);
    return error;
  }

  public action<T>(action: string, data: any = null, c: { new (): T; } = null): Promise<T> {
    let id = this.currentId++;
    let message = {
      Id: id,
      Action: action,
      Data: JSON.stringify(typeof data == 'number' ? data : this.toUpper(data))
    };

    if (this.socket.readyState == 1) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.queue.push(message);
    }

    let p: any = this.promises[id] = {};
    p.promise = new Promise((resolve, reject) => {
      p.action = action;
      p.parse = c ? d => TypedJSON.parse(d, c) : null;
      p.resolve = resolve;
      p.reject = reject;
    });

    return p.promise.catch((e) => this.handleError(e));
  }

  public subscribe<T>(action: string, callback: (data: T) => void, c: { new (): T; }) {
    let callbackConvert = (data: string) => callback(TypedJSON.parse(data, c));

    let callbacks = <((data: string) => void)[]>this.subscriptions[action];
    if (callbacks) {
      this.subscriptions[action].push(callback);
    } else {
      callbacks = [callbackConvert];
      this.subscriptions[action] = callbacks;
    }
    return () => {
      let index = callbacks.indexOf(callbackConvert)
      callbacks.splice(index, 1);
    };
  }

  private notify(message: Message) {
    let callbacks = this.subscriptions[message.action];
    if (callbacks) {
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](message.data);
      }
    }
  }

}