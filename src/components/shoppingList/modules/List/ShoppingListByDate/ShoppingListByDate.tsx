import React from 'react';
import { ShoppingList } from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponent from '../../ListItem/ShoppingListItemComponent/ShoppingListItemComponent';
import './shopping-list-by-date.scss';

interface ShoppingListByDate {
  shoppingListByDate: ShoppingList;
  currentYearMonth: string;
  message: string;
  equalsDisplayDate: (date: string) => boolean;
}

const ShoppingListByDate = (props: ShoppingListByDate) => {
  return (
    <div className="shopping-list-by-date">
      {props.shoppingListByDate.length ? (
        props.shoppingListByDate.map((listItem) => {
          return (
            <div key={listItem.id}>
              {props.equalsDisplayDate(listItem.expected_purchase_date) && (
                <p className="shopping-list-by-date__date">{listItem.expected_purchase_date}</p>
              )}
              <ShoppingListItemComponent
                listItem={listItem}
                currentYearMonth={props.currentYearMonth}
                purchaseClassName={'shopping-list-item-component__item-purchase'}
                amountClassName={'shopping-list-item-component__item-amount'}
              />
            </div>
          );
        })
      ) : (
        <p className="shopping-list-by-date__message">{props.message}</p>
      )}
    </div>
  );
};

export default ShoppingListByDate;
