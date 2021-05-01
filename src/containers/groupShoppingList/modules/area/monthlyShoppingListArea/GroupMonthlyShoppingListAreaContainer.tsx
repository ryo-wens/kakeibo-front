import React from 'react';
import GroupMonthlyShoppingListArea from '../../../../../components/groupShoppingList/modules/area/monthlyShoppingListArea/GroupMonthlyShoppingListArea';

interface GroupMonthlyShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
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
    />
  );
};

export default GroupMonthlyShoppingListAreaContainer;
