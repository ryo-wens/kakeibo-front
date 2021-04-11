import { useDispatch } from 'react-redux';
import {
  fetchExpiredTodoList,
  fetchMonthlyTodoList,
  fetchTodayTodoList,
} from '../../reducks/todoList/operations';
import { FetchTodoListParams } from '../../reducks/todoList/types';

export const useFetchTodoList = () => {
  const dispatch = useDispatch();

  const fetchTodoList = (props: FetchTodoListParams) => {
    const { currentYear, currentMonth, currentDate, selectedYear, selectedMonth } = props;

    dispatch(fetchExpiredTodoList());
    dispatch(fetchTodayTodoList(currentYear, currentMonth, currentDate));
    dispatch(fetchMonthlyTodoList(selectedYear, selectedMonth));
  };

  return { fetchTodoList };
};
