import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../reducks/store/types';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { fetchGroups } from '../../../reducks/groups/operations';
import { Group, Groups } from '../../../reducks/groups/types';
import {
  fetchGroupTasksList,
  fetchGroupTasksListEachUser,
} from '../../../reducks/groupTasks/operations';
import {
  getGroupTasksList,
  getGroupTasksListForEachUser,
} from '../../../reducks/groupTasks/selectors';
import {
  GroupTasksList,
  GroupTasksListForEachUser,
  TaskUser,
  TaskUsers,
} from '../../../reducks/groupTasks/types';
import axios, { CancelTokenSource } from 'axios';
import { date } from '../../../lib/constant';
import { useParams } from 'react-router';
import TaskPage from '../../../components/task/page/TaskPage';

const TaskPageContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams();

  const [selectedDate, setSelectedDate] = useState<Date | null>(date);

  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const groupTasksListForEachUser = getGroupTasksListForEachUser(selector);
  const groupTasksList = getGroupTasksList(selector);
  const [taskListForUser, setTaskListForUser] = useState<GroupTasksListForEachUser>([]);
  const [taskList, setTaskList] = useState<GroupTasksList>([]);
  const [groups, setGroups] = useState<Groups>([]);

  const fetchGroupTasks = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupTasksListEachUser(Number(group_id), signal));
    dispatch(fetchGroupTasksList(Number(group_id), signal));
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

  const idx = groups.findIndex((group) => group.group_id === Number(group_id));
  const approvedGroup = groups[idx];

  const generateParticipatingTaskUsers = (approvedGroup: Group) => {
    const taskUsers: TaskUsers = [];
    for (const taskListForUserItem of taskListForUser) {
      if (
        taskListForUserItem.group_id === Number(group_id) &&
        approvedGroup.group_id === Number(group_id)
      ) {
        const approvedUserIdx = approvedGroup.approved_users_list.findIndex(
          (approvedUser) => approvedUser.user_id === taskListForUserItem.user_id
        );
        const taskUser: TaskUser = {
          id: taskListForUserItem.id,
          user_id: approvedGroup.approved_users_list[approvedUserIdx].user_id,
          user_name: approvedGroup.approved_users_list[approvedUserIdx].user_name,
          color_code: approvedGroup.approved_users_list[approvedUserIdx].color_code,
        };
        taskUsers.push(taskUser);
      }
    }
    return taskUsers;
  };

  const participatingTaskUsers = generateParticipatingTaskUsers(approvedGroup);

  return (
    <TaskPage
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      approvedGroup={approvedGroup}
      taskListForUser={taskListForUser}
      participatingTaskUsers={participatingTaskUsers}
      taskList={taskList}
      groupId={Number(group_id)}
    />
  );
};

export default TaskPageContainer;
