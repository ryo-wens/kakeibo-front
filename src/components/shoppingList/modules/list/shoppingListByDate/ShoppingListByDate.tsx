import React from 'react';
import { DisplayShoppingListByDate } from '../../../../../reducks/shoppingList/types';
import styles from './ShoppingListByDate.module.scss';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/listItem/shoppingListItemComponent/ShoppingListItemComponentContainer';

interface ShoppingListByDateProps {
  shoppingListByDate: DisplayShoppingListByDate;
  selectedYearParam: string;
  selectedMonthParam: string;
  message: string;
}

const ShoppingListByDate = (props: ShoppingListByDateProps) => {
  const existsShoppingListByDate = props.shoppingListByDate.length !== 0;

  return (
    <>
      {existsShoppingListByDate ? (
        <ol className={styles.listByDate}>
          {props.shoppingListByDate.map((displayShoppingListItem) => {
            return (
              <li className={styles.listItemByDate} key={displayShoppingListItem.date}>
                <p className={styles.date}>{displayShoppingListItem.date}</p>
                <ol className={styles.shoppingList}>
                  {displayShoppingListItem.shoppingList.map((item) => {
                    return (
                      <ShoppingListItemComponentContainer
                        listItem={item}
                        selectedYearParam={props.selectedYearParam}
                        selectedMonthParam={props.selectedMonthParam}
                        purchaseClassName={styles.childPurchase}
                        amountClassName={styles.childAmount}
                        key={item.id}
                      />
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className={styles.message}>{props.message}</p>
      )}
    </>
  );
};

export default ShoppingListByDate;
