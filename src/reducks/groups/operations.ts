import {
  updateGroupNameAction,
  fetchGroupsAction,
  inviteGroupUsersAction,
  inviteGroupRejectAction,
  inviteGroupParticipateAction,
  groupWithdrawalAction,
  startFetchGroupsAction,
  cancelFetchGroupsAction,
  failedFetchGroupsAction,
  startAddGroupAction,
  addGroupAction,
  failedAddGroupAction,
} from './actions';
import { Dispatch, Action } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  AddGroupReq,
  AddGroupRes,
  ApprovedGroupUser,
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
import { userServiceInstance } from '../axiosConfig';

export const fetchGroups = (signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupsAction());

    try {
      const res = await userServiceInstance.get<fetchGroupsRes>(`/groups`, {
        cancelToken: signal?.token,
      });

      const approvedGroups = res.data.approved_group_list;
      const unapprovedGroups = res.data.unapproved_group_list;

      dispatch(fetchGroupsAction(approvedGroups, unapprovedGroups));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupsAction());
      } else {
        dispatch(failedFetchGroupsAction(error.response.status, error.response.data.error.message));
      }
    }
  };
};

export const addGroup = (requestData: AddGroupReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupAction());

    try {
      const res = await userServiceInstance.post<AddGroupRes>(
        `/groups`,
        JSON.stringify(requestData)
      );

      dispatch(addGroupAction(res.data.group_id, res.data.group_name));
      dispatch(push(`/group/${res.data.group_id}/home`));
    } catch (error) {
      dispatch(failedAddGroupAction(error.response.status, error.response.data.error.message));
      throw error;
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
      const result = await userServiceInstance.put<updateGroupNameRes>(
        `/groups/${groupId}`,
        JSON.stringify(data)
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
      throw error;
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
      const result = await userServiceInstance.post<inviteGroupUsersRes>(
        `/groups/${groupId}/users`,
        JSON.stringify(data)
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
      const result = await userServiceInstance.delete<groupWithdrawalRes>(
        `/groups/${groupId}/users`
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
      const result = await userServiceInstance.post<inviteGroupParticipateRes>(
        `/groups/${groupId}/users/approved`,
        null
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
      const result = await userServiceInstance.delete<inviteGroupRejectRes>(
        `/groups/${groupId}/users/unapproved`
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
