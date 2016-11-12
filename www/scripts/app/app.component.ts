import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AppContext } from './app.context';

import { ConnectionState } from './../connection/message/connection.state';

import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

@Component({
  selector: 'cf-app',
  templateUrl: 'views/app/app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @select(['navigation', 'screen']) screen$: Observable<string>;
  screen: string;

  constructor(private context: AppContext, private change: ChangeDetectorRef) {
    context.service.subscribe<ConnectionState>('connection-state', (d) => {
      if (d.address) {
        localStorage.setItem('sessionid', d.session);
        context.navigation.session(d.session);
        context.navigation.go(d.address);
      }
    }, ConnectionState);

    this.screen$.subscribe(s => {
      this.screen = s;
      this.change.markForCheck();
    });
  }

  ngOnInit() {
    this.context.service.action<string>('connect', localStorage.getItem('sessionid')).then(t => {
      localStorage.setItem('sessionid', t);
      this.context.navigation.session(t);
      this.context.navigation.go('login');
    });
  }
}