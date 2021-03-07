import React from 'react';
import { ShoppingList } from '../../../../../reducks/shoppingList/types';
import './shopping-list-by-date.scss';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/ShoppingListItemComponentContainer';

interface ShoppingListByDateProps {
  shoppingListByDate: ShoppingList;
  currentYear: string;
  currentMonth: string;
  message: string;
  equalsDisplayDate: (date: string) => boolean;
}

const ShoppingListByDate = (props: ShoppingListByDateProps) => {
  return (
    <div className="shopping-list-by-date">
      {props.shoppingListByDate.length ? (
        props.shoppingListByDate.map((listItem) => {
          return (
            <div className="shopping-list-by-date__item" key={listItem.id}>
              {props.equalsDisplayDate(listItem.expected_purchase_date) && (
                <p className="shopping-list-by-date__item-date">
                  {listItem.expected_purchase_date}
                </p>
              )}
              <ShoppingListItemComponentContainer
                listItem={listItem}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
                purchaseClassName={'shopping-list-by-date__child-purchase'}
                amountClassName={'shopping-list-by-date__child-amount'}
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
