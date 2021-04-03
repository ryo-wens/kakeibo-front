import React from 'react';
import styles from './ShoppingListItemComponent.module.scss';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import CheckedShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/listItem/shoppingListItemComponent/checkedShoppingListItemModal/CheckedShoppingListItemModalContainer';
import EditShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/listItem/shoppingListItemComponent/editShoppingListItemModal/EditShoppingListItemModalContainer';
import RelatedTransactionDataButtonContainer from '../../../../../containers/shoppingList/modules/listItem/shoppingListItemComponent/relatedTransactionDataButton/RelatedTransactionDataButtonContainer';
import cn from 'classnames';

interface ShoppingListItemComponentProps {
  listItem: ShoppingListItem;
  currentYear: string;
  currentMonth: string;
  currentPage: string;
  purchaseClassName: string;
  amountClassName: string;
}

const ShoppingListItemComponent = (props: ShoppingListItemComponentProps) => {
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
        <CheckedShoppingListItemModalContainer
          listItem={props.listItem}
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.items}>
          <div className={styles.item}>
            <span className={purchaseClassName}>{props.listItem.purchase}</span>
            <span className={amountClassName}>{`￥  ${props.listItem.amount ?? '-'}`}</span>
          </div>
          <span className={styles.editIcon}>
            <EditShoppingListItemModalContainer
              listItem={props.listItem}
              currentYear={props.currentYear}
              currentMonth={props.currentMonth}
            />
          </span>
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
            <RelatedTransactionDataButtonContainer
              transactionData={props.listItem.related_transaction_data}
              categoryDataClassName={childCategoryDataClassName}
              displayTermClassName={childDisplayTermClassName}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default ShoppingListItemComponent;
