import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Group } from '../../../reducks/groups/types';
import { updateGroupName } from '../../../reducks/groups/operations';
import EditGroupName from '../../../components/header/group/editGroupName/EditGroupName';

interface EditGroupNameContainerProps {
  approvedGroup: Group;
  closeGroupMenu: () => void;
  modalTitleLabel: string;
  modalTextFieldLabel: string;
}

const EditGroupNameContainer = (props: EditGroupNameContainerProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const groupId = props.approvedGroup.group_id;
  const initialGroupName = props.approvedGroup.group_name;

  const isBlankGroupName = groupName === '';

  const openModal = (initialGroupName: string) => {
    setOpen(true);
    setGroupName(initialGroupName);
  };

  const closeModal = () => {
    setOpen(false);
    setGroupName('');
  };

  const inputGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const onClickSaveButton = () => {
    dispatch(updateGroupName(groupId, groupName));
    closeModal();
    props.closeGroupMenu();
  };

  return (
    <EditGroupName
      open={open}
      groupName={groupName}
      inputGroupName={inputGroupName}
      initialGroupName={initialGroupName}
      isBlankGroupName={isBlankGroupName}
      approvedGroup={props.approvedGroup}
      closeGroupMenu={props.closeGroupMenu}
      modalTextFieldLabel={props.modalTextFieldLabel}
      modalTitleLabel={props.modalTitleLabel}
      openModal={openModal}
      closeModal={closeModal}
      onClickSaveButton={onClickSaveButton}
    />
  );
};
export default EditGroupNameContainer;
