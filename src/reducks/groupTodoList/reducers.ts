import * as Actions from './actions';
import { groupTodoListsActions } from './actions';
import initialState from '../store/initialState';

export const groupTodoListsReducer = (
  state = initialState.groupTodoList,
  action: groupTodoListsActions
) => {
  switch (action.type) {
    case Actions.START_FETCH_GROUP_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_GROUP_SEARCH_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_SEARCH_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_GROUP_SEARCH_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_GROUP_SEARCH_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_SEARCH_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_GROUP_SEARCH_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
