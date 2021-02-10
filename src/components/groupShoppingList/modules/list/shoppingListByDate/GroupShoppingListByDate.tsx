import React from 'react';
import '../../../../shoppingList/modules/list/shoppingListByDate/shopping-list-by-date.scss';
import { GroupShoppingList } from '../../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';

interface GroupShoppingListByDateProps {
  shoppingListByDate: GroupShoppingList;
  currentYearMonth: string;
  message: string;
  equalsDisplayDate: (date: string) => boolean;
}

const GroupShoppingListByDate = (props: GroupShoppingListByDateProps) => {
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
        <p className="shopping-list-by-date__message">{props.message}</p>
      )}
    </div>
  );
};

export default GroupShoppingListByDate;
