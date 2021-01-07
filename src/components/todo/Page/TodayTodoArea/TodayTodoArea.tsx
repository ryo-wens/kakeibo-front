import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthTodoList,
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
import {
  getGroupTodayDueTodoList,
  getGroupTodayImplementationTodoList,
} from '../../../../reducks/groupTodoList/selectors';
import { useLocation, useParams } from 'react-router';
import { date } from '../../../../lib/constant';
import TodayTodoList from './TodayTodoList/TodayTodoList';
import { AddTodo } from '../../index';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';

interface TodayTodoAreaProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoArea = (props: TodayTodoAreaProps) => {
  const dispatch = useDispatch();
  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const todayTodoListMessage = useSelector(getTodayTodoListMessage);
  const groupTodayImplementationTodoList = useSelector(getGroupTodayImplementationTodoList);
  const groupTodayDueTodoList = useSelector(getGroupTodayDueTodoList);
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupExpiredTodoList(Number(id), signal));
    dispatch(fetchGroupTodayTodoList(Number(id), todayYear, todayMonth, todayDate, signal));
    dispatch(fetchGroupMonthTodoList(Number(id), todayYear, todayMonth, signal));
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
          <TodayTodoList
            planName={'実施予定'}
            planTodoList={
              pathName === 'group' ? groupTodayImplementationTodoList : todayImplementationTodoList
            }
            implementationTodoList={
              pathName === 'group' ? groupTodayImplementationTodoList : todayImplementationTodoList
            }
            dueTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
            setEditing={props.setEditing}
          />
        }
        rightItem={
          <TodayTodoList
            planName={'締切予定'}
            planTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
            implementationTodoList={
              pathName === 'group' ? groupTodayImplementationTodoList : todayImplementationTodoList
            }
            dueTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
            setEditing={props.setEditing}
          />
        }
      />
      <AddTodo date={date} />
    </>
  );
};

export default TodayTodoArea;
