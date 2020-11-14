import React, { useMemo } from 'react';
import { getWeekStartDate } from '../../lib/date';
import '../../assets/task/week-tables.scss';

interface WeekTablesProps {
  selectedDate: Date;
}

const WeekTables = (props: WeekTablesProps) => {
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const week = useMemo(() => {
    const weekTableItems = [];
    for (let i = 0; i < 7; i++) {
      const startDate = getWeekStartDate(selectedDate);
      const date = new Date(startDate.setDate(startDate.getDate() + i));

      weekTableItems.push(
        <>
          <th className="week-tables__item">
            <span className="week-tables__day">{weekdays[i]}</span>
            <span className="week-tables__date">{date.getDate()}</span>
          </th>
        </>
      );
    }
    return weekTableItems;
  }, [selectedDate]);

  return (
    <tr className="week-tables">
      <th className="week-tables__item" />
      {week}
    </tr>
  );
};

export default WeekTables;