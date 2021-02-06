import React from 'react';
import { getWeekStartDate } from '../../../../../lib/date';
import { TaskCycleType, TasksListItem, TaskUsers } from '../../../../../reducks/groupTasks/types';
import './assignment-task-table.scss';
import EditAssignmentTaskModalContainer from '../../../../../containers/task/page/taskTableArea/assignmentTaskTable/editAssignmentTaskModal/EditAssignmentTaskModalContainer';

interface AssignmentTaskTableProps {
  participatingTaskUsers: TaskUsers;
  groupId: number;
  baseDay: number;
  selectedDate: Date;
  tasksListItem: TasksListItem;
  cycleType: TaskCycleType | null;
  cycle: number;
  assignTaskForUser: (differenceDay: number, baseDay: number, currentDay: number) => boolean;
}

const AssignmentTaskTable = (props: AssignmentTaskTableProps) => {
  const week = (
    baseDay: number,
    selectedDate: Date,
    cycleType: TaskCycleType | null,
    cycle: number,
    taskUsers: TaskUsers
  ) => {
    const weekTableItems = [];
    const startDate = getWeekStartDate(selectedDate);
    const oneWeek = 7;
    const oneDay = 86400000;

    for (let i = 0; i < oneWeek; i++) {
      const currentDate = new Date(
        Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
      );
      const currentDay = currentDate.getTime();

      let differenceDay!: number;

      if (baseDay > currentDay) {
        differenceDay = (baseDay - currentDay) / oneDay;
        taskUsers.sort((pre, cur) => cur.id - pre.id);
      } else if (baseDay < currentDay) {
        differenceDay = (currentDay - baseDay) / oneDay;
        taskUsers.sort((pre, cur) => pre.id - cur.id);
      } else if (baseDay === currentDay) {
        differenceDay = 0;
      }

      const baseUserIdIdx = taskUsers.findIndex((taskUser) => {
        return taskUser.id === props.tasksListItem.group_tasks_users_id;
      });

      const cycleCount = Math.floor(differenceDay / cycle);
      const usersListLength = taskUsers.length;
      let idx!: number;

      if (cycleType === 'every') {
        idx = ((cycleCount % usersListLength) + baseUserIdIdx) % usersListLength;
      } else if (cycleType === 'consecutive') {
        if (baseDay > currentDay) {
          if (differenceDay % cycle === 0) {
            idx = ((cycleCount % usersListLength) + baseUserIdIdx) % usersListLength;
          } else {
            idx = ((cycleCount % usersListLength) + baseUserIdIdx + 1) % usersListLength;
          }
        } else if (baseDay <= currentDay) {
          idx = ((cycleCount % usersListLength) + baseUserIdIdx) % usersListLength;
        }
      } else if (cycleType === 'none') {
        idx = baseUserIdIdx;
      }

      weekTableItems.push(
        <td className="assignment-task-table__item" key={i}>
          {props.assignTaskForUser(differenceDay, baseDay, currentDay) ? (
            <span
              className="assignment-task-table__user-name"
              key={taskUsers[idx].user_id}
              style={{ borderColor: taskUsers[idx].color_code }}
            >
              {taskUsers[idx].user_name}
            </span>
          ) : (
            <span className="assignment-task-table__blank" />
          )}
        </td>
      );
    }
    return weekTableItems;
  };

  return (
    <>
      <EditAssignmentTaskModalContainer
        participatingTaskUsers={props.participatingTaskUsers}
        groupId={props.groupId}
        taskItem={props.tasksListItem}
      />
      {week(
        props.baseDay,
        props.selectedDate,
        props.cycleType,
        props.cycle,
        props.participatingTaskUsers.concat()
      )}
    </>
  );
};

export default AssignmentTaskTable;
