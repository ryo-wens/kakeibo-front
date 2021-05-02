import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import {
  AddGroupTaskUsersReq,
  AddGroupTaskUsersRes,
  AddTaskItemReq,
  DeleteGroupTaskUsersReq,
  DeleteGroupTaskUsersRes,
  DeleteTaskItemRes,
  EditTaskItemReq,
  FetchGroupTaskListForEachUserRes,
  FetchGroupTaskListRes,
  GroupTaskList,
  TaskListItem,
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
import dayjs from 'dayjs';
import { todoServiceInstance } from '../axiosConfig';

export const fetchGroupTaskListForEachUser = (groupId: number, signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTaskListForEachUserAction());

    try {
      const res = await todoServiceInstance.get<FetchGroupTaskListForEachUserRes>(
        `/groups/${groupId}/tasks/users`,
        { cancelToken: signal?.token }
      );

      dispatch(fetchGroupTaskListForEachUserAction(res.data.group_tasks_list_for_each_user));
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
      const res = await todoServiceInstance.post<AddGroupTaskUsersRes>(
        `/groups/${groupId}/tasks/users`,
        JSON.stringify(requestData)
      );

      dispatch(addTaskUsersAction(res.data.group_tasks_list_for_each_user));
    } catch (error) {
      dispatch(failedAddTaskUsersAction(error.response.status, error.response.data.error.message));
      throw error;
    }
  };
};

export const deleteTaskUsers = (groupId: number, requestData: DeleteGroupTaskUsersReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTaskUsersAction());

    try {
      const res = await todoServiceInstance.delete<DeleteGroupTaskUsersRes>(
        `/groups/${groupId}/tasks/users`,
        { data: JSON.stringify(requestData) }
      );

      dispatch(deleteTaskUsersAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTaskUsersAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const fetchGroupTaskList = (groupId: number, signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTaskListAction());

    try {
      const fetchResult = await todoServiceInstance.get<FetchGroupTaskListRes>(
        `/groups/${groupId}/tasks`,
        { cancelToken: signal?.token }
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
      const res = await todoServiceInstance.post<TaskListItem>(
        `/groups/${groupId}/tasks`,
        JSON.stringify(requestData)
      );

      dispatch(addTaskItemAction(res.data));
    } catch (error) {
      dispatch(failedAddTaskItemAction(error.response.status, error.response.data.error.message));
      throw error;
    }
  };
};

export const editTaskItem = (groupId: number, taskItemId: number, requestData: EditTaskItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditTaskItemAction());

    try {
      const res = await todoServiceInstance.put<TaskListItem>(
        `/groups/${groupId}/tasks/${taskItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'base_date' && value !== null) {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(editTaskItemAction(res.data));
    } catch (error) {
      dispatch(failedEditTaskItemAction(error.response.status, error.response.data.error.message));
      throw error;
    }
  };
};

export const deleteTaskItem = (groupId: number, taskItemId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTaskItemAction());

    try {
      const res = await todoServiceInstance.delete<DeleteTaskItemRes>(
        `/groups/${groupId}/tasks/${taskItemId}`
      );

      dispatch(deleteTaskItemAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTaskItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};
