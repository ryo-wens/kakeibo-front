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
  equalsDisplayDate: (date: string, categoryId: number) => boolean;
}

const ShoppingListByCategoriesComponent = (props: ShoppingListByCategoriesComponentProps) => {
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
                        {props.equalsDisplayDate(
                          shoppingListItem.expected_purchase_date,
                          shoppingListItem.big_category_id
                        ) && (
                          <p className="shopping-list-item-component__date">
                            {shoppingListItem.expected_purchase_date}
                          </p>
                        )}
                        <ShoppingListItemComponent
                          listItem={shoppingListItem}
                          currentYearMonth={props.currentYearMonth}
                          purchaseClassName={'shopping-list-item-component__item-purchase'}
                          amountClassName={'shopping-list-item-component__item-amount'}
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
