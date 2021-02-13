import React from 'react';
import { TodayOrMonthly } from '../../../../../reducks/shoppingList/types';
import { useDispatch } from 'react-redux';
import { CancelTokenSource } from 'axios';
import { customMonth, date, year } from '../../../../../lib/constant';
import { GroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import {
  fetchGroupExpiredShoppingList,
  fetchGroupMonthlyShoppingList,
  fetchGroupMonthlyShoppingListByCategories,
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../../../../reducks/groupShoppingList/operations';
import GroupRegularShoppingListItemComponent from '../../../../../components/groupShoppingList/modules/listItem/regularShoppingListItemComponent/GroupRegularShoppingListItemComponent';

interface GroupRegularShoppingListItemComponentContainerProps {
  listItem: GroupRegularShoppingListItem;
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const GroupRegularShoppingListItemComponentContainer = (
  props: GroupRegularShoppingListItemComponentContainerProps
) => {
  const dispatch = useDispatch();

  const currentYear = props.currentYearMonth.split('/')[0];
  const currentMonth = props.currentYearMonth.split('/')[1];
  const todayDate: string = ('0' + date.getDate()).slice(-2);

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
    <GroupRegularShoppingListItemComponent
      listItem={props.listItem}
      currentYearMonth={props.currentYearMonth}
      fetchGroupTodayOrMonthlyShoppingList={fetchGroupTodayOrMonthlyShoppingList}
    />
  );
};

export default GroupRegularShoppingListItemComponentContainer;
