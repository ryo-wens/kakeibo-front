import React, { useCallback, useState } from 'react';
import { MonthTables, WeekTables } from './index';
import { DatePicker } from '../uikit';
import { TodoButton } from '../todo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { dateToMonthString, getFirstDayOfMonth, getLastDayOfMonth } from '../../lib/date';

const useStyles = makeStyles(() =>
  createStyles({
    date: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '700px',
    },
    datePicker: {
      width: `200px`,
    },
  })
);

const SkipDate = () => {
  const classes = useStyles();
  const dt: Date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = useCallback(
    (selectedDate) => {
      setSelectedDate(selectedDate as Date);
    },
    [setSelectedDate]
  );

  const getTodayDate = useCallback(() => {
    setSelectedDate(dt);
  }, [selectedDate]);

  const getPrevMonth = useCallback(() => {
    const earlyOfMonthDate = getFirstDayOfMonth(selectedDate);
    const remainingDatesUntilPrevMonth = selectedDate.getDate() - earlyOfMonthDate.getDate();
    const prevMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - remainingDatesUntilPrevMonth - 1
    );
    setSelectedDate(prevMonth);
  }, [selectedDate, setSelectedDate]);

  const getNextMonth = useCallback(() => {
    const endOfMonthDate = getLastDayOfMonth(selectedDate);
    const remainingDatesUntilNextMonth = endOfMonthDate.getDate() - selectedDate.getDate();
    const nextMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + remainingDatesUntilNextMonth + 1
    );
    setSelectedDate(nextMonth);
  }, [selectedDate, setSelectedDate]);

  const getThisMonth = dateToMonthString(dt);
  const getSelectedMonth = dateToMonthString(selectedDate);
  const equalsSelectedMonthAndThisMonth = getThisMonth === getSelectedMonth;

  return (
    <>
      <div className={classes.date}>
        <div className={classes.datePicker}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            id={'date-picker-dialog'}
            label={''}
            required={false}
          />
        </div>
        <TodoButton
          label={'<'}
          disabled={equalsSelectedMonthAndThisMonth}
          onClick={() => getPrevMonth()}
        />
        <TodoButton label={'>'} disabled={false} onClick={() => getNextMonth()} />
        <TodoButton label={'今月'} disabled={false} onClick={() => getTodayDate()} />
      </div>
      <MonthTables selectedDate={selectedDate} />
      <WeekTables selectedDate={selectedDate} />
    </>
  );
};

export default SkipDate;
