import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import {
  AddGroupTaskUsersReq,
  AddGroupTaskUsersRes,
  AddTaskItemReq,
  AddTaskItemRes,
  DeleteGroupTaskUsersReq,
  DeleteGroupTaskUsersRes,
  DeleteTaskItemRes,
  EditTaskItemReq,
  EditTaskItemRes,
  FetchGroupTaskListForEachUserRes,
  FetchGroupTaskListRes,
  GroupTaskList,
  GroupTaskListForEachUser,
} from './types';
import {
  addTaskUsersAction,
  addTaskItemAction,
  cancelFetchGroupTaskListAction,
  cancelFetchGroupTaskListForEachUserAction,
  deleteTaskUsersAction,
  deleteTaskItemAction,
  editTaskItemAction,
  failedAddTaskUsersAction,
  failedAddTaskItemAction,
  failedDeleteTaskUsersAction,
  failedDeleteTaskItemAction,
  failedEditTaskItemAction,
  failedFetchGroupTaskListAction,
  failedFetchGroupTaskListForEachUserAction,
  fetchGroupTaskListAction,
  fetchGroupTaskListForEachUserAction,
  startAddTaskUsersAction,
  startAddTaskItemAction,
  startDeleteTaskUsersAction,
  startDeleteTaskItemAction,
  startEditTaskItemAction,
  startFetchGroupTaskListAction,
  startFetchGroupTaskListForEachUserAction,
} from './actions';
import { openTextModalAction } from '../modal/actions';
import moment from 'moment';

export const fetchGroupTaskListForEachUser = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTaskListForEachUserAction());

    try {
      const fetchResult = await axios.get<FetchGroupTaskListForEachUserRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        { cancelToken: signal.token, withCredentials: true }
      );

      const groupTasksListForEachUser: GroupTaskListForEachUser =
        fetchResult.data.group_tasks_list_for_each_user;

      dispatch(fetchGroupTaskListForEachUserAction(groupTasksListForEachUser));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupTaskListForEachUserAction());
      } else {
        dispatch(
          failedFetchGroupTaskListForEachUserAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addTaskUsers = (groupId: number, requestData: AddGroupTaskUsersReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddTaskUsersAction());

    try {
      await axios.post<AddGroupTaskUsersRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        JSON.stringify(requestData),
        { withCredentials: true }
      );

      const fetchGroupTaskListForEachUserResult = await axios.get<FetchGroupTaskListForEachUserRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        { withCredentials: true }
      );

      const nextGroupTaskListForEachUser: GroupTaskListForEachUser =
        fetchGroupTaskListForEachUserResult.data.group_tasks_list_for_each_user;

      dispatch(addTaskUsersAction(nextGroupTaskListForEachUser));
    } catch (error) {
      dispatch(failedAddTaskUsersAction(error.response.status, error.response.data.error.message));
      throw error.response.data.error.message;
    }
  };
};

export const deleteTaskUsers = (groupId: number, requestData: DeleteGroupTaskUsersReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTaskUsersAction());

    try {
      const deleteResult = await axios.delete<DeleteGroupTaskUsersRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        { data: JSON.stringify(requestData), withCredentials: true }
      );

      const fetchGroupTaskListForEachUserResult = await axios.get<FetchGroupTaskListForEachUserRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        { withCredentials: true }
      );

      const nextGroupTaskListForEachUser: GroupTaskListForEachUser =
        fetchGroupTaskListForEachUserResult.data.group_tasks_list_for_each_user;

      dispatch(deleteTaskUsersAction(nextGroupTaskListForEachUser));
      dispatch(openTextModalAction(deleteResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTaskUsersAction(error.response.status, error.response.data.error.message)
      );
      throw error.response.data.error.message;
    }
  };
};

export const fetchGroupTaskList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTaskListAction());

    try {
      const fetchResult = await axios.get<FetchGroupTaskListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`,
        { cancelToken: signal.token, withCredentials: true }
      );

      const nextFetchTaskList: GroupTaskList = fetchResult.data.group_tasks_list ?? [];

      dispatch(fetchGroupTaskListAction(nextFetchTaskList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupTaskListAction());
      } else {
        dispatch(
          failedFetchGroupTaskListAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const addTaskItem = (groupId: number, requestData: AddTaskItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddTaskItemAction());

    try {
      await axios.post<AddTaskItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`,
        JSON.stringify(requestData),
        { withCredentials: true }
      );

      const fetchResult = await axios.get<FetchGroupTaskListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`,
        { withCredentials: true }
      );

      const nextFetchTaskList: GroupTaskList = fetchResult.data.group_tasks_list ?? [];

      dispatch(addTaskItemAction(nextFetchTaskList));
    } catch (error) {
      dispatch(failedAddTaskItemAction(error.response.status, error.response.data.error.message));
      throw error.response.data.error.message;
    }
  };
};

export const editTaskItem = (groupId: number, taskItemId: number, requestData: EditTaskItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditTaskItemAction());

    try {
      await axios.put<EditTaskItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'base_date' && value !== null) {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        { withCredentials: true }
      );

      const fetchResult = await axios.get<FetchGroupTaskListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`,
        { withCredentials: true }
      );

      const nextFetchTaskList: GroupTaskList = fetchResult.data.group_tasks_list ?? [];

      dispatch(editTaskItemAction(nextFetchTaskList));
    } catch (error) {
      dispatch(failedEditTaskItemAction(error.response.status, error.response.data.error.message));
      throw error.response.data.error.message;
    }
  };
};

export const deleteTaskItem = (groupId: number, taskItemId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTaskItemAction());

    try {
      const deleteResult = await axios.delete<DeleteTaskItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`,
        { withCredentials: true }
      );

      const fetchResult = await axios.get<FetchGroupTaskListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`,
        { withCredentials: true }
      );

      const nextFetchTaskList: GroupTaskList = fetchResult.data.group_tasks_list ?? [];

      dispatch(deleteTaskItemAction(nextFetchTaskList));
      dispatch(openTextModalAction(deleteResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTaskItemAction(error.response.status, error.response.data.error.message)
      );
      throw error.response.data.error.message;
    }
  };
};
