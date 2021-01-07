import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpiredTodoList, SearchTodoList } from '../index';
import { getExpiredTodoList } from '../../../reducks/todoList/selectors';
import { getGroupExpiredTodoList } from '../../../reducks/groupTodoList/selectors';
import { getWeekDay } from '../../../lib/date';
import { fetchExpiredTodoList } from '../../../reducks/todoList/operations';
import { GroupTodoList } from '../../../reducks/groupTodoList/types';
import { TodoList } from '../../../reducks/todoList/types';
import { date } from '../../../lib/constant';
import axios from 'axios';
import { useLocation } from 'react-router';
import './todo-page.scss';
import SwitchTodayOrMonthlyButton from '../SwitchTodayOrMonthlyButton';
import TodayTodoArea from './TodayTodoArea/TodayTodoArea';
import MonthlyTodoArea from './MonthlyTodoArea/MonthlyTodoArea';
import { fetchGroups } from '../../../reducks/groups/operations';

const TodoPage = () => {
  const dispatch = useDispatch();
  const expiredTodoList = useSelector(getExpiredTodoList);
  const groupExpiredTodoList = useSelector(getGroupExpiredTodoList);
  const pathName = useLocation().pathname.split('/')[1];
  const [openSearchTodoList, setOpenSearchTodoList] = useState<boolean>(false);
  const [openSearchResultTodoList, setOpenSearchResultTodoList] = useState<boolean>(false);
  const [currentTodayOrMonthly, setCurrentTodayOrMonthly] = useState<number>(0);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroups(signal));
      const interval = setInterval(() => {
        dispatch(fetchGroups(signal));
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    if (pathName !== 'group' && !expiredTodoList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredTodoList(signal));
      return () => signal.cancel();
    }
  }, [currentTodayOrMonthly]);

  const existsExpiredTodoList = (todoList: TodoList | GroupTodoList) => {
    if (todoList.length !== 0) {
      return <ExpiredTodoList expiredTodoList={todoList} setEditing={setEditing} />;
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
      {!openSearchTodoList ? (
        <div className="todo-page">
          <div className="todo-page__today-list">
            <div className="todo-page__today-list-content">
              <div className="todo-page__menu">
                <SwitchTodayOrMonthlyButton
                  currentTodayOrMonthly={currentTodayOrMonthly}
                  setCurrentTodayOrMonthly={setCurrentTodayOrMonthly}
                />
                <button className="todo-page__search" onClick={() => openSearch()}>
                  検索
                </button>
              </div>
              {currentTodayOrMonthly === 0 && (
                <span className="todo-page__today-date">
                  今日 {date.getMonth() + 1}/{date.getDate()} ({getWeekDay(date)})
                </span>
              )}

              <div className="todo-page__switch-schedule-todo-list">
                <div className="todo-page__switch-schedule-todo-list--width">
                  {currentTodayOrMonthly === 0 ? (
                    <TodayTodoArea editing={editing} setEditing={setEditing} />
                  ) : (
                    <MonthlyTodoArea editing={editing} setEditing={setEditing} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="todo-page__expired-list">
            <div className="todo-page__expired-list-content">
              {pathName !== 'group'
                ? existsExpiredTodoList(expiredTodoList)
                : existsExpiredTodoList(groupExpiredTodoList)}
            </div>
          </div>
        </div>
      ) : (
        <SearchTodoList
          openSearchResultTodoList={openSearchResultTodoList}
          setOpenSearchResultTodoList={setOpenSearchResultTodoList}
          closeSearch={closeSearch}
        />
      )}
    </>
  );
};

export default TodoPage;
