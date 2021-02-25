import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import moment from 'moment';
import {
  GroupTodoList,
  FetchGroupTodayTodoListRes,
  FetchGroupMonthlyTodoListRes,
  FetchGroupExpiredTodoListRes,
  AddGroupTodoListItemRes,
  AddGroupTodoListItemReq,
  EditGroupTodoListItemRes,
  DeleteGroupTodoListItemRes,
  FetchGroupSearchTodoListRes,
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
import { EditTodoListItemReq, SearchTodoRequestData } from '../todoList/types';

export const fetchGroupExpiredTodoList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupExpiredTodoListAction());

    try {
      const result = await axios.get<FetchGroupExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
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
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTodayTodoListAction());

    try {
      const result = await axios.get<FetchGroupTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
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
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupMonthlyTodoListAction());

    try {
      const result = await axios.get<FetchGroupMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
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

export const fetchGroupSearchTodoList = (
  groupId: number,
  searchGroupRequestData: {
    date_type: string;
    start_date: Date | null;
    end_date: Date | null;
    sort: string;
    sort_type: string;
    complete_flag?: boolean | string;
    todo_content?: string;
    limit?: string;
  }
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupSearchTodoListAction());

    try {
      const result = await axios.get<FetchGroupSearchTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/search`,
        {
          withCredentials: true,
          params: {
            date_type: searchGroupRequestData.date_type,
            start_date: moment(searchGroupRequestData.start_date).format(),
            end_date: moment(searchGroupRequestData.end_date).format(),
            complete_flag: searchGroupRequestData.complete_flag,
            todo_content: searchGroupRequestData.todo_content,
            sort: searchGroupRequestData.sort,
            sort_type: searchGroupRequestData.sort_type,
            limit: searchGroupRequestData.limit,
          },
        }
      );
      const searchTodoList: GroupTodoList = result.data.message ? [] : result.data.search_todo_list;

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

export const addGroupTodoListItem = (
  groupId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: AddGroupTodoListItemReq,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupTodoListItemAction());

    try {
      await axios.post<AddGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list`,
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

      const fetchExpiredResult = await axios.get<FetchGroupExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchTodayResult = await axios.get<FetchGroupTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchMonthlyResult = await axios.get<FetchGroupMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${currentYear}-${currentMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const todayMessage = fetchTodayResult.data.message;
      const monthlyMessage = fetchMonthlyResult.data.message;

      const expiredTodoList = fetchExpiredResult.data.expired_group_todo_list;
      const todayImplementationTodoList = todayMessage
        ? []
        : fetchTodayResult.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : fetchTodayResult.data.due_todo_list;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : fetchMonthlyResult.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : fetchMonthlyResult.data.due_todo_list;

      dispatch(
        addGroupTodoListItemAction(
          expiredTodoList,
          todayImplementationTodoList,
          todayDuesTodoList,
          monthlyImplementationTodoList,
          monthlyDuesTodoList
        )
      );
    } catch (error) {
      dispatch(
        failedAddGroupTodoListItemAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editGroupTodoListItem = (
  groupId: number,
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
    dispatch(startEditGroupTodoListItemAction());

    try {
      await axios.put<EditGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
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

      const fetchExpiredResult = await axios.get<FetchGroupExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchTodayResult = await axios.get<FetchGroupTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchMonthlyResult = await axios.get<FetchGroupMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${currentYear}-${currentMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const todayMessage = fetchTodayResult.data.message;
      const monthlyMessage = fetchMonthlyResult.data.message;

      const expiredTodoList = fetchExpiredResult.data.expired_group_todo_list;
      const todayImplementationTodoList = todayMessage
        ? []
        : fetchTodayResult.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : fetchTodayResult.data.due_todo_list;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : fetchMonthlyResult.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : fetchMonthlyResult.data.due_todo_list;

      dispatch(
        editGroupTodoListItemAction(
          expiredTodoList,
          todayImplementationTodoList,
          todayDuesTodoList,
          monthlyImplementationTodoList,
          monthlyDuesTodoList
        )
      );
    } catch (error) {
      dispatch(
        failedEditGroupTodoListItemAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const deleteGroupTodoListItem = (
  groupId: number,
  todoListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupTodoListItemAction());

    try {
      const deleteTodoListItemResult = await axios.delete<DeleteGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      );

      const fetchExpiredResult = await axios.get<FetchGroupExpiredTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchTodayResult = await axios.get<FetchGroupTodayTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${year}-${month}-${date}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchMonthlyResult = await axios.get<FetchGroupMonthlyTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${currentYear}-${currentMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const todayMessage = fetchTodayResult.data.message;
      const monthlyMessage = fetchMonthlyResult.data.message;

      const expiredTodoList = fetchExpiredResult.data.expired_group_todo_list;
      const todayImplementationTodoList = todayMessage
        ? []
        : fetchTodayResult.data.implementation_todo_list;
      const todayDuesTodoList = todayMessage ? [] : fetchTodayResult.data.due_todo_list;
      const monthlyImplementationTodoList = monthlyMessage
        ? []
        : fetchMonthlyResult.data.implementation_todo_list;
      const monthlyDuesTodoList = monthlyMessage ? [] : fetchMonthlyResult.data.due_todo_list;

      dispatch(
        deleteGroupTodoListItemAction(
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
        failedDeleteGroupTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const editGroupSearchTodoListItem = (
  groupId: number,
  todoListItemId: number,
  requestData: EditTodoListItemReq,
  searchRequestData: SearchTodoRequestData
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditGroupSearchTodoListItemAction());

    try {
      await axios.put<EditGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
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

      const fetchSearchResult = await axios.get<FetchGroupSearchTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/search`,
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

      dispatch(editGroupSearchTodoListItemAction(searchTodoList));
    } catch (error) {
      dispatch(
        failedEditGroupSearchTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const deleteGroupSearchTodoListItem = (
  groupId: number,
  todoListItemId: number,
  searchRequestData: SearchTodoRequestData
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupSearchTodoListItemAction());

    try {
      const deleteTodoListItemResult = await axios.delete<DeleteGroupTodoListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/${todoListItemId}`,
        {
          withCredentials: true,
        }
      );

      const fetchSearchResult = await axios.get<FetchGroupSearchTodoListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/todo-list/search`,
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

      dispatch(deleteGroupSearchTodoListItemAction(fetchSearchResult.data.search_todo_list));
      dispatch(openTextModalAction(deleteTodoListItemResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteGroupSearchTodoListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
