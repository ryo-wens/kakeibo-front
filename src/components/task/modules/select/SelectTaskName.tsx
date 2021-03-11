import React from 'react';
import { GroupTaskList, TaskListItem } from '../../../../reducks/groupTasks/types';
import '../../../../assets/modules/selector.scss';

interface SelectTaskNameProps {
  handleChangeTaskName: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  groupTasksList: GroupTaskList;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  return (
    <form>
      <select
        className="selector__box"
        name={'select-task-name'}
        required={true}
        onChange={props.handleChangeTaskName}
      >
        <option value={0}>タスク名を選択</option>
        {props.groupTasksList.map(
          (listItem: TaskListItem) =>
            listItem.group_tasks_users_id === null && (
              <option key={listItem.id} value={listItem.id}>
                {listItem.task_name}
              </option>
            )
        )}
      </select>
    </form>
  );
};

export default SelectTaskName;
