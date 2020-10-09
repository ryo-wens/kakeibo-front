import { TodoLists } from '../todoLists/types';
export type groupTodoListsActions = ReturnType<typeof createGroupTodoListItemAction>;

export const CREATE_GROUP_TODO_LIST_ITEM = 'CREATE_GROUP_TODO_LIST_ITEM';
export const createGroupTodoListItemAction = (
  implementationTodoLists: TodoLists,
  dueTodoLists: TodoLists
) => {
  return {
    type: CREATE_GROUP_TODO_LIST_ITEM,
    payload: {
      implementationTodoLists: implementationTodoLists,
      dueTodoLists: dueTodoLists,
    },
  };
};
