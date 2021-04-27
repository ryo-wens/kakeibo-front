import React from 'react';
import TodayShoppingListArea from '../../../../../components/shoppingList/modules/area/TodayShoppingListArea/TodayShoppingListArea';

interface TodayShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const TodayShoppingListAreaContainer = (props: TodayShoppingListAreaContainerProps) => {
  return (
    <TodayShoppingListArea selectedYear={props.selectedYear} selectedMonth={props.selectedMonth} />
  );
};

export default TodayShoppingListAreaContainer;
