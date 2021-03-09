import React from 'react';
import {
  GroupTaskList,
  GroupTaskListForEachUser,
  TaskListItem,
  TaskUsers,
} from '../../../../reducks/groupTasks/types';
import './task-table-area.scss';
import AssignmentTaskModalContainer from '../../../../containers/task/page/taskTableArea/assignmentTaskModal/AssignmentTaskModalContainer';
import WeeklyTableContainer from '../../../../containers/task/page/taskTableArea/weeklyTable/WeeklyTableContainer';
import AssignmentTaskTableContainer from '../../../../containers/task/page/taskTableArea/assignmentTaskTable/AssiginmentTaskTableContainer';

interface TaskTableAreaProps {
  participatingTaskUsers: TaskUsers;
  groupId: number;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  taskListForUser: GroupTaskListForEachUser;
  taskList: GroupTaskList;
}

const TaskTableArea = (props: TaskTableAreaProps) => {
  return (
    <div className="task-table-area">
      <table className="task-table-area__table">
        <thead>
          <WeeklyTableContainer selectedDate={props.selectedDate} />
        </thead>
        <tbody>
          {props.taskList.map((tasksListItem: TaskListItem) => {
            if (
              tasksListItem.cycle_type !== null &&
              props.taskListForUser.length &&
              tasksListItem.group_id === props.groupId
            ) {
              return (
                <tr className="task-table-area__list-for-user" key={tasksListItem.id}>
                  <AssignmentTaskTableContainer
                    participatingTaskUsers={props.participatingTaskUsers}
                    groupId={props.groupId}
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
      <AssignmentTaskModalContainer
        participatingTaskUsers={props.participatingTaskUsers}
        groupId={props.groupId}
      />
    </div>
  );
};

export default TaskTableArea;
