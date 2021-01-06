import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import './regular-shopping-list-item-component.scss';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';

interface RegularShoppingListItemComponentProps {
  listItem: RegularShoppingListItem;
}

const RegularShoppingListItemComponent = (props: RegularShoppingListItemComponentProps) => {
  return (
    <div className="regular-shopping-list-item-component__content">
      <span className="regular-shopping-list-item-component__purchase">
        {props.listItem.purchase}
      </span>
      <span className="regular-shopping-list-item-component__amount">
        {props.listItem.amount}円
      </span>
      <EditIcon className="regular-shopping-list-item-component__edit-icon" />
    </div>
  );
};

export default RegularShoppingListItemComponent;
