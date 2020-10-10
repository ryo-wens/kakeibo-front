import * as Actions from './actions';
import { groupTodoListsActions } from './actions';
import initialState from '../store/initialState';

export const groupTodoListsReducer = (
  state = initialState.groupTodoLists,
  action: groupTodoListsActions
) => {
  switch (action.type) {
    case Actions.CREATE_GROUP_TODO_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
