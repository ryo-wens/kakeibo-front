import React from 'react';
import { date } from '../../../../../lib/constant';
import WeeklyTable from '../../../../../components/task/modules/area/taskTableArea/weeklyTable/WeeklyTable';

interface WeeklyTableContainerProps {
  selectedDate: Date | null;
}

const WeeklyTableContainer = (props: WeeklyTableContainerProps) => {
  const dt: Date = props.selectedDate !== null ? props.selectedDate : date;
  const selectedDate = new Date(dt);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return <WeeklyTable selectedDate={selectedDate} weekdays={weekdays} />;
};

export default WeeklyTableContainer;
