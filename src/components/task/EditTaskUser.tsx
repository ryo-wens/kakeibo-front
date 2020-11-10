import React, { useCallback, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import '../../assets/task/edit-task-user.scss';
import '../../assets/modules/task-button.scss';
import { GroupTasksListForEachUser, UserTasksListItem } from '../../reducks/groupTasks/types';

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
  groupTasksListForEachUser: GroupTasksListForEachUser;
}

const EditTaskUser = (props: EditTaskUserProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const body = (
    <div className={classes.paper}>
      <h3 className="edit-task-user-modal__title">タスクリスト</h3>
      <ul>
        {props.groupTasksListForEachUser.map((userTasksListItem: UserTasksListItem) => {
          return <li key={userTasksListItem.id}>{userTasksListItem.user_id}</li>;
        })}
      </ul>
    </div>
  );

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
