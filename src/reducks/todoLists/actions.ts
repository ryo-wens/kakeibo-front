import { TodoLists } from './types';
export type todoListsActions = ReturnType<
  | typeof createTodoListItemAction
  | typeof editTodoListItemAction
  | typeof fetchDateTodoListsAction
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
  implementationTodoLists: TodoLists,
  dueTodoLists: TodoLists
) => {
  return {
    type: EDIT_TODO_LIST_ITEM,
    payload: {
      todayImplementationTodoList: implementationTodoLists,
      todayDueTodoList: dueTodoLists,
    },
  };
};

export const FETCH_DATE_TODO_LISTS = 'FETCH_DATE_TODO_LISTS';
export const fetchDateTodoListsAction = (
  implementationTodoList: TodoLists,
  dueTodoList: TodoLists,
  message: string
) => {
  return {
    type: FETCH_DATE_TODO_LISTS,
    payload: {
      todayImplementationTodoList: implementationTodoList,
      todayDueTodoList: dueTodoList,
      message: message,
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
      message: message,
    },
  };
};

export const DELETE_TODO_LIST_ITEM = 'DELETE_TODO_LIST_ITEM';
export const deleteTodoListItemAction = (
  implementationTodoLists: TodoLists,
  dueTodoLists: TodoLists
) => {
  return {
    type: DELETE_TODO_LIST_ITEM,
    payload: {
      todayImplementationTodoList: implementationTodoLists,
      todayDueTodoList: dueTodoLists,
    },
  };
};
