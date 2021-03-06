import { createSelector } from 'reselect';
import { State } from '../store/types';

const groupCategoriesSelector = (state: State) => state.groupCategories;

export const getGroupIncomeCategories = createSelector(
  [groupCategoriesSelector],
  (state) => state.groupIncomeList
);

export const getGroupExpenseCategories = createSelector(
  [groupCategoriesSelector],
  (state) => state.groupExpenseList
);

export const getGroupCategoriesErrorMessage = (state: State) =>
  state.groupCategories.groupCategoriesError.errorMessage;
