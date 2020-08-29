import { TransactionsList } from './types';
export type transactionActions = ReturnType<typeof addTransactionsAction | typeof fetchTransactions>;

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const fetchTransactions = (
  transactionsList:TransactionsList
):{type:string; payload:TransactionsList } => {
  return{
    type: FETCH_TRANSACTIONS,
    payload: transactionsList
  }
}

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const addTransactionsAction = (
  transactionList: TransactionsList
): { type: string; payload: TransactionsList } => {
  return {
    type: ADD_TRANSACTIONS,
    payload: transactionList,
  };
};

