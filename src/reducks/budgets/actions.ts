import { StandardBudgetsList, FetchYearlyBudgetsList } from './types';
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

export const FETCH_YEARLY_BUDGETS = 'FETCH_YEARLY_BUDGETS';
export const fetchYearlyBudgets = (
  yearly_budgets_list: FetchYearlyBudgetsList
): { type: string; payload: FetchYearlyBudgetsList } => {
  return {
    type: FETCH_YEARLY_BUDGETS,
    payload: yearly_budgets_list,
  };
};
