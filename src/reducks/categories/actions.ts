import { Categories } from './types';
export type categoriesActions = ReturnType<
  | typeof fetchIncomeCategoryActions
  | typeof fetchExpenseCategoryActions
  | typeof failedFetchCategoriesActions
  | typeof addIncomeCustomCategoryActions
  | typeof addExpenseCustomCategoryActions
  | typeof editIncomeCustomCategoryActions
  | typeof editExpenseCustomCategoryActions
  | typeof deleteIncomeCustomCategoryActions
  | typeof deleteExpenseCustomCategoryActions
>;

export const FETCH_INCOME_CATEGORIES = 'FETCH_INCOME_CATEGORIES';
export const fetchIncomeCategoryActions = (incomeCategories: Categories) => {
  return {
    type: FETCH_INCOME_CATEGORIES,
    payload: incomeCategories,
  };
};

export const FETCH_EXPENSE_CATEGORIES = 'FETCH_EXPENSE_CATEGORIES';
export const fetchExpenseCategoryActions = (expenseCategories: Categories) => {
  return {
    type: FETCH_EXPENSE_CATEGORIES,
    payload: expenseCategories,
  };
};

export const FAILED_FETCH_CATEGORIES = 'FAILED_FETCH_CATEGORIES';
export const failedFetchCategoriesActions = (statusCode: string, errorMessage: string) => {
  return {
    type: FAILED_FETCH_CATEGORIES,
    payload: {
      categoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const ADD_INCOME_CUSTOM_CATEGORY = 'ADD_INCOME_CUSTOM_CATEGORY';
export const addIncomeCustomCategoryActions = (incomeCategories: Categories) => {
  return {
    type: ADD_INCOME_CUSTOM_CATEGORY,
    payload: incomeCategories,
  };
};

export const ADD_EXPENSE_CUSTOM_CATEGORY = 'ADD_EXPENSE_CUSTOM_CATEGORY';
export const addExpenseCustomCategoryActions = (expenseCategories: Categories) => {
  return {
    type: ADD_EXPENSE_CUSTOM_CATEGORY,
    payload: expenseCategories,
  };
};

export const EDIT_INCOME_CUSTOM_CATEGORY = 'EDIT_INCOME_CUSTOM_CATEGORY';
export const editIncomeCustomCategoryActions = (incomeCategories: Categories) => {
  return {
    type: EDIT_INCOME_CUSTOM_CATEGORY,
    payload: incomeCategories,
  };
};

export const EDIT_EXPENSE_CUSTOM_CATEGORY = 'EDIT_EXPENSE_CUSTOM_CATEGORY';
export const editExpenseCustomCategoryActions = (expenseCategories: Categories) => {
  return {
    type: EDIT_EXPENSE_CUSTOM_CATEGORY,
    payload: expenseCategories,
  };
};

export const DELETE_INCOME_CUSTOM_CATEGORY = 'DELETE_INCOME_CUSTOM_CATEGORY';
export const deleteIncomeCustomCategoryActions = (incomeCategories: Categories) => {
  return {
    type: DELETE_INCOME_CUSTOM_CATEGORY,
    payload: incomeCategories,
  };
};

export const DELETE_EXPENSE_CUSTOM_CATEGORY = 'DELETE_EXPENSE_CUSTOM_CATEGORY';
export const deleteExpenseCustomCategoryActions = (expenseCategories: Categories) => {
  return {
    type: DELETE_EXPENSE_CUSTOM_CATEGORY,
    payload: expenseCategories,
  };
};
