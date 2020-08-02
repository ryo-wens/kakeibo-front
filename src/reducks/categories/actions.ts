import { Categories } from './types';
export type categoriesActions = ReturnType<typeof updateIncomeCategoriesAction | typeof updateExpenseCategoriesAction>;

export const UPDATE_INCOME_CATEGORIES = 'UPDATE_INCOME_CATEGORIES';
export const updateIncomeCategoriesAction = (incomeCategories: Categories) => {
  return {
    type: UPDATE_INCOME_CATEGORIES,
    payload: incomeCategories,
  };
};

export const UPDATE_EXPENSE_CATEGORIES = 'UPDATE_EXPENSE_CATEGORIES';
export const updateExpenseCategoriesAction = (expenseCategories: Categories) => {
  return {
    type: UPDATE_EXPENSE_CATEGORIES,
    payload: expenseCategories,
  };
};
