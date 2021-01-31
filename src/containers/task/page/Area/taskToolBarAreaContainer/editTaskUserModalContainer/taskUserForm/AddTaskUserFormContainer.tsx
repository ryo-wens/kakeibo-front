import React, { useState } from 'react';
import { ApprovedGroupUsers, Group } from '../../../../../../../reducks/groups/types';
import { GroupTasksListForEachUser } from '../../../../../../../reducks/groupTasks/types';
import { useDispatch } from 'react-redux';
import TaskUserForm from '../../../../../../../components/task/modules/form/taskUserForm/TaskUserForm';
import { addGroupTasksUsers } from '../../../../../../../reducks/groupTasks/operations';

interface AddTaskUserFormContainerProps {
  approvedGroup: Group;
  closeTaskUserOperation: () => void;
  closeModal: () => void;
  groupTasksListForEachUser: GroupTasksListForEachUser;
}

const AddTaskUserFormContainer = (props: AddTaskUserFormContainerProps) => {
  const dispatch = useDispatch();
  const [checkedUserIds, setCheckedUserIds] = useState<Array<string>>([]);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedUserIds.includes(event.target.value)) {
      setCheckedUserIds(checkedUserIds.filter((id) => id !== event.target.value));
    } else {
      setCheckedUserIds([...checkedUserIds, event.target.value]);
    }
  };

  const getNotParticipatingTaskUsers = (
    approvedUserList: ApprovedGroupUsers,
    participatingTaskUsers: GroupTasksListForEachUser
  ) => {
    const existsParticipatingTaskUsers = participatingTaskUsers.length !== 0;

    if (existsParticipatingTaskUsers) {
      for (const participatingTaskUser of participatingTaskUsers) {
        const idx = approvedUserList.findIndex((approvedUser) => {
          return approvedUser.user_id === participatingTaskUser.user_id;
        });

        approvedUserList.splice(idx, 1);
      }
    }
    return approvedUserList;
  };

  const notParticipatingTaskUsers: ApprovedGroupUsers = getNotParticipatingTaskUsers(
    props.approvedGroup.approved_users_list.concat(),
    props.groupTasksListForEachUser
  );

  return (
    <TaskUserForm
      title={'タスクユーザーを追加'}
      buttonLabel={'追加'}
      checkedUserIds={checkedUserIds}
      closeTaskUserOperation={props.closeTaskUserOperation}
      closeModal={props.closeModal}
      displayTaskUserList={notParticipatingTaskUsers}
      operateTaskUsers={() => {
        dispatch(addGroupTasksUsers(props.approvedGroup.group_id, checkedUserIds));
        props.closeTaskUserOperation();
      }}
      handleChangeChecked={handleChangeChecked}
      existsDisplayTaskUsers={notParticipatingTaskUsers.length !== 0}
      message={'グループメンバー全員がタスクに参加しています。'}
      buttonClassName={'task-user-form__add-btn'}
    />
  );
};

export default AddTaskUserFormContainer;
