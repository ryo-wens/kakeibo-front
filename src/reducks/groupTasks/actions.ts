import { GroupTasksList, GroupTasksListForEachUser } from './types';
export type groupTasksActions = ReturnType<
  | typeof addGroupTasksUsersAction
  | typeof addTaskItemAction
  | typeof deleteTaskItemAction
  | typeof editTaskItemAction
  | typeof fetchGroupTasksListEachUserAction
  | typeof fetchGroupTasksListAction
>;

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

export const ADD_GROUP_TASKS_USERS = 'ADD_GROUP_TASKS_USERS';
export const addGroupTasksUsersAction = (groupTasksListForEachUser: GroupTasksListForEachUser) => {
  return {
    type: ADD_GROUP_TASKS_USERS,
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

export const EDIT_TASK_ITEM = 'EDIT_TASK_ITEM';
export const editTaskItemAction = (groupTasksList: GroupTasksList) => {
  return {
    type: EDIT_TASK_ITEM,
    payload: {
      groupTasksList: groupTasksList,
    },
  };
};

export const DELETE_TASK_ITEM = 'DELETE_TASK_ITEM';
export const deleteTaskItemAction = (groupTasksList: GroupTasksList) => {
  return {
    type: DELETE_TASK_ITEM,
    payload: {
      groupTasksList: groupTasksList,
    },
  };
};
