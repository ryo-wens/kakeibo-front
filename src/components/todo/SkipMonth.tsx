import React, { useCallback } from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {
  dateToMonthString,
  dateToYearString,
  getFirstDayOfNextMonth,
  getLastDayOfPrevMonth,
} from '../../lib/date';
import { date } from '../../lib/constant';
import { fetchMonthTodoList } from '../../reducks/todoList/operations';
import { fetchGroupMonthTodoList } from '../../reducks/groupTodoList/operations';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { useDispatch } from 'react-redux';
import '../../assets/todo/skip-month.scss';

interface SkipMonthProps {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const SkipMonth = (props: SkipMonthProps) => {
  const dispatch = useDispatch();
  const groupId = getPathGroupId(window.location.pathname);
  const entityType = getPathTemplateName(window.location.pathname);

  const getTodayDate = useCallback(() => {
    props.setSelectDate(date);
  }, [props.selectDate]);

  const switchFetchMonthTodoList = (date: Date) => {
    const year = String(date.getFullYear());
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    if (entityType !== 'group') {
      dispatch(fetchMonthTodoList(year, month));
    } else if (entityType === 'group') {
      dispatch(fetchGroupMonthTodoList(groupId, year, month));
    }
  };

  const getPrevMonth = useCallback(() => {
    const lastDayOfPrevMonth = getLastDayOfPrevMonth(props.selectDate);
    props.setSelectDate(lastDayOfPrevMonth);
    switchFetchMonthTodoList(lastDayOfPrevMonth);
  }, [props.selectDate, props.setSelectDate]);

  const getNextMonth = useCallback(() => {
    const firstDayOfNextMonth = getFirstDayOfNextMonth(props.selectDate);
    props.setSelectDate(firstDayOfNextMonth);
    switchFetchMonthTodoList(firstDayOfNextMonth);
  }, [props.selectDate, props.setSelectDate]);

  return (
    <>
      <div className="skip-month">
        <button className="skip-month__prev-btn" onClick={getPrevMonth}>
          <ArrowLeftIcon />
        </button>
        <button className="skip-month__display-date">
          {dateToYearString(props.selectDate)} 年 {dateToMonthString(props.selectDate)} 月
        </button>
        <button className="skip-month__next-btn" onClick={getNextMonth}>
          <ArrowRightIcon />
        </button>
        <button className="skip-month__today-btn" disabled={false} onClick={() => getTodayDate()}>
          今月
        </button>
      </div>
    </>
  );
};

export default SkipMonth;
