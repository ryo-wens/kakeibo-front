import React, { useEffect } from 'react';
import '../../../../shoppingList/modules/List/ShoppingListByCategoriesComponent/shopping-list-by-categories-component.scss';
import { bigCategoryColor } from '../../../../../lib/function';
import GroupShoppingListItemComponent from '../../../uikit/ListItem/GroupShoppingListItemComponent/GroupShoppingListItemComponent';
import {
  GroupShoppingListByCategories,
  GroupShoppingListItem,
  GroupShoppingListItemByCategories,
} from '../../../../../reducks/groupShoppingList/types';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../../../reducks/groups/operations';
import { fetchGroupMonthlyShoppingListByCategories } from '../../../../../reducks/groupShoppingList/operations';
import { useDispatch } from 'react-redux';

interface GroupMonthlyShoppingListByCategoriesComponentProps {
  shoppingListByCategories: GroupShoppingListByCategories;
  selectedMonth: number;
  groupId: number;
  currentYear: string;
  currentMonth: string;
  currentYearMonth: string;
}

const GroupMonthlyShoppingListByCategoriesComponent = (
  props: GroupMonthlyShoppingListByCategoriesComponentProps
) => {
  const dispatch = useDispatch();

  const fetchData = (groupId: number, year: string, month: string, signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(
      fetchGroupMonthlyShoppingListByCategories(
        groupId,
        props.currentYear,
        props.currentMonth,
        signal
      )
    );
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(props.groupId, props.currentYear, props.currentMonth, signal);
    const interval = setInterval(() => {
      fetchData(props.groupId, props.currentYear, props.currentMonth, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [props.groupId, props.currentYear, props.currentMonth]);

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
                      <div key={shoppingListItem.id}>
                        <GroupShoppingListItemComponent
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
        <p className="shopping-list-by-date__message">
          {props.selectedMonth}月の買い物リストは、登録されていません。
        </p>
      )}
    </>
  );
};

export default GroupMonthlyShoppingListByCategoriesComponent;
