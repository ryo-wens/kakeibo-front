import React from 'react';
import { useSelector } from 'react-redux';
import { getUserTaskListItem } from '../../../../reducks/groupTasks/selectors';
import TodayScheduleTaskArea from '../../../../components/home/todaySchedule/taskArea/TodayScheduleTaskArea';

const TodayScheduleTaskAreaContainer = () => {
  const todayUserTaskList = useSelector(getUserTaskListItem);
  const existsTodayUserTaskList = todayUserTaskList && todayUserTaskList.length !== 0;

  return (
    <TodayScheduleTaskArea
      todayUserTaskList={todayUserTaskList}
      existsTodayUserTaskList={existsTodayUserTaskList}
    />
  );
};

export default TodayScheduleTaskAreaContainer;
