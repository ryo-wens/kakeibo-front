import * as Actions from './actions';
import { groupTodoListsActions } from './actions';
import initialState from '../store/initialState';

export const groupTodoListsReducer = (
  state = initialState.groupTodoList,
  action: groupTodoListsActions
) => {
  switch (action.type) {
    case Actions.CREATE_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TODAY_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_MONTH_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_EXPIRED_TODO_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
