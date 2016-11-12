import { Injectable } from '@angular/core';
import { IAppState, AppRedux } from './../app.state';

import { Action } from 'redux';

export interface NavigationAction extends Action {
  address: string;
}

@Injectable()
export class NavigationActions {
  static NAVIGATION_SESSION = "NAVIGATION_SESSION";
  static NAVIGATION_GO = "NAVIGATION_GO";
  static NAVIGATION_BACK = "NAVIGATION_BACK";

  constructor(public store: AppRedux) { }

  session(session: string) {
    this.store.dispatch({ type: NavigationActions.NAVIGATION_SESSION, address: session });
  }

  /** Change address */
  go(address: string) {
    this.store.dispatch({ type: NavigationActions.NAVIGATION_GO, address: address });
  }

  /** Go back to the previous screen+page or until the address reached */
  back(address: string = null) {
    this.store.dispatch({ type: NavigationActions.NAVIGATION_BACK, address: address });
  }

  reload() {
    location.reload();
  }

}