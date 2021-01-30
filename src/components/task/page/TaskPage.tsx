import React from 'react';
import { Group } from '../../../reducks/groups/types';

import './task-page.scss';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TaskUsers,
} from '../../../reducks/groupTasks/types';
import TaskListArea from './taskListArea/TaskListArea';
import TaskToolBarAreaContainer from '../../../containers/task/page/Area/TaskToolBarAreaContainer';
import TaskTableArea from './TaskTableArea/TaskTableArea';

interface TaskPageProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  approvedGroup: Group;
  taskListForUser: GroupTasksListForEachUser;
  participatingTaskUsers: TaskUsers;
  taskList: GroupTasksList;
  groupId: number;
}

const TaskPage = (props: TaskPageProps) => {
  return (
    <div className="task-page">
      <TaskToolBarAreaContainer
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
        approvedGroup={props.approvedGroup}
        groupTasksListForEachUser={props.taskListForUser}
        participatingTaskUsers={props.participatingTaskUsers}
      />
      <TaskListArea taskList={props.taskList} />
      <TaskTableArea
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
        approvedGroup={props.approvedGroup}
        taskListForUser={props.taskListForUser}
        participatingTaskUsers={props.participatingTaskUsers}
        taskList={props.taskList}
        groupId={props.groupId}
      />
    </div>
  );
};

export default TaskPage;
