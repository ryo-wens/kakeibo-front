import {
  fetchGroupsAction,
  inviteGroupRejectAction,
  inviteGroupParticipateAction,
  startFetchGroupsAction,
  cancelFetchGroupsAction,
  failedFetchGroupsAction,
  startAddGroupAction,
  addGroupAction,
  failedAddGroupAction,
  startEditGroupNameAction,
  editGroupNameAction,
  failedEditGroupNameAction,
  unsubscribeGroupAction,
  failedUnsubscribeGroupAction,
  startUnsubscribeGroupAction,
  startInviteUsersToGroupAction,
  inviteUsersToGroupAction,
  failedInviteUsersToGroupAction,
} from './actions';
import { Dispatch, Action } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  AddGroupReq,
  AddGroupRes,
  ApprovedGroupUser,
  EditGroupNameReq,
  EditGroupNameRes,
  FetchGroupsRes,
  Group,
  Groups,
  inviteGroupParticipateRes,
  inviteGroupRejectRes,
  inviteUsersToGroupReq,
  inviteUsersToGroupRes,
  UnapprovedGroupUser,
  UnapprovedGroupUsers,
  UnsubscribeGroupRes,
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
      const res = await userServiceInstance.get<FetchGroupsRes>(`/groups`, {
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

export const editGroupName = (groupId: number, requestData: EditGroupNameReq) => {
  return async (dispatch: Dispatch) => {
    dispatch(startEditGroupNameAction());

    try {
      const res = await userServiceInstance.put<EditGroupNameRes>(
        `/groups/${groupId}`,
        JSON.stringify(requestData)
      );

      dispatch(editGroupNameAction(res.data.group_id, res.data.group_name));
    } catch (error) {
      dispatch(failedEditGroupNameAction(error.response.status, error.response.data.error.message));
      throw error;
    }
  };
};

export const unsubscribeGroup = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startUnsubscribeGroupAction());

    try {
      const res = await userServiceInstance.delete<UnsubscribeGroupRes>(`/groups/${groupId}/users`);

      dispatch(unsubscribeGroupAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedUnsubscribeGroupAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const inviteUsersToGroup = (groupId: number, requestData: inviteUsersToGroupReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startInviteUsersToGroupAction());

    try {
      const res = await userServiceInstance.post<inviteUsersToGroupRes>(
        `/groups/${groupId}/users`,
        JSON.stringify(requestData)
      );

      const { data } = res;

      dispatch(inviteUsersToGroupAction(data.group_id, data.user_id, data.user_name));
    } catch (error) {
      dispatch(
        failedInviteUsersToGroupAction(error.response.status, error.response.data.error.message)
      );
      throw error;
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
