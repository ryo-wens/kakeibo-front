import { GroupCategories } from './types';

export type groupCategoriesActions = ReturnType<
  | typeof fetchGroupIncomeCategoriesAction
  | typeof fetchGroupExpenseCategoriesAction
  | typeof addGroupIncomeCategory
  | typeof addGroupExpenseCategory
  | typeof editGroupIncomeCategory
  | typeof editGroupExpenseCategory
  | typeof deleteIncomeCategory
  | typeof deleteExpenseCategory
>;

export const FETCH_GROUP_INCOME_CATEGORIES = 'FETCH_GROUP_INCOME_CATEGORIES';
export const fetchGroupIncomeCategoriesAction = (groupIncomeCategories: GroupCategories) => {
  return {
    type: FETCH_GROUP_INCOME_CATEGORIES,
    payload: groupIncomeCategories,
  };
};

export const FETCH_GROUP_EXPENSE_CATEGORIES = 'FETCH_GROUP_EXPENSE_CATEGORIES';
export const fetchGroupExpenseCategoriesAction = (groupExpenseCategories: GroupCategories) => {
  return {
    type: FETCH_GROUP_EXPENSE_CATEGORIES,
    payload: groupExpenseCategories,
  };
};

export const FAILED_FETCH_GROUP_CATEGORIES = 'FAILED_FETCH_GROUP_CATEGORIES';
export const failedFetchGroupCategories = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_CATEGORIES,
    payload: {
      statusCode: statusCode,
      errorMessage: errorMessage,
    },
  };
};

export const ADD_GROUP_INCOME_CATEGORY = 'ADD_GROUP_INCOME_CATEGORY';
export const addGroupIncomeCategory = (groupIncomeCategories: GroupCategories) => {
  return {
    type: ADD_GROUP_INCOME_CATEGORY,
    payload: groupIncomeCategories,
  };
};

export const ADD_GROUP_EXPENSE_CATEGORY = 'ADD_GROUP_EXPENSE_CATEGORY';
export const addGroupExpenseCategory = (groupExpenseCategories: GroupCategories) => {
  return {
    type: ADD_GROUP_EXPENSE_CATEGORY,
    payload: groupExpenseCategories,
  };
};

export const EDIT_GROUP_INCOME_CATEGORY = 'EDIT_GROUP_INCOME_CATEGORY';
export const editGroupIncomeCategory = (groupIncomeCategories: GroupCategories) => {
  return {
    type: EDIT_GROUP_INCOME_CATEGORY,
    payload: groupIncomeCategories,
  };
};

export const EDIT_GROUP_EXPENSE_CATEGORY = 'EDIT_GROUP_EXPENSE_CATEGORY';
export const editGroupExpenseCategory = (groupExpenseCategories: GroupCategories) => {
  return {
    type: EDIT_GROUP_EXPENSE_CATEGORY,
    payload: groupExpenseCategories,
  };
};

export const DELETE_GROUP_INCOME_CATEGORY = 'DELETE_GROUP_INCOME_CATEGORY';
export const deleteIncomeCategory = (groupIncomeCategories: GroupCategories) => {
  return {
    type: DELETE_GROUP_INCOME_CATEGORY,
    payload: groupIncomeCategories,
  };
};

export const DELETE_GROUP_EXPENSE_CATEGORY = 'DELETE_GROUP_EXPENSE_CATEGORY';
export const deleteExpenseCategory = (groupExpenseCategories: GroupCategories) => {
  return {
    type: DELETE_GROUP_EXPENSE_CATEGORY,
    payload: groupExpenseCategories,
  };
};
