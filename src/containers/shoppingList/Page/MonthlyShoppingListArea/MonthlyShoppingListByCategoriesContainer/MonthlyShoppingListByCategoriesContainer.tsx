import React, { useEffect } from 'react';
import ShoppingListByCategoriesComponent from '../../../../../components/shoppingList/uikit/List/ShoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyShoppingListByCategories } from '../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchMonthlyShoppingListByCategories } from '../../../../../reducks/shoppingList/operations';

interface MonthlyShoppingListByCategoriesContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const MonthlyShoppingListByCategoriesContainer = (
  props: MonthlyShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const monthlyShoppingListByCategories = useSelector(getMonthlyShoppingListByCategories);

  const currentYear = String(props.selectedYear);
  const currentMonth = (`0` + `${props.selectedMonth}`).slice(-2);
  const currentYearMonth = `${currentYear}/${currentMonth}`;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingListByCategories(currentYear, currentMonth, signal));
    return () => signal.cancel();
  }, [currentYear, currentMonth]);

  let prevDate = '';
  let prevCategoryId = 0;

  const equalsDisplayDate = (expectedPurchaseDate: string, categoryId: number) => {
    if (prevCategoryId !== categoryId) {
      prevCategoryId = categoryId;
      prevDate = expectedPurchaseDate;
      return true;
    } else if (prevDate !== expectedPurchaseDate) {
      prevDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <ShoppingListByCategoriesComponent
      shoppingListByCategories={monthlyShoppingListByCategories}
      currentYearMonth={currentYearMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default MonthlyShoppingListByCategoriesContainer;
