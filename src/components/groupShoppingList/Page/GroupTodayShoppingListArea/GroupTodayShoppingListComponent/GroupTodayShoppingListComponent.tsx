import React, { useEffect } from 'react';
import '../../../../shoppingList/uikit/List/ShoppingListByDate/shopping-list-by-date.scss';
import GroupShoppingListItemComponent from '../../../uikit/ListItem/GroupShoppingListItemComponent/GroupShoppingListItemComponent';
import { GroupShoppingList } from '../../../../../reducks/groupShoppingList/types';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchGroupTodayShoppingList } from '../../../../../reducks/groupShoppingList/operations';
import { useDispatch } from 'react-redux';

interface GroupTodayShoppingListComponent {
  shoppingList: GroupShoppingList;
  currentYearMonth: string;
  groupId: number;
  year: string;
  month: string;
  date: string;
}

const GroupTodayShoppingListComponent = (props: GroupTodayShoppingListComponent) => {
  const dispatch = useDispatch();

  const fetchData = (
    groupId: number,
    year: string,
    month: string,
    date: string,
    signal: CancelTokenSource
  ) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupTodayShoppingList(groupId, props.year, props.month, props.date, signal));
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(props.groupId, props.year, props.month, props.date, signal);
    const interval = setInterval(() => {
      fetchData(props.groupId, props.year, props.month, props.date, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [props.groupId, props.year, props.month, props.date]);

  let prevDate = '';

  const equalsDisplayDate = (expectedPurchaseDate: string) => {
    if (prevDate !== expectedPurchaseDate) {
      prevDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <>
      {props.shoppingList.length ? (
        props.shoppingList.map((listItem) => {
          return (
            <div key={listItem.id}>
              <GroupShoppingListItemComponent
                listItem={listItem}
                displayPurchaseDate={equalsDisplayDate(listItem.expected_purchase_date)}
                currentYearMonth={props.currentYearMonth}
              />
            </div>
          );
        })
      ) : (
        <p className="shopping-list-by-date__message">今日の買い物リストは、登録されていません。</p>
      )}
    </>
  );
};

export default GroupTodayShoppingListComponent;
