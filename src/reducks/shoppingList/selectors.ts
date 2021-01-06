import { State } from '../store/types';
import { createSelector } from 'reselect';

const shoppingListSelector = (state: State) => state.shoppingList;

export const getRegularShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.regularShoppingList
);

export const getExpiredShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.expiredShoppingList
);

export const getTodayShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.todayShoppingList
);

export const getTodayShoppingListByCategories = createSelector(
  [shoppingListSelector],
  (state) => state.todayShoppingListByCategories
);

export const getMonthlyShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.monthlyShoppingList
);

export const getMonthlyShoppingListByCategories = createSelector(
  [shoppingListSelector],
  (state) => state.monthlyShoppingListByCategories
);
