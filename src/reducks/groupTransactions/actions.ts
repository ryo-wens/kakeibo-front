import { GroupTransactionsList } from './types';

export const UPDATE_GROUP_TRANSACTIONS = 'UPDATE_GROUP_TRANSACTIONS';
export const updateGroupTransactionsAction = (
  groupTransactionsList: GroupTransactionsList
): { type: string; payload: GroupTransactionsList } => {
  return {
    type: UPDATE_GROUP_TRANSACTIONS,
    payload: groupTransactionsList,
  };
};
