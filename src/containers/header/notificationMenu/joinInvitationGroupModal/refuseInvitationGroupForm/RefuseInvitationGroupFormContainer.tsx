import React from 'react';
import { fetchGroups, refuseInvitationGroup } from '../../../../../reducks/groups/operations';
import { useDispatch } from 'react-redux';
import { Group } from '../../../../../reducks/groups/types';
import RefuseInvitationGroupForm from '../../../../../components/header/notificationMenu/joinInvitationGroupModal/refuseInvitationGroupForm/RefuseInvitationGroupForm';

interface RefuseInvitationGroupFormContainerProps {
  unapprovedGroup: Group;
  handleCloseModal: () => void;
  handleCloseRefuseForm: () => void;
}

const RefuseInvitationGroupFormContainer = (props: RefuseInvitationGroupFormContainerProps) => {
  const { unapprovedGroup, handleCloseModal, handleCloseRefuseForm } = props;

  const dispatch = useDispatch();

  const handleRefuseInvitationGroup = async () => {
    try {
      await dispatch(refuseInvitationGroup(unapprovedGroup.group_id));
      await dispatch(fetchGroups());
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <RefuseInvitationGroupForm
      groupName={unapprovedGroup.group_name}
      handleCloseModal={handleCloseModal}
      handleCloseRefuseForm={handleCloseRefuseForm}
      handleRefuseInvitationGroup={handleRefuseInvitationGroup}
    />
  );
};

export default RefuseInvitationGroupFormContainer;
