import { Groups } from './types';
export type groupAction = ReturnType<
  typeof createGroupAction | typeof updateGroupAction | typeof fetchGroupsAction
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

export const UPDATE_GROUP = 'UPDATE_GROUP';
export const updateGroupAction = (groups: Groups) => {
  return {
    type: UPDATE_GROUP,
    payload: {
      approvedGroups: groups,
    },
  };
};

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const fetchGroupsAction = (approvedGroups: Groups, unapprovedGroups: Groups) => {
  return {
    type: FETCH_GROUPS,
    payload: {
      approvedGroups: approvedGroups,
      unapprovedGroups: unapprovedGroups,
    },
  };
};