import { createSelector } from 'reselect';
import { State } from '../store/types';

const transactionsSelector = (state: State) => state.transactions;

export const getTransactions = createSelector(
  [transactionsSelector],
  (state) => state.transactionsList
);

export const getLatestTransactions = createSelector(
  [transactionsSelector],
  (state) => state.latestTransactionsList
);

export const getTransactionsMessage = createSelector(
  [transactionsSelector],
  (state) => state.noTransactionsMessage
);

export const getSearchTransactions = createSelector(
  [transactionsSelector],
  (state) => state.searchTransactionsList
);

export const notHistoryMessage = createSelector(
  [transactionsSelector],
  (state) => state.notHistoryMessage
);
