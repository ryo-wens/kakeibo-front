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

const tasksListForEachUser = (state: State) => state.groupTasks.groupTasksListForEachUser;
const userId = (state: State) => state.users.id;

export const getUserTaskListItem = createSelector(
  [tasksListForEachUser, userId],
  (tasksListForEachUser, userId) => {
    return tasksListForEachUser.find((listItem) => listItem.user_id === userId);
  }
);
