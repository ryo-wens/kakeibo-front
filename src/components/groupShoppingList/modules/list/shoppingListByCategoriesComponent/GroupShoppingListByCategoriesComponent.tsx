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
  currentYear: string;
  currentMonth: string;
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
                          currentYear={props.currentYear}
                          currentMonth={props.currentMonth}
                          purchaseClassName={
                            'shopping-list-by-categories-component__child-purchase'
                          }
                          amountClassName={'shopping-list-by-categories-component__child-amount'}
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
