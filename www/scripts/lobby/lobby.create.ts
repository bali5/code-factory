import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AppContext } from './../app/app.context';
import { ConnectionState } from './../connection/message/connection.state';

@Component({
  selector: 'cf-lobby-create',
  templateUrl: 'views/lobby/lobby.create.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyCreateComponent { 
  constructor(private context: AppContext, private change: ChangeDetectorRef) {
  }
}