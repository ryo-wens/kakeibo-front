import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthTodoList,
} from '../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../reducks/groups/operations';
import { fetchMonthTodoList } from '../../../../reducks/todoList/operations';
import MonthlyTodoListArea from '../../../../components/todo/page/MonthlyTodoListArea/MonthlyTodoListArea';

interface MonthlyTodoListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYearMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoListAreaContainer = (props: MonthlyTodoListAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();

  const currentYear = String(props.selectedYear);
  const currentMonth = (`0` + `${props.selectedMonth}`).slice(-2);
  const currentYearMonth = `${currentYear}/${currentMonth}`;

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupExpiredTodoList(Number(group_id), signal));
    dispatch(fetchGroupMonthTodoList(Number(group_id), currentYear, currentMonth, signal));
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
  }, [props.selectedYear, props.selectedMonth, props.editing]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchMonthTodoList(currentYear, currentMonth, signal));
      return () => signal.cancel();
    }
  }, [props.selectedYear, props.selectedMonth]);

  return (
    <MonthlyTodoListArea
      selectedYear={props.selectedYear}
      selectedMonth={props.selectedMonth}
      setSelectedYear={props.setSelectedYear}
      setSelectedMonth={props.setSelectedMonth}
      currentYearMonth={currentYearMonth}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyTodoListAreaContainer;
