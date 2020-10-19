import { GroupCategories } from './types';

export type groupCategoriesActions = ReturnType<
  typeof updateGroupIncomeCategoriesAction | typeof updateGroupExpenseCategoriesAction
>;

export const UPDATE_GROUP_INCOME_CATEGORIES = 'UPDATE_GROUP_INCOME_CATEGORIES';
export const updateGroupIncomeCategoriesAction = (
  groupIncomeCategories: GroupCategories
): { type: string; payload: GroupCategories } => {
  return {
    type: UPDATE_GROUP_INCOME_CATEGORIES,
    payload: groupIncomeCategories,
  };
};

export const UPDATE_GROUP_EXPENSE_CATEGORIES = 'UPDATE_GROUP_EXPENSE_CATEGORIES';
export const updateGroupExpenseCategoriesAction = (
  groupExpenseCategories: GroupCategories
): { type: string; payload: GroupCategories } => {
  return {
    type: UPDATE_GROUP_EXPENSE_CATEGORIES,
    payload: groupExpenseCategories,
  };
};
