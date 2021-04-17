import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGroup, fetchGroups } from '../../../../../reducks/groups/operations';
import { AddGroupReq } from '../../../../../reducks/groups/types';
import AddGroupModal from '../../../../../components/header/switchEntity/modules/modal/addGroupModal/AddGroupModal';

const initialState = {
  initialGroupName: '',
};

const AddGroupModalContainer = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState<string>(initialState.initialGroupName);

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

  const handleAddGroup = async () => {
    const requestData: AddGroupReq = {
      group_name: groupName,
    };

    try {
      await dispatch(addGroup(requestData));
      dispatch(fetchGroups());
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  const isBlankGroupName = groupName === initialState.initialGroupName;

  return (
    <AddGroupModal
      titleLabel={'グループを作成'}
      open={open}
      groupName={groupName}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleGroupName={handleGroupName}
      handleAddGroup={handleAddGroup}
      isBlankGroupName={isBlankGroupName}
    />
  );
};

export default AddGroupModalContainer;
