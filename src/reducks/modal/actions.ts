export type modalAction = ReturnType<typeof inviteGroupRejectModalAction>;

export const INVITE_GROUP_REJECT_MODAL = 'INVITE_GROUP_REJECT_MODAL';
export const inviteGroupRejectModalAction = (message: string) => {
  return {
    type: INVITE_GROUP_REJECT_MODAL,
    payload: {
      message: message,
      open: true,
    },
  };
};
