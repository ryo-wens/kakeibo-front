import * as Actions from './actions';
import { todoListsActions } from './actions';
import initialState from '../store/initialState';

export const todoListsReducer = (state = initialState.todoLists, action: todoListsActions) => {
  switch (action.type) {
    case Actions.CREATE_TODO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
