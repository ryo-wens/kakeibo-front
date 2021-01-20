import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpiredShoppingList } from '../../../../reducks/shoppingList/selectors';
import './expired-shopping-list-area.scss';
import axios from 'axios';
import { useLocation, useParams } from 'react-router';
import { fetchExpiredShoppingList } from '../../../../reducks/shoppingList/operations';
import ShoppingListItemComponent from '../../uikit/ListItem/ShoppingListItemComponent/ShoppingListItemComponent';
import { fetchGroupExpiredShoppingList } from '../../../../reducks/groupShoppingList/operations';

interface ExpiredShoppingListAreaProps {
  currentYearMonth: string;
}

const ExpiredShoppingListArea = (props: ExpiredShoppingListAreaProps) => {
  const dispatch = useDispatch();
  const expiredShoppingList = useSelector(getExpiredShoppingList);
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();

  useEffect(() => {
    if (pathName === 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroupExpiredShoppingList(Number(id), signal));

      const interval = setInterval(() => {
        dispatch(fetchGroupExpiredShoppingList(Number(id), signal));
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    if (pathName !== 'group' && !expiredShoppingList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredShoppingList(signal));
      return () => signal.cancel();
    }
  }, []);

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
      <div>
        <div className="expired-shopping-list-area">
          {expiredShoppingList.length ? (
            expiredShoppingList.map((listItem) => {
              return (
                <div key={listItem.id}>
                  <ShoppingListItemComponent
                    listItem={listItem}
                    displayPurchaseDate={equalsDisplayDate(listItem.expected_purchase_date)}
                    currentYearMonth={props.currentYearMonth}
                    purchaseClassName={'shopping-list-item-component__item-purchase'}
                    amountClassName={'shopping-list-item-component__item-amount'}
                  />
                </div>
              );
            })
          ) : (
            <p className="expired-shopping-list-area__message">
              期限切れの買い物リストはありません。
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpiredShoppingListArea;
