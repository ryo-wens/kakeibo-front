import * as Actions from './actions';
import { groupTasksActions } from './actions';
import initialState from '../store/initialState';

export const groupTasksReducers = (state = initialState.groupTasks, action: groupTasksActions) => {
  switch (action.type) {
    case Actions.START_FETCH_GROUP_TASK_LIST_FOR_EACH_USER:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TASK_LIST_FOR_EACH_USER:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_TASK_LIST_FOR_EACH_USER:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_TASK_LIST_FOR_EACH_USER:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_TASK_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_TASK_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_TASK_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_TASK_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_TASK_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_TASK_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_TASK_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TASK_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_TASK_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_TASK_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_TASK_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
