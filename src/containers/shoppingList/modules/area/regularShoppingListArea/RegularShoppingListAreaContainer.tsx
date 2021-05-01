import React from 'react';
import { RegularShoppingList } from '../../../../../reducks/shoppingList/types';
import { useSelector } from 'react-redux';
import { getRegularShoppingList } from '../../../../../reducks/shoppingList/selectors';
import RegularShoppingListArea from '../../../../../components/shoppingList/modules/area/RegularShoppingListArea/RegularShoppingListArea';
import { generateZeroPaddingMonth } from '../../../../../lib/date';

interface RegularShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const RegularShoppingListAreaContainer = (props: RegularShoppingListAreaContainerProps) => {
  const regularShoppingList: RegularShoppingList = useSelector(getRegularShoppingList);

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  return (
    <RegularShoppingListArea
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      regularShoppingList={regularShoppingList}
    />
  );
};

export default RegularShoppingListAreaContainer;
