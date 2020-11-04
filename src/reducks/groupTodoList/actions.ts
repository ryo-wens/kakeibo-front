import { GroupTodoList } from './types';
export type groupTodoListsActions = ReturnType<
  | typeof createGroupTodoListItemAction
  | typeof editGroupTodoListItemAction
  | typeof fetchGroupTodayTodoListAction
  | typeof fetchGroupMonthTodoListsAction
>;

export const CREATE_GROUP_TODO_LIST_ITEM = 'CREATE_GROUP_TODO_LIST_ITEM';
export const createGroupTodoListItemAction = (
  groupImplementationTodoLists: GroupTodoList,
  groupDueTodoLists: GroupTodoList
) => {
  return {
    type: CREATE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupImplementationTodoLists: groupImplementationTodoLists,
      groupDueTodoLists: groupDueTodoLists,
    },
  };
};

export const EDIT_GROUP_TODO_LIST_ITEM = 'EDIT_GROUP_TODO_LIST_ITEM';
export const editGroupTodoListItemAction = (
  groupImplementationTodoLists: GroupTodoList,
  groupDueTodoLists: GroupTodoList
) => {
  return {
    type: EDIT_GROUP_TODO_LIST_ITEM,
    payload: {
      groupImplementationTodoLists: groupImplementationTodoLists,
      groupDueTodoLists: groupDueTodoLists,
    },
  };
};

export const FETCH_GROUP_TODAY_TODO_LIST = 'FETCH_GROUP_TODAY_TODO_LIST';
export const fetchGroupTodayTodoListAction = (
  groupTodayImplementationTodoList: GroupTodoList,
  groupTodayDueTodoList: GroupTodoList,
  message: string
) => {
  return {
    type: FETCH_GROUP_TODAY_TODO_LIST,
    payload: {
      groupTodayImplementationTodoList: groupTodayImplementationTodoList,
      groupTodayDueTodoList: groupTodayDueTodoList,
      groupTodayTodoListMessage: message,
    },
  };
};

export const FETCH_GROUP_MONTH_TODO_LISTS = 'FETCH_GROUP_MONTH_TODO_LISTS';
export const fetchGroupMonthTodoListsAction = (
  groupImplementationTodoLists: GroupTodoList,
  groupDueTodoLists: GroupTodoList,
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

export const DELETE_GROUP_TODO_LIST_ITEM = 'DELETE_GROUP_TODO_LIST_ITEM';
export const deleteGroupTodoListItemAction = (
  groupImplementationTodoLists: GroupTodoList,
  groupDueTodoLists: GroupTodoList
) => {
  return {
    type: DELETE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupImplementationTodoLists: groupImplementationTodoLists,
      groupDueTodoLists: groupDueTodoLists,
    },
  };
};
