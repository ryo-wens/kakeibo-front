export type categoriesActions = ReturnType<
  typeof getIncomeCategoriesAction | typeof getExpenseCategoriesAction
>;
import { Categories } from './types';

export const GET_INCOME_CATEGORIES = 'GET_INCOME_CATEGORIES';
export const getIncomeCategoriesAction = (incomeCategories: Categories) => {
  return {
    type: GET_INCOME_CATEGORIES,
    payload: {
      incomeCategories: incomeCategories,
    },
  };
};

export const GET_EXPENSE_CATEGORIES = 'GET_EXPENSE_CATEGORIES';
export const getExpenseCategoriesAction = (expenseCategories: Categories) => {
  return {
    type: GET_EXPENSE_CATEGORIES,
    payload: {
      expenseCategories: expenseCategories,
    },
  };
};
