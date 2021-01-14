import { State } from '../store/types';
import { createSelector } from 'reselect';

const groupShoppingListSelector = (state: State) => state.groupShoppingList;

export const getExpiredShoppingList = createSelector(
  [groupShoppingListSelector],
  (state) => state.groupExpiredShoppingList
);
