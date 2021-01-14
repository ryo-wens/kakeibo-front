import React from 'react';
import './regular-shopping-list-item-component.scss';
import { RegularShoppingListItem, TodayOrMonthly } from '../../../../../reducks/shoppingList/types';
import EditRegularShoppingListModal from '../../Modal/EditRegularShoppingListModal/EditRegularShoppingListModal';
import { useDispatch } from 'react-redux';
import { CancelTokenSource } from 'axios';

import {
  fetchMonthlyShoppingList,
  fetchMonthlyShoppingListByCategories,
  fetchTodayShoppingList,
  fetchTodayShoppingListByCategories,
} from '../../../../../reducks/shoppingList/operations';
import { customMonth, date, year } from '../../../../../lib/constant';

interface RegularShoppingListItemComponentProps {
  listItem: RegularShoppingListItem;
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const RegularShoppingListItemComponent = (props: RegularShoppingListItemComponentProps) => {
  const dispatch = useDispatch();
  const todayDate: string = ('0' + date.getDate()).slice(-2);
  const currentYear = props.currentYearMonth.split('/')[0];
  const currentMonth = props.currentYearMonth.split('/')[1];

  const fetchTodayOrMonthlyShoppingList = (signal: CancelTokenSource) => {
    if (props.currentTodayOrMonthly === 'today') {
      dispatch(fetchTodayShoppingList(String(year), customMonth, todayDate, signal));
      dispatch(fetchTodayShoppingListByCategories(String(year), customMonth, todayDate, signal));
    } else if (props.currentTodayOrMonthly === 'monthly') {
      dispatch(fetchMonthlyShoppingList(currentYear, currentMonth, signal));
      dispatch(fetchMonthlyShoppingListByCategories(currentYear, currentMonth, signal));
    }
  };

  return (
    <div className="regular-shopping-list-item-component__content">
      <span className="regular-shopping-list-item-component__purchase">
        {props.listItem.purchase}
      </span>
      <span className="regular-shopping-list-item-component__amount--value">
        {props.listItem.amount === null ? '-' : props.listItem.amount}
      </span>
      <span className="shopping-list-item-component__amount--unit">円</span>
      <EditRegularShoppingListModal
        listItem={props.listItem}
        currentYearMonth={props.currentYearMonth}
        fetchTodayOrMonthlyShoppingList={fetchTodayOrMonthlyShoppingList}
      />
    </div>
  );
};

export default RegularShoppingListItemComponent;
