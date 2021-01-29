import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../reducks/store/types';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { fetchGroups } from '../../../reducks/groups/operations';
import { Group, Groups } from '../../../reducks/groups/types';
import { getPathGroupId } from '../../../lib/path';
import {
  fetchGroupTasksList,
  fetchGroupTasksListEachUser,
} from '../../../reducks/groupTasks/operations';
import {
  EditTaskUser,
  OperateTaskListForUser,
  SkipDate,
  TaskList,
  TaskListForUser,
  WeekTables,
} from '../index';
import {
  getGroupTasksList,
  getGroupTasksListForEachUser,
} from '../../../reducks/groupTasks/selectors';
import './task-page.scss';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TasksListItem,
  TaskUser,
  TaskUsers,
} from '../../../reducks/groupTasks/types';
import axios, { CancelTokenSource } from 'axios';

const TaskPage = () => {
  const dispatch = useDispatch();
  const groupId = getPathGroupId(window.location.pathname);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const groupTasksListForEachUser = getGroupTasksListForEachUser(selector);
  const groupTasksList = getGroupTasksList(selector);
  const [taskListForUser, setTaskListForUser] = useState<GroupTasksListForEachUser>([]);
  const [taskList, setTaskList] = useState<GroupTasksList>([]);
  const [groups, setGroups] = useState<Groups>([]);

  const fetchGroupTasks = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupTasksListEachUser(groupId, signal));
    dispatch(fetchGroupTasksList(groupId, signal));
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchGroupTasks(signal);
    const interval = setInterval(() => {
      fetchGroupTasks(signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [selectedDate]);

  useEffect(() => {
    setGroups(approvedGroups);
  }, [approvedGroups]);

  useEffect(() => {
    setTaskListForUser(groupTasksListForEachUser);
  }, [groupTasksListForEachUser]);

  useEffect(() => {
    setTaskList(groupTasksList);
  }, [groupTasksList]);

  if (groups.length === 0) {
    return null;
  }

  const idx = groups.findIndex((group) => group.group_id === groupId);
  const approvedGroup = groups[idx];

  const participatingTaskUsers = (approvedGroup: Group) => {
    const taskUsers: TaskUsers = [];
    for (const taskListForUserItem of taskListForUser) {
      if (taskListForUserItem.group_id === groupId && approvedGroup.group_id === groupId) {
        const approvedUserIdx = approvedGroup.approved_users_list.findIndex(
          (approvedUser) => approvedUser.user_id === taskListForUserItem.user_id
        );
        const taskUser: TaskUser = {
          taskUserId: taskListForUserItem.id,
          taskUserName: approvedGroup.approved_users_list[approvedUserIdx].user_name,
          taskUserColor: approvedGroup.approved_users_list[approvedUserIdx].color_code,
        };
        taskUsers.push(taskUser);
      }
    }
    return taskUsers;
  };

  return (
    <div className="task-page">
      <div className="task-page__menu">
        <SkipDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <EditTaskUser
          approvedGroup={approvedGroup}
          groupTasksListForEachUser={taskListForUser}
          participatingTaskUsers={participatingTaskUsers(approvedGroup)}
        />
      </div>
      <TaskList
        groupId={groupId}
        groupTasksList={taskList}
        groupTasksListForEachUser={taskListForUser}
      />
      <table className="task-page__table">
        <thead>
          <WeekTables selectedDate={selectedDate} />
        </thead>
        <tbody>
          {taskList.map((tasksListItem: TasksListItem) => {
            if (
              tasksListItem.cycle_type !== null &&
              taskListForUser.length &&
              approvedGroup !== undefined &&
              tasksListItem.group_id === groupId
            ) {
              return (
                <tr className="task-page__list-for-user" key={tasksListItem.id}>
                  <TaskListForUser
                    groupId={groupId}
                    approvedGroup={approvedGroup}
                    selectedDate={selectedDate}
                    groupTaskList={taskList}
                    groupTasksListForEachUser={taskListForUser}
                    tasksListItem={tasksListItem}
                  />
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr className="task-page__assign-task">
            <OperateTaskListForUser
              approvedGroup={approvedGroup}
              groupId={groupId}
              label={'追加'}
            />
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TaskPage;
