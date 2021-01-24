import React from 'react';
import '../../../../shoppingList/modules/ListItem/RegularShoppingListItemComponent/regular-shopping-list-item-component.scss';
import { TodayOrMonthly } from '../../../../../reducks/shoppingList/types';
import { useDispatch } from 'react-redux';
import { CancelTokenSource } from 'axios';
import { customMonth, date, year } from '../../../../../lib/constant';
import { GroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import EditGroupRegularShoppingListItemModal from './EditGroupRegularShoppingListItemModal/EditGroupRegularShoppingListItemModal';
import {
  fetchGroupExpiredShoppingList,
  fetchGroupMonthlyShoppingList,
  fetchGroupMonthlyShoppingListByCategories,
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../../../../reducks/groupShoppingList/operations';

interface GroupRegularShoppingListItemComponentProps {
  listItem: GroupRegularShoppingListItem;
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const GroupRegularShoppingListItemComponent = (
  props: GroupRegularShoppingListItemComponentProps
) => {
  const dispatch = useDispatch();
  const todayDate: string = ('0' + date.getDate()).slice(-2);
  const currentYear = props.currentYearMonth.split('/')[0];
  const currentMonth = props.currentYearMonth.split('/')[1];

  const fetchGroupTodayOrMonthlyShoppingList = (groupId: number, signal: CancelTokenSource) => {
    if (props.currentTodayOrMonthly === 'today') {
      dispatch(fetchGroupExpiredShoppingList(groupId, signal));
      dispatch(fetchGroupTodayShoppingList(groupId, String(year), customMonth, todayDate, signal));
      dispatch(
        fetchGroupTodayShoppingListByCategories(
          groupId,
          String(year),
          customMonth,
          todayDate,
          signal
        )
      );
    } else if (props.currentTodayOrMonthly === 'monthly') {
      dispatch(fetchGroupExpiredShoppingList(groupId, signal));
      dispatch(fetchGroupMonthlyShoppingList(groupId, currentYear, currentMonth, signal));
      dispatch(
        fetchGroupMonthlyShoppingListByCategories(groupId, currentYear, currentMonth, signal)
      );
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
      <span>円</span>
      <EditGroupRegularShoppingListItemModal
        listItem={props.listItem}
        currentYearMonth={props.currentYearMonth}
        fetchTodayOrMonthlyShoppingList={fetchGroupTodayOrMonthlyShoppingList}
      />
    </div>
  );
};

export default GroupRegularShoppingListItemComponent;
