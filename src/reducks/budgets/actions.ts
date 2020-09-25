import { StandardBudgetsList } from './types';
export type budgetsActions = ReturnType<typeof fetchStandardBudgets>;

export const FETCH_STANDARD_BUDGETS = 'FETCH_STANDARD_BUDGETS';
export const fetchStandardBudgets = (
  standard_budgets_list: StandardBudgetsList
): { type: string; payload: StandardBudgetsList } => {
  return {
    type: FETCH_STANDARD_BUDGETS,
    payload: standard_budgets_list,
  };
};
