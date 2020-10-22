import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  addTaskItemReq,
  addTaskItemRes,
  fetchGroupTasksListEachUserRes,
  fetchGroupTasksListRes,
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
} from './types';
import {
  addTaskItemAction,
  fetchGroupTasksListAction,
  fetchGroupTasksListEachUserAction,
} from './actions';
import { errorHandling } from '../../lib/validation';
import { State } from '../store/types';

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

export const fetchGroupTasksList = (groupId: number) => {
  return async (dispatch: Dispatch) => {
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
  if (taskName.length > 20 || taskName === '') {
    alert('タスク名は1文字以上20文字以内で入力してください。');
  }
  const data: addTaskItemReq = {
    task_name: taskName,
  };

  return async (dispatch: Dispatch<Action>, getState: () => State) => {
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
