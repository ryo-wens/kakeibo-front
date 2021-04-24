import * as Actions from './actions';
import { todoListsActions } from './actions';
import initialState from '../store/initialState';

export const todoListReducer = (state = initialState.todoList, action: todoListsActions) => {
  switch (action.type) {
    case Actions.START_FETCH_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_MONTHLY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_SEARCH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
