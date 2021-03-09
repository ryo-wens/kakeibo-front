import { GroupTaskList, GroupTaskListForEachUser } from './types';
export type groupTasksActions = ReturnType<
  | typeof startFetchGroupTaskListForEachUserAction
  | typeof fetchGroupTaskListForEachUserAction
  | typeof cancelFetchGroupTaskListForEachUserAction
  | typeof failedFetchGroupTaskListForEachUserAction
  | typeof startAddTaskUsersAction
  | typeof addTaskUsersAction
  | typeof failedAddTaskUsersAction
  | typeof startDeleteTaskUsersAction
  | typeof deleteTaskUsersAction
  | typeof failedDeleteTaskUsersAction
  | typeof startFetchGroupTaskListAction
  | typeof fetchGroupTaskListAction
  | typeof cancelFetchGroupTaskListAction
  | typeof failedFetchGroupTaskListAction
  | typeof startAddTaskItemAction
  | typeof addTaskItemAction
  | typeof failedAddTaskItemAction
  | typeof startDeleteTaskItemAction
  | typeof deleteTaskItemAction
  | typeof failedDeleteTaskItemAction
  | typeof startEditTaskItemAction
  | typeof editTaskItemAction
  | typeof failedEditTaskItemAction
>;

export const START_FETCH_GROUP_TASK_LIST_FOR_EACH_USER =
  'START_FETCH_GROUP_TASK_LIST_FOR_EACH_USER';
export const startFetchGroupTaskListForEachUserAction = () => {
  return {
    type: START_FETCH_GROUP_TASK_LIST_FOR_EACH_USER,
    payload: {
      groupTaskListForEachUserLoading: true,
      groupTaskListForEachUserError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_GROUP_TASK_LIST_FOR_EACH_USER = 'FETCH_GROUP_TASK_LIST_FOR_EACH_USER';
export const fetchGroupTaskListForEachUserAction = (
  groupTaskListForEachUser: GroupTaskListForEachUser
) => {
  return {
    type: FETCH_GROUP_TASK_LIST_FOR_EACH_USER,
    payload: {
      groupTaskListForEachUserLoading: false,
      groupTaskListForEachUser: groupTaskListForEachUser,
    },
  };
};

export const CANCEL_FETCH_GROUP_TASK_LIST_FOR_EACH_USER =
  'CANCEL_FETCH_GROUP_TASK_LIST_FOR_EACH_USER';
export const cancelFetchGroupTaskListForEachUserAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TASK_LIST_FOR_EACH_USER,
    payload: {
      groupTaskListForEachUserLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TASK_LIST_FOR_EACH_USER =
  'FAILED_FETCH_GROUP_TASK_LIST_FOR_EACH_USER';
export const failedFetchGroupTaskListForEachUserAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_TASK_LIST_FOR_EACH_USER,
    payload: {
      groupTaskListForEachUserLoading: false,
      groupTaskListForEachUserError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_TASK_USERS = 'START_ADD_TASK_USERS';
export const startAddTaskUsersAction = () => {
  return {
    type: START_ADD_TASK_USERS,
    payload: {
      groupTaskListForEachUserLoading: true,
    },
  };
};

export const ADD_TASK_USERS = 'ADD_TASK_USERS';
export const addTaskUsersAction = (groupTaskListForEachUser: GroupTaskListForEachUser) => {
  return {
    type: ADD_TASK_USERS,
    payload: {
      groupTaskListForEachUserLoading: false,
      groupTaskListForEachUser: groupTaskListForEachUser,
    },
  };
};

export const FAILED_ADD_TASK_USERS = 'FAILED_ADD_TASK_USERS';
export const failedAddTaskUsersAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_TASK_USERS,
    payload: {
      groupTaskListForEachUserLoading: false,
      groupTaskError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_TASK_USERS = 'START_DELETE_TASK_USERS';
export const startDeleteTaskUsersAction = () => {
  return {
    type: START_DELETE_TASK_USERS,
    payload: {
      groupTaskListForEachUserLoading: true,
    },
  };
};

export const DELETE_TASK_USERS = 'DELETE_TASK_USERS';
export const deleteTaskUsersAction = (groupTaskListForEachUser: GroupTaskListForEachUser) => {
  return {
    type: DELETE_TASK_USERS,
    payload: {
      groupTaskListForEachUserLoading: false,
      groupTaskListForEachUser: groupTaskListForEachUser,
    },
  };
};

export const FAILED_DELETE_TASK_USERS = 'FAILED_DELETE_TASK_USERS';
export const failedDeleteTaskUsersAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_TASK_USERS,
    payload: {
      groupTaskListForEachUserLoading: false,
      groupTaskError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_TASK_LIST = 'START_FETCH_GROUP_TASK_LIST';
export const startFetchGroupTaskListAction = () => {
  return {
    type: START_FETCH_GROUP_TASK_LIST,
    payload: {
      groupTaskListLoading: true,
      groupTaskListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_GROUP_TASK_LIST = 'FETCH_GROUP_TASK_LIST';
export const fetchGroupTaskListAction = (groupTaskList: GroupTaskList) => {
  return {
    type: FETCH_GROUP_TASK_LIST,
    payload: {
      groupTaskListLoading: false,
      groupTaskList: groupTaskList,
    },
  };
};

export const CANCEL_FETCH_GROUP_TASK_LIST = 'CANCEL_FETCH_GROUP_TASK_LIST';
export const cancelFetchGroupTaskListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TASK_LIST,
    payload: {
      groupTaskListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TASK_LIST = 'FAILED_FETCH_GROUP_TASK_LIST';
export const failedFetchGroupTaskListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_TASK_LIST,
    payload: {
      groupTaskListLoading: false,
      groupTaskListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_TASK_ITEM = 'START_ADD_TASK_ITEM';
export const startAddTaskItemAction = () => {
  return {
    type: START_ADD_TASK_ITEM,
    payload: {
      groupTaskListLoading: true,
    },
  };
};

export const ADD_TASK_ITEM = 'ADD_TASK_ITEM';
export const addTaskItemAction = (groupTaskList: GroupTaskList) => {
  return {
    type: ADD_TASK_ITEM,
    payload: {
      groupTaskListLoading: false,
      groupTaskList: groupTaskList,
    },
  };
};

export const FAILED_ADD_TASK_ITEM = 'FAILED_ADD_TASK_ITEM';
export const failedAddTaskItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_TASK_ITEM,
    payload: {
      groupTaskListLoading: false,
      groupTaskError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_TASK_ITEM = 'START_EDIT_TASK_ITEM';
export const startEditTaskItemAction = () => {
  return {
    type: START_EDIT_TASK_ITEM,
    payload: {
      groupTaskListLoading: true,
    },
  };
};

export const EDIT_TASK_ITEM = 'EDIT_TASK_ITEM';
export const editTaskItemAction = (groupTaskList: GroupTaskList) => {
  return {
    type: EDIT_TASK_ITEM,
    payload: {
      groupTaskListLoading: false,
      groupTaskList: groupTaskList,
    },
  };
};

export const FAILED_EDIT_TASK_ITEM = 'FAILED_EDIT_TASK_ITEM';
export const failedEditTaskItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_TASK_ITEM,
    payload: {
      groupTaskListLoading: false,
      groupTaskError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_TASK_ITEM = 'START_DELETE_TASK_ITEM';
export const startDeleteTaskItemAction = () => {
  return {
    type: START_DELETE_TASK_ITEM,
    payload: {
      groupTaskListLoading: true,
    },
  };
};

export const DELETE_TASK_ITEM = 'DELETE_TASK_ITEM';
export const deleteTaskItemAction = (groupTaskList: GroupTaskList) => {
  return {
    type: DELETE_TASK_ITEM,
    payload: {
      groupTaskListLoading: false,
      groupTaskList: groupTaskList,
    },
  };
};

export const FAILED_DELETE_TASK_ITEM = 'FAILED_DELETE_TASK_ITEM';
export const failedDeleteTaskItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_TASK_ITEM,
    payload: {
      groupTaskListLoading: false,
      groupTaskError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
