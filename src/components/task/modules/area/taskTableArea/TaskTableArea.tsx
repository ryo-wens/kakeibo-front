import React from 'react';
import {
  GroupTaskList,
  GroupTaskListForEachUser,
  TaskListItem,
  TaskUsers,
} from '../../../../../reducks/groupTasks/types';
import styles from './TaskTableArea.module.scss';
import AssignmentTaskModalContainer from '../../../../../containers/task/page/taskTableArea/assignmentTaskModal/AssignmentTaskModalContainer';
import WeeklyTableContainer from '../../../../../containers/task/page/taskTableArea/weeklyTable/WeeklyTableContainer';
import AssignmentTaskTableContainer from '../../../../../containers/task/page/taskTableArea/assignmentTaskTable/AssiginmentTaskTableContainer';

interface TaskTableAreaProps {
  participatingTaskUsers: TaskUsers;
  groupId: number;
  selectedDate: Date | null;
  taskListForUser: GroupTaskListForEachUser;
  taskList: GroupTaskList;
}

const TaskTableArea = (props: TaskTableAreaProps) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <WeeklyTableContainer selectedDate={props.selectedDate} />
        </thead>
        <tbody className={styles.tableBody}>
          {props.taskList.map((tasksListItem: TaskListItem) => {
            if (
              tasksListItem.cycle_type !== null &&
              props.taskListForUser.length &&
              tasksListItem.group_id === props.groupId
            ) {
              return (
                <AssignmentTaskTableContainer
                  participatingTaskUsers={props.participatingTaskUsers}
                  groupId={props.groupId}
                  selectedDate={props.selectedDate}
                  groupTaskList={props.taskList}
                  groupTasksListForEachUser={props.taskListForUser}
                  tasksListItem={tasksListItem}
                  key={tasksListItem.id}
                />
              );
            }
          })}
        </tbody>
      </table>
      <AssignmentTaskModalContainer
        participatingTaskUsers={props.participatingTaskUsers}
        groupId={props.groupId}
      />
    </div>
  );
};

export default TaskTableArea;
