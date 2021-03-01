import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchGroupTodayShoppingListByCategories } from '../../../../../reducks/groupShoppingList/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { customMonth, date, year } from '../../../../../lib/constant';
import { getGroupTodayShoppingListByCategories } from '../../../../../reducks/groupShoppingList/selectors';
import GroupShoppingListByCategoriesComponent from '../../../../../components/groupShoppingList/modules/list/shoppingListByCategoriesComponent/GroupShoppingListByCategoriesComponent';

interface GroupTodayShoppingListByCategoriesContainerProps {
  currentYear: string;
  currentMonth: string;
}

const GroupTodayShoppingListByCategoriesContainer = (
  props: GroupTodayShoppingListByCategoriesContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const groupTodayShoppingListByCategories = useSelector(getGroupTodayShoppingListByCategories);

  const todayYear = String(year);
  const todayMonth = customMonth;
  const todayDate: string = ('0' + date.getDate()).slice(-2);

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

  let prevDate = '';
  let prevCategoryId = 0;

  const equalsDisplayDate = (categoryId: number, expectedPurchaseDate: string) => {
    if (prevCategoryId !== categoryId) {
      prevCategoryId = categoryId;
      prevDate = expectedPurchaseDate;
      return true;
    } else if (prevDate !== expectedPurchaseDate) {
      prevDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <GroupShoppingListByCategoriesComponent
      shoppingListByCategories={groupTodayShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={'今日の買い物リストは、登録されていません。'}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default GroupTodayShoppingListByCategoriesContainer;
