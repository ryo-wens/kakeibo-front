import * as Actions from './actions';
import { todoListsActions } from './actions';
import initialState from '../store/initialState';

export const todoListsReducer = (state = initialState.todoLists, action: todoListsActions) => {
  switch (action.type) {
    case Actions.CREATE_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_DATE_TODO_LISTS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_MONTH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
