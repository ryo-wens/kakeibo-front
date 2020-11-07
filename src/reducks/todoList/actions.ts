import { TodoList } from './types';
export type todoListsActions = ReturnType<
  | typeof createTodoListItemAction
  | typeof editTodoListItemAction
  | typeof fetchDateTodoListAction
  | typeof fetchMonthTodoListAction
  | typeof deleteTodoListItemAction
>;

export const CREATE_TODO_LIST_ITEM = 'CREATE_TODO_LIST_ITEM';
export const createTodoListItemAction = (
  expiredTodoList: TodoList,
  todayImplementationTodoList: TodoList,
  todayDueTodoList: TodoList,
  monthImplementationTodoList: TodoList,
  monthDueTodoList: TodoList
) => {
  return {
    type: CREATE_TODO_LIST_ITEM,
    payload: {
      expiredTodoList: expiredTodoList,
      todayImplementationTodoList: todayImplementationTodoList,
      todayDueTodoList: todayDueTodoList,
      monthImplementationTodoList: monthImplementationTodoList,
      monthDueTodoList: monthDueTodoList,
    },
  };
};

export const EDIT_TODO_LIST_ITEM = 'EDIT_TODO_LIST_ITEM';
export const editTodoListItemAction = (
  todayImplementationTodoList: TodoList,
  todayDueTodoList: TodoList,
  monthImplementationTodoList: TodoList,
  monthDueTodoList: TodoList
) => {
  return {
    type: EDIT_TODO_LIST_ITEM,
    payload: {
      todayImplementationTodoList: todayImplementationTodoList,
      todayDueTodoList: todayDueTodoList,
      monthImplementationTodoList: monthImplementationTodoList,
      monthDueTodoList: monthDueTodoList,
    },
  };
};

export const FETCH_DATE_TODO_LIST = 'FETCH_DATE_TODO_LIST';
export const fetchDateTodoListAction = (
  implementationTodoList: TodoList,
  dueTodoList: TodoList,
  message: string
) => {
  return {
    type: FETCH_DATE_TODO_LIST,
    payload: {
      todayImplementationTodoList: implementationTodoList,
      todayDueTodoList: dueTodoList,
      todayTodoListMessage: message,
    },
  };
};

export const FETCH_MONTH_TODO_LIST = 'FETCH_MONTH_TODO_LIST';
export const fetchMonthTodoListAction = (
  monthImplementationTodoList: TodoList,
  monthDueTodoList: TodoList,
  message: string
) => {
  return {
    type: FETCH_MONTH_TODO_LIST,
    payload: {
      monthImplementationTodoList: monthImplementationTodoList,
      monthDueTodoList: monthDueTodoList,
      monthTodoListMessage: message,
    },
  };
};

export const FETCH_EXPIRED_TODO_LIST = 'FETCH_EXPIRED_TODO_LIST';
export const fetchExpiredTodoListAction = (expiredTodoList: TodoList) => {
  return {
    type: FETCH_EXPIRED_TODO_LIST,
    payload: {
      expiredTodoList: expiredTodoList,
    },
  };
};

export const DELETE_TODO_LIST_ITEM = 'DELETE_TODO_LIST_ITEM';
export const deleteTodoListItemAction = (
  expiredTodoList: TodoList,
  todayImplementationTodoList: TodoList,
  todayDueTodoList: TodoList,
  monthImplementationTodoList: TodoList,
  monthDueTodoList: TodoList
) => {
  return {
    type: DELETE_TODO_LIST_ITEM,
    payload: {
      expiredTodoList: expiredTodoList,
      todayImplementationTodoList: todayImplementationTodoList,
      todayDueTodoList: todayDueTodoList,
      monthImplementationTodoList: monthImplementationTodoList,
      monthDueTodoList: monthDueTodoList,
    },
  };
};
