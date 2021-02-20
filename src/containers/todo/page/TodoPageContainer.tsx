import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { month, year } from '../../../lib/constant';
import axios from 'axios';
import { useLocation } from 'react-router';
import { fetchGroups } from '../../../reducks/groups/operations';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import TodoPage from '../../../components/todo/page/TodoPage';
import moment from 'moment';

const TodoPageContainer = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];

  const [openSearchTodoList, setOpenSearchTodoList] = useState<boolean>(false);
  const [openSearchResultTodoList, setOpenSearchResultTodoList] = useState<boolean>(false);
  const [currentTodayOrMonthly, setCurrentTodayOrMonthly] = useState<TodayOrMonthly>('today');
  const [editing, setEditing] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  const currentYear = String(selectedYear);
  const currentMonth = moment(selectedMonth, 'MM').format('MM');

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

  const openSearch = () => {
    setOpenSearchTodoList(true);
  };

  const closeSearch = () => {
    setOpenSearchTodoList(false);
    setOpenSearchResultTodoList(false);
  };

  return (
    <TodoPage
      selectedYear={selectedYear}
      selectedMonth={selectedMonth}
      setSelectedYear={setSelectedYear}
      setSelectedMonth={setSelectedMonth}
      currentTodayOrMonthly={currentTodayOrMonthly}
      setCurrentTodayOrMonthly={setCurrentTodayOrMonthly}
      editing={editing}
      setEditing={setEditing}
      openSearchTodoList={openSearchTodoList}
      openSearchResultTodoList={openSearchResultTodoList}
      setOpenSearchResultTodoList={setOpenSearchResultTodoList}
      openSearch={openSearch}
      closeSearch={closeSearch}
      currentYear={currentYear}
      currentMonth={currentMonth}
      pathName={pathName}
    />
  );
};

export default TodoPageContainer;
