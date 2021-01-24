import React from 'react';
import './regular-shopping-list-item-component.scss';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';
import { CancelTokenSource } from 'axios';
import EditRegularShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/ListItem/RegularShoppingListItemComponentContainer/EditRegularShoppingListItemModalContainer/EditRegularShoppingListItemModalContainer';

interface RegularShoppingListItemComponentProps {
  listItem: RegularShoppingListItem;
  currentYearMonth: string;
  fetchTodayOrMonthlyShoppingList: (signal: CancelTokenSource) => void;
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
        currentYearMonth={props.currentYearMonth}
        fetchTodayOrMonthlyShoppingList={props.fetchTodayOrMonthlyShoppingList}
      />
    </div>
  );
};

export default RegularShoppingListItemComponent;
