import React from 'react';
import { GroupTasksList, TasksListItem } from '../../reducks/groupTasks/types';

interface SelectTaskNameProps {
  groupTasksList: GroupTasksList;
  selectTaskName: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  return (
    <form>
      <select name={'select-task-name'} required={true} onChange={props.selectTaskName}>
        <option value={0}>タスク名を選択</option>
        {props.groupTasksList.map(
          (groupTasksListItem: TasksListItem) =>
            groupTasksListItem.cycle_type !== 'none' && (
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
