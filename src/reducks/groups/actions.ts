import { Groups } from './types';
export type groupAction = ReturnType<typeof createGroupAction | typeof updataGroupAction>;

export const CREATE_GROUP = 'CREATE_GROUP';
export const createGroupAction = (groups: Groups) => {
  return {
    type: CREATE_GROUP,
    payload: {
      approvedGroups: groups,
    },
  };
};

export const UPDATA_GROUP = 'UPDATA_GROUP';
export const updataGroupAction = (groups: Groups) => {
  return {
    type: UPDATA_GROUP,
    payload: {
      approvedGroups: groups,
    },
  };
};
