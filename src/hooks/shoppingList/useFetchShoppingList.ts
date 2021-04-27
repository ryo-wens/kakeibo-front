import { useDispatch } from 'react-redux';
import {
  fetchExpiredShoppingList,
  fetchMonthlyShoppingList,
  fetchMonthlyShoppingListByCategories,
  fetchTodayShoppingList,
  fetchTodayShoppingListByCategories,
} from '../../reducks/shoppingList/operations';
import { FetchShoppingListParams } from '../../reducks/shoppingList/types';

export const useFetchShoppingList = () => {
  const dispatch = useDispatch();

  const fetchShoppingList = (props: FetchShoppingListParams) => {
    const { currentYear, currentMonth, currentDate, selectedYear, selectedMonth } = props;

    dispatch(fetchExpiredShoppingList());
    dispatch(fetchTodayShoppingList(currentYear, currentMonth, currentDate));
    dispatch(fetchTodayShoppingListByCategories(currentYear, currentMonth, currentDate));
    dispatch(fetchMonthlyShoppingList(selectedYear, selectedMonth));
    dispatch(fetchMonthlyShoppingListByCategories(selectedYear, selectedMonth));
  };

  return { fetchShoppingList };
};
