import { TodoLists } from './types';
export type todoListsActions = ReturnType<typeof createTodoListItemAction>;

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
