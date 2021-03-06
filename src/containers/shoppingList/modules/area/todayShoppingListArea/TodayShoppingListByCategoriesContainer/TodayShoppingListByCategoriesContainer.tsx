import React, { useEffect } from 'react';
import ShoppingListByCategoriesComponent from '../../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getDisplayTodayShoppingListByCategories } from '../../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchTodayShoppingListByCategories } from '../../../../../../reducks/shoppingList/operations';
import { customDate, customMonth, year } from '../../../../../../lib/constant';
import { useLocation } from 'react-router';
import { generateZeroPaddingMonth } from '../../../../../../lib/date';

interface TodayShoppingListByCategoriesContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const TodayShoppingListByCategoriesContainer = (
  props: TodayShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const todayShoppingListByCategories = useSelector(getDisplayTodayShoppingListByCategories);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate = customDate;
  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  useEffect(() => {
    const notExistsTodayShoppingListByCategories = todayShoppingListByCategories.length === 0;
    const signal = axios.CancelToken.source();

    if (notExistsTodayShoppingListByCategories) {
      dispatch(fetchTodayShoppingListByCategories(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, []);

  return (
    <ShoppingListByCategoriesComponent
      shoppingListByCategories={todayShoppingListByCategories}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      message={'今日の買い物リストは、登録されていません。'}
      pathName={pathName}
    />
  );
};

export default TodayShoppingListByCategoriesContainer;
