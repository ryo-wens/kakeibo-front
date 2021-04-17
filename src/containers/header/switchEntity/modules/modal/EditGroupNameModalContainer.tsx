import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditGroupNameReq, Group } from '../../../../../reducks/groups/types';
import { editGroupName, fetchGroups } from '../../../../../reducks/groups/operations';
import EditGroupNameModal from '../../../../../components/header/switchEntity/modules/modal/editGroupNameModal/EditGroupNameModal';

interface EditGroupNameModalContainerProps {
  approvedGroup: Group;
  closeGroupMenu: () => void;
}

const EditGroupNameModalContainer = (props: EditGroupNameModalContainerProps) => {
  const { approvedGroup, closeGroupMenu } = props;

  const initialState = {
    initialGroupName: approvedGroup.group_name,
  };

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState<string>(initialState.initialGroupName);

  const disabledEditButton = groupName === '' || groupName === initialState.initialGroupName;

  const handleOpen = () => {
    setOpen(true);
    setGroupName(initialState.initialGroupName);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleEditGroupName = async () => {
    const requestData: EditGroupNameReq = {
      group_name: groupName,
    };

    try {
      await dispatch(editGroupName(approvedGroup.group_id, requestData));
      await dispatch(fetchGroups());

      handleClose();
      closeGroupMenu();
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <EditGroupNameModal
      open={open}
      groupName={groupName}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleGroupName={handleGroupName}
      handleEditGroupName={handleEditGroupName}
      disabledEditButton={disabledEditButton}
    />
  );
};
export default EditGroupNameModalContainer;
