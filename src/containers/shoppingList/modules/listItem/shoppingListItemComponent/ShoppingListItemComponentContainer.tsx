import React from 'react';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponent from '../../../../../components/shoppingList/modules/listItem/shoppingListItemComponent/ShoppingListItemComponent';
import { useLocation } from 'react-router';

interface ShoppingListItemComponentContainerProps {
  listItem: ShoppingListItem;
  currentYear: string;
  currentMonth: string;
  purchaseClassName: string;
  amountClassName: string;
}

const ShoppingListItemComponentContainer = (props: ShoppingListItemComponentContainerProps) => {
  const pathNames = useLocation().pathname.split('/');
  const currentPage = pathNames.slice(-1)[0];

  return (
    <ShoppingListItemComponent
      listItem={props.listItem}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      currentPage={currentPage}
      purchaseClassName={props.purchaseClassName}
      amountClassName={props.amountClassName}
    />
  );
};

export default ShoppingListItemComponentContainer;
