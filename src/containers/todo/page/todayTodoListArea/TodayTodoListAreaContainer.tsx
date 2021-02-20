import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupTodayTodoList,
} from '../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../reducks/groups/operations';
import { fetchTodayTodoList } from '../../../../reducks/todoList/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTodayDueTodoList,
  getTodayImplementationTodoList,
} from '../../../../reducks/todoList/selectors';
import { useLocation, useParams } from 'react-router';
import { customMonth, date, year } from '../../../../lib/constant';
import TodayTodoListArea from '../../../../components/todo/page/TodayTodoListArea/TodayTodoListArea';

interface TodayTodoAreaContainerProps {
  currentYear: string;
  currentMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoAreaContainer = (props: TodayTodoAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();

  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const todayDueTodoList = useSelector(getTodayDueTodoList);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupExpiredTodoList(Number(group_id), signal));
    dispatch(fetchGroupTodayTodoList(Number(group_id), todayYear, todayMonth, todayDate, signal));
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
  }, [todayYear, todayMonth, todayDate, props.editing]);

  useEffect(() => {
    if (pathName !== 'group' && !todayImplementationTodoList.length && !todayDueTodoList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchTodayTodoList(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate]);

  return (
    <TodayTodoListArea
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      editing={props.editing}
      setEditing={props.setEditing}
    />
  );
};

export default TodayTodoAreaContainer;
