import { TransactionsList } from './types';
export type transactionActions = ReturnType<
  | typeof updateTransactionsAction
  | typeof fetchTransactionsActions
  | typeof updateLatestTransactionsActions
  | typeof searchTransactionsActions
>;

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const fetchTransactionsActions = (
  transactionsList: TransactionsList,
  noTransactionsMessage: string
) => {
  return {
    type: FETCH_TRANSACTIONS,
    payload: {
      transactionsList,
      noTransactionsMessage,
    },
  };
};

export const UPDATE_LATEST_TRANSACTIONS = 'UPDATE_LATEST_TRANSACTIONS';
export const updateLatestTransactionsActions = (latestTransactionsList: TransactionsList) => {
  return {
    type: UPDATE_LATEST_TRANSACTIONS,
    payload: latestTransactionsList,
  };
};

export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS';
export const updateTransactionsAction = (transactionsList: TransactionsList) => {
  return {
    type: UPDATE_TRANSACTIONS,
    payload: transactionsList,
  };
};

export const SEARCH_TRANSACTIONS = 'SEARCH_TRANSACTIONS';
export const searchTransactionsActions = (
  searchTransactionsList: TransactionsList,
  notHistoryMessage: string
) => {
  return {
    type: SEARCH_TRANSACTIONS,
    payload: {
      searchTransactionsList,
      notHistoryMessage,
    },
  };
};
