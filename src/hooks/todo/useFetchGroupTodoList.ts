import { useDispatch } from 'react-redux';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthlyTodoList,
  fetchGroupTodayTodoList,
} from '../../reducks/groupTodoList/operations';
import { FetchGroupTodoListParams } from '../../reducks/groupTodoList/types';

export const useFetchGroupTodoList = () => {
  const dispatch = useDispatch();

  const fetchGroupTodoList = (props: FetchGroupTodoListParams) => {
    const { groupId, currentYear, currentMonth, currentDate, selectedYear, selectedMonth } = props;

    dispatch(fetchGroupExpiredTodoList(groupId));
    dispatch(fetchGroupTodayTodoList(groupId, currentYear, currentMonth, currentDate));
    dispatch(fetchGroupMonthlyTodoList(groupId, selectedYear, selectedMonth));
  };

  return { fetchGroupTodoList };
};
