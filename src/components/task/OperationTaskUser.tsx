import React, { useCallback, useState } from 'react';
import { TodoButton } from '../todo';
import { Group } from '../../reducks/groups/types';
import { GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/task/add-task-user.scss';
import { useDispatch } from 'react-redux';
import { addGroupTasksUsers } from '../../reducks/groupTasks/operations';

interface OperationTaskUserProps {
  approvedGroup: Group;
  closeTaskUserOperation: () => void;
  closeModal: () => void;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  label: string;
}

const OperationTaskUser = (props: OperationTaskUserProps) => {
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

  const existsTaskUsers = () => {
    if (props.groupTasksListForEachUser.length) {
      return props.groupTasksListForEachUser.map((groupTasksListItem) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedUserIds.includes(groupTasksListItem.user_id)}
                onClick={() => assignUser(groupTasksListItem.user_id)}
                color="primary"
              />
            }
            label={groupTasksListItem.user_id}
            key={groupTasksListItem.id}
          />
        );
      });
    } else {
      return <span>現在、タスクに参加しているメンバーはいません。</span>;
    }
  };

  return (
    <>
      <div className="add-task-user-modal__position">
        <button className={'icon--btn'} onClick={() => props.closeTaskUserOperation()}>
          <ChevronLeftIcon />
        </button>
        <h3 className="add-task-user-modal__title">タスクユーザーを{props.label}</h3>
        <button className={'icon--btn'} onClick={() => props.closeModal()}>
          <CloseIcon />
        </button>
      </div>
      <FormGroup>{props.label === '追加' ? existsAddTasksUser() : existsTaskUsers()}</FormGroup>
      <TodoButton
        label={props.label}
        disabled={checkedUserIds.length === 0}
        onClick={() => dispatch(addGroupTasksUsers(props.approvedGroup.group_id, checkedUserIds))}
      />
    </>
  );
};

export default OperationTaskUser;
