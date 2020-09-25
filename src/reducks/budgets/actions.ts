import { StandardBudgetsList } from './types';
export type budgetsActions = ReturnType<typeof updateStandardBudgets>;

export const UPDATE_STANDARD_BUDGETS = 'UPDATE_STANDARD_BUDGETS';
export const updateStandardBudgets = (
  standard_budgets_list: StandardBudgetsList
): { type: string; payload: StandardBudgetsList } => {
  return {
    type: UPDATE_STANDARD_BUDGETS,
    payload: standard_budgets_list,
  };
};
