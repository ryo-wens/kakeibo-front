import React from 'react';
import { RegularShoppingListItem, TodayOrMonthly } from '../../../../../reducks/shoppingList/types';
import { useDispatch } from 'react-redux';
import { CancelTokenSource } from 'axios';

import {
  fetchExpiredShoppingList,
  fetchMonthlyShoppingList,
  fetchMonthlyShoppingListByCategories,
  fetchTodayShoppingList,
  fetchTodayShoppingListByCategories,
} from '../../../../../reducks/shoppingList/operations';
import { customMonth, date, year } from '../../../../../lib/constant';
import RegularShoppingListItemComponent from '../../../../../components/shoppingList/modules/ListItem/RegularShoppingListItemComponent/RegularShoppingListItemComponent';

interface RegularShoppingListItemComponentContainerProps {
  listItem: RegularShoppingListItem;
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const RegularShoppingListItemComponentContainer = (
  props: RegularShoppingListItemComponentContainerProps
) => {
  const dispatch = useDispatch();
  const todayDate: string = ('0' + date.getDate()).slice(-2);
  const currentYear = props.currentYearMonth.split('/')[0];
  const currentMonth = props.currentYearMonth.split('/')[1];

  const fetchTodayOrMonthlyShoppingList = (signal: CancelTokenSource) => {
    if (props.currentTodayOrMonthly === 'today') {
      dispatch(fetchExpiredShoppingList(signal));
      dispatch(fetchTodayShoppingList(String(year), customMonth, todayDate, signal));
      dispatch(fetchTodayShoppingListByCategories(String(year), customMonth, todayDate, signal));
    } else if (props.currentTodayOrMonthly === 'monthly') {
      dispatch(fetchExpiredShoppingList(signal));
      dispatch(fetchMonthlyShoppingList(currentYear, currentMonth, signal));
      dispatch(fetchMonthlyShoppingListByCategories(currentYear, currentMonth, signal));
    }
  };

  return (
    <RegularShoppingListItemComponent
      listItem={props.listItem}
      currentYearMonth={props.currentYearMonth}
      fetchTodayOrMonthlyShoppingList={fetchTodayOrMonthlyShoppingList}
    />
  );
};

export default RegularShoppingListItemComponentContainer;
