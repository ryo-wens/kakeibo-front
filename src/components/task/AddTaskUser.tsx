import React, { useCallback, useState } from 'react';
import { AddButton } from '../uikit';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton } from '../todo';
import { Group } from '../../reducks/groups/types';
import { GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttons: {
      display: 'flex',
    },
  })
);

interface AddTaskUserProps {
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTasksListForEachUser;
}

const AddTaskUser = (props: AddTaskUserProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [checkedUserIds, setCheckedUserIds] = useState<Array<string>>([]);

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
    setCheckedUserIds([]);
  }, [setOpen, setCheckedUserIds]);

  const assignUser = useCallback(
    (userId: string) => {
      setCheckedUserIds((prevState) => {
        if (prevState.includes(userId)) {
          const nextState = prevState.filter((prevUserId) => prevUserId !== userId);
          return [...nextState];
        } else {
          return [...prevState, userId];
        }
      });
    },
    [setCheckedUserIds]
  );

  const existsAddTasksUser = () => {
    const user = [];
    if (props.approvedGroup.approved_users_list.length > props.groupTasksListForEachUser.length) {
      for (const approvedUser of props.approvedGroup.approved_users_list) {
        let isTasksListUser = false;

        for (const groupTasksList of props.groupTasksListForEachUser) {
          if (groupTasksList.user_id === approvedUser.user_id) {
            isTasksListUser = true;
            break;
          }
        }

        if (!isTasksListUser)
          user.push(
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedUserIds.includes(approvedUser.user_id)}
                  onClick={() => assignUser(approvedUser.user_id)}
                  color="primary"
                />
              }
              label={approvedUser.user_name}
              key={approvedUser.user_id}
            />
          );
      }
    } else if (props.groupTasksListForEachUser.length === 0) {
      for (const approvedUser of props.approvedGroup.approved_users_list) {
        user.push(
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedUserIds.includes(approvedUser.user_id)}
                onClick={() => assignUser(approvedUser.user_id)}
                color="primary"
              />
            }
            label={approvedUser.user_name}
            key={approvedUser.user_id}
          />
        );
      }
    } else {
      user.push(<span>グループメンバー全員がタスクに参加しています</span>);
    }
    return user;
  };

  const body = (
    <div className={classes.paper}>
      <h3 id="simple-modal-title">タスクユーザーを追加</h3>
      <FormGroup>{existsAddTasksUser()}</FormGroup>
      <div className={classes.buttons}>
        <TodoButton
          label={'追加'}
          disabled={checkedUserIds.length === 0}
          onClick={() => closeModal()}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => closeModal()} />
      </div>
    </div>
  );

  return (
    <div>
      <AddButton label={'タスクユーザーを追加'} onClick={() => openModal()} />
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

export default AddTaskUser;
