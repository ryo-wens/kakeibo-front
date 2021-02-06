import React from 'react';
import { getWeekStartDate } from '../../../../../lib/date';
import './weekly-table.scss';

interface WeeklyTableProps {
  selectedDate: Date;
  weekdays: string[];
  weekItemClassName: (weekItemDate: Date) => string;
}

const WeeklyTable = (props: WeeklyTableProps) => {
  const week = (
    selectedDate: Date,
    weekdays: string[],
    weekItemClassName: (weekItemDate: Date) => string
  ) => {
    const oneWeek = 7;
    const weekTableItems = [];

    for (let i = 0; i < oneWeek; i++) {
      const startDate = getWeekStartDate(selectedDate);
      const date = new Date(startDate.setDate(startDate.getDate() + i));

      weekTableItems.push(
        <th className={weekItemClassName(date)} key={i}>
          <span className="weekly-table__day">{weekdays[i]}</span>
          <span className="weekly-table__date">{date.getDate()}</span>
        </th>
      );
    }
    return weekTableItems;
  };

  return (
    <tr className="weekly-table">
      <th className="weekly-table__item" />
      {week(props.selectedDate, props.weekdays, props.weekItemClassName)}
    </tr>
  );
};

export default WeeklyTable;
