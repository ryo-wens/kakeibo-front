import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMonthDueTodoList,
  getMonthImplementationTodoList,
} from '../../../../reducks/todoList/selectors';
import {
  getGroupMonthDueTodoList,
  getGroupMonthImplementationTodoList,
} from '../../../../reducks/groupTodoList/selectors';
import { useLocation, useParams } from 'react-router';
import { month, year } from '../../../../lib/constant';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupMonthTodoList,
  fetchGroupTodayTodoList,
} from '../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../reducks/groups/operations';
import { fetchMonthTodoList } from '../../../../reducks/todoList/operations';
import InputYears from '../../../uikit/InputYears';
import MonthlyTodoList from './monthly-todo-list/MonthlyTodoList';
import './monthly-todo-area.scss';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';

const MonthlyTodoArea = () => {
  const dispatch = useDispatch();
  const monthImplementationTodoList = useSelector(getMonthImplementationTodoList);
  const monthDueTodoList = useSelector(getMonthDueTodoList);
  const groupMonthImplementationTodoList = useSelector(getGroupMonthImplementationTodoList);
  const groupMonthDueTodoList = useSelector(getGroupMonthDueTodoList);
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();

  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1));
  }, [selectedYear, selectedMonth]);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(
      fetchGroupTodayTodoList(
        Number(id),
        String(selectedYear),
        ('0' + selectedMonth).slice(-2),
        ('0' + selectedDate.getDate()).slice(-2),
        signal
      )
    );
    dispatch(
      fetchGroupMonthTodoList(
        Number(id),
        String(selectedYear),
        ('0' + selectedMonth).slice(-2),
        signal
      )
    );
  };

  useEffect(() => {
    if (pathName === 'group') {
      const signal = axios.CancelToken.source();
      fetchGroupTodoList(signal);
      const interval = setInterval(() => {
        fetchGroupTodoList(signal);
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [selectedYear, selectedMonth, selectedDate]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroups(signal));
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
    }, 3000);

    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchMonthTodoList(String(selectedYear), ('0' + selectedMonth).slice(-2), signal));
      return () => signal.cancel();
    }
  }, [selectedYear, selectedMonth]);

  return (
    <>
      <InputYears
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      <div className="monthly-todo-area__spacer" />
      <SwitchItemTabs
        leftButtonLabel={'実施予定のToDo'}
        rightButtonLabel={'締切予定のToDo'}
        leftItem={
          <MonthlyTodoList
            planName={'実施予定'}
            planTodoList={
              pathName === 'group' ? groupMonthImplementationTodoList : monthImplementationTodoList
            }
            monthImplementationTodoList={
              pathName === 'group' ? groupMonthImplementationTodoList : monthImplementationTodoList
            }
            monthDueTodoList={pathName === 'group' ? groupMonthDueTodoList : monthDueTodoList}
            selectedDate={selectedDate}
          />
        }
        rightItem={
          <MonthlyTodoList
            planName={'締切予定'}
            planTodoList={pathName === 'group' ? groupMonthDueTodoList : monthDueTodoList}
            monthImplementationTodoList={
              pathName === 'group' ? groupMonthImplementationTodoList : monthImplementationTodoList
            }
            monthDueTodoList={pathName === 'group' ? groupMonthDueTodoList : monthDueTodoList}
            selectedDate={selectedDate}
          />
        }
      />
    </>
  );
};

export default MonthlyTodoArea;
