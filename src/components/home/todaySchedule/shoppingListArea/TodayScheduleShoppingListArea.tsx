import React from 'react';
import {
  ShoppingListByCategories,
  ShoppingListItem,
  ShoppingListItemByCategories,
} from '../../../../reducks/shoppingList/types';
import styles from './TodayScheduleShoppingListArea.module.scss';
import { bigCategoryColor } from '../../../../lib/function';
import ShoppingListItemComponentContainer from '../../../../containers/shoppingList/modules/listItem/shoppingListItemComponent/ShoppingListItemComponentContainer';

interface TodayScheduleShoppingListByCategoriesProps {
  shoppingListByCategories: ShoppingListByCategories;
  currentYear: string;
  currentMonth: string;
  message: string;
}

const TodayScheduleShoppingListArea = (props: TodayScheduleShoppingListByCategoriesProps) => {
  const existsShoppingList = props.shoppingListByCategories.length !== 0;

  return (
    <>
      {existsShoppingList ? (
        <ol className={styles.listByCategory}>
          {props.shoppingListByCategories.map(
            (shoppingListItemByCategories: ShoppingListItemByCategories) => {
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
                      (shoppingListItem: ShoppingListItem) => {
                        return (
                          <ShoppingListItemComponentContainer
                            listItem={shoppingListItem}
                            currentYear={props.currentYear}
                            currentMonth={props.currentMonth}
                            purchaseClassName={styles.childPurchase}
                            amountClassName={styles.childAmount}
                            key={shoppingListItem.id}
                          />
                        );
                      }
                    )}{' '}
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

export default TodayScheduleShoppingListArea;
