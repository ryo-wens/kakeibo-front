import React from 'react';
import { date } from '../../../../../lib/constant';
import WeeklyTable from '../../../../../components/task/page/taskTableArea/weeklyTable/WeeklyTable';

interface WeeklyTableContainerProps {
  selectedDate: Date | null;
}

const WeeklyTableContainer = (props: WeeklyTableContainerProps) => {
  const dt: Date = props.selectedDate !== null ? props.selectedDate : date;
  const selectedDate = new Date(dt);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const weekItemClassName = (weekItemDate: Date) => {
    const equalsWeekItemDateAndToday = weekItemDate.getTime() === date.setHours(0, 0, 0, 0);

    if (equalsWeekItemDateAndToday) {
      return 'weekly-table__item--today';
    }
    return 'weekly-table__item';
  };

  return (
    <WeeklyTable
      selectedDate={selectedDate}
      weekdays={weekdays}
      weekItemClassName={weekItemClassName}
    />
  );
};

export default WeeklyTableContainer;
