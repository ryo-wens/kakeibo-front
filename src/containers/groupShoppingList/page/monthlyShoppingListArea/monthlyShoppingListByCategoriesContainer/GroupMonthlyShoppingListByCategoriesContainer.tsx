import React, { useEffect } from 'react';
import '../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent.module.scss';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchGroupMonthlyShoppingListByCategories } from '../../../../../reducks/groupShoppingList/operations';
import { useDispatch, useSelector } from 'react-redux';
import GroupShoppingListByCategoriesComponent from '../../../../../components/groupShoppingList/modules/list/shoppingListByCategoriesComponent/GroupShoppingListByCategoriesComponent';
import { getGroupDisplayMonthlyShoppingListByCategories } from '../../../../../reducks/groupShoppingList/selectors';
import { useParams } from 'react-router';

interface GroupMonthlyShoppingListByCategoriesContainerProps {
  selectedYear: number;
  selectedMonth: number;
  currentYear: string;
  currentMonth: string;
}

const GroupMonthlyShoppingListByCategoriesContainer = (
  props: GroupMonthlyShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const groupMonthlyShoppingListByCategories = useSelector(
    getGroupDisplayMonthlyShoppingListByCategories
  );

  const fetchData = (groupId: number, year: string, month: string, signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(
      fetchGroupMonthlyShoppingListByCategories(
        groupId,
        props.currentYear,
        props.currentMonth,
        signal
      )
    );
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(Number(group_id), props.currentYear, props.currentMonth, signal);
    const interval = setInterval(() => {
      fetchData(Number(group_id), props.currentYear, props.currentMonth, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [Number(group_id), props.currentYear, props.currentMonth]);

  return (
    <GroupShoppingListByCategoriesComponent
      shoppingListByCategories={groupMonthlyShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
    />
  );
};

export default GroupMonthlyShoppingListByCategoriesContainer;
