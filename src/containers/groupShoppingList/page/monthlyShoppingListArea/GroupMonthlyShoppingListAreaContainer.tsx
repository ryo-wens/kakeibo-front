import React from 'react';
import GroupMonthlyShoppingListArea from '../../../../components/groupShoppingList/page/GroupMonthlyShoppingListArea/GroupMonthlyShoppingListArea';

interface GroupMonthlyShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const GroupMonthlyShoppingListAreaContainer = (
  props: GroupMonthlyShoppingListAreaContainerProps
) => {
  const currentYear = String(props.selectedYear);
  const currentMonth = (`0` + `${props.selectedMonth}`).slice(-2);
  const currentYearMonth = `${currentYear}/${currentMonth}`;

  return (
    <GroupMonthlyShoppingListArea
      selectedYear={props.selectedYear}
      selectedMonth={props.selectedMonth}
      setSelectedYear={props.setSelectedYear}
      setSelectedMonth={props.setSelectedMonth}
      currentYearMonth={currentYearMonth}
    />
  );
};

export default GroupMonthlyShoppingListAreaContainer;
