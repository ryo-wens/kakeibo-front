import React from 'react';
import { getWeekStartDate } from '../../lib/date';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
  TaskUser,
  TaskUsers,
} from '../../reducks/groupTasks/types';
import '../../assets/task/task-list-for-user.scss';
import { Group } from '../../reducks/groups/types';
import { OperateTaskListForUser } from './index';

interface TaskListForUserProps {
  groupId: number;
  approvedGroup: Group;
  selectedDate: Date;
  groupTaskList: GroupTasksList;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  tasksListItem: TasksListItem;
}

const TaskListForUser = (props: TaskListForUserProps) => {
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const baseDate: Date =
    props.tasksListItem.base_date !== null ? props.tasksListItem.base_date : new Date();
  const cycleType = props.tasksListItem.cycle_type;
  const cycle = props.tasksListItem.cycle !== null ? props.tasksListItem.cycle : 0;
  const approvedGroup: Group = props.approvedGroup;

  const assignTaskForUser = (
    differenceDay: number,
    baseDay: number,
    currentDay: number,
    taskUsers: TaskUsers,
    idx: number
  ) => {
    if (
      (cycleType === 'every' && differenceDay % cycle === 0) ||
      cycleType === 'consecutive' ||
      (cycleType === 'none' && baseDay === currentDay)
    ) {
      return (
        <span
          className="task-list-for-user__user-name"
          key={taskUsers[idx].taskUserId}
          style={{ borderColor: taskUsers[idx].taskUserColor }}
        >
          {taskUsers[idx].taskUserName}
        </span>
      );
    } else {
      return <span className="task-list-for-user__blank" />;
    }
  };

  const week = () => {
    const weekTableItems = [];
    const startDate = getWeekStartDate(selectedDate);
    const groupUsersList = Array.from(props.groupTasksListForEachUser);
    const taskUsers: TaskUsers = [];
    for (const groupTasksListItem of groupUsersList) {
      const taskUserId = groupTasksListItem.user_id;
      const approvedUserIdx = approvedGroup.approved_users_list.findIndex(
        (approvedUser) => approvedUser.user_id === taskUserId
      );
      const taskUser: TaskUser = {
        taskUserId: groupTasksListItem.id,
        taskUserName: approvedGroup.approved_users_list[approvedUserIdx].user_name,
        taskUserColor: approvedGroup.approved_users_list[approvedUserIdx].color_code,
      };
      taskUsers.push(taskUser);
    }

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(
        Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
      );
      const baseDay = new Date(baseDate).getTime();
      const currentDay = currentDate.getTime();

      let differenceDay!: number;

      if (baseDay > currentDay) {
        differenceDay = (baseDay - currentDay) / 86400000;
        taskUsers.sort((pre, cur) => cur.taskUserId - pre.taskUserId);
      } else if (baseDay < currentDay) {
        differenceDay = (currentDay - baseDay) / 86400000;
        taskUsers.sort((pre, cur) => pre.taskUserId - cur.taskUserId);
      } else if (baseDay === currentDay) {
        differenceDay = 0;
      }

      const baseUserIdIdx = taskUsers.findIndex((taskUser) => {
        return taskUser.taskUserId === props.tasksListItem.group_tasks_users_id;
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
        <td className="task-list-for-user__item" key={i}>
          {assignTaskForUser(differenceDay, baseDay, currentDay, taskUsers, idx)}
        </td>
      );
    }
    return weekTableItems;
  };

  return (
    <>
      <OperateTaskListForUser
        approvedGroup={approvedGroup}
        groupId={props.groupId}
        tasksListItem={props.tasksListItem}
        label={'保存'}
      />
      {week()}
    </>
  );
};

export default TaskListForUser;
