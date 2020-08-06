export type groupAction = ReturnType<typeof createGroupAction>;

export const CREATE_GROUP = 'CREATE_GROUP';
export const createGroupAction = (groupId: string, groupName: string) => {
  return {
    type: CREATE_GROUP,
    payload: {
      groupId: groupId,
      groupName: groupName,
    },
  };
};
