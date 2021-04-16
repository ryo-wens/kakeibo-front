import { Groups } from './types';
export type groupActions = ReturnType<
  | typeof startFetchGroupsAction
  | typeof fetchGroupsAction
  | typeof cancelFetchGroupsAction
  | typeof failedFetchGroupsAction
  | typeof createGroupAction
  | typeof updateGroupNameAction
  | typeof inviteGroupUsersAction
  | typeof groupWithdrawalAction
  | typeof inviteGroupRejectAction
>;

export const START_FETCH_GROUPS = 'START_FETCH_GROUPS';
export const startFetchGroupsAction = () => {
  return {
    type: START_FETCH_GROUPS,
    payload: {
      groupsLoading: true,
    },
  };
};

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const fetchGroupsAction = (approvedGroups: Groups, unapprovedGroups: Groups) => {
  return {
    type: FETCH_GROUPS,
    payload: {
      groupsLoading: false,
      approvedGroups: approvedGroups,
      unapprovedGroups: unapprovedGroups,
    },
  };
};

export const CANCEL_FETCH_GROUPS = 'CANCEL_FETCH_GROUPS';
export const cancelFetchGroupsAction = () => {
  return {
    type: CANCEL_FETCH_GROUPS,
    payload: {
      groupsLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUPS = 'FAILED_FETCH_GROUPS';
export const failedFetchGroupsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: START_FETCH_GROUPS,
    payload: {
      groupsLoading: false,
      groupsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

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
