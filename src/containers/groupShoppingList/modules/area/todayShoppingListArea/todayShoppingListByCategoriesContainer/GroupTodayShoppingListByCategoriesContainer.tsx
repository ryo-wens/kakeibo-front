import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../../reducks/groups/operations';
import { fetchGroupTodayShoppingListByCategories } from '../../../../../../reducks/groupShoppingList/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { customDate, customMonth, year } from '../../../../../../lib/constant';
import { getGroupDisplayTodayShoppingListByCategories } from '../../../../../../reducks/groupShoppingList/selectors';
import GroupShoppingListByCategoriesComponent from '../../../../../../components/groupShoppingList/modules/list/shoppingListByCategoriesComponent/GroupShoppingListByCategoriesComponent';

interface GroupTodayShoppingListByCategoriesContainerProps {
  currentYear: string;
  currentMonth: string;
}

const GroupTodayShoppingListByCategoriesContainer = (
  props: GroupTodayShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const groupTodayShoppingListByCategories = useSelector(
    getGroupDisplayTodayShoppingListByCategories
  );

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate = customDate;

  const fetchData = (
    groupId: number,
    year: string,
    month: string,
    date: string,
    signal: CancelTokenSource
  ) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupTodayShoppingListByCategories(groupId, year, month, date, signal));
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(Number(group_id), todayYear, todayMonth, todayDate, signal);
    const interval = setInterval(() => {
      fetchData(Number(group_id), todayYear, todayMonth, todayDate, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [group_id, todayYear, todayMonth, todayDate]);

  return (
    <GroupShoppingListByCategoriesComponent
      shoppingListByCategories={groupTodayShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={'今日の買い物リストは、登録されていません。'}
    />
  );
};

export default GroupTodayShoppingListByCategoriesContainer;
