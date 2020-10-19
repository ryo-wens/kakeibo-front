import { TaskList, UserTaskList } from './types';
export type groupTasksActions = ReturnType<
  | typeof addGroupTaskUserAction
  | typeof fetchGroupTasksListEachUserAction
  | typeof fetchGroupTasksList
>;

export const ADD_GROUP_TASKS_USER = 'ADD_GROUP_TASKS_USER';
export const addGroupTaskUserAction = (groupTasksListForEachUser: UserTaskList) => {
  return {
    type: ADD_GROUP_TASKS_USER,
    payload: {
      groupTasksListForEachUser: groupTasksListForEachUser,
    },
  };
};

export const FETCH_GROUP_TASKS_LIST_EACH_USER = 'FETCH_GROUP_TASKS_LIST_EACH_USER';
export const fetchGroupTasksListEachUserAction = (groupTasksListForEachUser: UserTaskList) => {
  return {
    type: FETCH_GROUP_TASKS_LIST_EACH_USER,
    payload: {
      groupTasksListForEachUser: groupTasksListForEachUser,
    },
  };
};

export const FETCH_GROUP_TASKS_LIST = 'FETCH_GROUP_TASKS_LIST';
export const fetchGroupTasksList = (groupTasksList: TaskList) => {
  return {
    type: FETCH_GROUP_TASKS_LIST,
    payload: {
      groupTasksList: groupTasksList,
    },
  };
};
