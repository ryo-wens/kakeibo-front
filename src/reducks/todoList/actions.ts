import { TodoList, TodoListItem } from './types';
export type todoListsActions = ReturnType<
  | typeof startFetchExpiredTodoListAction
  | typeof fetchExpiredTodoListAction
  | typeof cancelFetchExpiredTodoListAction
  | typeof failedFetchExpiredTodoListAction
  | typeof startFetchTodayTodoListAction
  | typeof fetchTodayTodoListAction
  | typeof cancelFetchTodayTodoListAction
  | typeof failedFetchTodayTodoListAction
  | typeof startFetchMonthlyTodoListAction
  | typeof fetchMonthlyTodoListAction
  | typeof cancelFetchMonthlyTodoListAction
  | typeof failedFetchMonthlyTodoListAction
  | typeof startFetchSearchTodoListAction
  | typeof fetchSearchTodoListAction
  | typeof cancelFetchSearchTodoListAction
  | typeof failedFetchSearchTodoListAction
  | typeof startAddTodoListItemAction
  | typeof addTodoListItemAction
  | typeof failedAddTodoListItemAction
  | typeof startEditTodoListItemAction
  | typeof editTodoListItemAction
  | typeof failedEditTodoListItemAction
  | typeof startDeleteTodoListItemAction
  | typeof deleteTodoListItemAction
  | typeof failedDeleteTodoListItemAction
  | typeof startEditSearchTodoListItemAction
  | typeof editSearchTodoListItemAction
  | typeof failedEditSearchTodoListItemAction
  | typeof startDeleteSearchTodoListItemAction
  | typeof deleteSearchTodoListItemAction
  | typeof failedDeleteSearchTodoListItemAction
>;

export const START_FETCH_EXPIRED_TODO_LIST = 'START_FETCH_EXPIRED_TODO_LIST';
export const startFetchExpiredTodoListAction = () => {
  return {
    type: START_FETCH_EXPIRED_TODO_LIST,
    payload: {
      expiredTodoListLoading: true,
    },
  };
};

export const FETCH_EXPIRED_TODO_LIST = 'FETCH_EXPIRED_TODO_LIST';
export const fetchExpiredTodoListAction = (expiredTodoList: TodoList) => {
  return {
    type: FETCH_EXPIRED_TODO_LIST,
    payload: {
      expiredTodoListLoading: false,
      expiredTodoList: expiredTodoList,
    },
  };
};

export const CANCEL_FETCH_EXPIRED_TODO_LIST = 'CANCEL_FETCH_EXPIRED_TODO_LIST';
export const cancelFetchExpiredTodoListAction = () => {
  return {
    type: CANCEL_FETCH_EXPIRED_TODO_LIST,
    payload: {
      expiredTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_EXPIRED_TODO_LIST = 'FAILED_FETCH_EXPIRED_TODO_LIST';
export const failedFetchExpiredTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_EXPIRED_TODO_LIST,
    payload: {
      expiredTodoListLoading: false,
      expiredTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_TODAY_TODO_LIST = 'START_FETCH_TODAY_TODO_LIST';
export const startFetchTodayTodoListAction = () => {
  return {
    type: START_FETCH_TODAY_TODO_LIST,
    payload: {
      todayTodoListLoading: true,
    },
  };
};

export const FETCH_TODAY_TODO_LIST = 'FETCH_TODAY_TODO_LIST';
export const fetchTodayTodoListAction = (
  implementationTodoList: TodoList,
  dueTodoList: TodoList
) => {
  return {
    type: FETCH_TODAY_TODO_LIST,
    payload: {
      todayTodoListLoading: false,
      todayImplementationTodoList: implementationTodoList,
      todayDueTodoList: dueTodoList,
    },
  };
};

export const CANCEL_FETCH_TODAY_TODO_LIST = 'CANCEL_FETCH_TODAY_TODO_LIST';
export const cancelFetchTodayTodoListAction = () => {
  return {
    type: CANCEL_FETCH_TODAY_TODO_LIST,
    payload: {
      todayTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_TODAY_TODO_LIST = 'FAILED_FETCH_TODAY_TODO_LIST';
export const failedFetchTodayTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_TODAY_TODO_LIST,
    payload: {
      todayTodoListLoading: false,
      todayTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_MONTHLY_TODO_LIST = 'START_FETCH_MONTHLY_TODO_LIST';
export const startFetchMonthlyTodoListAction = () => {
  return {
    type: START_FETCH_MONTHLY_TODO_LIST,
    payload: {
      monthlyTodoListLoading: true,
    },
  };
};

export const FETCH_MONTHLY_TODO_LIST = 'FETCH_MONTHLY_TODO_LIST';
export const fetchMonthlyTodoListAction = (
  implementationTodoList: TodoList,
  dueTodoList: TodoList
) => {
  return {
    type: FETCH_MONTHLY_TODO_LIST,
    payload: {
      monthlyTodoListLoading: false,
      monthlyImplementationTodoList: implementationTodoList,
      monthlyDueTodoList: dueTodoList,
    },
  };
};

export const CANCEL_FETCH_MONTHLY_TODO_LIST = 'CANCEL_FETCH_MONTHLY_TODO_LIST';
export const cancelFetchMonthlyTodoListAction = () => {
  return {
    type: CANCEL_FETCH_MONTHLY_TODO_LIST,
    payload: {
      monthlyTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_MONTHLY_TODO_LIST = 'FAILED_FETCH_MONTHLY_TODO_LIST';
export const failedFetchMonthlyTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_MONTHLY_TODO_LIST,
    payload: {
      monthlyTodoListLoading: false,
      monthlyTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_SEARCH_TODO_LIST = 'START_FETCH_SEARCH_TODO_LIST';
export const startFetchSearchTodoListAction = () => {
  return {
    type: START_FETCH_SEARCH_TODO_LIST,
    payload: {
      searchTodoListLoading: true,
    },
  };
};

export const FETCH_SEARCH_TODO_LIST = 'FETCH_SEARCH_TODO_LIST';
export const fetchSearchTodoListAction = (searchTodoList: TodoList) => {
  return {
    type: FETCH_SEARCH_TODO_LIST,
    payload: {
      searchTodoListLoading: false,
      searchTodoList: searchTodoList,
    },
  };
};

export const CANCEL_FETCH_SEARCH_TODO_LIST = 'CANCEL_FETCH_SEARCH_TODO_LIST';
export const cancelFetchSearchTodoListAction = () => {
  return {
    type: CANCEL_FETCH_SEARCH_TODO_LIST,
    payload: {
      searchTodoListLoading: false,
    },
  };
};

export const FAILED_FETCH_SEARCH_TODO_LIST = 'FAILED_FETCH_SEARCH_TODO_LIST';
export const failedFetchSearchTodoListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_SEARCH_TODO_LIST,
    payload: {
      searchTodoListLoading: false,
      searchTodoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_TODO_LIST_ITEM = 'START_ADD_TODO_LIST_ITEM';
export const startAddTodoListItemAction = () => {
  return {
    type: START_ADD_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: true,
      todayTodoListLoading: true,
      monthlyTodoListLoading: true,
    },
  };
};

export const ADD_TODO_LIST_ITEM = 'ADD_TODO_LIST_ITEM';
export const addTodoListItemAction = (todoListItem: TodoListItem) => {
  return {
    type: ADD_TODO_LIST_ITEM,
    payload: { todoListItem: todoListItem },
  };
};

export const FAILED_ADD_TODO_LIST_ITEM = 'FAILED_ADD_TODO_LIST_ITEM';
export const failedAddTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: false,
      todayTodoListLoading: false,
      monthlyTodoListLoading: false,
      todoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_TODO_LIST_ITEM = 'START_EDIT_TODO_LIST_ITEM';
export const startEditTodoListItemAction = () => {
  return {
    type: START_EDIT_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: true,
      todayTodoListLoading: true,
      monthlyTodoListLoading: true,
    },
  };
};

export const EDIT_TODO_LIST_ITEM = 'EDIT_TODO_LIST_ITEM';
export const editTodoListItemAction = (
  expiredTodoList: TodoList,
  todayImplementationTodoList: TodoList,
  todayDueTodoList: TodoList,
  monthlyImplementationTodoList: TodoList,
  monthlyDueTodoList: TodoList
) => {
  return {
    type: EDIT_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: false,
      expiredTodoList: expiredTodoList,
      todayTodoListLoading: false,
      todayImplementationTodoList: todayImplementationTodoList,
      todayDueTodoList: todayDueTodoList,
      monthlyTodoListLoading: false,
      monthlyImplementationTodoList: monthlyImplementationTodoList,
      monthlyDueTodoList: monthlyDueTodoList,
    },
  };
};

export const FAILED_EDIT_TODO_LIST_ITEM = 'FAILED_EDIT_TODO_LIST_ITEM';
export const failedEditTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: false,
      todayTodoListLoading: false,
      monthlyTodoListLoading: false,
      todoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_TODO_LIST_ITEM = 'START_DELETE_TODO_LIST_ITEM';
export const startDeleteTodoListItemAction = () => {
  return {
    type: START_DELETE_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: true,
      todayTodoListLoading: true,
      monthlyTodoListLoading: true,
    },
  };
};

export const DELETE_TODO_LIST_ITEM = 'DELETE_TODO_LIST_ITEM';
export const deleteTodoListItemAction = (
  expiredTodoList: TodoList,
  todayImplementationTodoList: TodoList,
  todayDueTodoList: TodoList,
  monthlyImplementationTodoList: TodoList,
  monthlyDueTodoList: TodoList
) => {
  return {
    type: DELETE_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: false,
      expiredTodoList: expiredTodoList,
      todayTodoListLoading: false,
      todayImplementationTodoList: todayImplementationTodoList,
      todayDueTodoList: todayDueTodoList,
      monthlyTodoListLoading: false,
      monthlyImplementationTodoList: monthlyImplementationTodoList,
      monthlyDueTodoList: monthlyDueTodoList,
    },
  };
};

export const FAILED_DELETE_TODO_LIST_ITEM = 'FAILED_DELETE_TODO_LIST_ITEM';
export const failedDeleteTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_TODO_LIST_ITEM,
    payload: {
      expiredTodoListLoading: false,
      todayTodoListLoading: false,
      monthlyTodoListLoading: false,
      todoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_SEARCH_TODO_LIST_ITEM = 'START_EDIT_SEARCH_TODO_LIST_ITEM';
export const startEditSearchTodoListItemAction = () => {
  return {
    type: START_EDIT_SEARCH_TODO_LIST_ITEM,
    payload: {
      searchTodoListLoading: true,
    },
  };
};

export const EDIT_SEARCH_TODO_LIST_ITEM = 'EDIT_SEARCH_TODO_LIST_ITEM';
export const editSearchTodoListItemAction = (searchTodoList: TodoList) => {
  return {
    type: EDIT_SEARCH_TODO_LIST_ITEM,
    payload: {
      searchTodoListLoading: false,
      searchTodoList: searchTodoList,
    },
  };
};

export const FAILED_EDIT_SEARCH_TODO_LIST_ITEM = 'FAILED_EDIT_SEARCH_TODO_LIST_ITEM';
export const failedEditSearchTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_SEARCH_TODO_LIST_ITEM,
    payload: {
      searchTodoListLoading: false,
      todoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_SEARCH_TODO_LIST_ITEM = 'START_DELETE_SEARCH_TODO_LIST_ITEM';
export const startDeleteSearchTodoListItemAction = () => {
  return {
    type: START_DELETE_SEARCH_TODO_LIST_ITEM,
    payload: {
      searchTodoListLoading: true,
    },
  };
};

export const DELETE_SEARCH_TODO_LIST_ITEM = 'DELETE_SEARCH_TODO_LIST_ITEM';
export const deleteSearchTodoListItemAction = (searchTodoList: TodoList) => {
  return {
    type: DELETE_SEARCH_TODO_LIST_ITEM,
    payload: {
      searchTodoListLoading: false,
      searchTodoList: searchTodoList,
    },
  };
};

export const FAILED_DELETE_SEARCH_TODO_LIST_ITEM = 'FAILED_DELETE_SEARCH_TODO_LIST_ITEM';
export const failedDeleteSearchTodoListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_SEARCH_TODO_LIST_ITEM,
    payload: {
      searchTodoListLoading: false,
      todoListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
