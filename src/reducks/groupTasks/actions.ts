import { UserTaskList } from './types';
export type groupTasksActions = ReturnType<
  typeof addTaskUserAction | typeof fetchTasksListEachUserAction
>;

export const ADD_TASK_USER = 'ADD_TASK_USER';
export const addTaskUserAction = (groupTasksListForEachUser: UserTaskList) => {
  return {
    type: ADD_TASK_USER,
    payload: {
      groupTasksListForEachUser: groupTasksListForEachUser,
    },
  };
};

export const FETCH_TASKS_LIST_EACH_USER = 'FETCH_TASKS_LIST_EACH_USER';
export const fetchTasksListEachUserAction = (groupTasksListForEachUser: UserTaskList) => {
  return {
    type: FETCH_TASKS_LIST_EACH_USER,
    payload: {
      groupTasksListForEachUser: groupTasksListForEachUser,
    },
  };
};
