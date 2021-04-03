import React, { useEffect } from 'react';
import ShoppingListByCategoriesComponent from '../../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getDisplayMonthlyShoppingListByCategories } from '../../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchMonthlyShoppingListByCategories } from '../../../../../../reducks/shoppingList/operations';
import { useLocation } from 'react-router';

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
  const pathName = useLocation().pathname.split('/')[1];
  const monthlyShoppingListByCategories = useSelector(getDisplayMonthlyShoppingListByCategories);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingListByCategories(props.currentYear, props.currentMonth, signal));
    return () => signal.cancel();
  }, [props.currentYear, props.currentMonth]);

  return (
    <ShoppingListByCategoriesComponent
      shoppingListByCategories={monthlyShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
      pathName={pathName}
    />
  );
};

export default MonthlyShoppingListByCategoriesContainer;
