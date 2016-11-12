import { combineReducers } from 'redux';
import { IAppState } from './app.state';

import { NavigationActions } from './action/navigation.action';
import { navigationReducer } from './reducer/navigation.reducer';

import * as _ from 'lodash';

export const INITIAL_STATE: IAppState = {
  navigation: _.cloneDeep(navigationReducer()),
}

const combined = combineReducers<IAppState>({
  navigation: navigationReducer
});

export const rootReducer = (state: IAppState, action) => {
  return combined(state, action);
}