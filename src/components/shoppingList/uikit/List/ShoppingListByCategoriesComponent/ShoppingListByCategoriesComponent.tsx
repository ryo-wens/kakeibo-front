import React from 'react';
import {
  ShoppingListByCategories,
  ShoppingListItem,
  ShoppingListItemByCategories,
} from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponent from '../../ListItem/ShoppingListItemComponent/ShoppingListItemComponent';
import './shopping-list-by-categories-component.scss';
import { bigCategoryColor } from '../../../../../lib/function';

interface ShoppingListByCategoriesComponentProps {
  shoppingListByCategories: ShoppingListByCategories;
  currentYearMonth: string;
  message: string;
}

const ShoppingListByCategoriesComponent = (props: ShoppingListByCategoriesComponentProps) => {
  let prevDate = '';
  let prevCategoryId = 0;

  const equalsDisplayDate = (expectedPurchaseDate: string, categoryId: number) => {
    if (prevCategoryId !== categoryId) {
      prevCategoryId = categoryId;
      prevDate = expectedPurchaseDate;
      return true;
    } else if (prevDate !== expectedPurchaseDate) {
      prevDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  return (
    <>
      {props.shoppingListByCategories.length ? (
        props.shoppingListByCategories.map(
          (shoppingListItemByCategories: ShoppingListItemByCategories) => {
            return (
              <div key={shoppingListItemByCategories.big_category_name}>
                <div className="shopping-list-by-categories-component__category">
                  <span
                    className="shopping-list-by-categories-component__category-color"
                    style={bigCategoryColor(shoppingListItemByCategories.big_category_name)}
                  />
                  <h4 className="shopping-list-by-categories-component__category-name">
                    {shoppingListItemByCategories.big_category_name}
                  </h4>
                </div>
                {shoppingListItemByCategories.shopping_list.map(
                  (shoppingListItem: ShoppingListItem) => {
                    return (
                      <div key={shoppingListItem.id}>
                        <ShoppingListItemComponent
                          listItem={shoppingListItem}
                          displayPurchaseDate={equalsDisplayDate(
                            shoppingListItem.expected_purchase_date,
                            shoppingListItem.big_category_id
                          )}
                          currentYearMonth={props.currentYearMonth}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            );
          }
        )
      ) : (
        <p className="shopping-list-by-categories-component__message">{props.message}</p>
      )}
    </>
  );
};

export default ShoppingListByCategoriesComponent;
