import React from 'react';
import { useSelector } from 'react-redux';
import { getUserTaskListItem } from '../../../../reducks/groupTasks/selectors';
import TodayScheduleTaskArea from '../../../../components/home/todaySchedule/taskArea/TodayScheduleTaskArea';

const TodayScheduleTaskAreaContainer = () => {
  const userTaskListItem = useSelector(getUserTaskListItem);
  const existAssignTask = userTaskListItem && userTaskListItem.tasks_list.length !== 0;

  return (
    <TodayScheduleTaskArea userTaskListItem={userTaskListItem} existAssignTask={existAssignTask} />
  );
};

export default TodayScheduleTaskAreaContainer;
