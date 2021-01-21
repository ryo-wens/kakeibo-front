import React, { useEffect } from 'react';
import ShoppingListByCategoriesComponent from '../../../../../components/shoppingList/uikit/List/ShoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayShoppingListByCategories } from '../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchTodayShoppingListByCategories } from '../../../../../reducks/shoppingList/operations';
import { customMonth, date, year } from '../../../../../lib/constant';

interface TodayShoppingListByCategoriesContainerProps {
  currentYearMonth: string;
}

const TodayShoppingListByCategoriesContainer = (
  props: TodayShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const todayShoppingListByCategories = useSelector(getTodayShoppingListByCategories);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (!todayShoppingListByCategories.length && !todayShoppingListByCategories.length) {
      dispatch(fetchTodayShoppingListByCategories(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, []);

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
      shoppingListByCategories={todayShoppingListByCategories}
      currentYearMonth={props.currentYearMonth}
      message={'今日の買い物リストは、登録されていません。'}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default TodayShoppingListByCategoriesContainer;
