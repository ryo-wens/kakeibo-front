import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import '../../assets/task/task-list-item.scss';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

interface TaskListItemProps {
  taskName: string;
}

const TaskListItem = (props: TaskListItemProps) => {
  return (
    <li className="task-list-item">
      <FiberManualRecordIcon
        className="task-list-item__color-icon"
        style={{ fontSize: '1.2rem' }}
      />
      <span className="task-list-item__text">{props.taskName}</span>
      <EditIcon className="task-list-item__edit-icon" />
    </li>
  );
};

export default TaskListItem;
