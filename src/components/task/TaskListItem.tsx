import React, { useCallback, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import '../../assets/task/task-list-item.scss';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { TasksListItem } from '../../reducks/groupTasks/types';
import { InputTask } from './index';
import { deleteTaskItem, editTaskItem } from '../../reducks/groupTasks/operations';

interface TaskListItemProps {
  taskListItem: TasksListItem;
  taskName: string;
  inputTaskName: (event: React.ChangeEvent<{ value: string }>) => void;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
}

const TaskListItem = (props: TaskListItemProps) => {
  const [openEditTask, setOpenEditTask] = useState<boolean>(false);

  const openEditInputTask = useCallback(() => {
    setOpenEditTask(true);
    props.setTaskName(props.taskListItem.task_name);
  }, [setOpenEditTask, props.setTaskName, props.taskListItem.task_name]);

  const closeEditInputTask = useCallback(() => {
    setOpenEditTask(false);
    props.setTaskName('');
  }, [setOpenEditTask]);

  const switchEditInputTask = (groupTaskListItem: TasksListItem) => {
    const noDifferenceTaskName = props.taskName === groupTaskListItem.task_name;

    if (!openEditTask) {
      return (
        <li className="task-list-item" key={groupTaskListItem.id}>
          <FiberManualRecordIcon
            className="task-list-item__color-icon"
            style={{ fontSize: '1.2rem' }}
          />
          <span className="task-list-item__text">{props.taskListItem.task_name}</span>
          <EditIcon className="task-list-item__edit-icon" onClick={() => openEditInputTask()} />
        </li>
      );
    } else if (openEditTask) {
      return (
        <>
          <div key={groupTaskListItem.id}>
            <InputTask
              buttonLabel={'保存'}
              titleLabel={'変更'}
              groupId={props.taskListItem.group_id}
              inputTaskClose={closeEditInputTask}
              inputTaskName={props.inputTaskName}
              noDifferenceTaskName={noDifferenceTaskName}
              operation={editTaskItem(
                groupTaskListItem.group_id,
                groupTaskListItem.id,
                groupTaskListItem.base_date,
                groupTaskListItem.cycle_type,
                groupTaskListItem.cycle,
                props.taskName,
                groupTaskListItem.group_tasks_users_id
              )}
              taskName={props.taskName}
              deleteOperation={deleteTaskItem(groupTaskListItem.group_id, groupTaskListItem.id)}
            />
          </div>
        </>
      );
    }
  };

  return <>{switchEditInputTask(props.taskListItem)}</>;
};

export default TaskListItem;
