import { GroupTransactionsList } from './types';

export type groupTransactionsAction = ReturnType<typeof updateGroupTransactionsAction>;

export const UPDATE_GROUP_TRANSACTIONS = 'UPDATE_GROUP_TRANSACTIONS';
export const updateGroupTransactionsAction = (
  groupTransactionsList: GroupTransactionsList
): { type: string; payload: GroupTransactionsList } => {
  return {
    type: UPDATE_GROUP_TRANSACTIONS,
    payload: groupTransactionsList,
  };
};
