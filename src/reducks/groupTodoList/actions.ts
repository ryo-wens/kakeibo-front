import { GroupTodoList } from './types';
import { TodoList } from '../todoList/types';
export type groupTodoListsActions = ReturnType<
  | typeof startFetchGroupExpiredTodoListAction
  | typeof fetchGroupExpiredTodoListAction
  | typeof cancelFetchGroupExpiredTodoListAction
  | typeof failedFetchGroupExpiredTodoListAction
  | typeof startFetchGroupTodayTodoListAction
  | typeof fetchGroupTodayTodoListAction
  | typeof cancelFetchGroupTodayTodoListAction
  | typeof failedFetchGroupTodayTodoListAction
  | typeof startFetchGroupMonthlyTodoListAction
  | typeof fetchGroupMonthlyTodoListAction
  | typeof cancelFetchGroupMonthlyTodoListAction
  | typeof failedFetchGroupMonthlyTodoListAction
  | typeof startFetchGroupSearchTodoListAction
  | typeof fetchGroupSearchTodoListAction
  | typeof cancelFetchGroupSearchTodoListAction
  | typeof failedFetchGroupSearchTodoListAction
  | typeof startAddGroupTodoListItemAction
  | typeof addGroupTodoListItemAction
  | typeof failedAddGroupTodoListItemAction
  | typeof startEditGroupTodoListItemAction
  | typeof editGroupTodoListItemAction
  | typeof failedEditGroupTodoListItemAction
  | typeof startDeleteGroupTodoListItemAction
  | typeof deleteGroupTodoListItemAction
  | typeof failedDeleteGroupTodoListItemAction
  | typeof startEditGroupSearchTodoListItemAction
  | typeof editGroupSearchTodoListItemAction
  | typeof failedEditGroupSearchTodoListItemAction
  | typeof startDeleteGroupSearchTodoListItemAction
  | typeof deleteGroupSearchTodoListItemAction
  | typeof failedDeleteGroupSearchTodoListItemAction
>;

export const START_FETCH_GROUP_EXPIRED_TODO_LIST = 'START_FETCH_GROUP_EXPIRED_TODO_LIST';
export const startFetchGroupExpiredTodoListAction = () => {
  return {
    type: START_FETCH_GROUP_EXPIRED_TODO_LIST,
    payload: {
      groupExpiredTodoListLoading: true,
    },
  };
};

export const FETCH_GROUP_EXPIRED_TODO_LIST = 'FETCH_GROUP_EXPIRED_TODO_LIST';
export const fetchGroupExpiredTodoListAction = (groupExpiredTodoList: GroupTodoList) => {
  return {
    type: FETCH_GROUP_EXPIRED_TODO_LIST,
    payload: {
      groupExpiredTodoListLoading: false,
      groupExpiredTodoList: groupExpiredTodoList,
    },
  };
};

export const CANCEL_FETCH_GROUP_EXPIRED_TODO_LIST = 'CANCEL_FETCH_GROUP_EXPIRED_TODO_LIST';
export const cancelFetchGroupExpiredTodoListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_EXPIRED_TODO_LIST,
    payload: {
      groupExpiredTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_EXPIRED_TODO_LIST = 'FAILED_FETCH_GROUP_EXPIRED_TODO_LIST';
export const failedFetchGroupExpiredTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_EXPIRED_TODO_LIST,
    payload: {
      groupExpiredTodoListLoading: false,
      groupExpiredTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_TODAY_TODO_LIST = 'START_FETCH_GROUP_TODAY_TODO_LIST';
export const startFetchGroupTodayTodoListAction = () => {
  return {
    type: START_FETCH_GROUP_TODAY_TODO_LIST,
    payload: {
      groupTodayTodoListLoading: true,
    },
  };
};

export const FETCH_GROUP_TODAY_TODO_LIST = 'FETCH_GROUP_TODAY_TODO_LIST';
export const fetchGroupTodayTodoListAction = (
  implementationTodoList: GroupTodoList,
  dueTodoList: GroupTodoList
) => {
  return {
    type: FETCH_GROUP_TODAY_TODO_LIST,
    payload: {
      groupTodayTodoListLoading: false,
      groupTodayImplementationTodoList: implementationTodoList,
      groupTodayDueTodoList: dueTodoList,
    },
  };
};

export const CANCEL_FETCH_GROUP_TODAY_TODO_LIST = 'CANCEL_FETCH_GROUP_TODAY_TODO_LIST';
export const cancelFetchGroupTodayTodoListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TODAY_TODO_LIST,
    payload: {
      groupTodayTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TODAY_TODO_LIST = 'FAILED_FETCH_GROUP_TODAY_TODO_LIST';
export const failedFetchGroupTodayTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_TODAY_TODO_LIST,
    payload: {
      groupTodayTodoListLoading: false,
      groupTodayTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_MONTHLY_TODO_LIST = 'START_FETCH_GROUP_MONTHLY_TODO_LIST';
export const startFetchGroupMonthlyTodoListAction = () => {
  return {
    type: START_FETCH_GROUP_MONTHLY_TODO_LIST,
    payload: {
      groupMonthlyTodoListLoading: true,
    },
  };
};

export const FETCH_GROUP_MONTHLY_TODO_LIST = 'FETCH_GROUP_MONTHLY_TODO_LIST';
export const fetchGroupMonthlyTodoListAction = (
  implementationTodoList: GroupTodoList,
  dueTodoList: GroupTodoList
) => {
  return {
    type: FETCH_GROUP_MONTHLY_TODO_LIST,
    payload: {
      groupMonthlyTodoListLoading: false,
      groupMonthlyImplementationTodoList: implementationTodoList,
      groupMonthlyDueTodoList: dueTodoList,
    },
  };
};

export const CANCEL_FETCH_GROUP_MONTHLY_TODO_LIST = 'CANCEL_FETCH_GROUP_MONTHLY_TODO_LIST';
export const cancelFetchGroupMonthlyTodoListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_MONTHLY_TODO_LIST,
    payload: {
      groupMonthlyTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_MONTHLY_TODO_LIST = 'FAILED_FETCH_GROUP_MONTHLY_TODO_LIST';
export const failedFetchGroupMonthlyTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_MONTHLY_TODO_LIST,
    payload: {
      groupMonthlyTodoListLoading: false,
      groupMonthlyTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_SEARCH_TODO_LIST = 'START_FETCH_GROUP_SEARCH_TODO_LIST';
export const startFetchGroupSearchTodoListAction = () => {
  return {
    type: START_FETCH_GROUP_SEARCH_TODO_LIST,
    payload: {
      groupSearchTodoListLoading: true,
    },
  };
};

export const FETCH_GROUP_SEARCH_TODO_LIST = 'FETCH_GROUP_SEARCH_TODO_LIST';
export const fetchGroupSearchTodoListAction = (searchTodoList: GroupTodoList) => {
  return {
    type: FETCH_GROUP_SEARCH_TODO_LIST,
    payload: {
      groupSearchTodoListLoading: false,
      groupSearchTodoList: searchTodoList,
    },
  };
};

export const CANCEL_FETCH_GROUP_SEARCH_TODO_LIST = 'CANCEL_FETCH_GROUP_SEARCH_TODO_LIST';
export const cancelFetchGroupSearchTodoListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_SEARCH_TODO_LIST,
    payload: {
      groupSearchTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_SEARCH_TODO_LIST = 'FAILED_FETCH_GROUP_SEARCH_TODO_LIST';
export const failedFetchGroupSearchTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_SEARCH_TODO_LIST,
    payload: {
      groupSearchTodoListLoading: false,
      groupSearchTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_GROUP_TODO_LIST_ITEM = 'START_ADD_GROUP_TODO_LIST_ITEM';
export const startAddGroupTodoListItemAction = () => {
  return {
    type: START_ADD_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: true,
      groupTodayTodoListLoading: true,
      groupMonthlyTodoListLoading: true,
    },
  };
};

export const ADD_GROUP_TODO_LIST_ITEM = 'ADD_GROUP_TODO_LIST_ITEM';
export const addGroupTodoListItemAction = (
  expiredTodoList: GroupTodoList,
  todayImplementationTodoList: GroupTodoList,
  todayDueTodoList: GroupTodoList,
  monthlyImplementationTodoList: GroupTodoList,
  monthlyDueTodoList: GroupTodoList
) => {
  return {
    type: ADD_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: false,
      groupExpiredTodoList: expiredTodoList,
      groupTodayTodoListLoading: false,
      groupTodayImplementationTodoList: todayImplementationTodoList,
      groupTodayDueTodoList: todayDueTodoList,
      groupMonthlyTodoListLoading: false,
      groupMonthlyImplementationTodoList: monthlyImplementationTodoList,
      groupMonthlyDueTodoList: monthlyDueTodoList,
    },
  };
};

export const FAILED_ADD_GROUP_TODO_LIST_ITEM = 'FAILED_ADD_GROUP_TODO_LIST_ITEM';
export const failedAddGroupTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: false,
      groupTodayTodoListLoading: false,
      groupMonthlyTodoListLoading: false,
      groupTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_TODO_LIST_ITEM = 'START_EDIT_GROUP_TODO_LIST_ITEM';
export const startEditGroupTodoListItemAction = () => {
  return {
    type: START_EDIT_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: true,
      groupTodayTodoListLoading: true,
      groupMonthlyTodoListLoading: true,
    },
  };
};

export const EDIT_GROUP_TODO_LIST_ITEM = 'EDIT_GROUP_TODO_LIST_ITEM';
export const editGroupTodoListItemAction = (
  expiredTodoList: GroupTodoList,
  todayImplementationTodoList: GroupTodoList,
  todayDueTodoList: GroupTodoList,
  monthlyImplementationTodoList: GroupTodoList,
  monthlyDueTodoList: GroupTodoList
) => {
  return {
    type: EDIT_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: false,
      groupExpiredTodoList: expiredTodoList,
      groupTodayTodoListLoading: false,
      groupTodayImplementationTodoList: todayImplementationTodoList,
      groupTodayDueTodoList: todayDueTodoList,
      groupMonthlyTodoListLoading: false,
      groupMonthlyImplementationTodoList: monthlyImplementationTodoList,
      groupMonthlyDueTodoList: monthlyDueTodoList,
    },
  };
};

export const FAILED_EDIT_GROUP_TODO_LIST_ITEM = 'FAILED_EDIT_GROUP_TODO_LIST_ITEM';
export const failedEditGroupTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: false,
      groupTodayTodoListLoading: false,
      groupMonthlyTodoListLoading: false,
      groupTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_TODO_LIST_ITEM = 'START_DELETE_GROUP_TODO_LIST_ITEM';
export const startDeleteGroupTodoListItemAction = () => {
  return {
    type: START_DELETE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: true,
      groupTodayTodoListLoading: true,
      groupMonthlyTodoListLoading: true,
    },
  };
};

export const DELETE_GROUP_TODO_LIST_ITEM = 'DELETE_GROUP_TODO_LIST_ITEM';
export const deleteGroupTodoListItemAction = (
  expiredTodoList: GroupTodoList,
  todayImplementationTodoList: GroupTodoList,
  todayDueTodoList: GroupTodoList,
  monthlyImplementationTodoList: GroupTodoList,
  monthlyDueTodoList: GroupTodoList
) => {
  return {
    type: DELETE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: false,
      groupExpiredTodoList: expiredTodoList,
      groupTodayTodoListLoading: false,
      groupTodayImplementationTodoList: todayImplementationTodoList,
      groupTodayDueTodoList: todayDueTodoList,
      groupMonthlyTodoListLoading: false,
      groupMonthlyImplementationTodoList: monthlyImplementationTodoList,
      groupMonthlyDueTodoList: monthlyDueTodoList,
    },
  };
};

export const FAILED_DELETE_GROUP_TODO_LIST_ITEM = 'FAILED_DELETE_GROUP_TODO_LIST_ITEM';
export const failedDeleteGroupTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoListLoading: false,
      groupTodayTodoListLoading: false,
      groupMonthlyTodoListLoading: false,
      groupTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_SEARCH_TODO_LIST_ITEM = 'START_EDIT_GROUP_SEARCH_TODO_LIST_ITEM';
export const startEditGroupSearchTodoListItemAction = () => {
  return {
    type: START_EDIT_GROUP_SEARCH_TODO_LIST_ITEM,
    payload: {
      groupSearchTodoListLoading: true,
    },
  };
};

export const EDIT_GROUP_SEARCH_TODO_LIST_ITEM = 'EDIT_GROUP_SEARCH_TODO_LIST_ITEM';
export const editGroupSearchTodoListItemAction = (searchTodoList: GroupTodoList) => {
  return {
    type: EDIT_GROUP_SEARCH_TODO_LIST_ITEM,
    payload: {
      groupSearchTodoListLoading: false,
      groupSearchTodoList: searchTodoList,
    },
  };
};

export const FAILED_EDIT_GROUP_SEARCH_TODO_LIST_ITEM = 'FAILED_EDIT_GROUP_SEARCH_TODO_LIST_ITEM';
export const failedEditGroupSearchTodoListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_EDIT_GROUP_SEARCH_TODO_LIST_ITEM,
    payload: {
      groupSearchTodoListLoading: false,
      groupTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_SEARCH_TODO_LIST_ITEM = 'START_DELETE_GROUP_SEARCH_TODO_LIST_ITEM';
export const startDeleteGroupSearchTodoListItemAction = () => {
  return {
    type: START_DELETE_GROUP_SEARCH_TODO_LIST_ITEM,
    payload: {
      groupSearchTodoListLoading: true,
    },
  };
};

export const DELETE_GROUP_SEARCH_TODO_LIST_ITEM = 'DELETE_GROUP_SEARCH_TODO_LIST_ITEM';
export const deleteGroupSearchTodoListItemAction = (searchTodoList: TodoList) => {
  return {
    type: DELETE_GROUP_SEARCH_TODO_LIST_ITEM,
    payload: {
      groupSearchTodoListLoading: false,
      groupSearchTodoList: searchTodoList,
    },
  };
};

export const FAILED_DELETE_GROUP_SEARCH_TODO_LIST_ITEM =
  'FAILED_DELETE_GROUP_SEARCH_TODO_LIST_ITEM';
export const failedDeleteGroupSearchTodoListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_DELETE_GROUP_SEARCH_TODO_LIST_ITEM,
    payload: {
      groupSearchTodoListLoading: false,
      groupTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
