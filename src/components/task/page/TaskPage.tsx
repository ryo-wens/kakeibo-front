import React from 'react';
import { Group } from '../../../reducks/groups/types';
import styles from './TaskPage.module.scss';
import {
  GroupTaskList,
  GroupTaskListForEachUser,
  TaskUsers,
} from '../../../reducks/groupTasks/types';
import TaskListArea from '../modules/area/taskListArea/TaskListArea';
import TaskToolBarAreaContainer from '../../../containers/task/page/taskToolBarArea/TaskToolBarAreaContainer';
import TaskTableArea from '../modules/area/taskTableArea/TaskTableArea';

interface TaskPageProps {
  selectedDate: Date | null;
  approvedGroup: Group;
  taskListForUser: GroupTaskListForEachUser;
  participatingTaskUsers: TaskUsers;
  taskList: GroupTaskList;
  groupId: number;
  handleChangeSelectedDate: (date: Date | null) => void;
  handleStopPolling: (value: boolean) => void;
}

const TaskPage = (props: TaskPageProps) => {
  return (
    <div className={styles.wrapper}>
      <TaskToolBarAreaContainer
        selectedDate={props.selectedDate}
        handleChangeSelectedDate={props.handleChangeSelectedDate}
        approvedGroup={props.approvedGroup}
        groupTasksListForEachUser={props.taskListForUser}
        participatingTaskUsers={props.participatingTaskUsers}
      />
      <TaskListArea taskList={props.taskList} handleStopPolling={props.handleStopPolling} />
      <TaskTableArea
        selectedDate={props.selectedDate}
        taskListForUser={props.taskListForUser}
        participatingTaskUsers={props.participatingTaskUsers}
        taskList={props.taskList}
        groupId={props.groupId}
      />
    </div>
  );
};

export default TaskPage;
