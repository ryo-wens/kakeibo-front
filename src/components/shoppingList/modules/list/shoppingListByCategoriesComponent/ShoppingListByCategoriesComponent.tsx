import React from 'react';
import {
  ShoppingListByCategories,
  ShoppingListItem,
  ShoppingListItemByCategories,
} from '../../../../../reducks/shoppingList/types';
import './shopping-list-by-categories-component.scss';
import { bigCategoryColor } from '../../../../../lib/function';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/ShoppingListItemComponentContainer';

interface ShoppingListByCategoriesComponentProps {
  shoppingListByCategories: ShoppingListByCategories;
  currentYear: string;
  currentMonth: string;
  message: string;
  equalsDisplayDate: (categoryId: number, date: string) => boolean;
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
                      <div
                        className="shopping-list-by-categories-component__item"
                        key={shoppingListItem.id}
                      >
                        {props.equalsDisplayDate(
                          shoppingListItem.big_category_id,
                          shoppingListItem.expected_purchase_date
                        ) && (
                          <p className="shopping-list-by-categories-component__item-date">
                            {shoppingListItem.expected_purchase_date}
                          </p>
                        )}
                        <ShoppingListItemComponentContainer
                          listItem={shoppingListItem}
                          currentYear={props.currentYear}
                          currentMonth={props.currentMonth}
                          purchaseClassName={'shopping-list-item-component__item-purchase'}
                          amountClassName={'shopping-list-item-component__item-amount'}
                          transactionDataItemClassName={'related-transaction-data-button__item'}
                          transactionDataItemKeyClassName={
                            'related-transaction-data-button__item-key'
                          }
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
