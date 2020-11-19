import React from 'react';
import { GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { Group } from '../../reducks/groups/types';

interface SelectTaskUserProps {
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  selectTaskUser: (event: React.ChangeEvent<{ value: string }>) => void;
}

const SelectTaskUser = (props: SelectTaskUserProps) => {
  const taskUsers = () => {
    const taskUsersName: Array<string> = [];

    for (const groupTasksListItem of props.groupTasksListForEachUser) {
      const taskUserId = groupTasksListItem.user_id;
      const approvedUserIdx = props.approvedGroup.approved_users_list.findIndex(
        (approvedUser) => approvedUser.user_id === taskUserId
      );

      taskUsersName.push(props.approvedGroup.approved_users_list[approvedUserIdx].user_name);
    }
    return taskUsersName;
  };

  return (
    <form>
      <select name={'select-task-name'} required={true} onChange={props.selectTaskUser}>
        {taskUsers().map((taskUserName: string, index: number) => (
          <option key={index} value={taskUserName}>
            {taskUserName}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTaskUser;
