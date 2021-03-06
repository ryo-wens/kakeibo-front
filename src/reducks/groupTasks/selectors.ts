import { createSelector } from 'reselect';
import { State } from '../store/types';
import { TaskListItem } from './types';
import dayjs from 'dayjs';

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
      taskList &&
      taskList.tasks_list.filter((taskItem: TaskListItem) => {
        if (taskItem.cycle_type === ('every' || 'none') && taskItem.base_date !== null) {
          return dayjs().startOf('day').isSame(taskItem.base_date, 'day');
        }

        return taskItem;
      })
    );
  }
);
