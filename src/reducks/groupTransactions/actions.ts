import { GroupTransactionsList, GroupAccountList } from './types';

export type groupTransactionsAction = ReturnType<
  | typeof updateGroupTransactionsAction
  | typeof updateGroupLatestTransactionsAction
  | typeof fetchGroupAccountAction
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
  groupLatestTransactionsList: GroupTransactionsList
) => {
  return {
    type: UPDATE_GROUP_LATEST_TRANSACTIONS,
    payload: groupLatestTransactionsList,
  };
};

export const FETCH_GROUP_ACCOUNT = 'FETCH_GROUP_ACCOUNT';
export const fetchGroupAccountAction = (groupAccountList: GroupAccountList) => {
  return {
    type: FETCH_GROUP_ACCOUNT,
    payload: groupAccountList,
  };
};
