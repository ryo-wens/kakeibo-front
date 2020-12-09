import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import { AddTodo, ExpiredTodoList, SwitchTodoList, SwitchDateButton } from '../components/todo';
import {
  getExpiredTodoList,
  getMonthDueTodoList,
  getMonthImplementationTodoList,
  getMonthTodoListMessage,
  getTodayDueTodoList,
  getTodayImplementationTodoList,
  getTodayTodoListMessage,
} from '../reducks/todoList/selectors';
import {
  getGroupTodayImplementationTodoList,
  getGroupTodayDueTodoList,
  getGroupExpiredTodoList,
} from '../reducks/groupTodoList/selectors';
import { getWeekDay } from '../lib/date';
import {
  fetchDateTodoList,
  fetchExpiredTodoList,
  fetchMonthTodoList,
} from '../reducks/todoList/operations';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthTodoList,
  fetchGroupTodayTodoList,
} from '../reducks/groupTodoList/operations';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import { GroupTodoList } from '../reducks/groupTodoList/types';
import { TodoList } from '../reducks/todoList/types';
import { date } from '../lib/constant';
import { Header } from '../components/header';
import axios, { CancelTokenSource } from 'axios';
import '../assets/todo/todo.scss';

const Todo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const expiredTodoList = getExpiredTodoList(selector);
  const groupExpiredTodoList = getGroupExpiredTodoList(selector);
  const todayImplementationTodoList = getTodayImplementationTodoList(selector);
  const todayDueTodoList = getTodayDueTodoList(selector);
  const todayTodoListMessage = getTodayTodoListMessage(selector);
  const monthImplementationTodoList = getMonthImplementationTodoList(selector);
  const monthDueTodoList = getMonthDueTodoList(selector);
  const monthTodoListMessage = getMonthTodoListMessage(selector);
  const groupTodayImplementationTodoList = getGroupTodayImplementationTodoList(selector);
  const groupTodayDueTodoList = getGroupTodayDueTodoList(selector);
  const entityType = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroupExpiredTodoList(groupId, signal));
    dispatch(fetchGroupTodayTodoList(groupId, todayYear, todayMonth, todayDate, signal));
    dispatch(fetchGroupMonthTodoList(groupId, todayYear, todayMonth, signal));
  };

  useEffect(() => {
    if (entityType === 'group') {
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
  }, [todayYear, todayMonth, todayDate]);

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
  }, [todayYear, todayMonth, todayDate]);

  useEffect(() => {
    if (entityType !== 'group' && !expiredTodoList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredTodoList(signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate]);

  useEffect(() => {
    if (
      entityType !== 'group' &&
      !todayImplementationTodoList.length &&
      !todayDueTodoList.length &&
      !todayTodoListMessage
    ) {
      const signal = axios.CancelToken.source();
      dispatch(fetchDateTodoList(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate]);

  useEffect(() => {
    if (
      entityType !== 'group' &&
      !monthImplementationTodoList.length &&
      !monthDueTodoList.length &&
      !monthTodoListMessage
    ) {
      const signal = axios.CancelToken.source();
      dispatch(fetchMonthTodoList(todayYear, todayMonth, signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth]);

  const existsExpiredTodoList = (todoList: TodoList | GroupTodoList) => {
    if (todoList.length !== 0) {
      return <ExpiredTodoList expiredTodoList={todoList} />;
    }
  };

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="todo">
          <SwitchDateButton />
          <div className="todo__contents">
            <div className="todo__contents-item">
              <span>
                今日 {date.getMonth() + 1}/{date.getDate()} ({getWeekDay(date)})
              </span>

              {entityType !== 'group' ? (
                <SwitchTodoList
                  implementationTodoList={todayImplementationTodoList}
                  dueTodoList={todayDueTodoList}
                />
              ) : (
                <SwitchTodoList
                  implementationTodoList={groupTodayImplementationTodoList}
                  dueTodoList={groupTodayDueTodoList}
                />
              )}
              <AddTodo date={date} groupId={groupId} />
            </div>
            <div className="todo__contents-item">
              {entityType !== 'group'
                ? existsExpiredTodoList(expiredTodoList)
                : existsExpiredTodoList(groupExpiredTodoList)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Todo;
