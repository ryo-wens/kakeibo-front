import React, { useEffect } from 'react';
import '../../../../shoppingList/modules/List/ShoppingListByCategoriesComponent/shopping-list-by-categories-component.scss';
import GroupShoppingListItemComponent from '../../../modules/ListItem/GroupShoppingListItemComponent/GroupShoppingListItemComponent';
import { GroupShoppingList } from '../../../../../reducks/groupShoppingList/types';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchGroupMonthlyShoppingList } from '../../../../../reducks/groupShoppingList/operations';
import { useDispatch } from 'react-redux';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/ShoppingListItemComponentContainer';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/groupShoppingListItemComponent/GroupShoppingListItemComponentContainer';

interface GroupMonthlyShoppingListComponentProps {
  shoppingList: GroupShoppingList;
  selectedMonth: number;
  groupId: number;
  currentYear: string;
  currentMonth: string;
  currentYearMonth: string;
}

const GroupMonthlyShoppingListComponent = (props: GroupMonthlyShoppingListComponentProps) => {
  const dispatch = useDispatch();

  const fetchData = (groupId: number, year: string, month: string, signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupMonthlyShoppingList(groupId, props.currentYear, props.currentMonth, signal));
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(props.groupId, props.currentYear, props.currentMonth, signal);
    const interval = setInterval(() => {
      fetchData(props.groupId, props.currentYear, props.currentMonth, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [props.groupId, props.currentYear, props.currentMonth]);

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
            <div className="shopping-list-by-date__item" key={listItem.id}>
              {equalsDisplayDate(listItem.expected_purchase_date) && (
                <p className="shopping-list-by-date__item-date">
                  {listItem.expected_purchase_date}
                </p>
              )}
              <GroupShoppingListItemComponentContainer
                listItem={listItem}
                currentYearMonth={props.currentYearMonth}
                purchaseClassName={'shopping-list-item-component__item-purchase'}
                amountClassName={'shopping-list-item-component__item-amount'}
                transactionDataItemClassName={'related-transaction-data-button__item'}
                transactionDataItemKeyClassName={'related-transaction-data-button__item-key'}
              />
            </div>
          );
        })
      ) : (
        <p className="shopping-list-by-date__message">
          {props.selectedMonth}月の買い物リストは、登録されていません。
        </p>
      )}
    </>
  );
};

export default GroupMonthlyShoppingListComponent;
