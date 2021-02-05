import React, { useState } from 'react';
import { ApprovedGroupUsers, Group } from '../../../../../../reducks/groups/types';
import {
  GroupTasksListForEachUser,
  ParticipatingTaskUsers,
} from '../../../../../../reducks/groupTasks/types';
import { useDispatch } from 'react-redux';
import TaskUserForm from '../../../../../../components/task/modules/form/taskUserForm/TaskUserForm';
import { deleteGroupTasksUsers } from '../../../../../../reducks/groupTasks/operations';

interface DeleteTaskUserFormContainerProps {
  approvedGroup: Group;
  closeTaskUserOperation: () => void;
  closeModal: () => void;
  groupTasksListForEachUser: GroupTasksListForEachUser;
}

const DeleteTaskUserFormContainer = (props: DeleteTaskUserFormContainerProps) => {
  const dispatch = useDispatch();
  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedUserIds.includes(event.target.value)) {
      setCheckedUserIds(checkedUserIds.filter((id) => id !== event.target.value));
    } else {
      setCheckedUserIds([...checkedUserIds, event.target.value]);
    }
  };

  const getParticipatingTaskUsers = (
    approvedUserList: ApprovedGroupUsers,
    participatingTaskUsers: GroupTasksListForEachUser
  ) => {
    const notExistsParticipatingTaskUsers = participatingTaskUsers.length === 0;
    const participatingUsers: ParticipatingTaskUsers = {
      users: [],
    };

    if (notExistsParticipatingTaskUsers) {
      return participatingUsers.users;
    } else {
      for (const participatingTaskUser of participatingTaskUsers) {
        const idx = approvedUserList.findIndex(
          (approvedUser) => approvedUser.user_id === participatingTaskUser.user_id
        );

        participatingUsers.users = [...participatingUsers.users, approvedUserList[idx]];
      }

      return participatingUsers.users;
    }
  };

  const participatingTaskUsers: ApprovedGroupUsers = getParticipatingTaskUsers(
    props.approvedGroup.approved_users_list.concat(),
    props.groupTasksListForEachUser
  );

  return (
    <TaskUserForm
      title={'タスクユーザーを削除'}
      buttonLabel={'削除'}
      checkedUserIds={checkedUserIds}
      closeTaskUserOperation={props.closeTaskUserOperation}
      closeModal={props.closeModal}
      displayTaskUserList={participatingTaskUsers}
      operateTaskUsers={() => {
        dispatch(deleteGroupTasksUsers(props.approvedGroup.group_id, checkedUserIds));
        props.closeTaskUserOperation();
      }}
      handleChangeChecked={handleChangeChecked}
      existsDisplayTaskUsers={participatingTaskUsers.length !== 0}
      message={'現在、タスクに参加しているメンバーはいません。'}
      buttonClassName={'task-user-form__delete-btn'}
    />
  );
};

export default DeleteTaskUserFormContainer;
