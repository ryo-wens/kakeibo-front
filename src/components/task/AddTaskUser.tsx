import React, { useCallback, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TodoButton } from '../todo';
import { Group } from '../../reducks/groups/types';
import { GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/task/add-task-user.scss';
import { useDispatch } from 'react-redux';
import { addGroupTasksUsers } from '../../reducks/groupTasks/operations';

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
  closeAddTaskUser: () => void;
  closeModal: () => void;
}

const AddTaskUser = (props: AddTaskUserProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checkedUserIds, setCheckedUserIds] = useState<Array<string>>([]);

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

  return (
    <>
      <div className="add-task-user-modal__position">
        <button className={'icon--btn'} onClick={() => props.closeAddTaskUser()}>
          <ChevronLeftIcon />
        </button>
        <h3 className="add-task-user-modal__title">タスクユーザーを追加</h3>
        <button className={'icon--btn'} onClick={() => props.closeModal()}>
          <CloseIcon />
        </button>
      </div>
      <FormGroup>{existsAddTasksUser()}</FormGroup>
      <div className={classes.buttons}>
        <TodoButton
          label={'追加'}
          disabled={checkedUserIds.length === 0}
          onClick={() => dispatch(addGroupTasksUsers(props.approvedGroup.group_id, checkedUserIds))}
        />
        <TodoButton
          label={'キャンセル'}
          disabled={false}
          onClick={() => props.closeAddTaskUser()}
        />
      </div>
    </>
  );
};

export default AddTaskUser;
