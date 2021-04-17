import * as Actions from './actions';
import { groupActions } from './actions';
import initialState from '../store/initialState';

export const groupsReducer = (state = initialState.groups, action: groupActions) => {
  switch (action.type) {
    case Actions.START_FETCH_GROUPS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUPS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUPS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUPS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.UPDATE_GROUP_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.INVITE_GROUP_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.GROUP_WITHDRAWAL:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.INVITE_GROUP_PARTICIPATE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.INVITE_GROUP_REJECT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
