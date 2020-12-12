import { createSelector } from 'reselect';
import { State } from '../store/types';

const groupTransactionsSelector = (state: State) => state.groupTransactions;

export const getGroupTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupTransactionsList
);

export const getGroupLatestTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupLatestTransactionsList
);

export const getGroupAccountList = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupAccountList
);

export const getDeleteAccountMessage = createSelector(
  [groupTransactionsSelector],
  (state) => state.deletedMessage
);

export const getSearchGroupTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupSearchTransactionsList
);

export const getNotHistoryMessage = createSelector(
  [groupTransactionsSelector],
  (state) => state.notAccountMessage
);
