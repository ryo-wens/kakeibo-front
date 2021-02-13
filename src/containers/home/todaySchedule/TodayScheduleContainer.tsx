import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { fetchDateTodoList } from '../../../reducks/todoList/operations';
import { useDispatch, useSelector } from 'react-redux';
import { customMonth, date, year } from '../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import {
  getTodayDueTodoList,
  getTodayImplementationTodoList,
} from '../../../reducks/todoList/selectors';
import {
  getGroupTodayDueTodoList,
  getGroupTodayImplementationTodoList,
} from '../../../reducks/groupTodoList/selectors';
import { fetchGroupTodayTodoList } from '../../../reducks/groupTodoList/operations';
import {
  fetchTodayShoppingList,
  fetchTodayShoppingListByCategories,
} from '../../../reducks/shoppingList/operations';
import {
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../../reducks/groupShoppingList/operations';
import TodaySchedule from '../../../components/home/todaySchedule/TodaySchedule';

interface TodayScheduleContainerProps {
  todoEditing: boolean;
  setTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayScheduleContainer = (props: TodayScheduleContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();

  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const groupTodayImplementationTodoList = useSelector(getGroupTodayImplementationTodoList);
  const groupTodayDueTodoList = useSelector(getGroupTodayDueTodoList);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  const currentYearMonth = `${todayYear}/${todayMonth}`;

  const fetchGroupData = (groupId: number, signal: CancelTokenSource) => {
    dispatch(fetchGroupTodayTodoList(groupId, todayYear, todayMonth, todayDate, signal));
    dispatch(fetchGroupTodayShoppingList(groupId, todayYear, todayMonth, todayDate, signal));
    dispatch(
      fetchGroupTodayShoppingListByCategories(groupId, todayYear, todayMonth, todayDate, signal)
    );
  };

  useEffect(() => {
    if (pathName === 'group' && !props.todoEditing) {
      const signal = axios.CancelToken.source();
      fetchGroupData(Number(group_id), signal);
      const interval = setInterval(() => {
        fetchGroupData(Number(group_id), signal);
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [todayYear, todayMonth, todayDate, props.todoEditing, pathName, group_id]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchDateTodoList(todayYear, todayMonth, todayDate, signal));
      dispatch(fetchTodayShoppingList(todayYear, todayMonth, todayDate, signal));
      dispatch(fetchTodayShoppingListByCategories(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate, pathName]);

  return (
    <TodaySchedule
      todoEditing={props.todoEditing}
      setTodoEditing={props.setTodoEditing}
      pathName={pathName}
      currentYearMonth={currentYearMonth}
      implementationTodoList={
        pathName === 'group' ? groupTodayImplementationTodoList : todayImplementationTodoList
      }
      dueTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
    />
  );
};

export default TodayScheduleContainer;
