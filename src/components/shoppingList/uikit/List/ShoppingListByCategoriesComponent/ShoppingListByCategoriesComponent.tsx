import React from 'react';
import {
  ShoppingListByCategories,
  ShoppingListItem,
  ShoppingListItemByCategories,
} from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponent from '../../ListItem/ShoppingListItemComponent/ShoppingListItemComponent';
import './shopping-list-by-categories-component.scss';

interface ShoppingListByCategoriesComponentProps {
  shoppingListByCategories: ShoppingListByCategories;
  currentYearMonth: string;
  message: string;
}

const ShoppingListByCategoriesComponent = (props: ShoppingListByCategoriesComponentProps) => {
  let prevDate = '';

  const equalsDisplayDate = (expectedPurchaseDate: string) => {
    if (prevDate !== expectedPurchaseDate) {
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
                <h4 className="shopping-list-by-categories-component__category-name">
                  {shoppingListItemByCategories.big_category_name}
                </h4>
                {shoppingListItemByCategories.shopping_list.map(
                  (shoppingListItem: ShoppingListItem) => {
                    return (
                      <div key={shoppingListItem.id}>
                        <ShoppingListItemComponent
                          listItem={shoppingListItem}
                          displayPurchaseDate={equalsDisplayDate(
                            shoppingListItem.expected_purchase_date
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
