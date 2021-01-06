import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpiredShoppingList } from '../../../../reducks/shoppingList/selectors';
import './expired-shopping-list-area.scss';
import axios from 'axios';
import { useLocation } from 'react-router';
import { fetchExpiredShoppingList } from '../../../../reducks/shoppingList/operations';
import ShoppingListItemComponent from '../../uikit/ShoppingListItemComponent/ShoppingListItemComponent';

const ExpiredShoppingListArea = () => {
  const dispatch = useDispatch();
  const expiredShoppingList = useSelector(getExpiredShoppingList);
  const pathName = useLocation().pathname.split('/')[1];

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
