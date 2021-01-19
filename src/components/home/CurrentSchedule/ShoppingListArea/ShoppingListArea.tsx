import React from 'react';
import { ShoppingList } from '../../../../reducks/shoppingList/types';
import ShoppingListItemComponent from '../../../shoppingList/uikit/ListItem/ShoppingListItemComponent/ShoppingListItemComponent';
import '../../../shoppingList/uikit/List/ShoppingListByDate/shopping-list-by-date.scss';

interface ShoppingListArea {
  shoppingListByDate: ShoppingList;
  currentYearMonth: string;
  message: string;
}

const ShoppingListArea = (props: ShoppingListArea) => {
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
      {props.shoppingListByDate.length ? (
        props.shoppingListByDate.map((listItem) => {
          return (
            <div key={listItem.id}>
              <ShoppingListItemComponent
                listItem={listItem}
                displayPurchaseDate={equalsDisplayDate(listItem.expected_purchase_date)}
                currentYearMonth={props.currentYearMonth}
                purchaseClassName={'shopping-list-item-component__item-purchase--home-page'}
                amountClassName={'shopping-list-item-component__item-amount--home-page'}
              />
            </div>
          );
        })
      ) : (
        <p className="shopping-list-by-date__message">{props.message}</p>
      )}
    </>
  );
};

export default ShoppingListArea;
