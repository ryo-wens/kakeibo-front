import React from 'react';
import { RegularShoppingList, TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import { useSelector } from 'react-redux';
import { getRegularShoppingList } from '../../../../reducks/shoppingList/selectors';
import RegularShoppingListArea from '../../../../components/shoppingList/page/RegularShoppingListArea/RegularShoppingListArea';

interface RegularShoppingListAreaContainerProps {
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const RegularShoppingListAreaContainer = (props: RegularShoppingListAreaContainerProps) => {
  const regularShoppingList: RegularShoppingList = useSelector(getRegularShoppingList);

  return (
    <RegularShoppingListArea
      currentYearMonth={props.currentYearMonth}
      currentTodayOrMonthly={props.currentTodayOrMonthly}
      regularShoppingList={regularShoppingList}
    />
  );
};

export default RegularShoppingListAreaContainer;
