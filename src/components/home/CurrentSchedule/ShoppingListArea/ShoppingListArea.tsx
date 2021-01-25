import React from 'react';
import { ShoppingList } from '../../../../reducks/shoppingList/types';
import '../../../shoppingList/modules/List/ShoppingListByDate/shopping-list-by-date.scss';
import ShoppingListItemComponentContainer from '../../../../containers/shoppingList/modules/ListItem/ShoppingListItemComponentContainer/ShoppingListItemComponentContainer';

interface ShoppingListArea {
  shoppingListByDate: ShoppingList;
  currentYearMonth: string;
  message: string;
}

const ShoppingListArea = (props: ShoppingListArea) => {
  return (
    <>
      {props.shoppingListByDate.length ? (
        props.shoppingListByDate.map((listItem) => {
          return (
            <div key={listItem.id}>
              <ShoppingListItemComponentContainer
                listItem={listItem}
                currentYearMonth={props.currentYearMonth}
                purchaseClassName={'shopping-list-item-component__item-purchase--home-page'}
                amountClassName={'shopping-list-item-component__item-amount--home-page'}
                transactionDataItemClassName={'related-transaction-data-button__item--home-page'}
                transactionDataItemKeyClassName={
                  'related-transaction-data-button__item-key--home-page'
                }
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
