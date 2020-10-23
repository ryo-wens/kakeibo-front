import { GroupTasksList, GroupTasksListForEachUser } from './types';
export type groupTasksActions = ReturnType<
  | typeof addGroupTaskUserAction
  | typeof fetchGroupTasksListEachUserAction
  | typeof fetchGroupTasksListAction
  | typeof addTaskItemAction
>;

export const ADD_GROUP_TASKS_USER = 'ADD_GROUP_TASKS_USER';
export const addGroupTaskUserAction = (groupTasksListForEachUser: GroupTasksListForEachUser) => {
  return {
    type: ADD_GROUP_TASKS_USER,
    payload: {
      groupTasksListForEachUser: groupTasksListForEachUser,
    },
  };
};

export const FETCH_GROUP_TASKS_LIST_EACH_USER = 'FETCH_GROUP_TASKS_LIST_EACH_USER';
export const fetchGroupTasksListEachUserAction = (
  groupTasksListForEachUser: GroupTasksListForEachUser
) => {
  return {
    type: FETCH_GROUP_TASKS_LIST_EACH_USER,
    payload: {
      groupTasksListForEachUser: groupTasksListForEachUser,
    },
  };
};

export const FETCH_GROUP_TASKS_LIST = 'FETCH_GROUP_TASKS_LIST';
export const fetchGroupTasksListAction = (groupTasksList: GroupTasksList) => {
  return {
    type: FETCH_GROUP_TASKS_LIST,
    payload: {
      groupTasksList: groupTasksList,
    },
  };
};

export const ADD_TASK_ITEM = 'ADD_TASK_ITEM';
export const addTaskItemAction = (groupTasksList: GroupTasksList) => {
  return {
    type: ADD_TASK_ITEM,
    payload: {
      groupTasksList: groupTasksList,
    },
  };
};
