import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { AddTodo, TodoMenu } from '../components/todo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  getMonthDueTodoList,
  getMonthImplementationTodoList,
  getMonthTodoListMessage,
  getTodayDueTodoList,
  getTodayImplementationTodoList,
  getTodayTodoListMessage,
} from '../reducks/todoLists/selectors';
import { fetchDateTodoList, fetchMonthTodoList } from '../reducks/todoLists/operations';
import { getWeekDay } from '../lib/date';
import SwitchTodoLists from '../components/todo/SwitchTodoLists';
import { fetchGroupTodayTodoList } from '../reducks/groupTodoList/operations';
import {
  getGroupTodayImplementationTodoList,
  getGroupTodayDueTodoList,
} from '../reducks/groupTodoList/selectors';
import { getPathGroupId, getPathTemplateName } from '../lib/path';

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
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date: string = ('0' + dt.getDate()).slice(-2);
  const weekday: string = getWeekDay(dt);

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

  return (
    <>
      <TodoMenu />
      <div className={classes.root}>
        <span>
          今日 {month}/{date} ({weekday})
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
          <AddTodo date={dt} groupId={groupId} />
        </div>
      </div>
    </>
  );
};

export default Todo;
