import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchGroupTodayShoppingList } from '../../../../../reducks/groupShoppingList/operations';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingListByDate from '../../../../../components/shoppingList/modules/list/shoppingListByDate/ShoppingListByDate';
import { getGroupTodayShoppingList } from '../../../../../reducks/groupShoppingList/selectors';
import { customMonth, date, year } from '../../../../../lib/constant';
import { useParams } from 'react-router';

interface GroupTodayShoppingListByDateContainerProps {
  currentYearMonth: string;
}

const GroupTodayShoppingListByDateContainer = (
  props: GroupTodayShoppingListByDateContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const groupTodayShoppingList = useSelector(getGroupTodayShoppingList);

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
    dispatch(fetchGroupTodayShoppingList(groupId, year, month, date, signal));
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

  const equalsDisplayDate = (expectedPurchaseDate: string) => {
    if (prevDate !== expectedPurchaseDate) {
      prevDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <ShoppingListByDate
      shoppingListByDate={groupTodayShoppingList}
      currentYearMonth={props.currentYearMonth}
      message={'今日の買い物リストは、登録されていません。'}
      equalsDisplayDate={equalsDisplayDate}
    />
  );
};

export default GroupTodayShoppingListByDateContainer;
