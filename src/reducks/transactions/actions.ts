import { TransactionsList } from './types';
export type transactionActions = ReturnType<
  typeof updateTransactionsAction | typeof fetchTransactions
>;

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const fetchTransactions = (
  transactionsList: TransactionsList
): { type: string; payload: TransactionsList } => {
  return {
    type: FETCH_TRANSACTIONS,
    payload: transactionsList,
  };
};

export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS';
export const updateTransactionsAction = (
  transactionsList: TransactionsList
): { type: string; payload: TransactionsList } => {
  return {
    type: UPDATE_TRANSACTIONS,
    payload: transactionsList,
  };
};
