import React, { useState } from 'react';
import { ApprovedGroupUsers, Group } from '../../../../../../reducks/groups/types';
import {
  DeleteGroupTaskUsersReq,
  GroupTaskListForEachUser,
  ParticipatingTaskUsers,
} from '../../../../../../reducks/groupTasks/types';
import { useDispatch } from 'react-redux';
import TaskUserForm from '../../../../../../components/task/modules/form/taskUserForm/TaskUserForm';
import { deleteTaskUsers } from '../../../../../../reducks/groupTasks/operations';
import { executeAfterAsyncProcess } from '../../../../../../lib/function';

interface DeleteTaskUserFormContainerProps {
  approvedGroup: Group;
  handleCloseModal: () => void;
  handleCloseDeleteTaskUserForm: () => void;
  groupTasksListForEachUser: GroupTaskListForEachUser;
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
    participatingTaskUsers: GroupTaskListForEachUser
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

  const handleDeleteTaskUsers = () => {
    const requestData: DeleteGroupTaskUsersReq = {
      users_list: checkedUserIds,
    };

    return executeAfterAsyncProcess(
      dispatch(deleteTaskUsers(props.approvedGroup.group_id, requestData)),
      () => props.handleCloseDeleteTaskUserForm()
    );
  };

  return (
    <TaskUserForm
      title={'タスクユーザーを削除'}
      buttonLabel={'削除'}
      checkedUserIds={checkedUserIds}
      handleCloseModal={props.handleCloseModal}
      handleCloseTaskUserForm={props.handleCloseDeleteTaskUserForm}
      displayTaskUserList={participatingTaskUsers}
      handleTaskUsers={() => handleDeleteTaskUsers()}
      handleChangeChecked={handleChangeChecked}
      existsDisplayTaskUsers={participatingTaskUsers.length !== 0}
      message={'現在、タスクに参加しているメンバーはいません。'}
      buttonClassName={'task-user-form__delete-btn'}
    />
  );
};

export default DeleteTaskUserFormContainer;
