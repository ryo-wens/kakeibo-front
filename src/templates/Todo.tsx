import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { AddTodo, TodoMenu } from '../components/todo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  getTodayDueTodoList,
  getTodayImplementationTodoList,
  getTodayTodoListMessage,
} from '../reducks/todoLists/selectors';
import { fetchDateTodoLists } from '../reducks/todoLists/operations';
import { getWeekDay } from '../lib/date';
import SwitchTodoLists from '../components/todo/SwitchTodoLists';

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
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date: string = ('0' + dt.getDate()).slice(-2);
  const weekday: string = getWeekDay(dt);

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    if (!todayImplementationTodoList.length && !todayDueTodoList.length && !todayTodoListMessage) {
      dispatch(fetchDateTodoLists(year, month, date));
    }
  }, []);

  return (
    <>
      <TodoMenu />
      <div className={classes.root}>
        <span>
          今日 {month}/{date} ({weekday})
        </span>
        <SwitchTodoLists
          implementationTodoList={todayImplementationTodoList}
          dueTodoList={todayDueTodoList}
        />
        <div>
          <AddTodo date={dt} />
        </div>
      </div>
    </>
  );
};

export default Todo;
