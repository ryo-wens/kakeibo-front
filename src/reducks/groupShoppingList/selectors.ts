import { State } from '../store/types';
import { createSelector } from 'reselect';
import {
  GroupDisplayShoppingListByDate,
  GroupDisplayShoppingListItemByDate,
  GroupShoppingList,
  GroupShoppingListItem,
} from './types';

const groupShoppingListSelector = (state: State) => state.groupShoppingList;

export const getGroupRegularShoppingList = createSelector(
  [groupShoppingListSelector],
  (state) => state.groupRegularShoppingList
);

export const getGroupExpiredShoppingList = createSelector(
  [groupShoppingListSelector],
  (state) => state.groupExpiredShoppingList
);

export const getGroupTodayShoppingList = createSelector(
  [groupShoppingListSelector],
  (state) => state.groupTodayShoppingList
);

export const getGroupTodayShoppingListByCategories = createSelector(
  [groupShoppingListSelector],
  (state) => state.groupTodayShoppingListByCategories
);

export const getGroupMonthlyShoppingList = createSelector(
  [groupShoppingListSelector],
  (state) => state.groupMonthlyShoppingList
);

export const getGroupMonthlyShoppingListByCategories = createSelector(
  [groupShoppingListSelector],
  (state) => state.groupMonthlyShoppingListByCategories
);

const generateGroupDisplayShoppingListByDate = (shoppingList: GroupShoppingList) => {
  return shoppingList.reduce<GroupDisplayShoppingListByDate>(
    (displayShoppingList: GroupDisplayShoppingListByDate, curItem: GroupShoppingListItem) => {
      const lastIdx = displayShoppingList.length === 0 ? 0 : displayShoppingList.length - 1;
      const notExistsDisplayShoppingList = displayShoppingList.length === 0;

      if (
        notExistsDisplayShoppingList ||
        displayShoppingList[lastIdx].date !== curItem.expected_purchase_date
      ) {
        const date = curItem.expected_purchase_date;
        const shoppingList = [curItem];
        const displayShoppingListItem: GroupDisplayShoppingListItemByDate = { date, shoppingList };
        return displayShoppingList.concat(displayShoppingListItem);
      }

      displayShoppingList[lastIdx].shoppingList = displayShoppingList[lastIdx].shoppingList.concat(
        curItem
      );
      return displayShoppingList;
    },
    []
  );
};

const groupExpiredShoppingList = (state: State) => state.groupShoppingList.groupExpiredShoppingList;
export const getGroupDisplayExpiredShoppingList = createSelector(
  [groupExpiredShoppingList],
  (shoppingList: GroupShoppingList) => {
    const nextShoppingList = generateGroupDisplayShoppingListByDate(shoppingList);

    return nextShoppingList;
  }
);

export const getGroupSlicedExpiredShoppingList = createSelector(
  [groupExpiredShoppingList],
  (shoppingList: GroupShoppingList) => {
    const initialDisplayItemNumber = 3;

    if (shoppingList.length > initialDisplayItemNumber) {
      const slicedShoppingList = shoppingList.slice(0, initialDisplayItemNumber);
      const nextShoppingList: GroupDisplayShoppingListByDate = generateGroupDisplayShoppingListByDate(
        slicedShoppingList
      );

      return nextShoppingList;
    }
    const nextShoppingList: GroupDisplayShoppingListByDate = generateGroupDisplayShoppingListByDate(
      shoppingList
    );

    return nextShoppingList;
  }
);

const groupTodayShoppingListByDate = (state: State) =>
  state.groupShoppingList.groupTodayShoppingList;
export const getGroupDisplayTodayShoppingListByDate = createSelector(
  [groupTodayShoppingListByDate],
  (shoppingList: GroupShoppingList) => {
    const nextShoppingList = generateGroupDisplayShoppingListByDate(shoppingList);

    return nextShoppingList;
  }
);

const groupMonthlyShoppingListByDate = (state: State) =>
  state.groupShoppingList.groupMonthlyShoppingList;
export const getGroupDisplayMonthlyShoppingListByDate = createSelector(
  [groupMonthlyShoppingListByDate],
  (shoppingList: GroupShoppingList) => {
    const nextShoppingList = generateGroupDisplayShoppingListByDate(shoppingList);

    return nextShoppingList;
  }
);
