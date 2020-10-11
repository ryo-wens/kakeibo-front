import { GroupTodoLists } from './types';
export type groupTodoListsActions = ReturnType<typeof createGroupTodoListItemAction>;

export const CREATE_GROUP_TODO_LIST_ITEM = 'CREATE_GROUP_TODO_LIST_ITEM';
export const createGroupTodoListItemAction = (
  groupImplementationTodoLists: GroupTodoLists,
  groupDueTodoLists: GroupTodoLists
) => {
  return {
    type: CREATE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupImplementationTodoLists: groupImplementationTodoLists,
      groupDueTodoLists: groupDueTodoLists,
    },
  };
};
