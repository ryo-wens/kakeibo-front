import React from 'react';
import { useSelector } from 'react-redux';
import { getGroupRegularShoppingList } from '../../../../../reducks/groupShoppingList/selectors';
import GroupRegularShoppingListArea from '../../../../../components/groupShoppingList/modules/area/regularShoppingListArea/GroupRegularShoppingListArea';
import { generateZeroPaddingMonth } from '../../../../../lib/date';

interface GroupRegularShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const GroupRegularShoppingListAreaContainer = (
  props: GroupRegularShoppingListAreaContainerProps
) => {
  const groupRegularShoppingList = useSelector(getGroupRegularShoppingList);

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  return (
    <GroupRegularShoppingListArea
      regularShoppingList={groupRegularShoppingList}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
    />
  );
};

export default GroupRegularShoppingListAreaContainer;
