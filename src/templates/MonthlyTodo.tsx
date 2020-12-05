import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchExpiredTodoList, fetchMonthTodoList } from '../reducks/todoList/operations';
import {
  getExpiredTodoList,
  getMonthDueTodoList,
  getMonthImplementationTodoList,
} from '../reducks/todoList/selectors';
import { State } from '../reducks/store/types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExpiredTodoList, MonthlyTodoList, TodoMenu } from '../components/todo';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import {
  getGroupExpiredTodoList,
  getGroupMonthDueTodoList,
  getGroupMonthImplementationTodoList,
} from '../reducks/groupTodoList/selectors';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthTodoList,
  fetchGroupTodayTodoList,
} from '../reducks/groupTodoList/operations';
import { TodoList } from '../reducks/todoList/types';
import { GroupTodoList } from '../reducks/groupTodoList/types';
import { Header } from '../components/header';
import InputYears from '../components/uikit/InputYears';
import { month, year } from '../lib/constant';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '600px',
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
  const expiredTodoList = getExpiredTodoList(selector);
  const groupExpiredTodoList = getGroupExpiredTodoList(selector);
  const monthImplementationTodoList = getMonthImplementationTodoList(selector);
  const monthDueTodoList = getMonthDueTodoList(selector);
  const groupMonthImplementationTodoList = getGroupMonthImplementationTodoList(selector);
  const groupMonthDueTodoList = getGroupMonthDueTodoList(selector);
  const entityType = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1));
  }, [selectedYear, selectedMonth]);

  const fetchGroupTodoList = () => {
    dispatch(fetchGroupExpiredTodoList(groupId));
    dispatch(
      fetchGroupTodayTodoList(
        groupId,
        String(selectedYear),
        ('0' + selectedMonth).slice(-2),
        ('0' + selectedDate.getDate()).slice(-2)
      )
    );
    dispatch(
      fetchGroupMonthTodoList(groupId, String(selectedYear), ('0' + selectedMonth).slice(-2))
    );
  };

  useEffect(() => {
    if (entityType === 'group') {
      fetchGroupTodoList();
      const interval = setInterval(() => {
        fetchGroupTodoList();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedDate, selectedYear, selectedMonth]);

  useEffect(() => {
    dispatch(fetchGroups());
    const interval = setInterval(() => {
      dispatch(fetchGroups());
    }, 3000);
    return () => clearInterval(interval);
  }, [entityType]);

  useEffect(() => {
    if (entityType !== 'group') {
      dispatch(fetchExpiredTodoList());
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (entityType !== 'group') {
      dispatch(fetchMonthTodoList(String(selectedYear), ('0' + selectedMonth).slice(-2)));
    }
  }, [selectedYear, selectedMonth]);

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
          <InputYears
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
          <MonthlyTodoList
            selectedDate={selectedDate}
            groupId={groupId}
            groupMonthImplementationTodoList={groupMonthImplementationTodoList}
            groupMonthDueTodoList={groupMonthDueTodoList}
            monthImplementationTodoList={monthImplementationTodoList}
            monthDueTodoList={monthDueTodoList}
          />
        </div>
      </main>
    </>
  );
};

export default MonthlyTodo;
