import React, { useState } from 'react';
import { Group } from '../../../../../reducks/groups/types';
import { GroupTaskListForEachUser, TaskUsers } from '../../../../../reducks/groupTasks/types';
import EditTaskUserModal from '../../../../../components/task/modules/area/taskToolBarArea/EditTaskUserModal/EditTaskUserModal';

interface EditTaskUserModalContainerProps {
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTaskListForEachUser;
  participatingTaskUsers: TaskUsers;
}

const EditTaskUserModalContainer = (props: EditTaskUserModalContainerProps) => {
  const [open, setOpen] = useState(false);
  const [openEditUserForm, setOpenEditUserForm] = useState(true);
  const [openAddUserForm, setOpenAddUserFrom] = useState(false);
  const [openDeleteUserForm, setOpenDeleteUserForm] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
    setOpenEditUserForm(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setOpenAddUserFrom(false);
  };

  const handleOpenAddTaskUserForm = () => {
    setOpenEditUserForm(false);
    setOpenAddUserFrom(true);
  };

  const handleCloseAddTaskUserForm = () => {
    setOpenEditUserForm(true);
    setOpenAddUserFrom(false);
  };

  const handleOpenDeleteTaskUserForm = () => {
    setOpenEditUserForm(false);
    setOpenDeleteUserForm(true);
  };

  const handleCloseDeleteTaskUserForm = () => {
    setOpenEditUserForm(true);
    setOpenDeleteUserForm(false);
  };

  return (
    <EditTaskUserModal
      open={open}
      openEditUserForm={openEditUserForm}
      openAddUserForm={openAddUserForm}
      openDeleteUserForm={openDeleteUserForm}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleOpenAddTaskUserForm={handleOpenAddTaskUserForm}
      handleCloseAddTaskUserForm={handleCloseAddTaskUserForm}
      handleOpenDeleteTaskUserForm={handleOpenDeleteTaskUserForm}
      handleCloseDeleteTaskUserForm={handleCloseDeleteTaskUserForm}
      approvedGroup={props.approvedGroup}
      groupTasksListForEachUser={props.groupTasksListForEachUser}
      participatingTaskUsers={props.participatingTaskUsers}
    />
  );
};

export default EditTaskUserModalContainer;
