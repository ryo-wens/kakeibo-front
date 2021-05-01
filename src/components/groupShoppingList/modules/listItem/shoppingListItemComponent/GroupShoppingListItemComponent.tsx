import React from 'react';
import styles from '../../../../shoppingList/modules/listItem/shoppingListItemComponent/ShoppingListItemComponent.module.scss';
import { GroupShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import EditGroupShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/editGroupShoppingListItemModal/EditGroupShoppingListItemModalContainer';
import CheckedGroupShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/checkedGroupShoppingListItemModal/CheckedGroupShoppingListItemModalContainer';
import { Groups } from '../../../../../reducks/groups/types';
import RelatedGroupTransactionDataButtonContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/relatedGroupTransactionDataButton/RelatedGroupTransactionDataButtonContainer';
import cn from 'classnames';

interface GroupShoppingListItemComponentProps {
  approvedGroups: Groups;
  groupId: number;
  listItem: GroupShoppingListItem;
  selectedYearParam: string;
  selectedMonthParam: string;
  currentPage: string;
  purchaseClassName: string;
  amountClassName: string;
}

const GroupShoppingListItemComponent = (props: GroupShoppingListItemComponentProps) => {
  const purchaseClassName = cn(props.purchaseClassName, {
    [styles.complete]: props.listItem.complete_flag,
  });

  const amountClassName = cn(props.amountClassName, {
    [styles.complete]: props.listItem.complete_flag,
  });

  const childCategoryDataClassName = cn({
    [styles.childCategoryData]: props.currentPage !== 'home',
    [styles.childCategoryDataCrHomePage]: props.currentPage === 'home',
  });

  const childDisplayTermClassName = cn({
    [styles.childDisplayTerm]: props.currentPage !== 'home',
    [styles.childDisplayTermCrHomePage]: props.currentPage === 'home',
  });

  return (
    <li className={styles.wrapper}>
      <div className={styles.checkBox}>
        <CheckedGroupShoppingListItemModalContainer
          listItem={props.listItem}
          selectedYearParam={props.selectedYearParam}
          selectedMonthParam={props.selectedMonthParam}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.items}>
          <div className={styles.item}>
            <span className={purchaseClassName}>{props.listItem.purchase}</span>
            <span className={amountClassName}>{`￥  ${props.listItem.amount ?? '-'}`}</span>
          </div>
          <div className={styles.editIcon}>
            <EditGroupShoppingListItemModalContainer
              listItem={props.listItem}
              selectedYearParam={props.selectedYearParam}
              selectedMonthParam={props.selectedMonthParam}
            />
          </div>
        </div>

        <div className={styles.tag}>
          {props.listItem.regular_shopping_list_id !== null && (
            <span className={styles.tag__red}>定期</span>
          )}
          {props.listItem.transaction_auto_add && (
            <span className={styles.tag__blue}>家計簿へ自動追加</span>
          )}
        </div>
        {props.listItem.related_transaction_data !== null && (
          <div className={styles.relatedTransactionData}>
            <RelatedGroupTransactionDataButtonContainer
              transactionData={props.listItem.related_transaction_data}
              approvedGroups={props.approvedGroups}
              groupId={props.groupId}
              categoryDataClassName={childCategoryDataClassName}
              displayTermClassName={childDisplayTermClassName}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default GroupShoppingListItemComponent;
