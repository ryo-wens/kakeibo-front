import React, { useState } from 'react';
import { Group } from '../../../../../reducks/groups/types';
import EditGroupUsersModal from '../../../../../components/header/switchEntity/modules/modal/editGroupUsersModal/EditGroupUsersModal';

interface EditGroupUsersModalContainerProps {
  approvedGroup: Group;
  modalTitleLabel: string;
}

const EditGroupUsersModalContainer = (props: EditGroupUsersModalContainerProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openInviteForm, setOpenInviteForm] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenInviteForm(false);
  };

  const handleOpenInviteForm = () => {
    setOpenInviteForm(true);
  };

  const handleCloseInviteForm = () => {
    setOpenInviteForm(false);
  };

  return (
    <EditGroupUsersModal
      open={openModal}
      openInviteForm={openInviteForm}
      approvedGroup={props.approvedGroup}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleOpenInviteForm={handleOpenInviteForm}
      handleCloseInviteForm={handleCloseInviteForm}
    />
  );
};
export default EditGroupUsersModalContainer;
