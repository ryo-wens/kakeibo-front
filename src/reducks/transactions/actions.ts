import { Transactions } from './types';
export type transactionActions = ReturnType<typeof addTransactionsAction | typeof fetchTransactions>;

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const fetchTransactions = (
  transactionsList:Transactions
):{type:string; payload:Transactions } => {
  return{
    type: FETCH_TRANSACTIONS,
    payload: transactionsList
  }
}

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const addTransactionsAction = (
  transactionList: Transactions
): { type: string; payload: Transactions } => {
  return {
    type: ADD_TRANSACTIONS,
    payload: transactionList,
  };
};

