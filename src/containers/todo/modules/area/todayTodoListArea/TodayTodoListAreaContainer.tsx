import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupTodayTodoList,
} from '../../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchTodayTodoList } from '../../../../../reducks/todoList/operations';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { customDate, customMonth, year } from '../../../../../lib/constant';
import TodayTodoListArea from '../../../../../components/todo/modules/area/todayTodoListArea/TodayTodoListArea';
import { generateZeroPaddingMonth } from '../../../../../lib/date';

interface TodayTodoAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoAreaContainer = (props: TodayTodoAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams<{ group_id: string }>();

  const currentYear = String(year);
  const currentMonth = customMonth;
  const currentDate = customDate;
  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupExpiredTodoList(Number(group_id), signal));
    dispatch(
      fetchGroupTodayTodoList(Number(group_id), currentYear, currentMonth, currentDate, signal)
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
  }, [currentYear, currentMonth, currentDate, props.editing]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchTodayTodoList(currentYear, currentMonth, currentDate, signal));
      return () => signal.cancel();
    }
  }, [currentYear, currentMonth, currentDate]);

  return (
    <TodayTodoListArea
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      editing={props.editing}
      setEditing={props.setEditing}
    />
  );
};

export default TodayTodoAreaContainer;
