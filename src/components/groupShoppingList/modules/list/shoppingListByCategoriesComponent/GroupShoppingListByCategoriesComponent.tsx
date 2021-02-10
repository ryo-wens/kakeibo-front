import React from 'react';
import '../../../../shoppingList/modules/list/shoppingListByCategoriesComponent/shopping-list-by-categories-component.scss';
import { bigCategoryColor } from '../../../../../lib/function';
import {
  GroupShoppingListByCategories,
  GroupShoppingListItem,
  GroupShoppingListItemByCategories,
} from '../../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';

interface GroupShoppingListByCategoriesComponentProps {
  shoppingListByCategories: GroupShoppingListByCategories;
  currentYearMonth: string;
  message: string;
  equalsDisplayDate: (categoryId: number, date: string) => boolean;
}

const GroupShoppingListByCategoriesComponent = (
  props: GroupShoppingListByCategoriesComponentProps
) => {
  return (
    <>
      {props.shoppingListByCategories.length ? (
        props.shoppingListByCategories.map(
          (shoppingListItemByCategories: GroupShoppingListItemByCategories) => {
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
                  (shoppingListItem: GroupShoppingListItem) => {
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
                        <GroupShoppingListItemComponentContainer
                          listItem={shoppingListItem}
                          currentYearMonth={props.currentYearMonth}
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
        <p className="shopping-list-by-date__message">{props.message}</p>
      )}
    </>
  );
};

export default GroupShoppingListByCategoriesComponent;
