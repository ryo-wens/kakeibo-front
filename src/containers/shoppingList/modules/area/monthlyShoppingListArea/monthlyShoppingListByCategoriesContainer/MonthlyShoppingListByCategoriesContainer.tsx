import React, { useEffect } from 'react';
import ShoppingListByCategoriesComponent from '../../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getDisplayMonthlyShoppingListByCategories } from '../../../../../../reducks/shoppingList/selectors';
import axios from 'axios';
import { fetchMonthlyShoppingListByCategories } from '../../../../../../reducks/shoppingList/operations';
import { useLocation } from 'react-router';
import { generateZeroPaddingMonth } from '../../../../../../lib/date';

interface MonthlyShoppingListByCategoriesContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const MonthlyShoppingListByCategoriesContainer = (
  props: MonthlyShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const monthlyShoppingListByCategories = useSelector(getDisplayMonthlyShoppingListByCategories);

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchMonthlyShoppingListByCategories(selectedYearParam, selectedMonthParam, signal));
    return () => signal.cancel();
  }, [selectedYearParam, selectedMonthParam]);

  return (
    <ShoppingListByCategoriesComponent
      shoppingListByCategories={monthlyShoppingListByCategories}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
      pathName={pathName}
    />
  );
};

export default MonthlyShoppingListByCategoriesContainer;
