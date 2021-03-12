import { State } from '../store/types';
import { createSelector } from 'reselect';
import {
  DisplayShoppingListByDate,
  DisplayShoppingListItemByDate,
  ShoppingList,
  ShoppingListItem,
} from './types';

const shoppingListSelector = (state: State) => state.shoppingList;

export const getRegularShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.regularShoppingList
);

export const getTodayShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.todayShoppingList
);

export const getTodayShoppingListByCategories = createSelector(
  [shoppingListSelector],
  (state) => state.todayShoppingListByCategories
);

export const getMonthlyShoppingListByCategories = createSelector(
  [shoppingListSelector],
  (state) => state.monthlyShoppingListByCategories
);

const generateDisplayShoppingListByDate = (shoppingList: ShoppingList) => {
  return shoppingList.reduce<DisplayShoppingListByDate>(
    (displayShoppingList: DisplayShoppingListByDate, curItem: ShoppingListItem) => {
      const lastIdx = displayShoppingList.length === 0 ? 0 : displayShoppingList.length - 1;
      const notExistsDisplayShoppingList = displayShoppingList.length === 0;

      if (
        notExistsDisplayShoppingList ||
        displayShoppingList[lastIdx].date !== curItem.expected_purchase_date
      ) {
        const date = curItem.expected_purchase_date;
        const list = [curItem];
        const displayShoppingListItem: DisplayShoppingListItemByDate = { date, list };
        return displayShoppingList.concat(displayShoppingListItem);
      }

      displayShoppingList[lastIdx].list = displayShoppingList[lastIdx].list.concat(curItem);
      return displayShoppingList;
    },
    []
  );
};

const expiredShoppingList = (state: State) => state.shoppingList.expiredShoppingList;
export const getDisplayExpiredShoppingList = createSelector(
  [expiredShoppingList],
  (shoppingList: ShoppingList) => {
    const nextShoppingList = generateDisplayShoppingListByDate(shoppingList);

    return nextShoppingList;
  }
);

export const getSlicedExpiredShoppingList = createSelector(
  [expiredShoppingList],
  (shoppingList: ShoppingList) => {
    const initialDisplayItemNumber = 3;

    if (shoppingList.length > initialDisplayItemNumber) {
      const slicedShoppingList = shoppingList.slice(0, initialDisplayItemNumber);
      const nextShoppingList: DisplayShoppingListByDate = generateDisplayShoppingListByDate(
        slicedShoppingList
      );

      return nextShoppingList;
    }
    const nextShoppingList: DisplayShoppingListByDate = generateDisplayShoppingListByDate(
      shoppingList
    );

    return nextShoppingList;
  }
);

const todayShoppingListByDate = (state: State) => state.shoppingList.todayShoppingList;
export const getDisplayTodayShoppingListByDate = createSelector(
  [todayShoppingListByDate],
  (shoppingList: ShoppingList) => {
    const nextShoppingList = generateDisplayShoppingListByDate(shoppingList);

    return nextShoppingList;
  }
);

const monthlyShoppingListByDate = (state: State) => state.shoppingList.monthlyShoppingList;
export const getDisplayMonthlyShoppingListByDate = createSelector(
  [monthlyShoppingListByDate],
  (shoppingList: ShoppingList) => {
    const nextShoppingList = generateDisplayShoppingListByDate(shoppingList);

    return nextShoppingList;
  }
);
