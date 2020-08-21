import * as Actions from './actions';
import { groupAction } from './actions';
import initialState from '../store/initialState';

export const groupsReducer = (state = initialState.groups, action: groupAction) => {
  switch (action.type) {
    case Actions.CREATE_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.UPDATE_GROUP_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUPS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
