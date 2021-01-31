import React, { useState } from 'react';
import { Group } from '../../../../../../reducks/groups/types';
import { GroupTasksListForEachUser, TaskUsers } from '../../../../../../reducks/groupTasks/types';
import EditTaskUserModal from '../../../../../../components/task/page/taskToolBarArea/EditTaskUserModal/EditTaskUserModal';

interface EditTaskUserModalContainerProps {
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  participatingTaskUsers: TaskUsers;
}

const EditTaskUserModalContainer = (props: EditTaskUserModalContainerProps) => {
  const [open, setOpen] = useState(false);
  const [openEditUserForm, setOpenEditUserForm] = useState(true);
  const [openAddUserForm, setOpenAddUserFrom] = useState(false);
  const [openDeleteUserForm, setOpenDeleteUserForm] = useState(false);

  const openModal = () => {
    setOpen(true);
    setOpenEditUserForm(true);
  };

  const closeModal = () => {
    setOpen(false);
    setOpenAddUserFrom(false);
  };

  const openAddTaskUser = () => {
    setOpenEditUserForm(false);
    setOpenAddUserFrom(true);
  };

  const closeAddTaskUser = () => {
    setOpenEditUserForm(true);
    setOpenAddUserFrom(false);
  };

  const openDeleteTaskUser = () => {
    setOpenEditUserForm(false);
    setOpenDeleteUserForm(true);
  };

  const closeDeleteTaskUser = () => {
    setOpenEditUserForm(true);
    setOpenDeleteUserForm(false);
  };

  return (
    <EditTaskUserModal
      open={open}
      openEditUserForm={openEditUserForm}
      openAddUserForm={openAddUserForm}
      openDeleteUserForm={openDeleteUserForm}
      openModal={openModal}
      closeModal={closeModal}
      openAddTaskUser={openAddTaskUser}
      openDeleteTaskUser={openDeleteTaskUser}
      closeAddTaskUser={closeAddTaskUser}
      closeDeleteTaskUser={closeDeleteTaskUser}
      approvedGroup={props.approvedGroup}
      groupTasksListForEachUser={props.groupTasksListForEachUser}
      participatingTaskUsers={props.participatingTaskUsers}
    />
  );
};

export default EditTaskUserModalContainer;
