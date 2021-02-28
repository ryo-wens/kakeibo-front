import React from 'react';
import { ShoppingList } from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/ShoppingListItemComponentContainer';
import './today-schedule-shopping-list-by-date.scss';

interface TodayScheduleShoppingListByDateProps {
  shoppingListByDate: ShoppingList;
  currentYear: string;
  currentMonth: string;
  message: string;
}

const TodayScheduleShoppingListByDate = (props: TodayScheduleShoppingListByDateProps) => {
  return (
    <div className="today-schedule-shopping-list-by-date">
      {props.shoppingListByDate.length ? (
        props.shoppingListByDate.map((listItem) => {
          return (
            <div className="today-schedule-shopping-list-by-date__item" key={listItem.id}>
              <ShoppingListItemComponentContainer
                listItem={listItem}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
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
        <p className="today-schedule-shopping-list-by-date__message">{props.message}</p>
      )}
    </div>
  );
};

export default TodayScheduleShoppingListByDate;
