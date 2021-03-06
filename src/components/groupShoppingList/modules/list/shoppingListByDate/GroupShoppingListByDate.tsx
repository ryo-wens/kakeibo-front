import React from 'react';
import '../../../../shoppingList/modules/list/shoppingListByDate/shopping-list-by-date.scss';
import { GroupShoppingList } from '../../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';

interface GroupShoppingListByDateProps {
  shoppingListByDate: GroupShoppingList;
  currentYear: string;
  currentMonth: string;
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

export default GroupShoppingListByDate;
