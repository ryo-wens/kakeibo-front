import { createSelector } from 'reselect';
import { State } from '../store/types';
import moment from 'moment';

const groupTasksSelector = (state: State) => state.groupTasks;

export const getGroupTaskListForEachUser = createSelector(
  [groupTasksSelector],
  (state) => state.groupTaskListForEachUser
);

export const getGroupTaskList = createSelector(
  [groupTasksSelector],
  (state) => state.groupTaskList
);

const tasksListForEachUser = (state: State) => state.groupTasks.groupTaskListForEachUser;
const userId = (state: State) => state.users.user_id;

export const getUserTaskListItem = createSelector(
  [tasksListForEachUser, userId],
  (tasksListForEachUser, userId) => {
    const taskList = tasksListForEachUser.find((listItem) => listItem.user_id === userId);
    return (
      taskList && taskList.tasks_list.filter((item) => moment().isSame(item.base_date, 'date'))
    );
  }
);
