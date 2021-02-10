import React, { useEffect } from 'react';
import ShoppingListByDate from '../../../../../components/shoppingList/modules/list/shoppingListByDate/ShoppingListByDate';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyShoppingList } from '../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchMonthlyShoppingList } from '../../../../../reducks/shoppingList/operations';

interface MonthlyShoppingListByDateContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const MonthlyShoppingListByDateContainer = (props: MonthlyShoppingListByDateContainerProps) => {
  const dispatch = useDispatch();
  const monthlyShoppingList = useSelector(getMonthlyShoppingList);

  const currentYear = String(props.selectedYear);
  const currentMonth = (`0` + `${props.selectedMonth}`).slice(-2);
  const currentYearMonth = `${currentYear}/${currentMonth}`;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingList(currentYear, currentMonth, signal));
    return () => signal.cancel();
  }, [currentYear, currentMonth]);

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
      currentYearMonth={currentYearMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default MonthlyShoppingListByDateContainer;
