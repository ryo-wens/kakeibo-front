import { useDispatch } from 'react-redux';
import { FetchGroupShoppingListParams } from '../../reducks/groupShoppingList/types';
import {
  fetchGroupExpiredShoppingList,
  fetchGroupMonthlyShoppingList,
  fetchGroupMonthlyShoppingListByCategories,
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../reducks/groupShoppingList/operations';

export const useFetchGroupShoppingList = () => {
  const dispatch = useDispatch();

  const fetchGroupShoppingList = (props: FetchGroupShoppingListParams) => {
    const { groupId, currentYear, currentMonth, currentDate, selectedYear, selectedMonth } = props;

    dispatch(fetchGroupExpiredShoppingList(groupId));
    dispatch(fetchGroupTodayShoppingList(groupId, currentYear, currentMonth, currentDate));
    dispatch(
      fetchGroupTodayShoppingListByCategories(groupId, currentYear, currentMonth, currentDate)
    );
    dispatch(fetchGroupMonthlyShoppingList(groupId, selectedYear, selectedMonth));
    dispatch(fetchGroupMonthlyShoppingListByCategories(groupId, selectedYear, selectedMonth));
  };

  return { fetchGroupShoppingList };
};
