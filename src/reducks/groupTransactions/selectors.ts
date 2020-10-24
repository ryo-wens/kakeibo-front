import { createSelector } from 'reselect';
import { State } from '../store/types';

const groupTransactionsSelector = (state: State) => state.groupTransactions;

export const getGroupTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupTransactionsList
);
