import React, { useEffect } from 'react';
import '../../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent.module.scss';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../../reducks/groups/operations';
import { fetchGroupMonthlyShoppingList } from '../../../../../../reducks/groupShoppingList/operations';
import { useDispatch, useSelector } from 'react-redux';
import GroupShoppingListByDate from '../../../../../../components/groupShoppingList/modules/list/shoppingListByDate/GroupShoppingListByDate';
import { getGroupDisplayMonthlyShoppingListByDate } from '../../../../../../reducks/groupShoppingList/selectors';
import { useParams } from 'react-router';

interface GroupMonthlyShoppingListByDateContainerProps {
  selectedYear: number;
  selectedMonth: number;
  currentYear: string;
  currentMonth: string;
}

const GroupMonthlyShoppingListByDateContainer = (
  props: GroupMonthlyShoppingListByDateContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const groupMonthlyShoppingList = useSelector(getGroupDisplayMonthlyShoppingListByDate);

  const fetchData = (groupId: number, year: string, month: string, signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupMonthlyShoppingList(groupId, props.currentYear, props.currentMonth, signal));
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
    <GroupShoppingListByDate
      shoppingListByDate={groupMonthlyShoppingList}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
    />
  );
};

export default GroupMonthlyShoppingListByDateContainer;