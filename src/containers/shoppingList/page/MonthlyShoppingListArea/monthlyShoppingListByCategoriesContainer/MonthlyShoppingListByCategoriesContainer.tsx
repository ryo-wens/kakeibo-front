import React, { useEffect } from 'react';
import ShoppingListByCategoriesComponent from '../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyShoppingListByCategories } from '../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchMonthlyShoppingListByCategories } from '../../../../../reducks/shoppingList/operations';

interface MonthlyShoppingListByCategoriesContainerProps {
  selectedYear: number;
  selectedMonth: number;
  currentYear: string;
  currentMonth: string;
}

const MonthlyShoppingListByCategoriesContainer = (
  props: MonthlyShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const monthlyShoppingListByCategories = useSelector(getMonthlyShoppingListByCategories);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingListByCategories(props.currentYear, props.currentMonth, signal));
    return () => signal.cancel();
  }, [props.currentYear, props.currentMonth]);

  const prevData = {
    categoryId: 0,
    expectedPurchaseDate: '',
  };

  const equalsDisplayDate = (categoryId: number, expectedPurchaseDate: string) => {
    if (prevData.categoryId !== categoryId) {
      prevData.categoryId = categoryId;
      prevData.expectedPurchaseDate = expectedPurchaseDate;
      return true;
    } else if (prevData.expectedPurchaseDate !== expectedPurchaseDate) {
      prevData.expectedPurchaseDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <ShoppingListByCategoriesComponent
      shoppingListByCategories={monthlyShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default MonthlyShoppingListByCategoriesContainer;
