import React, { useCallback, useState } from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getFirstDayOfNextMonth, getLastDayOfPrevMonth } from '../../lib/date';
import { date, month, year } from '../../lib/constant';
import { fetchMonthTodoList } from '../../reducks/todoList/operations';
import { fetchGroupMonthTodoList } from '../../reducks/groupTodoList/operations';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { useDispatch } from 'react-redux';
import '../../assets/todo/skip-month.scss';
import InputYears from '../uikit/InputYears';

interface SkipMonthProps {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const SkipMonth = (props: SkipMonthProps) => {
  const dispatch = useDispatch();
  const groupId = getPathGroupId(window.location.pathname);
  const entityType = getPathTemplateName(window.location.pathname);
  const [openSelectYears, setOpenSelectYears] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  // const updateSelectMonth = (month: number) => {
  //   setSelectedMonth(month);
  // };
  //
  // const updateSelectYear = (year: number) => {
  //   setSelectedYear(year);
  // };
  //
  const handleSelectYearsOpen = useCallback(() => {
    setOpenSelectYears(true);
  }, [setOpenSelectYears]);
  //
  // const handleSelectYearsClose = useCallback(() => {
  //   setOpenSelectYears(false);
  // }, [setOpenSelectYears]);

  const getTodayDate = useCallback(() => {
    props.setSelectDate(date);
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth() + 1);
    switchFetchMonthTodoList(date);
  }, [props.selectDate]);

  const getPrevMonth = useCallback(() => {
    const lastDayOfPrevMonth = getLastDayOfPrevMonth(props.selectDate);
    props.setSelectDate(lastDayOfPrevMonth);
    setSelectedYear(lastDayOfPrevMonth.getFullYear());
    setSelectedMonth(lastDayOfPrevMonth.getMonth() + 1);
    switchFetchMonthTodoList(lastDayOfPrevMonth);
  }, [props.selectDate, props.setSelectDate]);

  const getNextMonth = useCallback(() => {
    const firstDayOfNextMonth = getFirstDayOfNextMonth(props.selectDate);
    props.setSelectDate(firstDayOfNextMonth);
    setSelectedYear(firstDayOfNextMonth.getFullYear());
    setSelectedMonth(firstDayOfNextMonth.getMonth() + 1);
    switchFetchMonthTodoList(firstDayOfNextMonth);
  }, [props.selectDate, props.setSelectDate]);

  const switchFetchMonthTodoList = (date: Date) => {
    const year = String(date.getFullYear());
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    if (entityType !== 'group') {
      dispatch(fetchMonthTodoList(year, month));
    } else if (entityType === 'group') {
      dispatch(fetchGroupMonthTodoList(groupId, year, month));
    }
  };

  return (
    <>
      {openSelectYears ? (
        <InputYears
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
      ) : (
        <div className="skip-month">
          <button className="skip-month__prev-btn" onClick={getPrevMonth}>
            <ArrowLeftIcon />
          </button>
          <button className="skip-month__display-date" onClick={handleSelectYearsOpen}>
            {selectedYear} 年 {selectedMonth} 月
          </button>
          <button className="skip-month__next-btn" onClick={getNextMonth}>
            <ArrowRightIcon />
          </button>
          <button className="skip-month__today-btn" disabled={false} onClick={() => getTodayDate()}>
            今月
          </button>
        </div>
      )}
    </>
  );
};

export default SkipMonth;
