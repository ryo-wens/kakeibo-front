import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchExpiredTodoList, fetchMonthTodoList } from '../reducks/todoList/operations';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import {
  getExpiredTodoList,
  getMonthDueTodoList,
  getMonthImplementationTodoList,
  getMonthTodoListMessage,
} from '../reducks/todoList/selectors';
import { State } from '../reducks/store/types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExpiredTodoList, MonthlyTodoList, SkipMonth, TodoMenu } from '../components/todo';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import {
  getGroupExpiredTodoList,
  getGroupMonthDueTodoList,
  getGroupMonthImplementationTodoList,
  getGroupMonthTodoListMessage,
} from '../reducks/groupTodoList/selectors';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthTodoList,
} from '../reducks/groupTodoList/operations';
import { date } from '../lib/constant';
import { TodoList } from '../reducks/todoList/types';
import { GroupTodoList } from '../reducks/groupTodoList/types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '700px',
      margin: '40px 0px 0px 200px',
    },
    date: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    datePicker: {
      width: `200px`,
    },
  })
);

const MonthlyTodo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const expiredTodoList = getExpiredTodoList(selector);
  const groupExpiredTodoList = getGroupExpiredTodoList(selector);
  const monthImplementationTodoList = getMonthImplementationTodoList(selector);
  const monthDueTodoList = getMonthDueTodoList(selector);
  const monthTodoListMessage = getMonthTodoListMessage(selector);
  const groupMonthImplementationTodoList = getGroupMonthImplementationTodoList(selector);
  const groupMonthDueTodoList = getGroupMonthDueTodoList(selector);
  const groupMonthTodoListMessage = getGroupMonthTodoListMessage(selector);
  const entityType = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const year = String(date.getFullYear());
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (entityType !== 'group' && !expiredTodoList.length) {
      dispatch(fetchExpiredTodoList());
    } else if (entityType === 'group' && !groupExpiredTodoList.length) {
      dispatch(fetchGroupExpiredTodoList(groupId));
    }
  }, [entityType]);

  useEffect(() => {
    if (entityType === 'group' && approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
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
    if (
      entityType === 'group' &&
      !groupMonthImplementationTodoList.length &&
      !groupMonthDueTodoList.length &&
      !groupMonthTodoListMessage
    ) {
      dispatch(fetchGroupMonthTodoList(groupId, year, month));
    }
  }, [groupId]);

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
        <SkipMonth selectDate={selectedDate} setSelectDate={setSelectedDate} />
        <MonthlyTodoList
          selectedDate={selectedDate}
          groupId={groupId}
          groupMonthImplementationTodoList={groupMonthImplementationTodoList}
          groupMonthDueTodoList={groupMonthDueTodoList}
          monthImplementationTodoList={monthImplementationTodoList}
          monthDueTodoList={monthDueTodoList}
        />
      </div>
    </>
  );
};

export default MonthlyTodo;
