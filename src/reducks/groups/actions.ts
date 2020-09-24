import { Groups } from './types';
export type groupAction = ReturnType<
  | typeof createGroupAction
  | typeof updateGroupNameAction
  | typeof fetchGroupsAction
  | typeof inviteGroupUsersAction
  | typeof groupWithdrawalAction
  | typeof inviteGroupRejectAction
>;

export const CREATE_GROUP = 'CREATE_GROUP';
export const createGroupAction = (groups: Groups) => {
  return {
    type: CREATE_GROUP,
    payload: {
      approvedGroups: groups,
    },
  };
};

export const UPDATE_GROUP_NAME = 'UPDATE_GROUP_NAME';
export const updateGroupNameAction = (groups: Groups) => {
  return {
    type: UPDATE_GROUP_NAME,
    payload: {
      approvedGroups: groups,
    },
  };
};

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const fetchGroupsAction = (
  approvedGroups: Groups,
  unapprovedGroups: Groups,
  message: string
) => {
  return {
    type: FETCH_GROUPS,
    payload: {
      approvedGroups: approvedGroups,
      unapprovedGroups: unapprovedGroups,
      message: message,
    },
  };
};

export const INVITE_GROUP_USERS = 'INVITE_GROUP_USERS';
export const inviteGroupUsersAction = (approvedGroups: Groups) => {
  return {
    type: INVITE_GROUP_USERS,
    payload: {
      approvedGroups: approvedGroups,
    },
  };
};

export const GROUP_WITHDRAWAL = 'GROUP_WITHDRAWAL';
export const groupWithdrawalAction = (approvedGroups: Groups) => {
  return {
    type: GROUP_WITHDRAWAL,
    payload: {
      approvedGroups: approvedGroups,
    },
  };
};

export const INVITE_GROUP_PARTICIPATE = 'INVITE_GROUP_PARTICIPATE';
export const inviteGroupParticipateAction = (approvedGroups: Groups, unapprovedGroups: Groups) => {
  return {
    type: INVITE_GROUP_PARTICIPATE,
    payload: {
      approvedGroups: approvedGroups,
      unapprovedGroups: unapprovedGroups,
    },
  };
};

export const INVITE_GROUP_REJECT = 'INVITE_GROUP_REJECT';
export const inviteGroupRejectAction = (unapprovedGroups: Groups) => {
  return {
    type: INVITE_GROUP_REJECT,
    payload: {
      unapprovedGroups: unapprovedGroups,
    },
  };
};
