import React from 'react';
import TodayShoppingListArea from '../../../../components/shoppingList/Page/TodayShoppingListArea/TodayShoppingListArea';

interface TodayShoppingListAreaContainerProps {
  currentYearMonth: string;
}

const TodayShoppingListAreaContainer = (props: TodayShoppingListAreaContainerProps) => {
  return <TodayShoppingListArea currentYearMonth={props.currentYearMonth} />;
};

export default TodayShoppingListAreaContainer;
