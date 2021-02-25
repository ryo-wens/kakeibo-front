import React, { useEffect } from 'react';
import ShoppingListByDate from '../../../../../components/shoppingList/modules/list/shoppingListByDate/ShoppingListByDate';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyShoppingList } from '../../../../../reducks/shoppingList/selectors';
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
  const monthlyShoppingList = useSelector(getMonthlyShoppingList);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingList(props.currentYear, props.currentMonth, signal));
    return () => signal.cancel();
  }, [props.currentYear, props.currentMonth]);

  const prevData = {
    expectedPurchaseDate: '',
  };

  const equalsDisplayDate = (expectedPurchaseDate: string) => {
    if (prevData.expectedPurchaseDate !== expectedPurchaseDate) {
      prevData.expectedPurchaseDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <ShoppingListByDate
      shoppingListByDate={monthlyShoppingList}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default MonthlyShoppingListByDateContainer;
