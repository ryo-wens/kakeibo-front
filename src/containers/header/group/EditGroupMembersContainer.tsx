import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Group } from '../../../reducks/groups/types';
import EditGroupMembers from '../../../components/header/group/editGroupMembers/EditGroupMembers';
import { inviteGroupUsers } from '../../../reducks/groups/operations';

interface EditGroupMembersProps {
  approvedGroup: Group;
  modalTitleLabel: string;
}

const EditGroupMembersContainer = (props: EditGroupMembersProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const groupId = props.approvedGroup.group_id;
  const isBlankUserId = userId === '';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserId('');
  };

  const inputUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  return (
    <EditGroupMembers
      open={open}
      userId={userId}
      approvedGroup={props.approvedGroup}
      modalTitleLabel={props.modalTitleLabel}
      handleClose={handleClose}
      handleOpen={handleOpen}
      inputUserId={inputUserId}
      isBlankUserId={isBlankUserId}
      sendInvitation={() => {
        dispatch(inviteGroupUsers(groupId, userId));
        handleClose();
      }}
    />
  );
};
export default EditGroupMembersContainer;
