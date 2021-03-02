import React from 'react';
import GroupMonthlyShoppingListArea from '../../../../components/groupShoppingList/page/monthlyShoppingListArea/GroupMonthlyShoppingListArea';

interface GroupMonthlyShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: string;
  currentMonth: string;
}

const GroupMonthlyShoppingListAreaContainer = (
  props: GroupMonthlyShoppingListAreaContainerProps
) => {
  return (
    <GroupMonthlyShoppingListArea
      selectedYear={props.selectedYear}
      selectedMonth={props.selectedMonth}
      setSelectedYear={props.setSelectedYear}
      setSelectedMonth={props.setSelectedMonth}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
    />
  );
};

export default GroupMonthlyShoppingListAreaContainer;
