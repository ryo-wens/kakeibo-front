import React, { useEffect } from 'react';
import ShoppingListByCategoriesComponent from '../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayShoppingListByCategories } from '../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchTodayShoppingListByCategories } from '../../../../../reducks/shoppingList/operations';
import { customMonth, date, year } from '../../../../../lib/constant';
import { useLocation } from 'react-router';

interface TodayShoppingListByCategoriesContainerProps {
  currentYear: string;
  currentMonth: string;
}

const TodayShoppingListByCategoriesContainer = (
  props: TodayShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
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
      shoppingListByCategories={todayShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={'今日の買い物リストは、登録されていません。'}
      equalsDisplayDate={equalsDisplayDate}
      pathName={pathName}
    />
  );
};

export default TodayShoppingListByCategoriesContainer;
