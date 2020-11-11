import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  addGroupTasksUsersReq,
  addGroupTasksUsersRes,
  addTaskItemReq,
  addTaskItemRes,
  deleteTaskItemRes,
  editTaskItemReq,
  editTaskItemRes,
  fetchGroupTasksListEachUserRes,
  fetchGroupTasksListRes,
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
} from './types';
import {
  addGroupTasksUsersAction,
  addTaskItemAction,
  deleteTaskItemAction,
  editTaskItemAction,
  fetchGroupTasksListAction,
  fetchGroupTasksListEachUserAction,
} from './actions';
import { errorHandling } from '../../lib/validation';
import { State } from '../store/types';
import { openTextModalAction } from '../modal/actions';

export const fetchGroupTasksListEachUser = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchGroupTasksListEachUserRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupTasksListForEachUser: GroupTasksListForEachUser =
          res.data.group_tasks_list_for_each_user;

        dispatch(fetchGroupTasksListEachUserAction(groupTasksListForEachUser));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const addGroupTasksUsers = (groupId: number, users: Array<string>) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    const data: addGroupTasksUsersReq = {
      users_list: users,
    };

    try {
      const result = await axios.post<addGroupTasksUsersRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        JSON.stringify(data),
        { withCredentials: true }
      );

      const prevGroupTasksListForEachUser: GroupTasksListForEachUser = getState().groupTasks
        .groupTasksListForEachUser;

      const nextGroupTasksListForEachUser: GroupTasksListForEachUser = [
        ...prevGroupTasksListForEachUser,
        ...result.data.group_tasks_list_for_each_user,
      ];

      dispatch(addGroupTasksUsersAction(nextGroupTasksListForEachUser));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchGroupTasksList = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchGroupTasksListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`,
        { withCredentials: true }
      )
      .then((res) => {
        const groupTasksList: GroupTasksList = res.data.group_tasks_list;

        dispatch(fetchGroupTasksListAction(groupTasksList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const addTaskItem = (groupId: number, taskName: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (taskName.length > 20 || taskName === '') {
      return alert('タスク名は1文字以上20文字以内で入力してください。');
    }

    const data: addTaskItemReq = {
      task_name: taskName,
    };

    await axios
      .post<addTaskItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`,
        JSON.stringify(data),
        { withCredentials: true }
      )
      .then((res) => {
        const prevGroupTasksList: GroupTasksList = getState().groupTasks.groupTasksList;
        const newTaskListItem: TasksListItem = res.data;

        if (newTaskListItem.group_id === groupId) {
          const updateGroupTasksList = [...prevGroupTasksList, newTaskListItem];
          dispatch(addTaskItemAction(updateGroupTasksList));
        }
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const editTaskItem = (
  groupId: number,
  taskItemId: number,
  baseDate: Date | null,
  cycleType: 'every' | 'consecutive' | 'none' | null,
  cycle: number | null,
  taskName: string,
  groupTasksUsersId: number | null
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (taskName.length > 20 || taskName === '') {
      return alert('タスク名は1文字以上20文字以内で入力してください。');
    }

    const data: editTaskItemReq = {
      base_date: baseDate,
      cycle_type: cycleType,
      cycle: cycle,
      task_name: taskName,
      group_tasks_users_id: groupTasksUsersId,
    };

    await axios
      .put<editTaskItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`,
        JSON.stringify(data),
        { withCredentials: true }
      )
      .then((res) => {
        const prevGroupTasksList: GroupTasksList = getState().groupTasks.groupTasksList;

        const updateGroupTasksList = prevGroupTasksList.map((taskListItem: TasksListItem) => {
          if (taskListItem.id === taskItemId) {
            return res.data;
          } else {
            return taskListItem;
          }
        });

        dispatch(editTaskItemAction(updateGroupTasksList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const deleteTaskItem = (groupId: number, taskItemId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    await axios
      .delete<deleteTaskItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`,
        { withCredentials: true }
      )
      .then((res) => {
        const prevGroupTasksList: GroupTasksList = getState().groupTasks.groupTasksList;

        const updateGroupTasksList: GroupTasksList = prevGroupTasksList.filter(
          (taskListItem: TasksListItem) => {
            return taskListItem.id !== taskItemId;
          }
        );

        dispatch(deleteTaskItemAction(updateGroupTasksList));
        dispatch(openTextModalAction(res.data.message));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
