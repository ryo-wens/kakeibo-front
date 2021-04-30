import React from 'react';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';
import RegularShoppingListItemComponent from '../../../../../components/shoppingList/modules/listItem/regularShoppingListItemComponent/RegularShoppingListItemComponent';

interface RegularShoppingListItemComponentContainerProps {
  listItem: RegularShoppingListItem;
  selectedYearParam: string;
  selectedMonthParam: string;
}

const RegularShoppingListItemComponentContainer = (
  props: RegularShoppingListItemComponentContainerProps
) => {
  return (
    <RegularShoppingListItemComponent
      listItem={props.listItem}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
    />
  );
};

export default RegularShoppingListItemComponentContainer;
