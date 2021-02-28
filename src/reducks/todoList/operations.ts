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
  AddTodoListItemRes,
  DeleteTodoListItemRes,
  EditTodoListItemReq,
  EditTodoListItemRes,
  FetchExpiredTodoListRes,
  FetchMonthlyTodoListRes,
  FetchSearchTodoListRes,
  FetchTodayTodoListRes,
  SearchTodoRequestData,
  TodoList,
} from './types';
import moment from 'moment';
import { openTextModalAction } from '../modal/actions';

export const fetchExpiredTodoList = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchExpiredTodoListAction());

    try {
      const result = await axios.get<FetchExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
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
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchTodayTodoListAction());

    try {
      const result = await axios.get<FetchTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
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

export const fetchMonthlyTodoList = (year: string, month: string, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchMonthlyTodoListAction());

    try {
      const result = await axios.get<FetchMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
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
      const result = await axios.get<FetchSearchTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`,
        {
          withCredentials: true,
          params: {
            date_type: searchRequestData.date_type,
            start_date: moment(searchRequestData.start_date).format(),
            end_date: moment(searchRequestData.end_date).format(),
            complete_flag: searchRequestData.complete_flag,
            todo_content: searchRequestData.todo_content,
            sort: searchRequestData.sort,
            sort_type: searchRequestData.sort_type,
            limit: searchRequestData.limit,
          },
        }
      );
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

export const addTodoListItem = (
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: AddTodoListItemReq,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddTodoListItemAction());

    try {
      await axios.post<AddTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return moment(new Date(value)).format();
          } else if (key === 'due_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchExpiredResult = await axios.get<FetchExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchTodayResult = await axios.get<FetchTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchMonthlyResult = await axios.get<FetchMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${currentYear}-${currentMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const todayMessage = fetchTodayResult.data.message;
      const monthlyMessage = fetchMonthlyResult.data.message;

      const expiredTodoList = fetchExpiredResult.data.expired_todo_list;
      const todayImplementationTodoList = todayMessage
        ? []
        : fetchTodayResult.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : fetchTodayResult.data.due_todo_list;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : fetchMonthlyResult.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : fetchMonthlyResult.data.due_todo_list;

      dispatch(
        addTodoListItemAction(
          expiredTodoList,
          todayImplementationTodoList,
          todayDuesTodoList,
          monthlyImplementationTodoList,
          monthlyDuesTodoList
        )
      );
    } catch (error) {
      dispatch(
        failedAddTodoListItemAction(error.response.status, error.response.data.error.message)
      );
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
  requestData: EditTodoListItemReq,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditTodoListItemAction());

    try {
      await axios.put<EditTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return moment(new Date(value)).format();
          } else if (key === 'due_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchExpiredResult = await axios.get<FetchExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchTodayResult = await axios.get<FetchTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchMonthlyResult = await axios.get<FetchMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${currentYear}-${currentMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const todayMessage = fetchTodayResult.data.message;
      const monthlyMessage = fetchMonthlyResult.data.message;

      const expiredTodoList = fetchExpiredResult.data.expired_todo_list;
      const todayImplementationTodoList = todayMessage
        ? []
        : fetchTodayResult.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : fetchTodayResult.data.due_todo_list;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : fetchMonthlyResult.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : fetchMonthlyResult.data.due_todo_list;

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
    }
  };
};

export const deleteTodoListItem = (
  todoListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTodoListItemAction());

    try {
      const deleteTodoListItemResult = await axios.delete<DeleteTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      );

      const fetchExpiredResult = await axios.get<FetchExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchTodayResult = await axios.get<FetchTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchMonthlyResult = await axios.get<FetchMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${currentYear}-${currentMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const todayMessage = fetchTodayResult.data.message;
      const monthlyMessage = fetchMonthlyResult.data.message;

      const expiredTodoList = fetchExpiredResult.data.expired_todo_list;
      const todayImplementationTodoList = todayMessage
        ? []
        : fetchTodayResult.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : fetchTodayResult.data.due_todo_list;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : fetchMonthlyResult.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : fetchMonthlyResult.data.due_todo_list;

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
      await axios.put<EditTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'implementation_date') {
            return moment(new Date(value)).format();
          } else if (key === 'due_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchSearchResult = await axios.get<FetchSearchTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`,
        {
          withCredentials: true,
          params: {
            date_type: searchRequestData.date_type,
            start_date: moment(searchRequestData.start_date).format(),
            end_date: moment(searchRequestData.end_date).format(),
            complete_flag: searchRequestData.complete_flag,
            todo_content: searchRequestData.todo_content,
            sort: searchRequestData.sort,
            sort_type: searchRequestData.sort_type,
            limit: searchRequestData.limit,
          },
        }
      );

      const message = fetchSearchResult.data.message;
      const searchTodoList = message ? [] : fetchSearchResult.data.search_todo_list;

      dispatch(editSearchTodoListItemAction(searchTodoList));
    } catch (error) {
      dispatch(
        failedEditSearchTodoListItemAction(error.response.status, error.response.data.error.message)
      );
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
      const deleteTodoListItemResult = await axios.delete<DeleteTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      );

      const fetchSearchResult = await axios.get<FetchSearchTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`,
        {
          withCredentials: true,
          params: {
            date_type: searchRequestData.date_type,
            start_date: moment(searchRequestData.start_date).format(),
            end_date: moment(searchRequestData.end_date).format(),
            complete_flag: searchRequestData.complete_flag,
            todo_content: searchRequestData.todo_content,
            sort: searchRequestData.sort,
            sort_type: searchRequestData.sort_type,
            limit: searchRequestData.limit,
          },
        }
      );

      dispatch(deleteSearchTodoListItemAction(fetchSearchResult.data.search_todo_list));
      dispatch(openTextModalAction(deleteTodoListItemResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteSearchTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
