import { NavigationAction, NavigationActions } from './../action/navigation.action';
import { Navigation } from './../state/navigation';

export const INITIAL_STATE: Navigation = new Navigation('connect');

export function navigationReducer(state: Navigation = INITIAL_STATE, action: NavigationAction = null) {
  if (!action) return state;

  switch (action.type) {
    case NavigationActions.NAVIGATION_GO:
      state.address = action.address;
      break;
    case NavigationActions.NAVIGATION_SESSION:
      state.session = action.address;
      break;
    case NavigationActions.NAVIGATION_BACK:
      do {
        state.address = state.history.pop();
      }
      while (action.address && state.address !== action.address && state.history.length > 0)
      if (action.address && state.address != action.address) {
        state.address = action.address;
      }
      break;
  }
  return state;
}