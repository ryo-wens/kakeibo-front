import React, { useEffect } from 'react';
import ShoppingListByDate from '../../../../../../components/shoppingList/modules/list/shoppingListByDate/ShoppingListByDate';
import { useDispatch, useSelector } from 'react-redux';
import { getDisplayMonthlyShoppingListByDate } from '../../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchMonthlyShoppingList } from '../../../../../../reducks/shoppingList/operations';
import { generateZeroPaddingMonth } from '../../../../../../lib/date';

interface MonthlyShoppingListByDateContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const MonthlyShoppingListByDateContainer = (props: MonthlyShoppingListByDateContainerProps) => {
  const dispatch = useDispatch();
  const displayMonthlyShoppingList = useSelector(getDisplayMonthlyShoppingListByDate);

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingList(selectedYearParam, selectedMonthParam, signal));
    return () => signal.cancel();
  }, [selectedYearParam, selectedMonthParam]);

  return (
    <ShoppingListByDate
      shoppingListByDate={displayMonthlyShoppingList}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
    />
  );
};

export default MonthlyShoppingListByDateContainer;
