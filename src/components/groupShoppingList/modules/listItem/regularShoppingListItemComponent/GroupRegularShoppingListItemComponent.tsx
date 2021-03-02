import React from 'react';
import '../../../../shoppingList/modules/listItem/RegularShoppingListItemComponent/regular-shopping-list-item-component.scss';
import { GroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import EditGroupRegularShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/listItem/regularShoppingListItemComponent/editGroupRegularShoppingListItemModal/EditGroupRegularShoppingListItemModalContainer';

interface GroupRegularShoppingListItemComponentProps {
  listItem: GroupRegularShoppingListItem;
  currentYear: string;
  currentMonth: string;
}

const GroupRegularShoppingListItemComponent = (
  props: GroupRegularShoppingListItemComponentProps
) => {
  return (
    <div className="regular-shopping-list-item-component__content">
      <span className="regular-shopping-list-item-component__purchase">
        {props.listItem.purchase}
      </span>
      <span className="regular-shopping-list-item-component__amount--value">
        {props.listItem.amount === null ? '-' : props.listItem.amount}
      </span>
      <span className="shopping-list-item-component__amount--unit">円</span>
      <EditGroupRegularShoppingListItemModalContainer
        listItem={props.listItem}
        currentYear={props.currentYear}
        currentMonth={props.currentMonth}
      />
    </div>
  );
};

export default GroupRegularShoppingListItemComponent;
