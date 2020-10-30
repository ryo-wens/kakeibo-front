import { TransactionsList } from './types';
export type transactionActions = ReturnType<
  typeof updateTransactionsAction | typeof fetchTransactions
>;

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const fetchTransactions = (
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

export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS';
export const updateTransactionsAction = (transactionsList: TransactionsList) => {
  return {
    type: UPDATE_TRANSACTIONS,
    payload: transactionsList,
  };
};
