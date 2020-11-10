import { StandardBudgetsList, YearlyBudgetsList, CustomBudgetsList } from './types';
export type budgetsActions = ReturnType<
  | typeof updateStandardBudgetsActions
  | typeof updateCustomBudgetsActions
  | typeof copyStandardBudgetsActions
  | typeof updateYearlyBudgetsActions
>;

export const UPDATE_STANDARD_BUDGETS = 'UPDATE_STANDARD_BUDGETS';
export const updateStandardBudgetsActions = (
  standard_budgets_list: StandardBudgetsList
): { type: string; payload: StandardBudgetsList } => {
  return {
    type: UPDATE_STANDARD_BUDGETS,
    payload: standard_budgets_list,
  };
};

export const UPDATE_CUSTOM_BUDGETS = 'UPDATE_CUSTOM_BUDGETS';
export const updateCustomBudgetsActions = (
  custom_budgets_list: CustomBudgetsList
): { type: string; payload: CustomBudgetsList } => {
  return {
    type: UPDATE_CUSTOM_BUDGETS,
    payload: custom_budgets_list,
  };
};

export const COPY_STANDARD_BUDGETS = 'COPY_STANDARD_BUDGETS';
export const copyStandardBudgetsActions = (
  custom_budgets_list: CustomBudgetsList
): { type: string; payload: CustomBudgetsList } => {
  return {
    type: COPY_STANDARD_BUDGETS,
    payload: custom_budgets_list,
  };
};

export const UPDATE_YEARLY_BUDGETS = 'UPDATE_YEARLY_BUDGETS';
export const updateYearlyBudgetsActions = (
  yearly_budgets_list: YearlyBudgetsList
): { type: string; payload: YearlyBudgetsList } => {
  return {
    type: UPDATE_YEARLY_BUDGETS,
    payload: yearly_budgets_list,
  };
};
