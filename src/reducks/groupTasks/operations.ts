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
import dayjs from 'dayjs';
import { todoServiceInstance } from '../axiosConfig';

export const fetchGroupTaskListForEachUser = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTaskListForEachUserAction());

    try {
      const fetchResult = await todoServiceInstance.get<FetchGroupTaskListForEachUserRes>(
        `/groups/${groupId}/tasks/users`,
        { cancelToken: signal.token }
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
      await todoServiceInstance.post<AddGroupTaskUsersRes>(
        `/groups/${groupId}/tasks/users`,
        JSON.stringify(requestData)
      );

      const fetchTaskListResult = todoServiceInstance.get<FetchGroupTaskListRes>(
        `/groups/${groupId}/tasks`
      );

      const fetchTaskListForEachUserResult = todoServiceInstance.get<FetchGroupTaskListForEachUserRes>(
        `/groups/${groupId}/tasks/users`
      );

      const taskListResponse = await fetchTaskListResult;
      const taskListForEachUserResponse = await fetchTaskListForEachUserResult;

      const nextFetchTaskList: GroupTaskList = taskListResponse.data.group_tasks_list ?? [];
      const nextTaskListForEachUser: GroupTaskListForEachUser =
        taskListForEachUserResponse.data.group_tasks_list_for_each_user;

      dispatch(addTaskUsersAction(nextFetchTaskList, nextTaskListForEachUser));
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
      const deleteResult = await todoServiceInstance.delete<DeleteGroupTaskUsersRes>(
        `/groups/${groupId}/tasks/users`,
        { data: JSON.stringify(requestData) }
      );

      const fetchTaskListResult = todoServiceInstance.get<FetchGroupTaskListRes>(
        `/groups/${groupId}/tasks`
      );

      const fetchTaskListForEachUserResult = todoServiceInstance.get<FetchGroupTaskListForEachUserRes>(
        `/groups/${groupId}/tasks/users`
      );

      const taskListResponse = await fetchTaskListResult;
      const taskListForEachUserResponse = await fetchTaskListForEachUserResult;

      const nextFetchTaskList: GroupTaskList = taskListResponse.data.group_tasks_list ?? [];
      const nextTaskListForEachUser: GroupTaskListForEachUser =
        taskListForEachUserResponse.data.group_tasks_list_for_each_user;

      dispatch(deleteTaskUsersAction(nextFetchTaskList, nextTaskListForEachUser));
      dispatch(openTextModalAction(deleteResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTaskUsersAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const fetchGroupTaskList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTaskListAction());

    try {
      const fetchResult = await todoServiceInstance.get<FetchGroupTaskListRes>(
        `/groups/${groupId}/tasks`,
        { cancelToken: signal.token }
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
      await todoServiceInstance.post<AddTaskItemRes>(
        `/groups/${groupId}/tasks`,
        JSON.stringify(requestData)
      );

      const fetchResult = await todoServiceInstance.get<FetchGroupTaskListRes>(
        `/groups/${groupId}/tasks`
      );

      const nextFetchTaskList: GroupTaskList = fetchResult.data.group_tasks_list ?? [];

      dispatch(addTaskItemAction(nextFetchTaskList));
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
      await todoServiceInstance.put<EditTaskItemRes>(
        `/groups/${groupId}/tasks/${taskItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'base_date' && value !== null) {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchTaskListResult = todoServiceInstance.get<FetchGroupTaskListRes>(
        `/groups/${groupId}/tasks`
      );

      const fetchTaskListForEachUserResult = todoServiceInstance.get<FetchGroupTaskListForEachUserRes>(
        `/groups/${groupId}/tasks/users`
      );

      const taskListResponse = await fetchTaskListResult;
      const taskListForEachUserResponse = await fetchTaskListForEachUserResult;

      const nextFetchTaskList: GroupTaskList = taskListResponse.data.group_tasks_list ?? [];
      const nextTaskListForEachUser: GroupTaskListForEachUser =
        taskListForEachUserResponse.data.group_tasks_list_for_each_user;

      dispatch(editTaskItemAction(nextFetchTaskList, nextTaskListForEachUser));
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
      const deleteResult = await todoServiceInstance.delete<DeleteTaskItemRes>(
        `/groups/${groupId}/tasks/${taskItemId}`
      );

      const fetchTaskListResult = todoServiceInstance.get<FetchGroupTaskListRes>(
        `/groups/${groupId}/tasks`
      );

      const fetchTaskListForEachUserResult = todoServiceInstance.get<FetchGroupTaskListForEachUserRes>(
        `/groups/${groupId}/tasks/users`
      );

      const taskListResponse = await fetchTaskListResult;
      const taskListForEachUserResponse = await fetchTaskListForEachUserResult;

      const nextFetchTaskList: GroupTaskList = taskListResponse.data.group_tasks_list ?? [];
      const nextTaskListForEachUser: GroupTaskListForEachUser =
        taskListForEachUserResponse.data.group_tasks_list_for_each_user;

      dispatch(deleteTaskItemAction(nextFetchTaskList, nextTaskListForEachUser));
      dispatch(openTextModalAction(deleteResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteTaskItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};
