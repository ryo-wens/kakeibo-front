import React from 'react';
import TodayShoppingListArea from '../../../../components/shoppingList/page/TodayShoppingListArea/TodayShoppingListArea';

interface TodayShoppingListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
}

const TodayShoppingListAreaContainer = (props: TodayShoppingListAreaContainerProps) => {
  return (
    <TodayShoppingListArea currentYear={props.currentYear} currentMonth={props.currentMonth} />
  );
};

export default TodayShoppingListAreaContainer;
