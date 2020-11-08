import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { AddTodo, ExpiredTodoList, TodoMenu } from '../components/todo';
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
  fetchDateTodoList,
  fetchExpiredTodoList,
  fetchMonthTodoList,
} from '../reducks/todoList/operations';
import { getWeekDay } from '../lib/date';
import SwitchTodoLists from '../components/todo/SwitchTodoLists';
import {
  fetchGroupExpiredTodoList,
  fetchGroupTodayTodoList,
} from '../reducks/groupTodoList/operations';
import {
  getGroupTodayImplementationTodoList,
  getGroupTodayDueTodoList,
  getGroupExpiredTodoList,
} from '../reducks/groupTodoList/selectors';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import { GroupTodoList } from '../reducks/groupTodoList/types';
import { TodoList } from '../reducks/todoList/types';

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
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
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
  const today: Date = new Date();
  const year = String(today.getFullYear());
  const month: string = ('0' + (today.getMonth() + 1)).slice(-2);
  const date: string = ('0' + today.getDate()).slice(-2);

  useEffect(() => {
    if (entityType !== 'group' && !expiredTodoList.length) {
      dispatch(fetchExpiredTodoList());
    } else if (entityType === 'group' && !groupExpiredTodoList.length) {
      dispatch(fetchGroupExpiredTodoList(groupId));
    }
  }, [entityType]);

  useEffect(() => {
    if (
      entityType !== 'group' &&
      !todayImplementationTodoList.length &&
      !todayDueTodoList.length &&
      !todayTodoListMessage
    ) {
      dispatch(fetchDateTodoList(year, month, date));
    }
  }, []);

  useEffect(() => {
    if (
      entityType !== 'group' &&
      !monthImplementationTodoList.length &&
      !monthDueTodoList.length &&
      !monthTodoListMessage
    ) {
      dispatch(fetchMonthTodoList(year, month));
    }
  }, []);

  useEffect(() => {
    if (entityType === 'group' && !approvedGroups.length && !unapprovedGroups.length) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    if (
      entityType === 'group' &&
      !groupTodayImplementationTodoList.length &&
      !groupTodayDueTodoList.length
    ) {
      dispatch(fetchGroupTodayTodoList(groupId, year, month, date));
    }
  }, []);

  const existsExpiredTodoList = (todoList: TodoList | GroupTodoList) => {
    if (todoList.length !== 0) {
      return <ExpiredTodoList expiredTodoList={todoList} />;
    }
  };

  return (
    <>
      <TodoMenu />
      <div className={classes.root}>
        {entityType !== 'group'
          ? existsExpiredTodoList(expiredTodoList)
          : existsExpiredTodoList(groupExpiredTodoList)}
        <span>
          今日 {today.getMonth() + 1}/{today.getDate()} ({getWeekDay(today)})
        </span>
        {entityType !== 'group' ? (
          <SwitchTodoLists
            implementationTodoList={todayImplementationTodoList}
            dueTodoList={todayDueTodoList}
          />
        ) : (
          <SwitchTodoLists
            implementationTodoList={groupTodayImplementationTodoList}
            dueTodoList={groupTodayDueTodoList}
          />
        )}
        <div>
          <AddTodo date={today} groupId={groupId} />
        </div>
      </div>
    </>
  );
};

export default Todo;
