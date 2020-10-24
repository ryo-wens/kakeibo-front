import React, { useCallback, useState } from 'react';
import { InputTask } from './index';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListItemText from '@material-ui/core/ListItemText';
import { TasksListItem } from '../../reducks/groupTasks/types';
import { editTaskItem } from '../../reducks/groupTasks/operations';

interface EditTaskListItemProps {
  closeEditTask: () => void;
  taskListItem: TasksListItem;
}

const EditTaskListItem = (props: EditTaskListItemProps) => {
  const [taskName, setTaskName] = useState<string>(props.taskListItem.task_name);

  const inputTaskName = useCallback(
    (event) => {
      setTaskName(event.target.value as string);
    },
    [setTaskName]
  );
  const noDifferenceTaskName = taskName === props.taskListItem.task_name;

  return (
    <>
      <ListItem button={true} onClick={() => props.closeEditTask()}>
        <ListItemIcon>
          <ArrowBackIosIcon />
        </ListItemIcon>
        <ListItemText secondary={'タスクリストへ戻る'} />
      </ListItem>
      <h4>タスクを編集</h4>
      <InputTask
        buttonLabel={'保存'}
        groupId={props.taskListItem.group_id}
        inputTaskClose={props.closeEditTask}
        inputTaskName={inputTaskName}
        noDifferenceTaskName={noDifferenceTaskName}
        operation={editTaskItem(
          props.taskListItem.group_id,
          props.taskListItem.id,
          props.taskListItem.base_date,
          props.taskListItem.cycle_type,
          props.taskListItem.cycle,
          taskName,
          props.taskListItem.group_tasks_users_id
        )}
        taskName={taskName}
      />
    </>
  );
};

export default EditTaskListItem;
