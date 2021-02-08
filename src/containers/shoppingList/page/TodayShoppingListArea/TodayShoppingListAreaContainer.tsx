import React from 'react';
import TodayShoppingListArea from '../../../../components/shoppingList/page/TodayShoppingListArea/TodayShoppingListArea';

interface TodayShoppingListAreaContainerProps {
  currentYearMonth: string;
}

const TodayShoppingListAreaContainer = (props: TodayShoppingListAreaContainerProps) => {
  return <TodayShoppingListArea currentYearMonth={props.currentYearMonth} />;
};

export default TodayShoppingListAreaContainer;
