import React, { useCallback } from 'react';
import { DatePicker } from '../uikit';
import { date } from '../../lib/constant';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import '../../assets/task/skip-date.scss';

interface SkipDateProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const SkipDate = (props: SkipDateProps) => {
  const handleDateChange = useCallback(
    (selectedDate) => {
      props.setSelectedDate(selectedDate as Date);
    },
    [props.setSelectedDate]
  );

  const getTodayDate = useCallback(() => {
    props.setSelectedDate(date);
  }, [props.selectedDate]);

  const getNextWeek = useCallback(() => {
    const nextWeek = new Date(
      props.selectedDate.getFullYear(),
      props.selectedDate.getMonth(),
      props.selectedDate.getDate() + 7
    );
    props.setSelectedDate(nextWeek);
  }, [props.selectedDate, props.setSelectedDate]);

  const getPrevWeek = useCallback(() => {
    const previousWeek = new Date(
      props.selectedDate.getFullYear(),
      props.selectedDate.getMonth(),
      props.selectedDate.getDate() - 7
    );
    props.setSelectedDate(previousWeek);
  }, [props.selectedDate, props.setSelectedDate]);

  const todayDay = date.getDay();

  const weekStartDate = new Date(
    props.selectedDate.getFullYear(),
    props.selectedDate.getMonth(),
    props.selectedDate.getDate() - todayDay
  );
  const weekLastDate = new Date(
    props.selectedDate.getFullYear(),
    props.selectedDate.getMonth(),
    props.selectedDate.getDate() - todayDay + 6
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
      <div className="skip-date__date-picker">
        <DatePicker
          value={props.selectedDate}
          onChange={handleDateChange}
          id={'date-picker-dialog'}
          label={''}
          required={false}
          disabled={false}
          minDate={new Date('1900-01-01')}
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
      <button className="skip-date__today-btn" disabled={false} onClick={() => getTodayDate()}>
        今日
      </button>
    </>
  );
};

export default SkipDate;
