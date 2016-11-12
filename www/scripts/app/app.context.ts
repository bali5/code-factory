import { Injectable } from '@angular/core';

import { NavigationActions } from './../store/action/navigation.action';

import { Service } from './../connection/service';

import { AppRedux } from './../store/app.state';
import { INITIAL_STATE, rootReducer } from './../store/root.reducer';

import * as _ from 'lodash';

@Injectable()
export class AppContext {
  constructor(public store: AppRedux, public service: Service, public navigation: NavigationActions) {
    store.configureStore(rootReducer, _.cloneDeep(INITIAL_STATE));
  }

}