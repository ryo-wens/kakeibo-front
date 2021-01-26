import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupTodayTodoList,
} from '../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../reducks/groups/operations';
import { fetchDateTodoList } from '../../../../reducks/todoList/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTodayDueTodoList,
  getTodayImplementationTodoList,
  getTodayTodoListMessage,
} from '../../../../reducks/todoList/selectors';
import { useLocation, useParams } from 'react-router';
import { date } from '../../../../lib/constant';
import { AddTodo } from '../../index';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayImplementationDateTodoListContainer from '../../../../containers/todo/page/TodayTodoListArea/TodayImplementationDateTodoListContainer/TodayImplementationDateTodoListContainer';
import TodayDueDateTodoListContainer from '../../../../containers/todo/page/TodayTodoListArea/TodayDueDateTodoListContainer/TodayDueDateTodoListContainer';

interface TodayTodoAreaProps {
  currentYearMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoArea = (props: TodayTodoAreaProps) => {
  const dispatch = useDispatch();
  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const todayTodoListMessage = useSelector(getTodayTodoListMessage);
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
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
    if (
      pathName !== 'group' &&
      !todayImplementationTodoList.length &&
      !todayDueTodoList.length &&
      !todayTodoListMessage
    ) {
      const signal = axios.CancelToken.source();
      dispatch(fetchDateTodoList(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate]);

  return (
    <>
      <SwitchItemTabs
        leftButtonLabel={'実施予定のToDo'}
        rightButtonLabel={'締切予定のToDo'}
        leftItem={
          <TodayImplementationDateTodoListContainer
            currentYearMonth={props.currentYearMonth}
            setEditing={props.setEditing}
          />
        }
        rightItem={
          <TodayDueDateTodoListContainer
            currentYearMonth={props.currentYearMonth}
            setEditing={props.setEditing}
          />
        }
      />
      <AddTodo date={date} />
    </>
  );
};

export default TodayTodoArea;
