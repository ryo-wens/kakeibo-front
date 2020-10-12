import { GroupTodoLists } from './types';
export type groupTodoListsActions = ReturnType<
  | typeof createGroupTodoListItemAction
  | typeof fetchGroupDateTodoListsAction
  | typeof fetchGroupMonthTodoListsAction
>;

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

export const FETCH_GROUP_DATE_TODO_LISTS = 'FETCH_GROUP_DATE_TODO_LISTS';
export const fetchGroupDateTodoListsAction = (
  groupImplementationTodoLists: GroupTodoLists,
  groupDueTodoLists: GroupTodoLists,
  message: string
) => {
  return {
    type: FETCH_GROUP_DATE_TODO_LISTS,
    payload: {
      groupImplementationTodoLists: groupImplementationTodoLists,
      groupDueTodoLists: groupDueTodoLists,
      message: message,
    },
  };
};

export const FETCH_GROUP_MONTH_TODO_LISTS = 'FETCH_GROUP_MONTH_TODO_LISTS';
export const fetchGroupMonthTodoListsAction = (
  groupImplementationTodoLists: GroupTodoLists,
  groupDueTodoLists: GroupTodoLists,
  message: string
) => {
  return {
    type: FETCH_GROUP_MONTH_TODO_LISTS,
    payload: {
      groupImplementationTodoLists: groupImplementationTodoLists,
      groupDueTodoLists: groupDueTodoLists,
      message: message,
    },
  };
};
