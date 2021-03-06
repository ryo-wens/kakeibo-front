import React from 'react';
import {
  ShoppingListByCategories,
  ShoppingListItem,
  ShoppingListItemByCategories,
} from '../../../../../reducks/shoppingList/types';
import './shopping-list-by-categories-component.scss';
import { bigCategoryColor } from '../../../../../lib/function';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/ShoppingListItemComponentContainer';
import cn from 'classnames';

interface ShoppingListByCategoriesComponentProps {
  shoppingListByCategories: ShoppingListByCategories;
  currentYear: string;
  currentMonth: string;
  message: string;
  equalsDisplayDate: (categoryId: number, date: string) => boolean;
  pathName: string;
}

const ShoppingListByCategoriesComponent = (props: ShoppingListByCategoriesComponentProps) => {
  const purchaseClassName = cn({
    'shopping-list-by-categories-component__child-purchase-current-home-page':
      props.pathName === 'home',
    'shopping-list-by-categories-component__child-purchase': props.pathName !== 'home',
  });

  const amountClassName = cn({
    'shopping-list-by-categories-component__child-amount-current-home-page':
      props.pathName === 'home',
    'shopping-list-by-categories-component__child-amount': props.pathName !== 'home',
  });

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
                          purchaseClassName={purchaseClassName}
                          amountClassName={amountClassName}
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
