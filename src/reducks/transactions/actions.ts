import { Transactions } from './types';
export type transactionActions = ReturnType<typeof addTransactionsAction>;

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const addTransactionsAction = (
  transactionList: Transactions
): { type: string; payload: Transactions } => {
  return {
    type: ADD_TRANSACTIONS,
    payload: transactionList,
  };
};
