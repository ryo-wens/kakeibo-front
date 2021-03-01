import React from 'react';
import { TodayOrMonthly } from '../../../../../reducks/shoppingList/types';
import { GroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import GroupRegularShoppingListItemComponent from '../../../../../components/groupShoppingList/modules/listItem/regularShoppingListItemComponent/GroupRegularShoppingListItemComponent';

interface GroupRegularShoppingListItemComponentContainerProps {
  listItem: GroupRegularShoppingListItem;
  currentYear: string;
  currentMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const GroupRegularShoppingListItemComponentContainer = (
  props: GroupRegularShoppingListItemComponentContainerProps
) => {
  return (
    <GroupRegularShoppingListItemComponent
      listItem={props.listItem}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
    />
  );
};

export default GroupRegularShoppingListItemComponentContainer;
