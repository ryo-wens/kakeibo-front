import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthlyTodoList,
} from '../../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchMonthlyTodoList } from '../../../../../reducks/todoList/operations';
import MonthlyTodoListArea from '../../../../../components/todo/modules/area/monthlyTodoListArea/MonthlyTodoListArea';
import { generateZeroPaddingMonth } from '../../../../../lib/date';

interface MonthlyTodoListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoListAreaContainer = (props: MonthlyTodoListAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams<{ group_id: string }>();

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupExpiredTodoList(Number(group_id), signal));
    dispatch(
      fetchGroupMonthlyTodoList(Number(group_id), selectedYearParam, selectedMonthParam, signal)
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
  }, [props.selectedYear, props.selectedMonth, props.editing]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchMonthlyTodoList(selectedYearParam, selectedMonthParam, signal));
      return () => signal.cancel();
    }
  }, [props.selectedYear, props.selectedMonth]);

  return (
    <MonthlyTodoListArea
      selectedYear={props.selectedYear}
      selectedMonth={props.selectedMonth}
      setSelectedYear={props.setSelectedYear}
      setSelectedMonth={props.setSelectedMonth}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyTodoListAreaContainer;
