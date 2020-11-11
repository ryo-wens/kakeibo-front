import React, { useCallback, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import '../../assets/task/edit-task-user.scss';
import '../../assets/modules/task-button.scss';
import { GroupTasksListForEachUser, UserTasksListItem } from '../../reducks/groupTasks/types';
import { AddTaskUser } from './index';
import { Group } from '../../reducks/groups/types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface EditTaskUserProps {
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTasksListForEachUser;
}

const EditTaskUser = (props: EditTaskUserProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [openEditUser, setOpenEditUser] = useState<boolean>(true);
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setOpen(true);
    setOpenEditUser(true);
  }, [setOpen, setOpenEditUser]);

  const closeModal = useCallback(() => {
    setOpen(false);
    setOpenAddUser(false);
  }, [setOpen, setOpenAddUser]);

  const openAddTaskUser = useCallback(() => {
    setOpenEditUser(false);
    setOpenAddUser(true);
  }, [setOpenAddUser, setOpenEditUser]);

  const closeAddTaskUser = useCallback(() => {
    setOpenEditUser(true);
    setOpenAddUser(false);
  }, [setOpenAddUser, setOpenEditUser]);

  const switchOperationTaskUser = () => {
    if (openEditUser && !openAddUser) {
      return (
        <>
          <div className="edit-task-user-modal__position">
            <h3 className="edit-task-user-modal__title">タスクリスト</h3>
            <button className="edit-task-user-modal__button-position" onClick={() => closeModal()}>
              <CloseIcon />
            </button>
          </div>
          <ul>
            {props.groupTasksListForEachUser.map((userTasksListItem: UserTasksListItem) => {
              return <li key={userTasksListItem.id}>{userTasksListItem.user_id}</li>;
            })}
          </ul>
          <div className="edit-task-user-modal__choice-position">
            <span className="edit-task-user-modal__choice">タスクユーザーを追加</span>
            <button className={'icon--btn'} onClick={() => openAddTaskUser()}>
              <ChevronRightIcon />
            </button>
          </div>
        </>
      );
    } else if (!openEditUser && openAddUser) {
      return (
        <AddTaskUser
          approvedGroup={props.approvedGroup}
          groupTasksListForEachUser={props.groupTasksListForEachUser}
          closeAddTaskUser={closeAddTaskUser}
          closeModal={closeModal}
        />
      );
    }
  };

  const body = <div className={classes.paper}>{switchOperationTaskUser()}</div>;

  return (
    <div>
      <button className="task--btn" disabled={false} onClick={() => openModal()}>
        タスクユーザーを編集
      </button>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default EditTaskUser;
