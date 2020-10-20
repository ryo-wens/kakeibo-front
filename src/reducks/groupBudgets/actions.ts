import { GroupStandardBudgetsList } from './types';

export type groupBudgetsActions = ReturnType<typeof updateGroupStandardBudgetsActions>;

export const UPDATE_GROUP_STANDARD_BUDGETS = 'UPDATE_GROUP_STANDARD_BUDGETS';
export const updateGroupStandardBudgetsActions = (
  groupStandardBudgetsList: GroupStandardBudgetsList
): { type: string; payload: GroupStandardBudgetsList } => {
  return {
    type: UPDATE_GROUP_STANDARD_BUDGETS,
    payload: groupStandardBudgetsList,
  };
};
