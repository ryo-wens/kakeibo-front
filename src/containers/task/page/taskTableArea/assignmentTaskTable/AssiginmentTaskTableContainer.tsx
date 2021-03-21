import React from 'react';
import {
  GroupTaskList,
  GroupTaskListForEachUser,
  TaskListItem,
  TaskUsers,
} from '../../../../../reducks/groupTasks/types';
import AssignTaskTable from '../../../../../components/task/modules/area/taskTableArea/assignTaskTable/AssignTaskTable';

interface AssignmentTaskTableContainerProps {
  participatingTaskUsers: TaskUsers;
  groupId: number;
  selectedDate: Date | null;
  groupTaskList: GroupTaskList;
  groupTasksListForEachUser: GroupTaskListForEachUser;
  tasksListItem: TaskListItem;
}

const AssignmentTaskTableContainer = (props: AssignmentTaskTableContainerProps) => {
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const baseDate: Date =
    props.tasksListItem.base_date !== null ? props.tasksListItem.base_date : new Date();

  const baseDay = new Date(baseDate).getTime();
  const cycleType = props.tasksListItem.cycle_type;
  const cycle = props.tasksListItem.cycle !== null ? props.tasksListItem.cycle : 0;

  const assignTaskForUser = (differenceDay: number, baseDay: number, currentDay: number) => {
    const isCycleTypeConsecutive = cycleType === 'consecutive';
    const equalsImplementationDateAndCycle = cycleType === 'every' && differenceDay % cycle === 0;
    const equalsBaseDate = cycleType === 'none' && baseDay === currentDay;

    return isCycleTypeConsecutive || equalsImplementationDateAndCycle || equalsBaseDate;
  };

  return (
    <AssignTaskTable
      groupId={props.groupId}
      participatingTaskUsers={props.participatingTaskUsers}
      tasksListItem={props.tasksListItem}
      baseDay={baseDay}
      selectedDate={selectedDate}
      cycleType={cycleType}
      cycle={cycle}
      assignTaskForUser={assignTaskForUser}
    />
  );
};

export default AssignmentTaskTableContainer;
