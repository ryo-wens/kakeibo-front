import React, { useCallback } from 'react';
import { GroupTasksListForEachUser, TaskUser, TaskUsers } from '../../reducks/groupTasks/types';
import { Group, Groups } from '../../reducks/groups/types';
import '../../assets/task/select-task-user.scss';

interface SelectTaskUserProps {
  groupId: number;
  approvedGroups: Groups;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  taskUserId: number;
  setTaskUserId: React.Dispatch<React.SetStateAction<number>>;
  label: string;
}

const SelectTaskUser = (props: SelectTaskUserProps) => {
  const groupIdx = props.approvedGroups.findIndex(
    (approvedGroup) => approvedGroup.group_id === props.groupId
  );
  const approvedGroup: Group = props.approvedGroups[groupIdx];

  const taskUsers = () => {
    const taskUsers: TaskUsers = [];

    for (const groupTasksListItem of props.groupTasksListForEachUser) {
      const taskUserId = groupTasksListItem.user_id;
      const approvedUserIdx = approvedGroup.approved_users_list.findIndex((approvedUser) => {
        return approvedUser.user_id === taskUserId;
      });
      const taskUser: TaskUser = {
        taskUserId: groupTasksListItem.id,
        taskName: approvedGroup.approved_users_list[approvedUserIdx].user_name,
      };
      taskUsers.push(taskUser);
    }
    return taskUsers;
  };

  const selectTaskUser = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      props.setTaskUserId(Number(event.target.value));
    },
    [props.setTaskUserId]
  );

  const currentSelectTaskUser = () => {
    if (props.label === '保存') {
      return props.taskUserId;
    } else if (props.label === '追加') {
      return 0;
    }
  };

  return (
    <form>
      <select
        name={'select-task-name'}
        className="select-task-user"
        required={true}
        onChange={selectTaskUser}
        defaultValue={currentSelectTaskUser()}
      >
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
