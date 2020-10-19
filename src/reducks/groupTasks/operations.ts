import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { fetchTasksListEachUserRes, UserTaskList } from './types';
import { fetchTasksListEachUserAction } from './actions';
import { errorHandling } from '../../lib/validation';

export const fetchTasksListEachUser = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchTasksListEachUserRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupTasksListForEachUser: UserTaskList = res.data.group_tasks_list_for_each_user;
        dispatch(fetchTasksListEachUserAction(groupTasksListForEachUser));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
