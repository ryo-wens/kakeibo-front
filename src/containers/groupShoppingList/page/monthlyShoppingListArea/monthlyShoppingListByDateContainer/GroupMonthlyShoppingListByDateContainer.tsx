import React, { useEffect } from 'react';
import '../../../../../components/shoppingList/modules/list/shoppingListByCategoriesComponent/shopping-list-by-categories-component.scss';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchGroupMonthlyShoppingList } from '../../../../../reducks/groupShoppingList/operations';
import { useDispatch, useSelector } from 'react-redux';
import GroupShoppingListByDate from '../../../../../components/groupShoppingList/modules/list/shoppingListByDate/GroupShoppingListByDate';
import { getGroupMonthlyShoppingList } from '../../../../../reducks/groupShoppingList/selectors';
import { useParams } from 'react-router';

interface GroupMonthlyShoppingListByDateContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const GroupMonthlyShoppingListByDateContainer = (
  props: GroupMonthlyShoppingListByDateContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const groupMonthlyShoppingList = useSelector(getGroupMonthlyShoppingList);

  const currentYear = String(props.selectedYear);
  const currentMonth = (`0` + `${props.selectedMonth}`).slice(-2);
  const currentYearMonth = `${currentYear}/${currentMonth}`;

  const fetchData = (groupId: number, year: string, month: string, signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupMonthlyShoppingList(groupId, currentYear, currentMonth, signal));
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(Number(group_id), currentYear, currentMonth, signal);
    const interval = setInterval(() => {
      fetchData(Number(group_id), currentYear, currentMonth, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [Number(group_id), currentYear, currentMonth]);

  let prevDate = '';

  const equalsDisplayDate = (expectedPurchaseDate: string) => {
    if (prevDate !== expectedPurchaseDate) {
      prevDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <GroupShoppingListByDate
      shoppingListByDate={groupMonthlyShoppingList}
      currentYearMonth={currentYearMonth}
      message={`${props.selectedMonth}月の買い物リストは、登録されていません。`}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default GroupMonthlyShoppingListByDateContainer;
