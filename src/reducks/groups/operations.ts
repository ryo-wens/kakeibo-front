import { createGroupAction, updateGroupNameAction, fetchGroupsAction } from './actions';
import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { Group, Groups } from './types';
import { State } from '../store/types';

interface createGroupReq {
  group_name: string;
}

interface createGroupRes {
  group_id: string;
  group_name: string;
}

interface updateGroupNameReq {
  group_id: number;
  group_name: string;
}

interface updateGroupNameRes {
  group_id: number;
  group_name: string;
}

interface fetchGroupRes {
  approved_group_list: Groups;
  unapproved_group_list: Groups;
}

export const createGroup = (groupName: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    if (groupName === '') {
      return;
    }
    const data: createGroupReq = {
      group_name: groupName,
    };

    await axios
      .post<createGroupRes>(`http://127.0.0.1:8080/groups`, JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
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

export const updateGroupName = (groupId: number, groupName: string) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    if (groupName === '') {
      return;
    }
    const data: updateGroupNameReq = {
      group_id: groupId,
      group_name: groupName,
    };

    await axios
      .put<updateGroupNameRes>(`http://127.0.0.1:8080/groups/${groupId}`, JSON.stringify(data), {
        withCredentials: true,
      })

      .then((res) => {
        const prevApprovedGroups: Groups = getState().groups.approvedGroups;

        const updateGroups = prevApprovedGroups.map((prevApprovedGroup) => {
          if (prevApprovedGroup.group_id === groupId) {
            const updateGroup: Group = {
              group_id: res.data.group_id,
              group_name: res.data.group_name,
              approved_users_list: prevApprovedGroup.approved_users_list,
              unapproved_users_list: prevApprovedGroup.unapproved_users_list,
            };
            return updateGroup;
          } else {
            return prevApprovedGroup;
          }
        });
        dispatch(updateGroupNameAction(updateGroups));
      });
  };
};

export const fetchGroups = () => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<fetchGroupRes>(`http://127.0.0.1:8080/groups`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(fetchGroupsAction(res.data.approved_group_list, res.data.unapproved_group_list));
      });
  };
};
