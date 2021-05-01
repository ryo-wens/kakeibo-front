import React from 'react';
import '../../../../shoppingList/modules/list/shoppingListByDate/ShoppingListByDate.module.scss';
import { GroupDisplayShoppingListByDate } from '../../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';
import styles from '../../../../shoppingList/modules/list/shoppingListByDate/ShoppingListByDate.module.scss';

interface GroupShoppingListByDateProps {
  shoppingListByDate: GroupDisplayShoppingListByDate;
  selectedYearParam: string;
  selectedMonthParam: string;
  message: string;
}

const GroupShoppingListByDate = (props: GroupShoppingListByDateProps) => {
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
                      <GroupShoppingListItemComponentContainer
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

export default GroupShoppingListByDate;
