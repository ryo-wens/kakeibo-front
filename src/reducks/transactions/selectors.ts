import { createSelector } from 'reselect';
import { State } from '../store/types';

const transactionsSelector = (state: State) => state.transactions;

export const getTransactions = createSelector(
  [transactionsSelector],
  (state) => state.transactionsList
);

export const getTransactionsMessage = createSelector(
  [transactionsSelector],
  (state) => state.noTransactionsMessage
);
