import React from 'react';
import '../../shoppingListArea/todayScheduleShoppingListByCategories/today-schedule-shopping-list-by-categories.scss';
import { bigCategoryColor } from '../../../../../lib/function';
import {
  GroupShoppingListByCategories,
  GroupShoppingListItem,
  GroupShoppingListItemByCategories,
} from '../../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';

interface GroupTodayScheduleShoppingListByCategoriesProps {
  shoppingListByCategories: GroupShoppingListByCategories;
  currentYear: string;
  currentMonth: string;
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
                        <GroupShoppingListItemComponentContainer
                          listItem={shoppingListItem}
                          currentYear={props.currentYear}
                          currentMonth={props.currentMonth}
                          purchaseClassName={
                            'shopping-list-item-component__item-purchase--home-page'
                          }
                          amountClassName={'shopping-list-item-component__item-amount--home-page'}
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
