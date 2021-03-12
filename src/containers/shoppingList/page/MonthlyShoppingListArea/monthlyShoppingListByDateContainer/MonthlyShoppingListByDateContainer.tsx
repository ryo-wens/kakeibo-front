import React, { useEffect } from 'react';
import ShoppingListByDate from '../../../../../components/shoppingList/modules/list/shoppingListByDate/ShoppingListByDate';
import { useDispatch, useSelector } from 'react-redux';
import { getDisplayMonthlyShoppingListByDate } from '../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchMonthlyShoppingList } from '../../../../../reducks/shoppingList/operations';

interface MonthlyShoppingListByDateContainerProps {
  selectedYear: number;
  selectedMonth: number;
  currentYear: string;
  currentMonth: string;
}

const MonthlyShoppingListByDateContainer = (props: MonthlyShoppingListByDateContainerProps) => {
  const dispatch = useDispatch();
  const displayMonthlyShoppingList = useSelector(getDisplayMonthlyShoppingListByDate);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingList(props.currentYear, props.currentMonth, signal));
    return () => signal.cancel();
  }, [props.currentYear, props.currentMonth]);

  return (
    <ShoppingListByDate
      shoppingListByDate={displayMonthlyShoppingList}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
    />
  );
};

export default MonthlyShoppingListByDateContainer;
