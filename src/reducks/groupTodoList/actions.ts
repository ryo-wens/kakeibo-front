import { GroupTodoList } from './types';
export type groupTodoListsActions = ReturnType<
  | typeof createGroupTodoListItemAction
  | typeof editGroupTodoListItemAction
  | typeof fetchGroupTodayTodoListAction
  | typeof fetchGroupMonthTodoListAction
  | typeof groupSearchTodoListAction
>;

export const CREATE_GROUP_TODO_LIST_ITEM = 'CREATE_GROUP_TODO_LIST_ITEM';
export const createGroupTodoListItemAction = (
  groupExpiredTodoList: GroupTodoList,
  groupTodayImplementationTodoList: GroupTodoList,
  groupTodayDueTodoList: GroupTodoList,
  groupMonthImplementationTodoList: GroupTodoList,
  groupMonthDueTodoList: GroupTodoList
) => {
  return {
    type: CREATE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoList: groupExpiredTodoList,
      groupTodayImplementationTodoList: groupTodayImplementationTodoList,
      groupTodayDueTodoList: groupTodayDueTodoList,
      groupMonthImplementationTodoList: groupMonthImplementationTodoList,
      groupMonthDueTodoList: groupMonthDueTodoList,
    },
  };
};

export const EDIT_GROUP_TODO_LIST_ITEM = 'EDIT_GROUP_TODO_LIST_ITEM';
export const editGroupTodoListItemAction = (
  groupExpiredTodoList: GroupTodoList,
  groupTodayImplementationTodoList: GroupTodoList,
  groupTodayDueTodoList: GroupTodoList,
  groupMonthImplementationTodoList: GroupTodoList,
  groupMonthDueTodoList: GroupTodoList
) => {
  return {
    type: EDIT_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoList: groupExpiredTodoList,
      groupTodayImplementationTodoList: groupTodayImplementationTodoList,
      groupTodayDueTodoList: groupTodayDueTodoList,
      groupMonthImplementationTodoList: groupMonthImplementationTodoList,
      groupMonthDueTodoList: groupMonthDueTodoList,
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

export const FETCH_GROUP_MONTH_TODO_LIST = 'FETCH_GROUP_MONTH_TODO_LIST';
export const fetchGroupMonthTodoListAction = (
  groupMonthImplementationTodoList: GroupTodoList,
  groupMonthDueTodoList: GroupTodoList,
  message: string
) => {
  return {
    type: FETCH_GROUP_MONTH_TODO_LIST,
    payload: {
      groupMonthImplementationTodoList: groupMonthImplementationTodoList,
      groupMonthDueTodoList: groupMonthDueTodoList,
      groupMonthTodoListMessage: message,
    },
  };
};

export const FETCH_GROUP_EXPIRED_TODO_LIST = 'FETCH_GROUP_EXPIRED_TODO_LIST';
export const fetchGroupExpiredTodoListAction = (groupExpiredTodoList: GroupTodoList) => {
  return {
    type: FETCH_GROUP_EXPIRED_TODO_LIST,
    payload: {
      groupExpiredTodoList: groupExpiredTodoList,
    },
  };
};

export const DELETE_GROUP_TODO_LIST_ITEM = 'DELETE_GROUP_TODO_LIST_ITEM';
export const deleteGroupTodoListItemAction = (
  groupExpiredTodoList: GroupTodoList,
  groupTodayImplementationTodoList: GroupTodoList,
  groupTodayDueTodoList: GroupTodoList,
  groupMonthImplementationTodoList: GroupTodoList,
  groupMonthDueTodoList: GroupTodoList
) => {
  return {
    type: DELETE_GROUP_TODO_LIST_ITEM,
    payload: {
      groupExpiredTodoList: groupExpiredTodoList,
      groupTodayImplementationTodoList: groupTodayImplementationTodoList,
      groupTodayDueTodoList: groupTodayDueTodoList,
      groupMonthImplementationTodoList: groupMonthImplementationTodoList,
      groupMonthDueTodoList: groupMonthDueTodoList,
    },
  };
};

export const SEARCH_GROUP_TODO_LIST = 'SEARCH_GROUP_TODO_LIST';
export const groupSearchTodoListAction = (
  groupSearchTodoList: GroupTodoList,
  groupSearchTodoListMessage: string
) => {
  return {
    type: SEARCH_GROUP_TODO_LIST,
    payload: {
      groupSearchTodoList: groupSearchTodoList,
      groupSearchTodoListMessage: groupSearchTodoListMessage,
    },
  };
};
