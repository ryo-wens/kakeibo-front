import React from 'react';
import { TaskUsers } from '../../../../reducks/groupTasks/types';
import '../../../../assets/modules/selector.scss';

interface SelectTaskUserProps {
  participatingTaskUsers: TaskUsers;
  taskUserId: number;
  selectTaskUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTaskUser = (props: SelectTaskUserProps) => {
  return (
    <form>
      <select
        className="selector__box"
        name={'select-task-user'}
        required={true}
        onChange={props.selectTaskUser}
        defaultValue={props.taskUserId}
      >
        <option value={0}>ユーザーを選択</option>
        {props.participatingTaskUsers.map((taskUser) => (
          <option key={taskUser.id} value={taskUser.id}>
            {taskUser.user_name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTaskUser;
