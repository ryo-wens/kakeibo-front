import React from 'react';
import { RegularShoppingList, TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import { useSelector } from 'react-redux';
import { getRegularShoppingList } from '../../../../reducks/shoppingList/selectors';
import RegularShoppingListArea from '../../../../components/shoppingList/modules/area/RegularShoppingListArea/RegularShoppingListArea';

interface RegularShoppingListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const RegularShoppingListAreaContainer = (props: RegularShoppingListAreaContainerProps) => {
  const regularShoppingList: RegularShoppingList = useSelector(getRegularShoppingList);

  return (
    <RegularShoppingListArea
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      currentTodayOrMonthly={props.currentTodayOrMonthly}
      regularShoppingList={regularShoppingList}
    />
  );
};

export default RegularShoppingListAreaContainer;
