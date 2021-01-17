import { State } from '../store/types';
import { createSelector } from 'reselect';

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
