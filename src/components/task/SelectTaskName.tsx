import React from 'react';
import { GroupTasksList, TasksListItem } from '../../reducks/groupTasks/types';
import '../../assets/modules/selector.scss';

interface SelectTaskNameProps {
  selectTaskName: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  groupTasksList: GroupTasksList;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  return (
    <form>
      <select
        className="selector__box"
        name={'select-task-name'}
        required={true}
        onChange={props.selectTaskName}
      >
        <option value={0}>タスク名を選択</option>
        {props.groupTasksList.map(
          (groupTasksListItem: TasksListItem) =>
            groupTasksListItem.cycle_type !== 'none' &&
            groupTasksListItem.group_tasks_users_id === null && (
              <option key={groupTasksListItem.id} value={groupTasksListItem.id}>
                {groupTasksListItem.task_name}
              </option>
            )
        )}
      </select>
    </form>
  );
};

export default SelectTaskName;
