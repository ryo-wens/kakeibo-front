import React, { useEffect } from 'react';
import ShoppingListByDate from '../../../../../../components/shoppingList/modules/list/shoppingListByDate/ShoppingListByDate';
import { useDispatch, useSelector } from 'react-redux';
import { getDisplayTodayShoppingListByDate } from '../../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchTodayShoppingList } from '../../../../../../reducks/shoppingList/operations';
import { customDate, customMonth, year } from '../../../../../../lib/constant';

interface TodayShoppingListByDateContainerProps {
  currentYear: string;
  currentMonth: string;
}

const TodayShoppingListByDateContainer = (props: TodayShoppingListByDateContainerProps) => {
  const dispatch = useDispatch();
  const todayShoppingListByDate = useSelector(getDisplayTodayShoppingListByDate);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate = customDate;

  useEffect(() => {
    const notExistsTodayShoppingListByDate = todayShoppingListByDate.length === 0;
    const signal = axios.CancelToken.source();

    if (notExistsTodayShoppingListByDate) {
      dispatch(fetchTodayShoppingList(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, []);

  return (
    <ShoppingListByDate
      shoppingListByDate={todayShoppingListByDate}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={'今日の買い物リストは、登録されていません。'}
    />
  );
};

export default TodayShoppingListByDateContainer;
