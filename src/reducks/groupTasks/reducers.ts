import * as Actions from './actions';
import { groupTasksActions } from './actions';
import initialState from '../store/initialState';

export const groupTasksReducers = (state = initialState.groupTasks, action: groupTasksActions) => {
  switch (action.type) {
    case Actions.ADD_GROUP_TASKS_USER:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TASKS_LIST_EACH_USER:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TASKS_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
