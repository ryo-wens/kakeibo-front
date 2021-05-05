import { ApprovedGroupUser, Groups, UnapprovedGroupUser } from './types';
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
  | typeof startJoinInvitationGroupAction
  | typeof joinInvitationGroupAction
  | typeof failedJoinInvitationGroupAction
  | typeof startRefuseInvitationGroupAction
  | typeof refuseInvitationGroupAction
  | typeof failedRefuseInvitationGroupAction
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
    type: FAILED_FETCH_GROUPS,
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
export const inviteUsersToGroupAction = (unapprovedUser: UnapprovedGroupUser) => {
  return {
    type: INVITE_USERS_TO_GROUP,
    payload: {
      groupUser: {
        groupId: unapprovedUser.group_id,
        userId: unapprovedUser.user_id,
        userName: unapprovedUser.user_name,
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

export const START_JOIN_INVITATION_GROUP = 'START_JOIN_INVITATION_GROUP';
export const startJoinInvitationGroupAction = () => {
  return {
    type: START_JOIN_INVITATION_GROUP,
    payload: {
      groupsLoading: true,
    },
  };
};

export const JOIN_INVITATION_GROUP = 'JOIN_INVITATION_GROUP';
export const joinInvitationGroupAction = (approvedUser: ApprovedGroupUser) => {
  return {
    type: JOIN_INVITATION_GROUP,
    payload: {
      groupUser: {
        groupId: approvedUser.group_id,
        userId: approvedUser.user_id,
        userName: approvedUser.user_name,
        colorCode: approvedUser.color_code,
      },
    },
  };
};

export const FAILED_JOIN_INVITATION_GROUP = 'FAILED_JOIN_INVITATION_GROUP';
export const failedJoinInvitationGroupAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_JOIN_INVITATION_GROUP,
    payload: {
      groupsLoading: false,
      groupsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_REFUSE_INVITATION_GROUP = 'START_REFUSE_INVITATION_GROUP';
export const startRefuseInvitationGroupAction = () => {
  return {
    type: START_REFUSE_INVITATION_GROUP,
    payload: {
      groupsLoading: true,
    },
  };
};

export const REFUSE_INVITATION_GROUP = 'REFUSE_INVITATION_GROUP';
export const refuseInvitationGroupAction = () => {
  return {
    type: REFUSE_INVITATION_GROUP,
    payload: {
      groupUser: {
        groupId: 0,
        userId: '',
        userName: '',
        colorCode: '',
      },
    },
  };
};

export const FAILED_REFUSE_INVITATION_GROUP = 'FAILED_REFUSE_INVITATION_GROUP';
export const failedRefuseInvitationGroupAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_REFUSE_INVITATION_GROUP,
    payload: {
      groupsLoading: false,
      groupsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
