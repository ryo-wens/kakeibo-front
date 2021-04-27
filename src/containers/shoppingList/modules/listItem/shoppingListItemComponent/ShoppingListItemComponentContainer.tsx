import React from 'react';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponent from '../../../../../components/shoppingList/modules/listItem/shoppingListItemComponent/ShoppingListItemComponent';
import { useLocation } from 'react-router';

interface ShoppingListItemComponentContainerProps {
  listItem: ShoppingListItem;
  selectedYearParam: string;
  selectedMonthParam: string;
  purchaseClassName: string;
  amountClassName: string;
}

const ShoppingListItemComponentContainer = (props: ShoppingListItemComponentContainerProps) => {
  const pathNames = useLocation().pathname.split('/');
  const currentPage = pathNames.slice(-1)[0];

  return (
    <ShoppingListItemComponent
      listItem={props.listItem}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
      currentPage={currentPage}
      purchaseClassName={props.purchaseClassName}
      amountClassName={props.amountClassName}
    />
  );
};

export default ShoppingListItemComponentContainer;
