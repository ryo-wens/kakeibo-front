import { createSelector } from 'reselect';
import { State } from '../store/types';

const budgetsSelector = (state: State) => state.budgets;

export const getStandardBudgets = createSelector(
  [budgetsSelector],
  (state) => state.standard_budgets_list
);
export const getYearlyBudgets = createSelector(
  [budgetsSelector],
  (state) => state.yearly_budgets_list
);
