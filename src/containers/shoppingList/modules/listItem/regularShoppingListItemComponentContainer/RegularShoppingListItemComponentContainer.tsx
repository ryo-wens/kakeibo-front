import React from 'react';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';
import RegularShoppingListItemComponent from '../../../../../components/shoppingList/modules/listItem/regularShoppingListItemComponent/RegularShoppingListItemComponent';

interface RegularShoppingListItemComponentContainerProps {
  listItem: RegularShoppingListItem;
  currentYear: string;
  currentMonth: string;
}

const RegularShoppingListItemComponentContainer = (
  props: RegularShoppingListItemComponentContainerProps
) => {
  return (
    <RegularShoppingListItemComponent
      listItem={props.listItem}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
    />
  );
};

export default RegularShoppingListItemComponentContainer;
