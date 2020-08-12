import { createGroupAction, updataGroupAction } from './actions';
import { Dispatch, Action } from 'redux';
import axios from 'axios';

interface createGroupReq {
  group_name: string;
}

interface createGroupRes {
  group_name: string;
  group_id: string;
  user_name: string;
}

export const createGroup = (groupName: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    const data: createGroupReq = {
      group_name: groupName,
    };

    await axios
      .post<createGroupRes>('http://127.0.0.1:8080/groups', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const currentUser = getState().users;

        const user = {
          group_id: res.data.group_id,
          user_id: currentUser.userId,
          user_name: currentUser.userName,
        };

        const newGroup = {
          group_id: res.data.group_id,
          group_name: res.data.group_name,
          approved_users_list: [user],
          unapproved_users_list: [],
        };

        const prevApprovedGroups = getState().groups.approvedGroups;

        const nextApprovedGroups = [newGroup, ...prevApprovedGroups];

        dispatch(createGroupAction(nextApprovedGroups));
      });
  };
};

export const updataGroup = (groupName: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    const data: createGroupReq = {
      group_name: groupName,
    };

    await axios
      .post<createGroupRes>('http://127.0.0.1:8080/groups', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const currentUser = getState().users;

        const user = {
          group_id: res.data.group_id,
          user_id: currentUser.userId,
          user_name: currentUser.userName,
        };

        const newGroup = {
          group_id: res.data.group_id,
          group_name: res.data.group_name,
          approved_users_list: [user],
          unapproved_users_list: [],
        };

        const prevApprovedGroups = getState().groups.approvedGroups;

        const nextApprovedGroups = [newGroup, ...prevApprovedGroups];

        dispatch(updataGroupAction(nextApprovedGroups));
      });
  };
};
