import React from 'react';
import '../../shoppingListArea/todayScheduleShoppingListByCategories/today-schedule-shopping-list-by-categories.scss';
import { bigCategoryColor } from '../../../../../lib/function';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/ShoppingListItemComponentContainer';
import {
  GroupShoppingListByCategories,
  GroupShoppingListItem,
  GroupShoppingListItemByCategories,
} from '../../../../../reducks/groupShoppingList/types';

interface GroupTodayScheduleShoppingListByCategoriesProps {
  shoppingListByCategories: GroupShoppingListByCategories;
  currentYearMonth: string;
  message: string;
}

const GroupTodayScheduleShoppingListByCategories = (
  props: GroupTodayScheduleShoppingListByCategoriesProps
) => {
  return (
    <>
      {props.shoppingListByCategories.length ? (
        props.shoppingListByCategories.map(
          (shoppingListItemByCategories: GroupShoppingListItemByCategories) => {
            return (
              <div key={shoppingListItemByCategories.big_category_name}>
                <div className="today-schedule-shopping-list-by-categories__category">
                  <span
                    className="today-schedule-shopping-list-by-categories__category-color"
                    style={bigCategoryColor(shoppingListItemByCategories.big_category_name)}
                  />
                  <h4 className="today-schedule-shopping-list-by-categories__category-name">
                    {shoppingListItemByCategories.big_category_name}
                  </h4>
                </div>
                {shoppingListItemByCategories.shopping_list.map(
                  (shoppingListItem: GroupShoppingListItem) => {
                    return (
                      <div
                        className="today-schedule-shopping-list-by-categories__item"
                        key={shoppingListItem.id}
                      >
                        <ShoppingListItemComponentContainer
                          listItem={shoppingListItem}
                          currentYearMonth={props.currentYearMonth}
                          purchaseClassName={
                            'shopping-list-item-component__item-purchase--home-page'
                          }
                          amountClassName={'shopping-list-item-component__item-amount--home-page'}
                          transactionDataItemClassName={
                            'related-transaction-data-button__item--home-page'
                          }
                          transactionDataItemKeyClassName={
                            'related-transaction-data-button__item-key--home-page'
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
        <p className="today-schedule-shopping-list-by-categories__message">{props.message}</p>
      )}
    </>
  );
};

export default GroupTodayScheduleShoppingListByCategories;
