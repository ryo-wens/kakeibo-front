import { useDispatch } from 'react-redux';
import {
  fetchExpiredTodoList,
  fetchMonthlyTodoList,
  fetchTodayTodoList,
} from '../../reducks/todoList/operations';
import axios, { CancelTokenSource } from 'axios';
import { FetchTodoListParams } from '../../reducks/todoList/types';

export const useFetchTodoList = () => {
  const dispatch = useDispatch();
  const signal: CancelTokenSource = axios.CancelToken.source();

  const getFetchTodoList = (props: FetchTodoListParams) => {
    const { currentYear, currentMonth, currentDate, selectedYear, selectedMonth } = props;

    dispatch(fetchExpiredTodoList(signal));
    dispatch(fetchTodayTodoList(currentYear, currentMonth, currentDate, signal));
    dispatch(fetchMonthlyTodoList(selectedYear, selectedMonth, signal));
  };

  return { getFetchTodoList };
};
