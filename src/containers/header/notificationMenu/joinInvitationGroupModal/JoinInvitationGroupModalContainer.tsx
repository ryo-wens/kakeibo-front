import React, { useState } from 'react';
import { fetchGroups, joinInvitationGroup } from '../../../../reducks/groups/operations';
import { useDispatch } from 'react-redux';
import { Group } from '../../../../reducks/groups/types';
import { push } from 'connected-react-router';
import JoinInvitationGroupModal from '../../../../components/header/notificationMenu/joinInvitationGroupModal/JoinInvitationGroupModal';

interface JoinInvitationGroupModalContainerProps {
  unapprovedGroup: Group;
}

const JoinInvitationGroupModalContainer = (props: JoinInvitationGroupModalContainerProps) => {
  const { unapprovedGroup: group } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleJoinInvitationGroup = async () => {
    try {
      await dispatch(joinInvitationGroup(group.group_id));
      await dispatch(fetchGroups());

      dispatch(push(`/group/${group.group_id}/home`));
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <JoinInvitationGroupModal
      open={open}
      unapprovedGroup={group}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleJoinInvitationGroup={handleJoinInvitationGroup}
    />
  );
};

export default JoinInvitationGroupModalContainer;
