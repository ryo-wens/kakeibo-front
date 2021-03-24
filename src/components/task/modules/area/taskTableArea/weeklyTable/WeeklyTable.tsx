import React from 'react';
import { getWeekStartDate } from '../../../../../../lib/date';
import styles from './WeeklyTable.module.scss';
import cn from 'classnames';
import dayjs from 'dayjs';

interface WeeklyTableProps {
  selectedDate: Date;
  weekdays: string[];
}

const WeeklyTable = (props: WeeklyTableProps) => {
  const week = (selectedDate: Date, weekdays: string[]) => {
    const oneWeek = 7;
    const weekTableItems = [];

    for (let i = 0; i < oneWeek; i++) {
      const startDate = getWeekStartDate(selectedDate);
      const date = new Date(startDate.setDate(startDate.getDate() + i));

      weekTableItems.push(
        <th
          className={cn(styles.item, {
            [styles.crDate]: dayjs().isSame(date, 'date'),
          })}
          key={i}
        >
          <span className={styles.day}>{weekdays[i]}</span>
          <span className={styles.date}>{date.getDate()}</span>
        </th>
      );
    }
    return weekTableItems;
  };

  return (
    <tr className={styles.wrapper}>
      <th className={styles.item} />
      {week(props.selectedDate, props.weekdays)}
    </tr>
  );
};

export default WeeklyTable;
