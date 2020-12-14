import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import {
  AddTodo,
  ExpiredTodoList,
  SwitchTodoList,
  SwitchDateButton,
  SearchTodoList,
} from '../components/todo';
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
import { GroupTodoList } from '../reducks/groupTodoList/types';
import { TodoList } from '../reducks/todoList/types';
import { date } from '../lib/constant';
import { Header } from '../components/header';
import axios, { CancelTokenSource } from 'axios';
import '../assets/todo/todo.scss';
import { getApprovedGroups } from '../reducks/groups/selectors';
import { useLocation, useParams } from 'react-router';

const Todo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
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
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);
  const [openSearchTodoList, setOpenSearchTodoList] = useState<boolean>(false);
  const [openSearchResultTodoList, setOpenSearchResultTodoList] = useState<boolean>(false);

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroupExpiredTodoList(Number(id), signal));
    dispatch(fetchGroupTodayTodoList(Number(id), todayYear, todayMonth, todayDate, signal));
    dispatch(fetchGroupMonthTodoList(Number(id), todayYear, todayMonth, signal));
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
  }, []);

  useEffect(() => {
    if (pathName !== 'group' && !expiredTodoList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredTodoList(signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate]);

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

  useEffect(() => {
    if (
      pathName !== 'group' &&
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
          <div className="todo">
            <div className="todo__today-list">
              <div className="todo__menu">
                <SwitchDateButton />
                <button className="todo__search" onClick={() => openSearch()}>
                  検索
                </button>
              </div>
              <span className="todo__today-date">
                今日 {date.getMonth() + 1}/{date.getDate()} ({getWeekDay(date)})
              </span>

              {pathName !== 'group' ? (
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
              <AddTodo date={date} groupId={Number(id)} />
            </div>
            <div className="todo__expired-list">
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
            approvedGroups={approvedGroups}
          />
        )}
      </main>
    </>
  );
};

export default Todo;
