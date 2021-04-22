import {
  fetchGroupsAction,
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
  joinInvitationGroupAction,
  failedJoinInvitationGroupAction,
  startJoinInvitationGroupAction,
  failedRefuseInvitationGroupAction,
  refuseInvitationGroupAction,
  startRefuseInvitationGroupAction,
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
  inviteGroupRejectRes,
  InviteUsersToGroupReq,
  UnapprovedGroupUser,
  UnsubscribeGroupRes,
} from './types';
import { openTextModalAction } from '../modal/actions';
import { push } from 'connected-react-router';
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

export const inviteUsersToGroup = (groupId: number, requestData: InviteUsersToGroupReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startInviteUsersToGroupAction());

    try {
      const res = await userServiceInstance.post<UnapprovedGroupUser>(
        `/groups/${groupId}/users`,
        JSON.stringify(requestData)
      );

      dispatch(inviteUsersToGroupAction(res.data));
    } catch (error) {
      dispatch(
        failedInviteUsersToGroupAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const joinInvitationGroup = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startJoinInvitationGroupAction());

    try {
      const res = await userServiceInstance.post<ApprovedGroupUser>(
        `/groups/${groupId}/users/approved`
      );

      dispatch(joinInvitationGroupAction(res.data));
    } catch (error) {
      dispatch(
        failedJoinInvitationGroupAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const refuseInvitationGroup = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startRefuseInvitationGroupAction());

    try {
      const res = await userServiceInstance.delete<inviteGroupRejectRes>(
        `/groups/${groupId}/users/unapproved`
      );

      dispatch(refuseInvitationGroupAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedRefuseInvitationGroupAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};
