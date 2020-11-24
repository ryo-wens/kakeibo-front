import React, { useCallback, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import '../../assets/task/edit-task-user.scss';
import '../../assets/modules/task-btn.scss';
import { GroupTasksListForEachUser, UserTasksListItem } from '../../reducks/groupTasks/types';
import { OperateTaskUser } from './index';
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
  const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);

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

  const openDeleteTaskUser = useCallback(() => {
    setOpenEditUser(false);
    setOpenDeleteUser(true);
  }, [setOpenDeleteUser, setOpenEditUser]);

  const closeDeleteTaskUser = useCallback(() => {
    setOpenEditUser(true);
    setOpenDeleteUser(false);
  }, [setOpenDeleteUser, setOpenEditUser]);

  const switchOperateTaskUser = () => {
    if (openEditUser && !openAddUser) {
      return (
        <>
          <div className="edit-task-user-modal__position">
            <h3 className="edit-task-user-modal__title">タスクリスト</h3>
            <button className="edit-task-user-modal__btn-position" onClick={() => closeModal()}>
              <CloseIcon />
            </button>
          </div>
          {!props.groupTasksListForEachUser.length ? (
            <span className="edit-task-user-modal__text">
              現在、タスクに参加しているメンバーはいません。
            </span>
          ) : (
            <ul className="edit-task-user-modal__user-list">
              {props.groupTasksListForEachUser.map((userTasksListItem: UserTasksListItem) => {
                return (
                  <li className="edit-task-user-modal__user-list-item" key={userTasksListItem.id}>
                    {userTasksListItem.user_id}
                  </li>
                );
              })}
            </ul>
          )}
          <div className="edit-task-user-modal__choice-position">
            <span className="edit-task-user-modal__choice">タスクユーザーを追加</span>
            <button className="edit-task-user-modal__choice-btn" onClick={() => openAddTaskUser()}>
              <ChevronRightIcon />
            </button>
          </div>
          <div className="edit-task-user-modal__choice-position">
            <span className="edit-task-user-modal__choice">タスクユーザーを削除</span>
            <button
              className="edit-task-user-modal__choice-btn"
              onClick={() => openDeleteTaskUser()}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </>
      );
    } else if (!openEditUser && openAddUser) {
      return (
        <OperateTaskUser
          approvedGroup={props.approvedGroup}
          closeTaskUserOperation={closeAddTaskUser}
          closeModal={closeModal}
          groupTasksListForEachUser={props.groupTasksListForEachUser}
          label={'追加'}
        />
      );
    } else if (!openEditUser && openDeleteUser) {
      return (
        <OperateTaskUser
          approvedGroup={props.approvedGroup}
          closeTaskUserOperation={closeDeleteTaskUser}
          closeModal={closeModal}
          groupTasksListForEachUser={props.groupTasksListForEachUser}
          label={'削除'}
        />
      );
    }
  };

  const body = <div className={classes.paper}>{switchOperateTaskUser()}</div>;

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
