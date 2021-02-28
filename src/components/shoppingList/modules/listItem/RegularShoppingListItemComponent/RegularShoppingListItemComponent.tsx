import React from 'react';
import './regular-shopping-list-item-component.scss';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditRegularShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/ListItem/RegularShoppingListItemComponentContainer/editRegularShoppingListItemModalContainer/EditRegularShoppingListItemModalContainer';

interface RegularShoppingListItemComponentProps {
  listItem: RegularShoppingListItem;
  currentYear: string;
  currentMonth: string;
}

const RegularShoppingListItemComponent = (props: RegularShoppingListItemComponentProps) => {
  return (
    <div className="regular-shopping-list-item-component__content">
      <span className="regular-shopping-list-item-component__purchase">
        {props.listItem.purchase}
      </span>
      <span className="regular-shopping-list-item-component__amount--value">
        {props.listItem.amount === null ? '-' : props.listItem.amount}
      </span>
      <span className="shopping-list-item-component__amount--unit">円</span>
      <EditRegularShoppingListItemModalContainer
        listItem={props.listItem}
        currentYear={props.currentYear}
        currentMonth={props.currentMonth}
      />
    </div>
  );
};

export default RegularShoppingListItemComponent;
