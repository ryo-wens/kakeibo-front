import {
  createGroupAction,
  updateGroupNameAction,
  fetchGroupsAction,
  inviteGroupUsersAction,
  inviteGroupRejectAction,
} from './actions';
import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { Group, Groups, GroupUser } from './types';
import { State } from '../store/types';
import { openTextModalAction } from '../modal/actions';

interface createGroupReq {
  group_name: string;
}

interface createGroupRes {
  group_id: number;
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

interface inviteGroupUsersReq {
  group_id: number;
  user_id: string;
}

interface inviteGroupUsersRes {
  group_id: number;
  user_id: string;
  user_name: string;
}

interface inviteGroupRejectRes {
  message: string;
}

export const createGroup = (groupName: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
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

        const nextApprovedGroups = [...prevApprovedGroups, newGroup];

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

export const inviteGroupUsers = (groupId: number, userId: string) => {
  if (userId === '') {
    return;
  }
  const data: inviteGroupUsersReq = {
    group_id: groupId,
    user_id: userId,
  };

  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    await axios
      .post<inviteGroupUsersRes>(
        `http://127.0.0.1:8080/groups/${groupId}/users`,
        JSON.stringify(data),
        { withCredentials: true }
      )
      .then((res) => {
        const prevApprovedGroups = getState().groups.approvedGroups;
        const prevUnapprovedGroups = getState().groups.unapprovedGroups;

        const updateApprovedGroups: Groups = prevApprovedGroups.map((prevApprovedGroup) => {
          if (prevApprovedGroup.group_id === groupId && res.data.user_id === userId) {
            const inviteUser: GroupUser = {
              group_id: res.data.group_id,
              user_id: res.data.user_id,
              user_name: res.data.user_name,
            };
            const prevUnapprovedUserList = prevApprovedGroup.unapproved_users_list;
            const updateApprovedGroup: Group = {
              group_id: prevApprovedGroup.group_id,
              group_name: prevApprovedGroup.group_name,
              approved_users_list: prevApprovedGroup.approved_users_list,
              unapproved_users_list: [...prevUnapprovedUserList, inviteUser],
            };
            return updateApprovedGroup;
          } else {
            return prevApprovedGroup;
          }
        });

        const updateUnapprovedGroups: Groups = prevUnapprovedGroups.map((prevUnapprovedGroup) => {
          if (prevUnapprovedGroup.group_id === groupId && res.data.user_id === userId) {
            const inviteUser: GroupUser = {
              group_id: res.data.group_id,
              user_id: res.data.user_id,
              user_name: res.data.user_name,
            };
            const prevUnapprovedUserList = prevUnapprovedGroup.unapproved_users_list;
            const updateUnapprovedGroup: Group = {
              group_id: prevUnapprovedGroup.group_id,
              group_name: prevUnapprovedGroup.group_name,
              approved_users_list: prevUnapprovedGroup.approved_users_list,
              unapproved_users_list: [...prevUnapprovedUserList, inviteUser],
            };
            return updateUnapprovedGroup;
          } else {
            return prevUnapprovedGroup;
          }
        });

        dispatch(inviteGroupUsersAction(updateApprovedGroups, updateUnapprovedGroups));
      });
  };
};

export const inviteGroupReject = (groupId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    await axios
      .delete<inviteGroupRejectRes>(`http://127.0.0.1:8080/groups/${groupId}/users/unapproved`, {
        withCredentials: true,
      })
      .then((res) => {
        const prevUnapprovedGroups = getState().groups.unapprovedGroups;

        const updateUnapprovedGroups: Groups = prevUnapprovedGroups.filter(
          (prevUnapprovedGroup: Group) => {
            return prevUnapprovedGroup.group_id !== groupId;
          }
        );
        dispatch(inviteGroupRejectAction(updateUnapprovedGroups));
        dispatch(openTextModalAction(res.data.message));
      });
  };
};
