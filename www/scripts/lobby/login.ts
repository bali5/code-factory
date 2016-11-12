import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AppContext } from './../app/app.context';
import { ConnectionState } from './../connection/message/connection.state';

@Component({
  selector: 'cf-login',
  templateUrl: 'views/lobby/login.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent { 
  constructor(private context: AppContext, private change: ChangeDetectorRef) {
  }
}