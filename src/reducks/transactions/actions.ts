import { TransactionsList } from './types';
export type transactionActions = ReturnType<
  | typeof updateTransactionsAction
  | typeof fetchTransactionsActions
  | typeof fetchLatestTransactionsActions
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
