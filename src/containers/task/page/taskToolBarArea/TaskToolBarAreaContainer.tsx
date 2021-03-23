import React from 'react';
import { date } from '../../../../lib/constant';
import { Group } from '../../../../reducks/groups/types';
import { GroupTaskListForEachUser, TaskUsers } from '../../../../reducks/groupTasks/types';
import TaskToolBarArea from '../../../../components/task/modules/area/taskToolBarArea/TaskToolBarArea';
import moment from 'moment';
import dayjs from 'dayjs';

interface TaskToolBarAreaContainerProps {
  selectedDate: Date | null;
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTaskListForEachUser;
  participatingTaskUsers: TaskUsers;
  handleChangeSelectedDate: (date: Date | null) => void;
}

const TaskToolBarAreaContainer = (props: TaskToolBarAreaContainerProps) => {
  const handleChangeDate = (selectDate: Date | null) => {
    props.handleChangeSelectedDate(selectDate);
  };

  const handleGetToday = () => {
    props.handleChangeSelectedDate(date);
  };

  const handleGetPrevWeek = (selectDate: string) => {
    const prevWeek = dayjs(selectDate).add(-7, 'd').toDate();

    props.handleChangeSelectedDate(prevWeek);
  };

  const handleGetNextWeek = (selectDate: string) => {
    const nextWeek = moment(selectDate).add(7, 'd').toDate();

    props.handleChangeSelectedDate(nextWeek);
  };

  const weekStartDate: Date = dayjs(String(props.selectedDate)).startOf('week').toDate();

  const weekLastDate: Date = dayjs(String(props.selectedDate)).endOf('week').toDate();

  return (
    <TaskToolBarArea
      selectedDate={props.selectedDate}
      weekStartDate={weekStartDate}
      weekLastDate={weekLastDate}
      approvedGroup={props.approvedGroup}
      groupTasksListForEachUser={props.groupTasksListForEachUser}
      participatingTaskUsers={props.participatingTaskUsers}
      handleChangeDate={handleChangeDate}
      handleGetToday={handleGetToday}
      handleGetPrevWeek={handleGetPrevWeek}
      handleGetNextWeek={handleGetNextWeek}
    />
  );
};

export default TaskToolBarAreaContainer;
