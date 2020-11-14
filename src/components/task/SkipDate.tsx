import React, { useCallback, useState } from 'react';
import { WeekTables } from './index';
import { DatePicker } from '../uikit';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { date } from '../../lib/constant';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import '../../assets/task/skip-date.scss';

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = useCallback(
    (selectedDate) => {
      setSelectedDate(selectedDate as Date);
    },
    [setSelectedDate]
  );

  const getTodayDate = useCallback(() => {
    setSelectedDate(date);
  }, [selectedDate]);

  const getNextWeek = useCallback(() => {
    const nextWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 7
    );
    setSelectedDate(nextWeek);
  }, [selectedDate, setSelectedDate]);

  const getPrevWeek = useCallback(() => {
    const previousWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - 7
    );
    setSelectedDate(previousWeek);
  }, [selectedDate, setSelectedDate]);

  const todayDay = date.getDay();

  const weekStartDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate() - todayDay
  );
  const weekLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate() - todayDay + 6
  );

  const displayWeek = (weekDate: Date) => {
    return (
      <div className="skip-date__display-week-item">
        <span className="skip-date__display-week-item--year">{weekDate.getFullYear()}</span>
        <span className="skip-date__display-week-item--date">
          {weekDate.getMonth() + 1}月{weekDate.getDate()}日
        </span>
      </div>
    );
  };

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
        <div className="skip-date__display-week">
          <button className="skip-date__prev-btn" onClick={getPrevWeek}>
            <ArrowLeftIcon />
          </button>
          <div className="skip-date__display-week-items">
            {displayWeek(weekStartDate)}
            <span className="skip-date__display-week-item--tilde">〜</span>
            {displayWeek(weekLastDate)}
          </div>
          <button className="skip-date__next-btn" onClick={getNextWeek}>
            <ArrowRightIcon />
          </button>
        </div>
        <button className="task--btn" disabled={false} onClick={() => getTodayDate()}>
          今日
        </button>
      </div>
      <WeekTables selectedDate={selectedDate} />
    </>
  );
};

export default SkipDate;
