import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  addTodoListItemAction,
  cancelFetchExpiredTodoListAction,
  cancelFetchMonthlyTodoListAction,
  cancelFetchSearchTodoListAction,
  cancelFetchTodayTodoListAction,
  deleteSearchTodoListItemAction,
  deleteTodoListItemAction,
  editSearchTodoListItemAction,
  editTodoListItemAction,
  failedAddTodoListItemAction,
  failedDeleteSearchTodoListItemAction,
  failedDeleteTodoListItemAction,
  failedEditSearchTodoListItemAction,
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
  startDeleteSearchTodoListItemAction,
  startDeleteTodoListItemAction,
  startEditSearchTodoListItemAction,
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
  EditTodoListItemRes,
  FetchExpiredTodoListRes,
  FetchMonthlyTodoListRes,
  FetchSearchTodoListRes,
  FetchTodayTodoListRes,
  SearchTodoRequestData,
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
        {
          cancelToken: signal?.token,
        }
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
        {
          cancelToken: signal?.token,
        }
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

export const fetchSearchTodoList = (searchRequestData: {
  date_type: string;
  start_date: Date | null;
  end_date: Date | null;
  sort: string;
  sort_type: string;
  complete_flag?: boolean | string;
  todo_content?: string;
  limit?: string;
}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchSearchTodoListAction());

    try {
      const result = await todoServiceInstance.get<FetchSearchTodoListRes>(`/todo-list/search`, {
        params: {
          date_type: searchRequestData.date_type,
          start_date: dayjs(String(searchRequestData.start_date)).format(),
          end_date: dayjs(String(searchRequestData.end_date)).format(),
          complete_flag: searchRequestData.complete_flag,
          todo_content: searchRequestData.todo_content,
          sort: searchRequestData.sort,
          sort_type: searchRequestData.sort_type,
          limit: searchRequestData.limit,
        },
      });
      const searchTodoList: TodoList = result.data.message ? [] : result.data.search_todo_list;

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

export const editTodoListItem = (
  todoListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: EditTodoListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditTodoListItemAction());

    try {
      await todoServiceInstance.put<EditTodoListItemRes>(
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

      const fetchExpiredResult = todoServiceInstance.get<FetchExpiredTodoListRes>(
        `/todo-list/expired`
      );

      const fetchTodayResult = todoServiceInstance.get<FetchTodayTodoListRes>(
        `/todo-list/${year}-${month}-${date}`
      );

      const fetchMonthlyResult = todoServiceInstance.get<FetchMonthlyTodoListRes>(
        `/todo-list/${currentYear}-${currentMonth}`
      );

      const expiredResponse = await fetchExpiredResult;
      const todayResponse = await fetchTodayResult;
      const monthlyResponse = await fetchMonthlyResult;

      const expiredTodoList = expiredResponse.data.expired_todo_list;

      const todayMessage = todayResponse.data.message;
      const todayImplementationTodoList = todayMessage
        ? []
        : todayResponse.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : todayResponse.data.due_todo_list;

      const monthlyMessage = monthlyResponse.data.message;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : monthlyResponse.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : monthlyResponse.data.due_todo_list;

      dispatch(
        editTodoListItemAction(
          expiredTodoList,
          todayImplementationTodoList,
          todayDuesTodoList,
          monthlyImplementationTodoList,
          monthlyDuesTodoList
        )
      );
    } catch (error) {
      dispatch(
        failedEditTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const deleteTodoListItem = (
  todoListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTodoListItemAction());

    try {
      const deleteTodoListItemResult = await todoServiceInstance.delete<DeleteTodoListItemRes>(
        `/todo-list/${todoListItemId}`
      );

      const fetchExpiredResult = todoServiceInstance.get<FetchExpiredTodoListRes>(
        `/todo-list/expired`
      );

      const fetchTodayResult = todoServiceInstance.get<FetchTodayTodoListRes>(
        `/todo-list/${year}-${month}-${date}`
      );

      const fetchMonthlyResult = todoServiceInstance.get<FetchMonthlyTodoListRes>(
        `/todo-list/${currentYear}-${currentMonth}`
      );

      const expiredResponse = await fetchExpiredResult;
      const todayResponse = await fetchTodayResult;
      const monthlyResponse = await fetchMonthlyResult;

      const expiredTodoList = expiredResponse.data.expired_todo_list;

      const todayMessage = todayResponse.data.message;
      const todayImplementationTodoList = todayMessage
        ? []
        : todayResponse.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : todayResponse.data.due_todo_list;

      const monthlyMessage = monthlyResponse.data.message;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : monthlyResponse.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : monthlyResponse.data.due_todo_list;

      dispatch(
        deleteTodoListItemAction(
          expiredTodoList,
          todayImplementationTodoList,
          todayDuesTodoList,
          monthlyImplementationTodoList,
          monthlyDuesTodoList
        )
      );
      dispatch(openTextModalAction(deleteTodoListItemResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const editSearchTodoListItem = (
  todoListItemId: number,
  requestData: EditTodoListItemReq,
  searchRequestData: SearchTodoRequestData
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditSearchTodoListItemAction());

    try {
      await todoServiceInstance.put<EditTodoListItemRes>(
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

      const fetchSearchResult = await todoServiceInstance.get<FetchSearchTodoListRes>(
        `/todo-list/search`,
        {
          params: {
            date_type: searchRequestData.date_type,
            start_date: dayjs(String(searchRequestData.start_date)).format(),
            end_date: dayjs(String(searchRequestData.end_date)).format(),
            complete_flag: searchRequestData.complete_flag,
            todo_content: searchRequestData.todo_content,
            sort: searchRequestData.sort,
            sort_type: searchRequestData.sort_type,
            limit: searchRequestData.limit,
          },
        }
      );

      const searchTodoList = fetchSearchResult.data.message
        ? []
        : fetchSearchResult.data.search_todo_list;

      dispatch(editSearchTodoListItemAction(searchTodoList));
    } catch (error) {
      dispatch(
        failedEditSearchTodoListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const deleteSearchTodoListItem = (
  todoListItemId: number,
  searchRequestData: SearchTodoRequestData
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteSearchTodoListItemAction());

    try {
      const deleteTodoListItemResult = await todoServiceInstance.delete<DeleteTodoListItemRes>(
        `/todo-list/${todoListItemId}`
      );

      const fetchSearchResult = await todoServiceInstance.get<FetchSearchTodoListRes>(
        `/todo-list/search`,
        {
          params: {
            date_type: searchRequestData.date_type,
            start_date: dayjs(String(searchRequestData.start_date)).format(),
            end_date: dayjs(String(searchRequestData.end_date)).format(),
            complete_flag: searchRequestData.complete_flag,
            todo_content: searchRequestData.todo_content,
            sort: searchRequestData.sort,
            sort_type: searchRequestData.sort_type,
            limit: searchRequestData.limit,
          },
        }
      );

      const searchTodoList: TodoList = fetchSearchResult.data.message
        ? []
        : fetchSearchResult.data.search_todo_list;

      dispatch(deleteSearchTodoListItemAction(searchTodoList));
      dispatch(openTextModalAction(deleteTodoListItemResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteSearchTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
    }
  };
};
