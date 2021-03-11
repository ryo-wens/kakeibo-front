import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { fetchTodayTodoList } from '../../../reducks/todoList/operations';
import { useDispatch, useSelector } from 'react-redux';
import { customDate, customMonth, year } from '../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import {
  getDisplayInHomeDueTodoList,
  getDisplayInHomeImplementationTodoList,
} from '../../../reducks/todoList/selectors';
import {
  getGroupDisplayInHomeDueTodoList,
  getGroupDisplayInHomeImplementationTodoList,
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
import {
  fetchGroupTaskList,
  fetchGroupTaskListForEachUser,
} from '../../../reducks/groupTasks/operations';

interface TodayScheduleContainerProps {
  todoEditing: boolean;
  setTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayScheduleContainer = (props: TodayScheduleContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams<{ group_id: string }>();

  const implementationTodoList = useSelector(getDisplayInHomeImplementationTodoList);
  const dueTodoList = useSelector(getDisplayInHomeDueTodoList);
  const groupImplementationTodoList = useSelector(getGroupDisplayInHomeImplementationTodoList);
  const groupDueTodoList = useSelector(getGroupDisplayInHomeDueTodoList);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate = String(customDate);

  const fetchGroupData = (groupId: number, signal: CancelTokenSource) => {
    dispatch(fetchGroupTodayTodoList(groupId, todayYear, todayMonth, todayDate, signal));
    dispatch(fetchGroupTodayShoppingList(groupId, todayYear, todayMonth, todayDate, signal));
    dispatch(
      fetchGroupTodayShoppingListByCategories(groupId, todayYear, todayMonth, todayDate, signal)
    );
    dispatch(fetchGroupTaskList(groupId, signal));
    dispatch(fetchGroupTaskListForEachUser(groupId, signal));
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
      dispatch(fetchTodayTodoList(todayYear, todayMonth, todayDate, signal));
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
      currentYear={todayYear}
      currentMonth={todayMonth}
      implementationTodoList={
        pathName === 'group' ? groupImplementationTodoList : implementationTodoList
      }
      dueTodoList={pathName === 'group' ? groupDueTodoList : dueTodoList}
    />
  );
};

export default TodayScheduleContainer;
