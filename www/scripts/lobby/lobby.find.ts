import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AppContext } from './../app/app.context';
import { ConnectionState } from './../connection/message/connection.state';

@Component({
  selector: 'cf-lobby-find',
  templateUrl: 'views/lobby/lobby.find.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyFindComponent { 
  constructor(private context: AppContext, private change: ChangeDetectorRef) {
  }
}