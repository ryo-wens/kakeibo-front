import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchExpiredTodoList, fetchMonthTodoList } from '../reducks/todoList/operations';
import {
  getExpiredTodoList,
  getMonthDueTodoList,
  getMonthImplementationTodoList,
} from '../reducks/todoList/selectors';
import {
  ExpiredTodoList,
  MonthlyTodoList,
  SearchTodoList,
  SwitchDateButton,
} from '../components/todo';
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
import axios, { CancelTokenSource } from 'axios';
import '../assets/todo/monthly-todo.scss';
import { useLocation, useParams } from 'react-router';

const MonthlyTodo = () => {
  const dispatch = useDispatch();
  const expiredTodoList = useSelector(getExpiredTodoList);
  const groupExpiredTodoList = useSelector(getGroupExpiredTodoList);
  const monthImplementationTodoList = useSelector(getMonthImplementationTodoList);
  const monthDueTodoList = useSelector(getMonthDueTodoList);
  const groupMonthImplementationTodoList = useSelector(getGroupMonthImplementationTodoList);
  const groupMonthDueTodoList = useSelector(getGroupMonthDueTodoList);
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();

  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openSearchTodoList, setOpenSearchTodoList] = useState<boolean>(false);
  const [openSearchResultTodoList, setOpenSearchResultTodoList] = useState<boolean>(false);

  useEffect(() => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1));
  }, [selectedYear, selectedMonth]);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroupExpiredTodoList(Number(id), signal));
    dispatch(
      fetchGroupTodayTodoList(
        Number(id),
        String(selectedYear),
        ('0' + selectedMonth).slice(-2),
        ('0' + selectedDate.getDate()).slice(-2),
        signal
      )
    );
    dispatch(
      fetchGroupMonthTodoList(
        Number(id),
        String(selectedYear),
        ('0' + selectedMonth).slice(-2),
        signal
      )
    );
  };

  useEffect(() => {
    if (pathName === 'group') {
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
  }, [selectedYear, selectedMonth, selectedDate]);

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
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredTodoList(signal));
      dispatch(fetchMonthTodoList(String(selectedYear), ('0' + selectedMonth).slice(-2), signal));
      return () => signal.cancel();
    }
  }, [selectedYear, selectedMonth, selectedDate]);

  const existsExpiredTodoList = (todoList: TodoList | GroupTodoList) => {
    if (todoList.length !== 0) {
      return <ExpiredTodoList expiredTodoList={todoList} />;
    }
  };

  const openSearch = () => {
    setOpenSearchTodoList(true);
  };

  const closeSearch = () => {
    setOpenSearchTodoList(false);
    setOpenSearchResultTodoList(false);
  };

  return (
    <>
      <Header />
      <main className="section__container">
        {!openSearchTodoList ? (
          <div className="monthly-todo">
            <div className="monthly-todo__monthly-list">
              <div className="monthly-todo__menu">
                <SwitchDateButton />
                <button className="todo__search" onClick={() => openSearch()}>
                  検索
                </button>
              </div>
              <InputYears
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
              />
              <MonthlyTodoList
                selectedDate={selectedDate}
                groupId={Number(id)}
                groupMonthImplementationTodoList={groupMonthImplementationTodoList}
                groupMonthDueTodoList={groupMonthDueTodoList}
                monthImplementationTodoList={monthImplementationTodoList}
                monthDueTodoList={monthDueTodoList}
              />
            </div>
            <div className="monthly-todo__expired-list">
              {pathName !== 'group'
                ? existsExpiredTodoList(expiredTodoList)
                : existsExpiredTodoList(groupExpiredTodoList)}
            </div>
          </div>
        ) : (
          <SearchTodoList
            openSearchResultTodoList={openSearchResultTodoList}
            setOpenSearchResultTodoList={setOpenSearchResultTodoList}
            closeSearch={closeSearch}
          />
        )}
      </main>
    </>
  );
};

export default MonthlyTodo;
