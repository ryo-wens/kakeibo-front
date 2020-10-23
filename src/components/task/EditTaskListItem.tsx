import React, { useCallback, useState } from 'react';
import { InputTask } from './index';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListItemText from '@material-ui/core/ListItemText';
import { TasksListItem } from '../../reducks/groupTasks/types';

interface EditTaskListItemProps {
  closeEditTask: () => void;
  groupId: number;
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
        groupId={props.groupId}
        taskName={taskName}
        inputTaskClose={props.closeEditTask}
        inputTaskName={inputTaskName}
      />
    </>
  );
};

export default EditTaskListItem;
