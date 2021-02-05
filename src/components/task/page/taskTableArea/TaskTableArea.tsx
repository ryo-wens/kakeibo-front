import React from 'react';
import { TaskListForUser, WeekTables } from '../../index';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
  TaskUsers,
} from '../../../../reducks/groupTasks/types';
import { Group } from '../../../../reducks/groups/types';
import './task-table-area.scss';
import AssignmentTaskModalContainer from '../../../../containers/task/page/taskTableAreaContainer/assignmentTaskModal/AssignmentTaskModalContainer';

interface TaskTableAreaProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  approvedGroup: Group;
  taskListForUser: GroupTasksListForEachUser;
  participatingTaskUsers: TaskUsers;
  taskList: GroupTasksList;
  groupId: number;
}

const TaskTableArea = (props: TaskTableAreaProps) => {
  return (
    <div className="task-table-area">
      <table className="task-table-area__table">
        <thead>
          <WeekTables selectedDate={props.selectedDate} />
        </thead>
        <tbody>
          {props.taskList.map((tasksListItem: TasksListItem) => {
            if (
              tasksListItem.cycle_type !== null &&
              props.taskListForUser.length &&
              props.approvedGroup !== undefined &&
              tasksListItem.group_id === props.groupId
            ) {
              return (
                <tr className="task-table-area__list-for-user" key={tasksListItem.id}>
                  <TaskListForUser
                    groupId={props.groupId}
                    approvedGroup={props.approvedGroup}
                    selectedDate={props.selectedDate}
                    groupTaskList={props.taskList}
                    groupTasksListForEachUser={props.taskListForUser}
                    tasksListItem={tasksListItem}
                  />
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <AssignmentTaskModalContainer approvedGroup={props.approvedGroup} groupId={props.groupId} />
    </div>
  );
};

export default TaskTableArea;
