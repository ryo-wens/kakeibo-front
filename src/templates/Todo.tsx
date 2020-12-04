import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import { AddTodo, ExpiredTodoList, SwitchTodoList, TodoMenu } from '../components/todo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '40px 0px 0px 200px',
    },
  })
);

const Todo = () => {
  const classes = useStyles();
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

  const fetchGroupTodoList = () => {
    dispatch(fetchGroupExpiredTodoList(groupId));
    dispatch(fetchGroupTodayTodoList(groupId, todayYear, todayMonth, todayDate));
    dispatch(fetchGroupMonthTodoList(groupId, todayYear, todayMonth));
  };

  useEffect(() => {
    if (entityType === 'group') {
      fetchGroupTodoList();
      const interval = setInterval(() => {
        fetchGroupTodoList();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [entityType]);

  useEffect(() => {
    dispatch(fetchGroups());
    const interval = setInterval(() => {
      dispatch(fetchGroups());
    }, 3000);
    return () => clearInterval(interval);
  }, [entityType]);

  useEffect(() => {
    if (entityType !== 'group' && !expiredTodoList.length) {
      dispatch(fetchExpiredTodoList());
    }
  }, [entityType]);

  useEffect(() => {
    if (
      entityType !== 'group' &&
      !todayImplementationTodoList.length &&
      !todayDueTodoList.length &&
      !todayTodoListMessage
    ) {
      dispatch(fetchDateTodoList(todayYear, todayMonth, todayDate));
    }
  }, []);

  useEffect(() => {
    if (
      entityType !== 'group' &&
      !monthImplementationTodoList.length &&
      !monthDueTodoList.length &&
      !monthTodoListMessage
    ) {
      dispatch(fetchMonthTodoList(todayYear, todayMonth));
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
        <TodoMenu />
        <div className={classes.root}>
          {entityType !== 'group'
            ? existsExpiredTodoList(expiredTodoList)
            : existsExpiredTodoList(groupExpiredTodoList)}
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
          <div>
            <AddTodo date={date} groupId={groupId} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Todo;
