import { State } from '../store/types';
import { createSelector } from 'reselect';

const shoppingListSelector = (state: State) => state.shoppingList;

export const getExpiredShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.expiredShoppingList
);

export const getRegularShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.todayShoppingList
);

export const getTodayShoppingList = createSelector(
  [shoppingListSelector],
  (state) => state.todayShoppingList
);
