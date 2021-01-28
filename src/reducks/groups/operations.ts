import {
  createGroupAction,
  updateGroupNameAction,
  fetchGroupsAction,
  inviteGroupUsersAction,
  inviteGroupRejectAction,
  inviteGroupParticipateAction,
  groupWithdrawalAction,
} from './actions';
import { Dispatch, Action } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  ApprovedGroupUser,
  createGroupReq,
  createGroupRes,
  fetchGroupsRes,
  Group,
  Groups,
  groupWithdrawalRes,
  inviteGroupParticipateRes,
  inviteGroupRejectRes,
  inviteGroupUsersReq,
  inviteGroupUsersRes,
  UnapprovedGroupUser,
  UnapprovedGroupUsers,
  updateGroupNameReq,
  updateGroupNameRes,
} from './types';
import { State } from '../store/types';
import { openTextModalAction } from '../modal/actions';
import { push } from 'connected-react-router';
import { errorHandling } from '../../lib/validation';

export const createGroup = (groupName: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (groupName === '') {
      return;
    }
    const data: createGroupReq = {
      group_name: groupName,
    };

    try {
      const result = await axios.post<createGroupRes>(
        `${process.env.REACT_APP_USER_API_HOST}/groups`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const prevApprovedGroups: Groups = getState().groups.approvedGroups;
      const currentUser = getState().users;

      const user: ApprovedGroupUser = {
        group_id: result.data.group_id,
        user_id: currentUser.id,
        user_name: currentUser.name,
        color_code: `#FF0000`,
      };

      const newGroup: Group = {
        group_id: result.data.group_id,
        group_name: result.data.group_name,
        approved_users_list: [user],
        unapproved_users_list: [],
      };

      const nextApprovedGroups = [...prevApprovedGroups, newGroup];

      dispatch(createGroupAction(nextApprovedGroups));
      dispatch(push(`/group/${result.data.group_id}/home`));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const updateGroupName = (groupId: number, groupName: string) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    if (groupName === '') {
      return;
    }
    const data: updateGroupNameReq = {
      group_name: groupName,
    };

    try {
      const result = await axios.put<updateGroupNameRes>(
        `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const prevApprovedGroups: Groups = getState().groups.approvedGroups;

      const updateGroups = prevApprovedGroups.map((prevApprovedGroup) => {
        if (prevApprovedGroup.group_id === groupId) {
          const updateGroup: Group = {
            group_id: result.data.group_id,
            group_name: result.data.group_name,
            approved_users_list: prevApprovedGroup.approved_users_list,
            unapproved_users_list: prevApprovedGroup.unapproved_users_list,
          };
          return updateGroup;
        } else {
          return prevApprovedGroup;
        }
      });
      dispatch(updateGroupNameAction(updateGroups));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchGroups = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<fetchGroupsRes>(
        `${process.env.REACT_APP_USER_API_HOST}/groups`,
        { cancelToken: signal.token, withCredentials: true }
      );

      const approvedGroups = result.data.approved_group_list;
      const unapprovedGroups = result.data.unapproved_group_list;
      const message = result.data.message;

      if (approvedGroups !== undefined && unapprovedGroups !== undefined) {
        const message = '';
        dispatch(fetchGroupsAction(approvedGroups, unapprovedGroups, message));
      } else {
        const approvedGroups: Groups = [];
        const unapprovedGroups: Groups = [];
        dispatch(fetchGroupsAction(approvedGroups, unapprovedGroups, message));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const inviteGroupUsers = (groupId: number, userId: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (userId === '') {
      return;
    }
    const data: inviteGroupUsersReq = {
      user_id: userId,
    };

    try {
      const result = await axios.post<inviteGroupUsersRes>(
        `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users`,
        JSON.stringify(data),
        { withCredentials: true }
      );

      const prevApprovedGroups: Groups = getState().groups.approvedGroups;

      const updateApprovedGroups: Groups = prevApprovedGroups.map((prevApprovedGroup: Group) => {
        if (prevApprovedGroup.group_id === groupId && result.data.user_id === userId) {
          const inviteUser: UnapprovedGroupUser = {
            group_id: result.data.group_id,
            user_id: result.data.user_id,
            user_name: result.data.user_name,
          };

          const prevUnapprovedUserList: UnapprovedGroupUsers =
            prevApprovedGroup.unapproved_users_list;

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
      dispatch(inviteGroupUsersAction(updateApprovedGroups));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const groupWithdrawal = (groupId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<groupWithdrawalRes>(
        `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users`,
        {
          withCredentials: true,
        }
      );
      const prevApprovedGroups = getState().groups.approvedGroups;

      const updateApprovedGroups: Groups = prevApprovedGroups.filter((prevApprovedGroup) => {
        return prevApprovedGroup.group_id !== groupId;
      });

      dispatch(groupWithdrawalAction(updateApprovedGroups));
      dispatch(openTextModalAction(result.data.message));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const inviteGroupParticipate = (groupId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.post<inviteGroupParticipateRes>(
        `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users/approved`,
        null,
        {
          withCredentials: true,
        }
      );

      const prevApprovedGroups: Groups = getState().groups.approvedGroups;
      const prevUnapprovedGroups: Groups = getState().groups.unapprovedGroups;

      const matchedGroups = prevUnapprovedGroups.filter((prevUnapprovedGroup: Group) => {
        return prevUnapprovedGroup.group_id === result.data.group_id;
      });

      const matchedGroup: Group = matchedGroups[0];

      const updateUnapprovedUserList: UnapprovedGroupUsers = matchedGroup.unapproved_users_list.filter(
        (unapprovedUser: UnapprovedGroupUser) => {
          return unapprovedUser.user_id !== result.data.user_id;
        }
      );

      const participateUser: ApprovedGroupUser = {
        group_id: result.data.group_id,
        user_id: result.data.user_id,
        user_name: result.data.user_name,
        color_code: result.data.color_code,
      };

      const participateGroup: Group = {
        group_id: matchedGroup.group_id,
        group_name: matchedGroup.group_name,
        approved_users_list: [...matchedGroup.approved_users_list, participateUser],
        unapproved_users_list: updateUnapprovedUserList,
      };

      const updateApprovedGroups: Groups = [...prevApprovedGroups, participateGroup];

      const updateUnapprovedGroups: Groups = prevUnapprovedGroups.filter(
        (prevUnapprovedGroup: Group) => {
          return prevUnapprovedGroup.group_id !== result.data.group_id;
        }
      );
      dispatch(inviteGroupParticipateAction(updateApprovedGroups, updateUnapprovedGroups));
      dispatch(push(`/group/${result.data.group_id}/home`));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const inviteGroupReject = (groupId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<inviteGroupRejectRes>(
        `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users/unapproved`,
        {
          withCredentials: true,
        }
      );

      const prevUnapprovedGroups = getState().groups.unapprovedGroups;

      const updateUnapprovedGroups: Groups = prevUnapprovedGroups.filter(
        (prevUnapprovedGroup: Group) => {
          return prevUnapprovedGroup.group_id !== groupId;
        }
      );
      dispatch(inviteGroupRejectAction(updateUnapprovedGroups));
      dispatch(openTextModalAction(result.data.message));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
