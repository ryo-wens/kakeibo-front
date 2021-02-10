import { createSelector } from 'reselect';
import { State } from '../store/types';

const categoriesSelector = (state: State) => state.categories;

export const getIncomeCategories = createSelector(
  [categoriesSelector],
  (state) => state.incomeList
);
export const getExpenseCategories = createSelector(
  [categoriesSelector],
  (state) => state.expenseList
);

export const getCategoriesError = createSelector(
  [categoriesSelector],
  (state) => state.categoriesError
);
