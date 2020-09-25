import { createSelector } from 'reselect';
import { State } from '../store/types';

const budgetsSelector = (state: State) => state.budgets;

export const getBudgets = createSelector([budgetsSelector], (state) => state.standard_budgets_list);
