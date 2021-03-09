import React from 'react';
import { Group } from '../../../reducks/groups/types';
import './task-page.scss';
import {
  GroupTaskList,
  GroupTaskListForEachUser,
  TaskUsers,
} from '../../../reducks/groupTasks/types';
import TaskListArea from './taskListArea/TaskListArea';
import TaskToolBarAreaContainer from '../../../containers/task/page/taskToolBarArea/TaskToolBarAreaContainer';
import TaskTableArea from './taskTableArea/TaskTableArea';

interface TaskPageProps {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  approvedGroup: Group;
  taskListForUser: GroupTaskListForEachUser;
  participatingTaskUsers: TaskUsers;
  taskList: GroupTaskList;
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
      <TaskListArea taskList={props.taskList} setEditing={props.setEditing} />
      <TaskTableArea
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
        taskListForUser={props.taskListForUser}
        participatingTaskUsers={props.participatingTaskUsers}
        taskList={props.taskList}
        groupId={props.groupId}
      />
    </div>
  );
};

export default TaskPage;
