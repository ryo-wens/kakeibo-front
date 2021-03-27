import { GroupTransactionsList, GroupAccountList, GroupYearlyAccountList } from './types';

export type groupTransactionsAction = ReturnType<
  | typeof startFetchGroupTransactionsAction
  | typeof fetchGroupTransactionsAction
  | typeof cancelFetchTransactionsAction
  | typeof failedFetchGroupTransactionsAction
  | typeof startFetchGroupLatestTransactionsAction
  | typeof fetchGroupLatestTransactionsAction
  | typeof cancelFetchGroupLatestTransactionsAction
  | typeof failedFetchGroupLatestTransactionsAction
  | typeof startAddGroupTransactionsAction
  | typeof addGroupTransactionsAction
  | typeof failedAddGroupTransactionsAction
  | typeof startEditGroupTransactionsAction
  | typeof editGroupTransactionsAction
  | typeof failedEditGroupTransactionsAction
  | typeof startDeleteGroupTransactionsAction
  | typeof deleteGroupTransactionsAction
  | typeof failedDeleteGroupTransactionsAction
  | typeof startFetchGroupAccountAction
  | typeof fetchGroupAccountAction
  | typeof cancelFetchGroupAccountAction
  | typeof failedFetchGroupAccountAction
  | typeof startFetchGroupYearlyAccountList
  | typeof fetchGroupYearlyAccountListAction
  | typeof cancelFetchGroupYearlyAccountList
  | typeof failedFetchGroupYearlyAccountList
  | typeof startFetchYearlyAccountListForModalAction
  | typeof fetchYearlyAccountListForModalAction
  | typeof cancelFetchYearlyAccountListForModalAction
  | typeof failedFetchYearlyAccountListForModalAction
  | typeof startAddGroupAccountAction
  | typeof addGroupAccountAction
  | typeof failedAddGroupAccountAction
  | typeof startEditGroupAccountAction
  | typeof editGroupAccountAction
  | typeof failedEditGroupAccountAction
  | typeof startDeleteGroupAccountAction
  | typeof deleteGroupAccountAction
  | typeof failedDeleteGroupAccountAction
  | typeof startSearchGroupTransactionsAction
  | typeof searchGroupTransactionsAction
  | typeof cancelSearchGroupTransactionsAction
  | typeof failedSearchGroupTransactionsAction
  | typeof startEditSearchGroupTransactionsAction
  | typeof searchEditGroupTransactionsAction
  | typeof failedEditSearchGroupTransactionsAction
  | typeof startDeleteSearchGroupTransactionsAction
  | typeof searchDeleteGroupTransactionsAction
  | typeof failedDeleteSearchGroupTransactionsAction
>;

export const START_FETCH_GROUP_TRANSACTIONS = 'START_FETCH_GROUP_TRANSACTIONS';
export const startFetchGroupTransactionsAction = () => {
  return {
    type: START_FETCH_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: true,

      groupTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_GROUP_TRANSACTIONS = 'FETCH_GROUP_TRANSACTIONS';
export const fetchGroupTransactionsAction = (groupTransactionsList: GroupTransactionsList) => {
  return {
    type: FETCH_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
      groupTransactionsList: groupTransactionsList,
    },
  };
};

export const CANCEL_FETCH_GROUP_TRANSACTIONS = 'CANCEL_FETCH_GROUP_TRANSACTIONS';
export const cancelFetchTransactionsAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TRANSACTIONS = 'FAILED_FETCH_GROUP_TRANSACTIONS';
export const failedFetchGroupTransactionsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_LATEST_TRANSACTIONS = 'START_FETCH_GROUP_LATEST_TRANSACTIONS';
export const startFetchGroupLatestTransactionsAction = () => {
  return {
    type: START_FETCH_GROUP_LATEST_TRANSACTIONS,
    payload: {
      groupLatestTransactionsListLoading: true,

      groupLatestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_GROUP_LATEST_TRANSACTIONS = 'FETCH_GROUP_LATEST_TRANSACTIONS';
export const fetchGroupLatestTransactionsAction = (
  groupLatestTransactionsList: GroupTransactionsList
) => {
  return {
    type: FETCH_GROUP_LATEST_TRANSACTIONS,
    payload: {
      groupLatestTransactionsListLoading: false,
      groupLatestTransactionsList: groupLatestTransactionsList,
    },
  };
};

export const CANCEL_FETCH_GROUP_LATEST_TRANSACTIONS = 'CANCEL_FETCH_GROUP_LATEST_TRANSACTIONS';
export const cancelFetchGroupLatestTransactionsAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_LATEST_TRANSACTIONS,
    payload: {
      groupLatestTransactionsListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_LATEST_TRANSACTIONS = 'FAILED_FETCH_GROUP_LATEST_TRANSACTIONS';
export const failedFetchGroupLatestTransactionsAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_LATEST_TRANSACTIONS,
    payload: {
      groupLatestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_GROUP_TRANSACTIONS = 'START_ADD_GROUP_TRANSACTIONS';
export const startAddGroupTransactionsAction = () => {
  return {
    type: START_ADD_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: true,
      groupLatestTransactionsListLoading: true,

      groupTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },

      groupLatestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const ADD_GROUP_TRANSACTIONS = 'ADD_GROUP_TRANSACTIONS';
export const addGroupTransactionsAction = (
  groupTransactionsList: GroupTransactionsList,
  groupLatestTransactionsList: GroupTransactionsList
) => {
  return {
    type: ADD_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
      groupTransactionsList: groupTransactionsList,
      groupLatestTransactionsListLoading: false,
      groupLatestTransactionsList: groupLatestTransactionsList,
    },
  };
};

export const FAILED_ADD_GROUP_TRANSACTIONS = 'FAILED_ADD_GROUP_TRANSACTIONS';
export const failedAddGroupTransactionsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
      groupTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
      groupLatestTransactionsListLoading: false,
      groupLatestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_TRANSACTIONS = 'START_EDIT_GROUP_TRANSACTIONS';
export const startEditGroupTransactionsAction = () => {
  return {
    type: START_EDIT_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: true,
      groupLatestTransactionsListLoading: true,

      groupTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },

      groupLatestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_GROUP_TRANSACTIONS = 'EDIT_GROUP_TRANSACTIONS';
export const editGroupTransactionsAction = (
  groupTransactionsList: GroupTransactionsList,
  groupLatestTransactionsList: GroupTransactionsList
) => {
  return {
    type: EDIT_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
      groupTransactionsList: groupTransactionsList,
      groupLatestTransactionsListLoading: false,
      groupLatestTransactionsList: groupLatestTransactionsList,
    },
  };
};

export const FAILED_EDIT_GROUP_TRANSACTIONS = 'FAILED_EDIT_GROUP_TRANSACTIONS';
export const failedEditGroupTransactionsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
      groupTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
      groupLatestTransactionsListLoading: false,
      groupLatestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_TRANSACTIONS = 'START_DELETE_GROUP_TRANSACTIONS';
export const startDeleteGroupTransactionsAction = () => {
  return {
    type: START_DELETE_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: true,
      groupLatestTransactionsListLoading: true,

      groupTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },

      groupLatestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const DELETE_GROUP_TRANSACTIONS = 'DELETE_GROUP_TRANSACTIONS';
export const deleteGroupTransactionsAction = (
  groupTransactionsList: GroupTransactionsList,
  groupLatestTransactionsList: GroupTransactionsList
) => {
  return {
    type: DELETE_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
      groupTransactionsList: groupTransactionsList,
      groupLatestTransactionsListLoading: false,
      groupLatestTransactionsList: groupLatestTransactionsList,
    },
  };
};

export const FAILED_DELETE_GROUP_TRANSACTIONS = 'FAILED_DELETE_GROUP_TRANSACTIONS';
export const failedDeleteGroupTransactionsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_GROUP_TRANSACTIONS,
    payload: {
      groupTransactionsListLoading: false,
      groupTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
      groupLatestTransactionsListLoading: false,
      groupLatestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_ACCOUNT = 'START_FETCH_GROUP_ACCOUNT';
export const startFetchGroupAccountAction = () => {
  return {
    type: START_FETCH_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: true,
    },
  };
};

export const FETCH_GROUP_ACCOUNT = 'FETCH_GROUP_ACCOUNT';
export const fetchGroupAccountAction = (groupAccountList: GroupAccountList) => {
  return {
    type: FETCH_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
      groupAccountList: groupAccountList,
    },
  };
};

export const CANCEL_FETCH_GROUP_ACCOUNT = 'CANCEL_FETCH_GROUP_ACCOUNT';
export const cancelFetchGroupAccountAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_ACCOUNT = 'FAILED_FETCH_GROUP_ACCOUNT';
export const failedFetchGroupAccountAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
      groupAccountListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_YEARLY_ACCOUNT = 'START_FETCH_GROUP_YEARLY_ACCOUNT';
export const startFetchGroupYearlyAccountList = () => {
  return {
    type: START_FETCH_GROUP_YEARLY_ACCOUNT,
    payload: {
      groupYearlyAccountListLoading: true,
    },
  };
};

export const FETCH_GROUP_YEARLY_ACCOUNT = 'FETCH_GROUP_YEARLY_ACCOUNT';
export const fetchGroupYearlyAccountListAction = (
  groupYearlyAccountList: GroupYearlyAccountList
) => {
  return {
    type: FETCH_GROUP_YEARLY_ACCOUNT,
    payload: {
      groupYearlyAccountListLoading: false,
      groupYearlyAccountList: groupYearlyAccountList,
    },
  };
};

export const CANCEL_FETCH_GROUP_YEARLY_ACCOUNT = 'CANCEL_FETCH_GROUP_YEARLY_ACCOUNT';
export const cancelFetchGroupYearlyAccountList = () => {
  return {
    type: CANCEL_FETCH_GROUP_YEARLY_ACCOUNT,
    payload: {
      groupYearlyAccountListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_YEARLY_ACCOUNT = 'FAILED_FETCH_GROUP_YEARLY_ACCOUNT';
export const failedFetchGroupYearlyAccountList = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_YEARLY_ACCOUNT,
    payload: {
      groupYearlyAccountListLoading: false,
      groupYearlyAccountListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_YEARLY_ACCOUNT_MODAL = 'START_FETCH_YEARLY_ACCOUNT_MODAL';
export const startFetchYearlyAccountListForModalAction = () => {
  return {
    type: START_FETCH_YEARLY_ACCOUNT_MODAL,
    payload: {
      groupYearlyAccountListForModalLoading: true,
    },
  };
};

export const FETCH_YEARLY_ACCOUNT_MODAL = 'FETCH_YEARLY_ACCOUNT_MODAL';
export const fetchYearlyAccountListForModalAction = (
  groupYearlyAccountListForModal: GroupYearlyAccountList
) => {
  return {
    type: FETCH_YEARLY_ACCOUNT_MODAL,
    payload: {
      groupYearlyAccountListForModalLoading: false,
      groupYearlyAccountListForModal: groupYearlyAccountListForModal,
    },
  };
};

export const CANCEL_FETCH_YEARLY_ACCOUNT_MODAL = 'CANCEL_FETCH_YEARLY_ACCOUNT_MODAL';
export const cancelFetchYearlyAccountListForModalAction = () => {
  return {
    type: CANCEL_FETCH_YEARLY_ACCOUNT_MODAL,
    payload: {
      groupYearlyAccountListForModalLoading: false,
    },
  };
};

export const FAILED_FETCH_YEARLY_ACCOUNT_MODAL = 'FAILED_FETCH_YEARLY_ACCOUNT_MODAL';
export const failedFetchYearlyAccountListForModalAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_YEARLY_ACCOUNT_MODAL,
    payload: {
      groupYearlyAccountListForModalLoading: false,
      groupYearlyAccountListForModalError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_GROUP_ACCOUNT = 'START_ADD_GROUP_ACCOUNT';
export const startAddGroupAccountAction = () => {
  return {
    type: START_ADD_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: true,
      groupYearlyAccountListLoading: true,

      groupAccountListError: {
        statusCode: null,
        errorMessage: '',
      },

      groupYearlyAccountListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const ADD_GROUP_ACCOUNT = 'ADD_GROUP_ACCOUNT';
export const addGroupAccountAction = (
  groupYearlyAccountList: GroupYearlyAccountList,
  groupAccountList: GroupAccountList
) => {
  return {
    type: ADD_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
      groupAccountList: groupAccountList,
      groupYearlyAccountListLoading: false,
      groupYearlyAccountList: groupYearlyAccountList,
    },
  };
};

export const FAILED_ADD_GROUP_ACCOUNT = 'FAILED_ADD_GROUP_ACCOUNT';
export const failedAddGroupAccountAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
      groupAccountListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
      groupYearlyAccountListLoading: false,
      groupYearlyAccountListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_ACCOUNT = 'START_EDIT_GROUP_ACCOUNT';
export const startEditGroupAccountAction = () => {
  return {
    type: START_EDIT_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: true,

      groupAccountListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_GROUP_ACCOUNT = 'EDIT_GROUP_ACCOUNT';
export const editGroupAccountAction = (groupAccountList: GroupAccountList) => {
  return {
    type: EDIT_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
      groupAccountList: groupAccountList,
    },
  };
};

export const FAILED_EDIT_GROUP_ACCOUNT = 'FAILED_EDIT_GROUP_ACCOUNT';
export const failedEditGroupAccountAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
      groupAccountListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_ACCOUNT = 'START_DELETE_GROUP_ACCOUNT';
export const startDeleteGroupAccountAction = () => {
  return {
    type: START_DELETE_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: true,
      groupYearlyAccountListLoading: true,

      groupAccountListError: {
        statusCode: null,
        errorMessage: '',
      },

      groupYearlyAccountListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const DELETE_GROUP_ACCOUNT = 'DELETE_GROUP_ACCOUNT';
export const deleteGroupAccountAction = (
  groupAccountList: GroupAccountList,
  groupYearlyAccountList: GroupYearlyAccountList,
  deletedMessage: string
) => {
  return {
    type: DELETE_GROUP_ACCOUNT,
    payload: {
      deletedMessage: deletedMessage,
      groupAccountListLoading: false,
      groupAccountList: groupAccountList,
      groupYearlyAccountListLoading: false,
      groupYearlyAccountList: groupYearlyAccountList,
    },
  };
};

export const FAILED_DELETE_GROUP_ACCOUNT = 'FAILED_DELETE_GROUP_ACCOUNT';
export const failedDeleteGroupAccountAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_GROUP_ACCOUNT,
    payload: {
      groupAccountListLoading: false,
      groupAccountListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
      groupYearlyAccountListLoading: false,
      groupYearlyAccountListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_SEARCH_GROUP_TRANSACTIONS = 'START_SEARCH_GROUP_TRANSACTIONS';
export const startSearchGroupTransactionsAction = () => {
  return {
    type: START_SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: true,

      groupSearchTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
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
      groupSearchTransactionsListLoading: false,
      groupSearchTransactionsList: groupSearchTransactionsList,
      notHistoryMessage: notHistoryMessage,
    },
  };
};

export const CANCEL_SEARCH_GROUP_TRANSACTIONS = 'CANCEL_SEARCH_GROUP_TRANSACTIONS';
export const cancelSearchGroupTransactionsAction = () => {
  return {
    type: CANCEL_SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: false,
    },
  };
};

export const FAILED_SEARCH_GROUP_TRANSACTIONS = 'FAILED_SEARCH_GROUP_TRANSACTIONS';
export const failedSearchGroupTransactionsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: true,
      groupSearchTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_SEARCH_GROUP_TRANSACTIONS = 'START_EDIT_SEARCH_GROUP_TRANSACTIONS';
export const startEditSearchGroupTransactionsAction = () => {
  return {
    type: START_EDIT_SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: true,

      groupSearchTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const SEARCH_EDIT_GROUP_TRANSACTIONS = 'SEARCH_EDIT_GROUP_TRANSACTIONS';
export const searchEditGroupTransactionsAction = (
  groupSearchTransactionsList: GroupTransactionsList,
  notHistoryMessage: string
) => {
  return {
    type: SEARCH_EDIT_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: false,
      groupSearchTransactionsList: groupSearchTransactionsList,
      notHistoryMessage: notHistoryMessage,
    },
  };
};

export const FAILED_EDIT_SEARCH_GROUP_TRANSACTIONS = 'FAILED_EDIT_SEARCH_GROUP_TRANSACTIONS';
export const failedEditSearchGroupTransactionsAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_EDIT_SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: true,
      groupSearchTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_SEARCH_GROUP_TRANSACTIONS = 'START_DELETE_SEARCH_GROUP_TRANSACTIONS';
export const startDeleteSearchGroupTransactionsAction = () => {
  return {
    type: START_DELETE_SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: true,

      groupSearchTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const SEARCH_DELETE_GROUP_TRANSACTIONS = 'SEARCH_DELETE_GROUP_TRANSACTIONS';
export const searchDeleteGroupTransactionsAction = (
  groupSearchTransactionsList: GroupTransactionsList,
  notHistoryMessage: string
) => {
  return {
    type: SEARCH_DELETE_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: false,
      groupSearchTransactionsList: groupSearchTransactionsList,
      notHistoryMessage: notHistoryMessage,
    },
  };
};

export const FAILED_DELETE_SEARCH_GROUP_TRANSACTIONS = 'FAILED_DELETE_SEARCH_GROUP_TRANSACTIONS';
export const failedDeleteSearchGroupTransactionsAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_DELETE_SEARCH_GROUP_TRANSACTIONS,
    payload: {
      groupSearchTransactionsListLoading: true,
      groupSearchTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
