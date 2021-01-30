import React from 'react';
import { date } from '../../../../lib/constant';
import { Group } from '../../../../reducks/groups/types';
import { GroupTasksListForEachUser, TaskUsers } from '../../../../reducks/groupTasks/types';
import TaskToolBarArea from '../../../../components/task/page/taskToolBarArea/TaskToolBarArea';

interface TaskToolBarAreaContainerProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  participatingTaskUsers: TaskUsers;
}

const TaskToolBarAreaContainer = (props: TaskToolBarAreaContainerProps) => {
  const selectDate = {
    existsSelectDate: date,
  };

  if (props.selectedDate !== null) {
    selectDate.existsSelectDate = props.selectedDate;
  }

  const handleDateChange = (selectDate: Date | null) => {
    props.setSelectedDate(selectDate);
  };

  const getTodayDate = () => {
    props.setSelectedDate(date);
  };

  const getNextWeek = (selectDate: Date) => {
    const nextWeek = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate() + 7
    );

    props.setSelectedDate(nextWeek);
  };

  const getPrevWeek = (selectDate: Date) => {
    const previousWeek = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate() - 7
    );

    props.setSelectedDate(previousWeek);
  };

  const getWeekStartDate = (selectDate: Date, todayDay: number) => {
    return new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate() - todayDay
    );
  };

  const getWeekLastDate = (selectDate: Date, todayDay: number) => {
    return new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate() - todayDay + 6
    );
  };

  const weekStartDate: Date = getWeekStartDate(selectDate.existsSelectDate, date.getDay());
  const weekLastDate: Date = getWeekLastDate(selectDate.existsSelectDate, date.getDay());

  return (
    <TaskToolBarArea
      selectedDate={props.selectedDate}
      existsSelectDate={selectDate.existsSelectDate}
      handleDateChange={handleDateChange}
      getTodayDate={getTodayDate}
      getPrevWeek={getPrevWeek}
      getNextWeek={getNextWeek}
      weekStartDate={weekStartDate}
      weekLastDate={weekLastDate}
      approvedGroup={props.approvedGroup}
      groupTasksListForEachUser={props.groupTasksListForEachUser}
      participatingTaskUsers={props.participatingTaskUsers}
    />
  );
};

export default TaskToolBarAreaContainer;
