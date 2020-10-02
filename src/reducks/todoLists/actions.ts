import { TodoLists } from './types';
export type todoListsActions = ReturnType<
  | typeof createTodoListItemAction
  | typeof editTodoListAction
  | typeof fetchDateTodoListsAction
  | typeof fetchMonthTodoListsAction
>;

export const CREATE_TODO_LIST_ITEM = 'CREATE_TODO_LIST_ITEM';
export const createTodoListItemAction = (
  implementationTodoLists: TodoLists,
  dueTodoLists: TodoLists
) => {
  return {
    type: CREATE_TODO_LIST_ITEM,
    payload: {
      implementationTodoLists: implementationTodoLists,
      dueTodoLists: dueTodoLists,
    },
  };
};

export const EDIT_TODO_LIST = 'EDIT_TODO_LIST';
export const editTodoListAction = (implementationTodoLists: TodoLists, dueTodoLists: TodoLists) => {
  return {
    type: EDIT_TODO_LIST,
    payload: {
      implementationTodoLists: implementationTodoLists,
      dueTodoLists: dueTodoLists,
    },
  };
};

export const FETCH_DATE_TODO_LISTS = 'FETCH_DATE_TODO_LISTS';
export const fetchDateTodoListsAction = (
  implementationTodoLists: TodoLists,
  dueTodoLists: TodoLists,
  message: string
) => {
  return {
    type: FETCH_DATE_TODO_LISTS,
    payload: {
      implementationTodoLists: implementationTodoLists,
      dueTodoLists: dueTodoLists,
      message: message,
    },
  };
};

export const FETCH_MONTH_TODO_LISTS = 'FETCH_MONTH_TODO_LISTS';
export const fetchMonthTodoListsAction = (
  implementationTodoLists: TodoLists,
  dueTodoLists: TodoLists,
  message: string
) => {
  return {
    type: FETCH_MONTH_TODO_LISTS,
    payload: {
      implementationTodoLists: implementationTodoLists,
      dueTodoLists: dueTodoLists,
      message: message,
    },
  };
};
