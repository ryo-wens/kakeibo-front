import React from 'react';
import { bigCategoryColor } from '../../../../lib/function';
import {
  GroupShoppingListByCategories,
  GroupShoppingListItem,
  GroupShoppingListItemByCategories,
} from '../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';
import styles from '../shoppingListArea/TodayScheduleShoppingListArea.module.scss';

interface GroupTodayScheduleShoppingListByCategoriesProps {
  shoppingListByCategories: GroupShoppingListByCategories;
  currentYear: string;
  currentMonth: string;
  message: string;
}

const GroupTodayScheduleShoppingListArea = (
  props: GroupTodayScheduleShoppingListByCategoriesProps
) => {
  const existsShoppingList = props.shoppingListByCategories.length !== 0;

  return (
    <>
      {existsShoppingList ? (
        <ol className={styles.listByCategory}>
          {props.shoppingListByCategories.map(
            (shoppingListItemByCategories: GroupShoppingListItemByCategories) => {
              return (
                <li key={shoppingListItemByCategories.big_category_name}>
                  <div className={styles.category}>
                    <span
                      className={styles.categoryColor}
                      style={bigCategoryColor(shoppingListItemByCategories.big_category_name)}
                    />
                    <h4 className={styles.categoryName}>
                      {shoppingListItemByCategories.big_category_name}
                    </h4>
                  </div>
                  <ol className={styles.shoppingList}>
                    {shoppingListItemByCategories.shopping_list.map(
                      (shoppingListItem: GroupShoppingListItem) => {
                        return (
                          <GroupShoppingListItemComponentContainer
                            listItem={shoppingListItem}
                            currentYear={props.currentYear}
                            currentMonth={props.currentMonth}
                            purchaseClassName={styles.childPurchase}
                            amountClassName={styles.childAmount}
                            key={shoppingListItem.id}
                          />
                        );
                      }
                    )}
                  </ol>
                </li>
              );
            }
          )}
        </ol>
      ) : (
        <p className={styles.message}>{props.message}</p>
      )}
    </>
  );
};

export default GroupTodayScheduleShoppingListArea;
