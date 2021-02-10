import React from 'react';
import '../../../../shoppingList/modules/ListItem/RegularShoppingListItemComponent/regular-shopping-list-item-component.scss';
import { CancelTokenSource } from 'axios';
import { GroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import EditGroupRegularShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/listItem/regularShoppingListItemComponent/editGroupRegularShoppingListItemModal/EditGroupRegularShoppingListItemModalContainer';

interface GroupRegularShoppingListItemComponentProps {
  listItem: GroupRegularShoppingListItem;
  currentYearMonth: string;
  fetchGroupTodayOrMonthlyShoppingList: (groupId: number, signal: CancelTokenSource) => void;
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
        currentYearMonth={props.currentYearMonth}
        fetchTodayOrMonthlyShoppingList={props.fetchGroupTodayOrMonthlyShoppingList}
      />
    </div>
  );
};

export default GroupRegularShoppingListItemComponent;
