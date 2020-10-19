import { createSelector } from 'reselect';
import { State } from '../store/types';

const groupTasksSelector = (state: State) => state.groupTasks;

export const getGroupTasksListForEachUser = createSelector(
  [groupTasksSelector],
  (state) => state.groupTasksListForEachUser
);

export const getGroupTasksList = createSelector(
  [groupTasksSelector],
  (state) => state.groupTasksList
);
