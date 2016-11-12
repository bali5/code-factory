import { Injectable, EventEmitter, Output, Input } from '@angular/core';

@Injectable()
export class Navigation {
  constructor(address: string = null) {
    this.address = address;
  }

  private _address: string;
  get address(): string { return this._address; }
  @Input()
  set address(value: string) {
    if (this._address === value) return;

    let screen = this._screen;
    let page = this._page;

    this._address = value;

    if (value) {
      let index = value.indexOf(':')
      if (index > -1) {
        this._screen = value.substr(0, index);
        this._page = value.substr(index + 1);
      } else {
        this._screen = value;
      }
    }

    this.addressChange.emit(this._address);
    if (this._screen !== screen) {
      this.screenChange.emit(this._screen);
    }
    if (this._page !== page) {
      this.pageChange.emit(this._page);
    }
  }

  private _screen: string;
  get screen(): string { return this._screen; }
  private _page: string;
  get page(): string { return this._page; }

  session: string;

  history: string[] = [];

  @Output() addressChange = new EventEmitter<string>();
  @Output() screenChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<string>();
}