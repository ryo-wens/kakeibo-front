import React from 'react';
import { ShoppingList } from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponent from '../../ListItem/ShoppingListItemComponent/ShoppingListItemComponent';
import './shopping-list-by-date.scss';

interface ShoppingListByDate {
  shoppingListByDate: ShoppingList;
  currentYearMonth: string;
  message: string;
}

const ShoppingListByDate = (props: ShoppingListByDate) => {
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
                currentYearMonth={props.currentYearMonth}
                displayPurchaseDate={equalsDisplayDate(listItem.expected_purchase_date)}
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

export default ShoppingListByDate;
