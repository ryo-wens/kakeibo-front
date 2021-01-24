import React, { useEffect } from 'react';
import ShoppingListByDate from '../../../../../components/shoppingList/modules/List/ShoppingListByDate/ShoppingListByDate';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayShoppingList } from '../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchTodayShoppingList } from '../../../../../reducks/shoppingList/operations';
import { customMonth, date, year } from '../../../../../lib/constant';

interface TodayShoppingListByDateContainerProps {
  currentYearMonth: string;
}

const TodayShoppingListByDateContainer = (props: TodayShoppingListByDateContainerProps) => {
  const dispatch = useDispatch();
  const todayShoppingList = useSelector(getTodayShoppingList);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (!todayShoppingList.length) {
      dispatch(fetchTodayShoppingList(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, []);

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
      shoppingListByDate={todayShoppingList}
      currentYearMonth={props.currentYearMonth}
      message={'今日の買い物リストは、登録されていません。'}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default TodayShoppingListByDateContainer;
