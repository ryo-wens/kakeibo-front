import { createSelector } from 'reselect';
import { State } from '../store/types';

const groupBudgetsSelector = (state: State) => state.groupBudgets;

export const getGroupStandardBudgets = createSelector(
  [groupBudgetsSelector],
  (state) => state.groupStandardBudgetsList
);

export const getGroupYearlyBudgets = createSelector(
  [groupBudgetsSelector],
  (state) => state.groupYearlyBudgetsList
);
