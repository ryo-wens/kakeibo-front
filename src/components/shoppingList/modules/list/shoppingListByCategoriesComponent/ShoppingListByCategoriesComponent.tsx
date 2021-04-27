import React from 'react';
import {
  DisplayShoppingListByCategories,
  DisplayShoppingListItemByCategories,
  DisplayShoppingListItemByDate,
} from '../../../../../reducks/shoppingList/types';
import { bigCategoryColor } from '../../../../../lib/function';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/listItem/shoppingListItemComponent/ShoppingListItemComponentContainer';
import styles from './ShoppingListByCategoriesComponent.module.scss';

interface ShoppingListByCategoriesComponentProps {
  shoppingListByCategories: DisplayShoppingListByCategories;
  selectedYearParam: string;
  selectedMonthParam: string;
  message: string;
  pathName: string;
}

const ShoppingListByCategoriesComponent = (props: ShoppingListByCategoriesComponentProps) => {
  const existsShoppingListByCategories = props.shoppingListByCategories.length !== 0;

  return (
    <>
      {existsShoppingListByCategories ? (
        <ol className={styles.listByCategory}>
          {props.shoppingListByCategories.map(
            (shoppingListItemByCategories: DisplayShoppingListItemByCategories) => {
              return (
                <li
                  className={styles.listItemByCategory}
                  key={shoppingListItemByCategories.bigCategoryName}
                >
                  <div className={styles.category}>
                    <span
                      className={styles.categoryColor}
                      style={bigCategoryColor(shoppingListItemByCategories.bigCategoryName)}
                    />
                    <h4 className={styles.categoryName}>
                      {shoppingListItemByCategories.bigCategoryName}
                    </h4>
                  </div>
                  <ol className={styles.listByDate}>
                    {shoppingListItemByCategories.shoppingListByDate.map(
                      (shoppingListItemByDate: DisplayShoppingListItemByDate) => {
                        return (
                          <li className={styles.listItemByDate} key={shoppingListItemByDate.date}>
                            <p className={styles.date}>{shoppingListItemByDate.date}</p>
                            <ol className={styles.shoppingList}>
                              {shoppingListItemByDate.shoppingList.map((item) => {
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

export default ShoppingListByCategoriesComponent;
