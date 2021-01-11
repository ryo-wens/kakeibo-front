import React from 'react';
import './regular-shopping-list-item-component.scss';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditRegularShoppingListModal from '../../Modal/EditRegularShoppingListModal/EditRegularShoppingListModal';

interface RegularShoppingListItemComponentProps {
  listItem: RegularShoppingListItem;
  currentYearMonth: string;
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
      <EditRegularShoppingListModal
        listItem={props.listItem}
        currentYearMonth={props.currentYearMonth}
      />
    </div>
  );
};

export default RegularShoppingListItemComponent;
