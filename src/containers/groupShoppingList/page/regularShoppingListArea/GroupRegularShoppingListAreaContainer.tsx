import React from 'react';
import { useSelector } from 'react-redux';
import { getGroupRegularShoppingList } from '../../../../reducks/groupShoppingList/selectors';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import GroupRegularShoppingListArea from '../../../../components/groupShoppingList/page/regularShoppingListArea/GroupRegularShoppingListArea';

interface GroupRegularShoppingListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const GroupRegularShoppingListAreaContainer = (
  props: GroupRegularShoppingListAreaContainerProps
) => {
  const groupRegularShoppingList = useSelector(getGroupRegularShoppingList);

  return (
    <GroupRegularShoppingListArea
      regularShoppingList={groupRegularShoppingList}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      currentTodayOrMonthly={props.currentTodayOrMonthly}
    />
  );
};

export default GroupRegularShoppingListAreaContainer;
