import {
  GroupTransactionsList,
  GroupAccountList,
  GroupYearlyAccountList,
  ErrorInfo,
} from './types';

export type groupTransactionsAction = ReturnType<
  | typeof startFetchDataAction
  | typeof failedFetchDataAction
  | typeof updateGroupTransactionsAction
  | typeof updateGroupLatestTransactionsAction
  | typeof fetchGroupAccountAction
  | typeof fetchGroupYearlyAccountListAction
  | typeof addGroupAccountAction
  | typeof editGroupAccountAction
  | typeof deleteGroupAccountAction
  | typeof searchGroupTransactionsAction
>;

export const START_FETCH_DATA = 'START_FETCH_DATA';
export const startFetchDataAction = () => {
  return {
    type: START_FETCH_DATA,
    payload: {
      loading: true,
    },
  };
};

export const FAILED_FETCH_DATA = 'FAILED_FETCH_DATA';
export const failedFetchDataAction = (groupTransactionsError: ErrorInfo) => {
  return {
    type: FAILED_FETCH_DATA,
    payload: groupTransactionsError,
  };
};

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

export const FETCH_GROUP_YEARLY_ACCOUNT = 'FETCH_GROUP_YEARLY_ACCOUNT';
export const fetchGroupYearlyAccountListAction = (
  groupYearlyAccountList: GroupYearlyAccountList
) => {
  return {
    type: FETCH_GROUP_YEARLY_ACCOUNT,
    payload: {
      loading: false,
      groupYearlyAccountList: groupYearlyAccountList,
    },
  };
};

export const ADD_GROUP_ACCOUNT = 'ADD_GROUP_ACCOUNT';
export const addGroupAccountAction = (groupAccountList: GroupAccountList) => {
  return {
    type: ADD_GROUP_ACCOUNT,
    payload: groupAccountList,
  };
};

export const EDIT_GROUP_ACCOUNT = 'EDIT_GROUP_ACCOUNT';
export const editGroupAccountAction = (groupAccountList: GroupAccountList) => {
  return {
    type: EDIT_GROUP_ACCOUNT,
    payload: groupAccountList,
  };
};

export const DELETE_GROUP_ACCOUNT = 'DELETE_GROUP_ACCOUNT';
export const deleteGroupAccountAction = (
  groupAccountList: GroupAccountList,
  deletedMessage: string
) => {
  return {
    type: DELETE_GROUP_ACCOUNT,
    payload: {
      deletedMessage,
      groupAccountList,
    },
  };
};

export const SEARCH_GROUP_TRANSACTIONS = 'SEARCH_GROUP_TRANSACTIONS';
export const searchGroupTransactionsAction = (
  groupSearchTransactionsList: GroupTransactionsList,
  notHistoryMessage: string
) => {
  return {
    type: SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsList,
      notHistoryMessage,
    },
  };
};
