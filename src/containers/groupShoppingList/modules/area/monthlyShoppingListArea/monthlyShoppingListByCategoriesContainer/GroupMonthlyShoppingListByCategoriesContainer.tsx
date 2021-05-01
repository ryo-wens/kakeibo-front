import React, { useEffect } from 'react';
import '../../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent.module.scss';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../../reducks/groups/operations';
import { fetchGroupMonthlyShoppingListByCategories } from '../../../../../../reducks/groupShoppingList/operations';
import { useDispatch, useSelector } from 'react-redux';
import GroupShoppingListByCategoriesComponent from '../../../../../../components/groupShoppingList/modules/list/shoppingListByCategoriesComponent/GroupShoppingListByCategoriesComponent';
import { getGroupDisplayMonthlyShoppingListByCategories } from '../../../../../../reducks/groupShoppingList/selectors';
import { useParams } from 'react-router';
import { generateZeroPaddingMonth } from '../../../../../../lib/date';

interface GroupMonthlyShoppingListByCategoriesContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const GroupMonthlyShoppingListByCategoriesContainer = (
  props: GroupMonthlyShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const groupMonthlyShoppingListByCategories = useSelector(
    getGroupDisplayMonthlyShoppingListByCategories
  );

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  const fetchData = (groupId: number, year: string, month: string, signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(
      fetchGroupMonthlyShoppingListByCategories(
        groupId,
        selectedYearParam,
        selectedMonthParam,
        signal
      )
    );
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(Number(group_id), selectedYearParam, selectedMonthParam, signal);
    const interval = setInterval(() => {
      fetchData(Number(group_id), selectedYearParam, selectedMonthParam, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [Number(group_id), selectedYearParam, selectedMonthParam]);

  return (
    <GroupShoppingListByCategoriesComponent
      shoppingListByCategories={groupMonthlyShoppingListByCategories}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
    />
  );
};

export default GroupMonthlyShoppingListByCategoriesContainer;
