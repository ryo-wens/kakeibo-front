import { GroupStandardBudgetsList, GroupYearlyBudgetsList } from './types';

export type groupBudgetsActions = ReturnType<
  typeof updateGroupStandardBudgetsActions | typeof fetchGroupYearlyBudgetsActions
>;

export const UPDATE_GROUP_STANDARD_BUDGETS = 'UPDATE_GROUP_STANDARD_BUDGETS';
export const updateGroupStandardBudgetsActions = (
  groupStandardBudgetsList: GroupStandardBudgetsList
): { type: string; payload: GroupStandardBudgetsList } => {
  return {
    type: UPDATE_GROUP_STANDARD_BUDGETS,
    payload: groupStandardBudgetsList,
  };
};

export const FETCH_GROUP_YEARLY_BUDGETS = 'FETCH_GROUP_YEARLY_BUDGETS';
export const fetchGroupYearlyBudgetsActions = (
  groupYearlyBudgetsList: GroupYearlyBudgetsList
): { type: string; payload: GroupYearlyBudgetsList } => {
  return {
    type: FETCH_GROUP_YEARLY_BUDGETS,
    payload: groupYearlyBudgetsList,
  };
};
