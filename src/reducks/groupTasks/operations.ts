import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  fetchGroupTasksListEachUserRes,
  fetchGroupTasksListRes,
  GroupTasksList,
  GroupTasksListForEachUser,
} from './types';
import { fetchGroupTasksListAction, fetchGroupTasksListEachUserAction } from './actions';
import { errorHandling } from '../../lib/validation';

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
