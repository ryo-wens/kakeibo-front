import * as Actions from './actions';
import { UserActions } from './actions';
import initialState from '../store/initialState';

export const usersReducer = (
  state = initialState.users,
  action: UserActions
) => {
  switch (action.type) {
    case Actions.SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.LOG_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.LOG_OUT:
      return {
        ...initialState.users,
      };
    default:
      return state;
  }
};
