import React from 'react';
import { GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { Group } from '../../reducks/groups/types';

interface SelectTaskUserProps {
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  selectTaskUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTaskUser = (props: SelectTaskUserProps) => {
  const taskUsers = () => {
    interface TaskUsers {
      taskUserId: number;
      taskName: string;
    }
    const taskUsers: Array<TaskUsers> = [];

    for (const groupTasksListItem of props.groupTasksListForEachUser) {
      const taskUserId = groupTasksListItem.user_id;
      const approvedUserIdx = props.approvedGroup.approved_users_list.findIndex(
        (approvedUser) => approvedUser.user_id === taskUserId
      );
      const taskUser: TaskUsers = {
        taskUserId: groupTasksListItem.id,
        taskName: props.approvedGroup.approved_users_list[approvedUserIdx].user_name,
      };
      taskUsers.push(taskUser);
    }
    return taskUsers;
  };

  return (
    <form>
      <select name={'select-task-name'} required={true} onChange={props.selectTaskUser}>
        <option value={0}>ユーザーを選択</option>
        {taskUsers().map((taskUser) => (
          <option key={taskUser.taskUserId} value={taskUser.taskUserId}>
            {taskUser.taskName}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTaskUser;
