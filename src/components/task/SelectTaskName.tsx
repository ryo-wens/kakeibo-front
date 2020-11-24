import React, { useCallback } from 'react';
import { GroupTasksList, TasksListItem } from '../../reducks/groupTasks/types';

interface SelectTaskNameProps {
  groupTasksList: GroupTasksList;
  setTaskItemName: React.Dispatch<React.SetStateAction<string>>;
  setTaskItemId: React.Dispatch<React.SetStateAction<number>>;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  const selectTaskName = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value !== String(0)) {
        const idx = props.groupTasksList.findIndex(
          (groupTaskListItem) => groupTaskListItem.id === Number(event.target.value)
        );
        props.setTaskItemName(props.groupTasksList[idx].task_name);
      } else if (event.target.value === String(0)) {
        props.setTaskItemName('');
      }
      props.setTaskItemId(Number(event.target.value));
    },
    [props.setTaskItemName]
  );

  return (
    <form>
      <select name={'select-task-name'} required={true} onChange={selectTaskName}>
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
