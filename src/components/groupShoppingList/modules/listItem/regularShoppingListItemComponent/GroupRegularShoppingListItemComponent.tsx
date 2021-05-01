import React from 'react';
import styles from '../../../../shoppingList/modules/listItem/regularShoppingListItemComponent/RegularShoppingListItemComponent.module.scss';
import { GroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import EditGroupRegularShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/listItem/regularShoppingListItemComponent/editGroupRegularShoppingListItemModal/EditGroupRegularShoppingListItemModalContainer';

interface GroupRegularShoppingListItemComponentProps {
  listItem: GroupRegularShoppingListItem;
  selectedYearParam: string;
  selectedMonthParam: string;
}

const GroupRegularShoppingListItemComponent = (
  props: GroupRegularShoppingListItemComponentProps
) => {
  return (
    <li className={styles.wrapper}>
      <span className={styles.purchase}>{props.listItem.purchase}</span>
      <span className={styles.amount}>{`￥ ${props.listItem.amount ?? '-'}`}</span>
      <EditGroupRegularShoppingListItemModalContainer
        listItem={props.listItem}
        selectedYearParam={props.selectedYearParam}
        selectedMonthParam={props.selectedMonthParam}
      />
    </li>
  );
};

export default GroupRegularShoppingListItemComponent;
