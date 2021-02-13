import { TransactionsList } from './types';
export type transactionActions = ReturnType<
  | typeof fetchTransactionsActions
  | typeof fetchLatestTransactionsActions
  | typeof addTransactionsAction
  | typeof editTransactionsAction
  | typeof deleteTransactionsAction
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

export const FETCH_LATEST_TRANSACTIONS = 'FETCH_LATEST_TRANSACTIONS';
export const fetchLatestTransactionsActions = (latestTransactionsList: TransactionsList) => {
  return {
    type: FETCH_LATEST_TRANSACTIONS,
    payload: {
      latestTransactionsList: latestTransactionsList,
    },
  };
};

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const addTransactionsAction = (
  transactionsList: TransactionsList,
  latestTransactionsList: TransactionsList
) => {
  return {
    type: ADD_TRANSACTIONS,
    payload: {
      transactionsList: transactionsList,
      latestTransactionsList: latestTransactionsList,
    },
  };
};

export const EDIT_TRANSACTIONS = 'EDIT_TRANSACTIONS';
export const editTransactionsAction = (
  transactionsList: TransactionsList,
  latestTransactionsList: TransactionsList
) => {
  return {
    type: EDIT_TRANSACTIONS,
    payload: {
      transactionsList: transactionsList,
      latestTransactionsList: latestTransactionsList,
    },
  };
};

export const DELETE_TRANSACTIONS = 'DELETE_TRANSACTIONS';
export const deleteTransactionsAction = (
  transactionsList: TransactionsList,
  latestTransactionsList: TransactionsList
) => {
  return {
    type: DELETE_TRANSACTIONS,
    payload: {
      transactionsList: transactionsList,
      latestTransactionsList: latestTransactionsList,
    },
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
