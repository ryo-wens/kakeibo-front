import React from 'react';
import { bigCategoryColor } from '../../../../../lib/function';
import {
  GroupDisplayShoppingListByCategories,
  GroupDisplayShoppingListItemByCategories,
  GroupDisplayShoppingListItemByDate,
} from '../../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';
import styles from '../../../../shoppingList/modules/list/shoppingListByCategoriesComponent/ShoppingListByCategoriesComponent.module.scss';

interface GroupShoppingListByCategoriesComponentProps {
  shoppingListByCategories: GroupDisplayShoppingListByCategories;
  selectedYearParam: string;
  selectedMonthParam: string;
  message: string;
}

const GroupShoppingListByCategoriesComponent = (
  props: GroupShoppingListByCategoriesComponentProps
) => {
  const existsShoppingListByCategories = props.shoppingListByCategories.length !== 0;

  return (
    <>
      {existsShoppingListByCategories ? (
        <ol className={styles.listByCategory}>
          {props.shoppingListByCategories.map(
            (shoppingListItemByCategories: GroupDisplayShoppingListItemByCategories) => {
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
                      (shoppingListItemByDate: GroupDisplayShoppingListItemByDate) => {
                        return (
                          <li className={styles.listItemByDate} key={shoppingListItemByDate.date}>
                            <p className={styles.date}>{shoppingListItemByDate.date}</p>
                            <ol className={styles.shoppingList}>
                              {shoppingListItemByDate.shoppingList.map((item) => {
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

export default GroupShoppingListByCategoriesComponent;
