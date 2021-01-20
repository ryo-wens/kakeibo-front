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
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthTodoList,
  fetchGroupTodayTodoList,
} from '../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../reducks/groups/operations';
import { fetchMonthTodoList } from '../../../../reducks/todoList/operations';
import InputYears from '../../../uikit/InputYears';
import MonthlyTodoList from './MonthlyTodoList/MonthlyTodoList';
import './monthly-todo-area.scss';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';

interface MonthlyTodoAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYearMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoArea = (props: MonthlyTodoAreaProps) => {
  const dispatch = useDispatch();
  const monthImplementationTodoList = useSelector(getMonthImplementationTodoList);
  const monthDueTodoList = useSelector(getMonthDueTodoList);
  const groupMonthImplementationTodoList = useSelector(getGroupMonthImplementationTodoList);
  const groupMonthDueTodoList = useSelector(getGroupMonthDueTodoList);
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setSelectedDate(new Date(props.selectedYear, props.selectedMonth - 1));
  }, [props.selectedYear, props.selectedMonth]);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupExpiredTodoList(Number(group_id), signal));
    dispatch(
      fetchGroupTodayTodoList(
        Number(group_id),
        String(props.selectedYear),
        ('0' + props.selectedMonth).slice(-2),
        ('0' + selectedDate.getDate()).slice(-2),
        signal
      )
    );
    dispatch(
      fetchGroupMonthTodoList(
        Number(group_id),
        String(props.selectedYear),
        ('0' + props.selectedMonth).slice(-2),
        signal
      )
    );
  };

  useEffect(() => {
    if (pathName === 'group' && !props.editing) {
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
  }, [props.selectedYear, props.selectedMonth, selectedDate, props.editing]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(
        fetchMonthTodoList(
          String(props.selectedYear),
          ('0' + props.selectedMonth).slice(-2),
          signal
        )
      );
      return () => signal.cancel();
    }
  }, [props.selectedYear, props.selectedMonth]);

  return (
    <>
      <InputYears
        selectedYear={props.selectedYear}
        selectedMonth={props.selectedMonth}
        setSelectedMonth={props.setSelectedMonth}
        setSelectedYear={props.setSelectedYear}
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
            currentYearMonth={props.currentYearMonth}
            selectedDate={selectedDate}
            setEditing={props.setEditing}
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
            currentYearMonth={props.currentYearMonth}
            selectedDate={selectedDate}
            setEditing={props.setEditing}
          />
        }
      />
    </>
  );
};

export default MonthlyTodoArea;
