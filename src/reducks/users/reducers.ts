import * as Actions from './actions';
import { userActions } from './actions';
import initialState from '../store/initialState';

export const usersReducer = (state = initialState.users, action: userActions) => {
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
    case Actions.FETCH_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.INFORM_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CONFLICT_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
