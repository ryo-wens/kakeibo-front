import { GroupTransactionsList } from './types';

export type groupTransactionsAction = ReturnType<
  typeof updateGroupTransactionsAction | typeof updateGroupLatestTransactionsAction
>;

export const UPDATE_GROUP_TRANSACTIONS = 'UPDATE_GROUP_TRANSACTIONS';
export const updateGroupTransactionsAction = (groupTransactionsList: GroupTransactionsList) => {
  return {
    type: UPDATE_GROUP_TRANSACTIONS,
    payload: groupTransactionsList,
  };
};

export const UPDATE_GROUP_LATEST_TRANSACTIONS = 'UPDATE_GROUP_LATEST_TRANSACTIONS';
export const updateGroupLatestTransactionsAction = (
  groupTransactionsList: GroupTransactionsList
) => {
  return {
    type: UPDATE_GROUP_LATEST_TRANSACTIONS,
    payload: groupTransactionsList,
  };
};
