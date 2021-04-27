import React from 'react';
import MonthlyShoppingListArea from '../../../../../components/shoppingList/modules/area/MonthlyShoppingListArea/MonthlyShoppingListArea';

interface MonthlyShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const MonthlyShoppingListAreaContainer = (props: MonthlyShoppingListAreaContainerProps) => {
  return (
    <MonthlyShoppingListArea
      selectedYear={props.selectedYear}
      selectedMonth={props.selectedMonth}
      setSelectedMonth={props.setSelectedMonth}
      setSelectedYear={props.setSelectedYear}
    />
  );
};

export default MonthlyShoppingListAreaContainer;
