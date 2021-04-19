import React, { useState } from 'react';
import { Group, inviteUsersToGroupReq } from '../../../../../reducks/groups/types';
import { fetchGroups, inviteUsersToGroup } from '../../../../../reducks/groups/operations';
import { useDispatch } from 'react-redux';
import InviteUserForm from '../../../../../components/header/switchEntity/modules/form/inviteUserForm/InviteUserForm';

interface InviteUserFormContainerProps {
  approvedGroup: Group;
  handleCloseModal: () => void;
  handleCloseInviteForm: () => void;
}

const initialState = {
  initialUserId: '',
};

const InviteUserFormContainer = (props: InviteUserFormContainerProps) => {
  const { approvedGroup, handleCloseModal, handleCloseInviteForm } = props;
  const dispatch = useDispatch();
  const groupId = approvedGroup.group_id;

  const [userId, setUserId] = useState<string>(initialState.initialUserId);

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleInviteUsersToGroup = async () => {
    const requestData: inviteUsersToGroupReq = {
      user_id: userId,
    };

    try {
      await dispatch(inviteUsersToGroup(groupId, requestData));
      await dispatch(fetchGroups());

      handleCloseInviteForm();
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  const isBlankUserId = userId === initialState.initialUserId;

  return (
    <InviteUserForm
      userId={userId}
      handleUserId={handleUserId}
      handleCloseModal={handleCloseModal}
      handleCloseInviteForm={handleCloseInviteForm}
      handleInviteUsersToGroup={handleInviteUsersToGroup}
      isBlankUserId={isBlankUserId}
    />
  );
};
export default InviteUserFormContainer;
