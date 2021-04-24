import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  addTodoListItemAction,
  cancelFetchExpiredTodoListAction,
  cancelFetchMonthlyTodoListAction,
  cancelFetchSearchTodoListAction,
  cancelFetchTodayTodoListAction,
  deleteTodoListItemAction,
  editTodoListItemAction,
  failedAddTodoListItemAction,
  failedDeleteTodoListItemAction,
  failedEditTodoListItemAction,
  failedFetchExpiredTodoListAction,
  failedFetchMonthlyTodoListAction,
  failedFetchSearchTodoListAction,
  failedFetchTodayTodoListAction,
  fetchExpiredTodoListAction,
  fetchMonthlyTodoListAction,
  fetchSearchTodoListAction,
  fetchTodayTodoListAction,
  startAddTodoListItemAction,
  startDeleteTodoListItemAction,
  startEditTodoListItemAction,
  startFetchExpiredTodoListAction,
  startFetchMonthlyTodoListAction,
  startFetchSearchTodoListAction,
  startFetchTodayTodoListAction,
} from './actions';
import {
  AddTodoListItemReq,
  DeleteTodoListItemRes,
  EditTodoListItemReq,
  FetchExpiredTodoListRes,
  FetchMonthlyTodoListRes,
  FetchSearchTodoListReq,
  FetchSearchTodoListRes,
  FetchTodayTodoListRes,
  TodoList,
  TodoListItem,
} from './types';
import dayjs from 'dayjs';
import { openTextModalAction } from '../modal/actions';
import { todoServiceInstance } from '../axiosConfig';

export const fetchExpiredTodoList = (signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchExpiredTodoListAction());

    try {
      const result = await todoServiceInstance.get<FetchExpiredTodoListRes>(`/todo-list/expired`, {
        cancelToken: signal?.token,
      });
      const expiredTodoList: TodoList = result.data.expired_todo_list;

      dispatch(fetchExpiredTodoListAction(expiredTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchExpiredTodoListAction());
      } else {
        dispatch(
          failedFetchExpiredTodoListAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const fetchTodayTodoList = (
  year: string,
  month: string,
  date: string,
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchTodayTodoListAction());

    try {
      const result = await todoServiceInstance.get<FetchTodayTodoListRes>(
        `/todo-list/${year}-${month}-${date}`,
        { cancelToken: signal?.token }
      );
      const message = result.data.message;
      const implementationTodoList = message ? [] : result.data.implementation_todo_list;
      const dueTodoList = message ? [] : result.data.due_todo_list;

      dispatch(fetchTodayTodoListAction(implementationTodoList, dueTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchTodayTodoListAction());
      } else {
        dispatch(
          failedFetchTodayTodoListAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const fetchMonthlyTodoList = (year: string, month: string, signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchMonthlyTodoListAction());

    try {
      const result = await todoServiceInstance.get<FetchMonthlyTodoListRes>(
        `/todo-list/${year}-${month}`,
        { cancelToken: signal?.token }
      );
      const message = result.data.message;
      const monthlyImplementationTodoList = message ? [] : result.data.implementation_todo_list;
      const monthlyDueTodoList = message ? [] : result.data.due_todo_list;

      dispatch(fetchMonthlyTodoListAction(monthlyImplementationTodoList, monthlyDueTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchMonthlyTodoListAction());
      } else {
        dispatch(
          failedFetchMonthlyTodoListAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const fetchSearchTodoList = (requestData: FetchSearchTodoListReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchSearchTodoListAction());

    try {
      const res = await todoServiceInstance.get<FetchSearchTodoListRes>(`/todo-list/search`, {
        params: requestData,
      });
      const searchTodoList: TodoList = res.data.message ? [] : res.data.search_todo_list;

      dispatch(fetchSearchTodoListAction(searchTodoList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchSearchTodoListAction());
      } else {
        dispatch(
          failedFetchSearchTodoListAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const addTodoListItem = (requestData: AddTodoListItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddTodoListItemAction());

    try {
      const res = await todoServiceInstance.post<TodoListItem>(
        `/todo-list`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return dayjs(new Date(value)).format();
          } else if (key === 'due_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(addTodoListItemAction(res.data));
    } catch (error) {
      dispatch(
        failedAddTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const editTodoListItem = (todoListItemId: number, requestData: EditTodoListItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditTodoListItemAction());

    try {
      const res = await todoServiceInstance.put<TodoListItem>(
        `/todo-list/${todoListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return dayjs(new Date(value)).format();
          } else if (key === 'due_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(editTodoListItemAction(res.data));
    } catch (error) {
      dispatch(
        failedEditTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const deleteTodoListItem = (todoListItemId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTodoListItemAction());

    try {
      const res = await todoServiceInstance.delete<DeleteTodoListItemRes>(
        `/todo-list/${todoListItemId}`
      );

      dispatch(deleteTodoListItemAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};
