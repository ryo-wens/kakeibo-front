import { TodoLists } from './types';
export type todoListsActions = ReturnType<
  | typeof createTodoListItemAction
  | typeof editTodoListItemAction
  | typeof fetchDateTodoListAction
  | typeof fetchMonthTodoListAction
  | typeof deleteTodoListItemAction
>;

export const CREATE_TODO_LIST_ITEM = 'CREATE_TODO_LIST_ITEM';
export const createTodoListItemAction = (
  todayImplementationTodoList: TodoLists,
  todayDueTodoList: TodoLists,
  monthImplementationTodoList: TodoLists,
  monthDueTodoList: TodoLists
) => {
  return {
    type: CREATE_TODO_LIST_ITEM,
    payload: {
      todayImplementationTodoList: todayImplementationTodoList,
      todayDueTodoList: todayDueTodoList,
      monthImplementationTodoList: monthImplementationTodoList,
      monthDueTodoList: monthDueTodoList,
    },
  };
};

export const EDIT_TODO_LIST_ITEM = 'EDIT_TODO_LIST_ITEM';
export const editTodoListItemAction = (
  todayImplementationTodoList: TodoLists,
  todayDueTodoList: TodoLists,
  monthImplementationTodoList: TodoLists,
  monthDueTodoList: TodoLists
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
  implementationTodoList: TodoLists,
  dueTodoList: TodoLists,
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
  monthImplementationTodoList: TodoLists,
  monthDueTodoList: TodoLists,
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

export const DELETE_TODO_LIST_ITEM = 'DELETE_TODO_LIST_ITEM';
export const deleteTodoListItemAction = (
  todayImplementationTodoList: TodoLists,
  todayDueTodoList: TodoLists,
  monthImplementationTodoList: TodoLists,
  monthDueTodoList: TodoLists
) => {
  return {
    type: DELETE_TODO_LIST_ITEM,
    payload: {
      todayImplementationTodoList: todayImplementationTodoList,
      todayDueTodoList: todayDueTodoList,
      monthImplementationTodoList: monthImplementationTodoList,
      monthDueTodoList: monthDueTodoList,
    },
  };
};
