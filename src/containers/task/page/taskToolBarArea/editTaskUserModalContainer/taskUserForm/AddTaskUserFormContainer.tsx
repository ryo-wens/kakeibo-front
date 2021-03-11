import React, { useState } from 'react';
import { ApprovedGroupUsers, Group } from '../../../../../../reducks/groups/types';
import {
  AddGroupTaskUsersReq,
  GroupTaskListForEachUser,
} from '../../../../../../reducks/groupTasks/types';
import { useDispatch } from 'react-redux';
import TaskUserForm from '../../../../../../components/task/modules/form/taskUserForm/TaskUserForm';
import { addTaskUsers } from '../../../../../../reducks/groupTasks/operations';
import { executeAfterAsyncProcess } from '../../../../../../lib/function';

interface AddTaskUserFormContainerProps {
  approvedGroup: Group;
  handleCloseAddTaskUserForm: () => void;
  handleCloseModal: () => void;
  groupTasksListForEachUser: GroupTaskListForEachUser;
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
    participatingTaskUsers: GroupTaskListForEachUser
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

  const handleAddTaskUsers = () => {
    const requestData: AddGroupTaskUsersReq = {
      users_list: checkedUserIds,
    };

    return executeAfterAsyncProcess(
      dispatch(addTaskUsers(props.approvedGroup.group_id, requestData)),
      () => props.handleCloseAddTaskUserForm()
    );
  };

  return (
    <TaskUserForm
      title={'タスクユーザーを追加'}
      buttonLabel={'追加'}
      checkedUserIds={checkedUserIds}
      handleCloseModal={props.handleCloseModal}
      handleCloseTaskUserForm={props.handleCloseAddTaskUserForm}
      displayTaskUserList={notParticipatingTaskUsers}
      handleTaskUsers={() => handleAddTaskUsers()}
      handleChangeChecked={handleChangeChecked}
      existsDisplayTaskUsers={notParticipatingTaskUsers.length !== 0}
      message={'グループメンバー全員がタスクに参加しています。'}
      buttonClassName={'task-user-form__add-btn'}
    />
  );
};

export default AddTaskUserFormContainer;
