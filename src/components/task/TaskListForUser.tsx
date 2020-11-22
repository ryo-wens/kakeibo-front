import React, { useCallback, useMemo, useState } from 'react';
import { dateToDateString, getWeekStartDate } from '../../lib/date';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
  TaskUser,
  TaskUsers,
} from '../../reducks/groupTasks/types';
import Modal from '@material-ui/core/Modal';
import '../../assets/task/task-list-for-user.scss';
import { Group, Groups } from '../../reducks/groups/types';
import { SetTaskListItem } from './index';

interface TaskListForUserProps {
  groupId: number;
  approvedGroups: Groups;
  selectedDate: Date;
  groupTaskList: GroupTasksList;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  tasksListItem: TasksListItem;
}

const TaskListForUser = (props: TaskListForUserProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const baseDate: Date =
    props.tasksListItem.base_date !== null ? props.tasksListItem.base_date : new Date();
  const cycle = props.tasksListItem.cycle !== null ? props.tasksListItem.cycle : 0;

  const groupIdx = props.approvedGroups.findIndex(
    (approvedGroup) => approvedGroup.group_id === props.groupId
  );
  const approvedGroup: Group = props.approvedGroups[groupIdx];

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const week = useMemo(() => {
    const taskUsers: TaskUsers = [];
    for (const groupTasksListItem of props.groupTasksListForEachUser) {
      const taskUserId = groupTasksListItem.user_id;
      const approvedUserIdx = approvedGroup.approved_users_list.findIndex(
        (approvedUser) => approvedUser.user_id === taskUserId
      );
      const taskUser: TaskUser = {
        taskUserId: groupTasksListItem.id,
        taskName: approvedGroup.approved_users_list[approvedUserIdx].user_name,
      };
      taskUsers.push(taskUser);
    }
    const weekTableItems = [];
    const startDate = getWeekStartDate(selectedDate);
    const groupUsersList = Array.from(props.groupTasksListForEachUser);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(
        Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
      );
      const baseDay = new Date(baseDate).getTime();
      const currentDay = currentDate.getTime();

      let differenceDay!: number;

      if (baseDay > currentDay) {
        differenceDay = (new Date(baseDate).getTime() - currentDay) / 86400000;
        groupUsersList.sort((pre, cur) => cur.id - pre.id);
      } else if (baseDay < currentDay) {
        differenceDay = (currentDay - new Date(baseDate).getTime()) / 86400000;
        groupUsersList.sort((pre, cur) => pre.id - cur.id);
      } else if (baseDay === currentDay) {
        differenceDay = 0;
      }

      const usersListLength = groupUsersList.length;

      const baseUserIdIdx = groupUsersList.findIndex((taskUser) => {
        return taskUser.id === props.tasksListItem.group_tasks_users_id;
      });

      const cycleCount = Math.floor(differenceDay / cycle);
      const idx = ((cycleCount % usersListLength) + baseUserIdIdx) % usersListLength;

      const assignTaskForUser = () => {
        if (differenceDay % cycle === 0) {
          return (
            <span className="task-list-for-user__user-name" onClick={openModal}>
              {taskUsers[idx].taskName}
            </span>
          );
        } else if (dateToDateString(currentDate) !== dateToDateString(new Date(baseDate))) {
          return <span className="task-list-for-user__blank" />;
        }
      };

      weekTableItems.push(
        <td className="task-list-for-user__item" key={i}>
          {assignTaskForUser()}
        </td>
      );
    }
    return weekTableItems;
  }, [selectedDate]);

  return (
    <>
      <tr className="task-list-for-user">
        <th className="task-list-for-user__item">{props.tasksListItem.task_name}</th>
        {week}
      </tr>
      <Modal open={open} onClose={closeModal}>
        <SetTaskListItem
          approvedGroup={approvedGroup}
          groupId={props.groupId}
          approvedGroups={props.approvedGroups}
          groupTasksList={props.groupTaskList}
          groupTasksListForEachUser={props.groupTasksListForEachUser}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default TaskListForUser;
