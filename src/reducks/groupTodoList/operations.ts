import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import dayjs from 'dayjs';
import {
  GroupTodoList,
  FetchGroupTodayTodoListRes,
  FetchGroupMonthlyTodoListRes,
  FetchGroupExpiredTodoListRes,
  AddGroupTodoListItemReq,
  EditGroupTodoListItemRes,
  DeleteGroupTodoListItemRes,
  FetchGroupSearchTodoListRes,
  GroupTodoListItem,
} from './types';
import {
  addGroupTodoListItemAction,
  deleteGroupTodoListItemAction,
  editGroupTodoListItemAction,
  fetchGroupTodayTodoListAction,
  fetchGroupMonthlyTodoListAction,
  fetchGroupExpiredTodoListAction,
  fetchGroupSearchTodoListAction,
  startFetchGroupExpiredTodoListAction,
  failedFetchGroupExpiredTodoListAction,
  cancelFetchGroupExpiredTodoListAction,
  startFetchGroupTodayTodoListAction,
  cancelFetchGroupTodayTodoListAction,
  failedFetchGroupTodayTodoListAction,
  startFetchGroupMonthlyTodoListAction,
  cancelFetchGroupMonthlyTodoListAction,
  failedFetchGroupMonthlyTodoListAction,
  startAddGroupTodoListItemAction,
  failedAddGroupTodoListItemAction,
  failedEditGroupTodoListItemAction,
  failedDeleteGroupTodoListItemAction,
  failedEditGroupSearchTodoListItemAction,
  editGroupSearchTodoListItemAction,
  startEditGroupSearchTodoListItemAction,
  startDeleteGroupSearchTodoListItemAction,
  failedDeleteGroupSearchTodoListItemAction,
  deleteGroupSearchTodoListItemAction,
  startFetchGroupSearchTodoListAction,
  cancelFetchGroupSearchTodoListAction,
  failedFetchGroupSearchTodoListAction,
  startEditGroupTodoListItemAction,
  startDeleteGroupTodoListItemAction,
} from './actions';
import { openTextModalAction } from '../modal/actions';
import { EditTodoListItemReq, FetchSearchTodoListReq } from '../todoList/types';
import { todoServiceInstance } from '../axiosConfig';

export const fetchGroupExpiredTodoList = (groupId: number, signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupExpiredTodoListAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupExpiredTodoListRes>(
        `/groups/${groupId}/todo-list/expired`,
        { cancelToken: signal?.token }
      );
      const groupExpiredTodoList: GroupTodoList = result.data.expired_group_todo_list;

      dispatch(fetchGroupExpiredTodoListAction(groupExpiredTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupExpiredTodoListAction());
      } else {
        dispatch(
          failedFetchGroupExpiredTodoListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchGroupTodayTodoList = (
  groupId: number,
  year: string,
  month: string,
  date: string,
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTodayTodoListAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupTodayTodoListRes>(
        `/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        { cancelToken: signal?.token }
      );

      const message = result.data.message;
      const implementationTodoList = message ? [] : result.data.implementation_todo_list;
      const dueTodoList = message ? [] : result.data.due_todo_list;

      dispatch(fetchGroupTodayTodoListAction(implementationTodoList, dueTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupTodayTodoListAction());
      } else {
        dispatch(
          failedFetchGroupTodayTodoListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchGroupMonthlyTodoList = (
  groupId: number,
  year: string,
  month: string,
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupMonthlyTodoListAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupMonthlyTodoListRes>(
        `/groups/${groupId}/todo-list/${year}-${month}`,
        { cancelToken: signal?.token }
      );

      const message = result.data.message;
      const monthlyImplementationTodoList = message ? [] : result.data.implementation_todo_list;
      const monthlyDueTodoList = message ? [] : result.data.due_todo_list;

      dispatch(fetchGroupMonthlyTodoListAction(monthlyImplementationTodoList, monthlyDueTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupMonthlyTodoListAction());
      } else {
        dispatch(
          failedFetchGroupMonthlyTodoListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchGroupSearchTodoList = (groupId: number, requestData: FetchSearchTodoListReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupSearchTodoListAction());

    try {
      const res = await todoServiceInstance.get<FetchGroupSearchTodoListRes>(
        `/groups/${groupId}/todo-list/search`,
        { params: requestData }
      );
      const searchTodoList: GroupTodoList = res.data.message ? [] : res.data.search_todo_list;

      dispatch(fetchGroupSearchTodoListAction(searchTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupSearchTodoListAction());
      } else {
        dispatch(
          failedFetchGroupSearchTodoListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addGroupTodoListItem = (groupId: number, requestData: AddGroupTodoListItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupTodoListItemAction());

    try {
      const res = await todoServiceInstance.post<GroupTodoListItem>(
        `/groups/${groupId}/todo-list`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return dayjs(new Date(value)).format();
          } else if (key === 'due_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(addGroupTodoListItemAction(res.data));
    } catch (error) {
      dispatch(
        failedAddGroupTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const editGroupTodoListItem = (
  groupId: number,
  todoListItemId: number,
  requestData: EditTodoListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditGroupTodoListItemAction());

    try {
      const res = await todoServiceInstance.put<GroupTodoListItem>(
        `/groups/${groupId}/todo-list/${todoListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return dayjs(new Date(value)).format();
          } else if (key === 'due_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(editGroupTodoListItemAction(res.data));
    } catch (error) {
      dispatch(
        failedEditGroupTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const deleteGroupTodoListItem = (groupId: number, todoListItemId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupTodoListItemAction());

    try {
      const res = await todoServiceInstance.delete<DeleteGroupTodoListItemRes>(
        `/groups/${groupId}/todo-list/${todoListItemId}`
      );

      dispatch(deleteGroupTodoListItemAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedDeleteGroupTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
    }
  };
};

export const editGroupSearchTodoListItem = (
  groupId: number,
  todoListItemId: number,
  requestData: EditTodoListItemReq,
  searchRequestData: FetchSearchTodoListReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditGroupSearchTodoListItemAction());

    try {
      await todoServiceInstance.put<EditGroupTodoListItemRes>(
        `/groups/${groupId}/todo-list/${todoListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return dayjs(new Date(value)).format();
          } else if (key === 'due_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchSearchResult = await todoServiceInstance.get<FetchGroupSearchTodoListRes>(
        `/groups/${groupId}/todo-list/search`,
        { params: searchRequestData }
      );

      const searchTodoList = fetchSearchResult.data.message
        ? []
        : fetchSearchResult.data.search_todo_list;

      dispatch(editGroupSearchTodoListItemAction(searchTodoList));
    } catch (error) {
      dispatch(
        failedEditGroupSearchTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
    }
  };
};

export const deleteGroupSearchTodoListItem = (
  groupId: number,
  todoListItemId: number,
  searchRequestData: FetchSearchTodoListReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupSearchTodoListItemAction());

    try {
      const deleteTodoListItemResult = await todoServiceInstance.delete<DeleteGroupTodoListItemRes>(
        `/groups/${groupId}/todo-list/${todoListItemId}`
      );

      const fetchSearchResult = await todoServiceInstance.get<FetchGroupSearchTodoListRes>(
        `/groups/${groupId}/todo-list/search`,
        { params: searchRequestData }
      );

      const searchTodoList = fetchSearchResult.data.message
        ? []
        : fetchSearchResult.data.search_todo_list;

      dispatch(deleteGroupSearchTodoListItemAction(searchTodoList));
      dispatch(openTextModalAction(deleteTodoListItemResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteGroupSearchTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
    }
  };
};
