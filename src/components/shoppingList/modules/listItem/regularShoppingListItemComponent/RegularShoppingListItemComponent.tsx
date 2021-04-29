import React from 'react';
import styles from './RegularShoppingListItemComponent.module.scss';
import { RegularShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditRegularShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/listItem/regularShoppingListItemComponentContainer/editRegularShoppingListItemModalContainer/EditRegularShoppingListItemModalContainer';

interface RegularShoppingListItemComponentProps {
  listItem: RegularShoppingListItem;
  selectedYearParam: string;
  selectedMonthParam: string;
}

const RegularShoppingListItemComponent = (props: RegularShoppingListItemComponentProps) => {
  return (
    <li className={styles.wrapper}>
      <span className={styles.purchase}>{props.listItem.purchase}</span>
      <span className={styles.amount}>{`￥ ${props.listItem.amount ?? '-'}`}</span>
      <EditRegularShoppingListItemModalContainer
        listItem={props.listItem}
        selectedYearParam={props.selectedYearParam}
        selectedMonthParam={props.selectedMonthParam}
      />
    </li>
  );
};

export default RegularShoppingListItemComponent;
