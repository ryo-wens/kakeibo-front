import React from 'react';
import styles from './RegularShoppingListItemComponent.module.scss';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditRegularShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/ListItem/RegularShoppingListItemComponentContainer/editRegularShoppingListItemModalContainer/EditRegularShoppingListItemModalContainer';

interface RegularShoppingListItemComponentProps {
  listItem: RegularShoppingListItem;
  currentYear: string;
  currentMonth: string;
}

const RegularShoppingListItemComponent = (props: RegularShoppingListItemComponentProps) => {
  return (
    <li className={styles.wrapper}>
      <span className={styles.purchase}>{props.listItem.purchase}</span>
      <span className={styles.amount}>{`￥ ${props.listItem.amount ?? '-'}`}</span>
      <EditRegularShoppingListItemModalContainer
        listItem={props.listItem}
        currentYear={props.currentYear}
        currentMonth={props.currentMonth}
      />
    </li>
  );
};

export default RegularShoppingListItemComponent;
