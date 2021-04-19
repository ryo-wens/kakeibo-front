import { Groups } from './types';
export type groupActions = ReturnType<
  | typeof startFetchGroupsAction
  | typeof fetchGroupsAction
  | typeof cancelFetchGroupsAction
  | typeof failedFetchGroupsAction
  | typeof startAddGroupAction
  | typeof addGroupAction
  | typeof failedAddGroupAction
  | typeof startEditGroupNameAction
  | typeof editGroupNameAction
  | typeof failedEditGroupNameAction
  | typeof startUnsubscribeGroupAction
  | typeof unsubscribeGroupAction
  | typeof failedUnsubscribeGroupAction
  | typeof startInviteUsersToGroupAction
  | typeof inviteUsersToGroupAction
  | typeof failedInviteUsersToGroupAction
  | typeof inviteGroupUsersAction
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

export const START_ADD_GROUP = 'START_ADD_GROUP';
export const startAddGroupAction = () => {
  return {
    type: START_ADD_GROUP,
    payload: {
      groupsLoading: true,
    },
  };
};

export const ADD_GROUP = 'ADD_GROUP';
export const addGroupAction = (groupId: number, groupName: string) => {
  return {
    type: ADD_GROUP,
    payload: {
      group: {
        groupId: groupId,
        groupName: groupName,
      },
    },
  };
};

export const FAILED_ADD_GROUP = 'FAILED_ADD_GROUP';
export const failedAddGroupAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_GROUP,
    payload: {
      groupsLoading: false,
      groupsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_NAME = 'START_EDIT_GROUP_NAME';
export const startEditGroupNameAction = () => {
  return {
    type: START_EDIT_GROUP_NAME,
    payload: {
      groupsLoading: true,
    },
  };
};

export const EDIT_GROUP_NAME = 'EDIT_GROUP_NAME';
export const editGroupNameAction = (groupId: number, groupName: string) => {
  return {
    type: EDIT_GROUP_NAME,
    payload: {
      group: {
        groupId: groupId,
        groupName: groupName,
      },
    },
  };
};

export const FAILED_EDIT_GROUP_NAME = 'FAILED_EDIT_GROUP_NAME';
export const failedEditGroupNameAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_NAME,
    payload: {
      groupsLoading: false,
      groupsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_UNSUBSCRIBE_GROUP = 'START_UNSUBSCRIBE_GROUP';
export const startUnsubscribeGroupAction = () => {
  return {
    type: START_UNSUBSCRIBE_GROUP,
    payload: {
      groupsLoading: true,
    },
  };
};

export const UNSUBSCRIBE_GROUP = 'UNSUBSCRIBE_GROUP';
export const unsubscribeGroupAction = () => {
  return {
    type: UNSUBSCRIBE_GROUP,
    payload: {
      group: {
        groupId: 0,
        groupName: '',
      },
    },
  };
};

export const FAILED_UNSUBSCRIBE_GROUP = 'FAILED_UNSUBSCRIBE_GROUP';
export const failedUnsubscribeGroupAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_UNSUBSCRIBE_GROUP,
    payload: {
      groupsLoading: false,
      groupsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_INVITE_USERS_TO_GROUP = 'START_INVITE_USERS_TO_GROUP';
export const startInviteUsersToGroupAction = () => {
  return {
    type: START_INVITE_USERS_TO_GROUP,
    payload: {
      groupsLoading: true,
    },
  };
};

export const INVITE_USERS_TO_GROUP = 'INVITE_USERS_TO_GROUP';
export const inviteUsersToGroupAction = (groupId: number, userId: string, userName: string) => {
  return {
    type: INVITE_USERS_TO_GROUP,
    payload: {
      groupUser: {
        groupId: groupId,
        userId: userId,
        userName: userName,
        colorCode: '',
      },
    },
  };
};

export const FAILED_INVITE_USERS_TO_GROUP = 'FAILED_INVITE_USERS_TO_GROUP';
export const failedInviteUsersToGroupAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_INVITE_USERS_TO_GROUP,
    payload: {
      groupsLoading: false,
      groupsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
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
