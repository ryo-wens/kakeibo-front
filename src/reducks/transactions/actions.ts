import { TransactionsList } from './types';
export type transactionActions = ReturnType<
  | typeof startFetchTransactionsActions
  | typeof fetchTransactionsActions
  | typeof cancelFetchTransactionsActions
  | typeof failedFetchTransactionsActions
  | typeof startFetchLatestTransactionsActions
  | typeof fetchLatestTransactionsActions
  | typeof cancelFetchLatestTransactionsActions
  | typeof failedFetchLatestTransactionsActions
  | typeof startAddTransactionsActions
  | typeof addTransactionsActions
  | typeof failedAddTransactionsActions
  | typeof startEditTransactionsActions
  | typeof editTransactionsActions
  | typeof failedEditTransactionsActions
  | typeof startDeleteTransactionsActions
  | typeof deleteTransactionsActions
  | typeof failedDeleteTransactionsActions
  | typeof startSearchTransactionsActions
  | typeof searchTransactionsActions
  | typeof failedSearchTransactionsActions
>;

export const START_FETCH_TRANSACTIONS = 'START_FETCH_TRANSACTIONS';
export const startFetchTransactionsActions = () => {
  return {
    type: START_FETCH_TRANSACTIONS,
    payload: {
      transactionsListLoading: true,

      transactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const fetchTransactionsActions = (
  transactionsList: TransactionsList,
  noTransactionsMessage: string
) => {
  return {
    type: FETCH_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      transactionsList: transactionsList,
      noTransactionsMessage: noTransactionsMessage,
    },
  };
};

export const CANCEL_FETCH_TRANSACTIONS = 'CANCEL_FETCH_TRANSACTIONS';
export const cancelFetchTransactionsActions = () => {
  return {
    type: CANCEL_FETCH_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
    },
  };
};

export const FAILED_FETCH_TRANSACTIONS = 'FAILED_FETCH_TRANSACTIONS';
export const failedFetchTransactionsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      transactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_LATEST_TRANSACTIONS = 'START_FETCH_LATEST_TRANSACTIONS';
export const startFetchLatestTransactionsActions = () => {
  return {
    type: START_FETCH_LATEST_TRANSACTIONS,
    payload: {
      latestTransactionsListLoading: true,

      latestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_LATEST_TRANSACTIONS = 'FETCH_LATEST_TRANSACTIONS';
export const fetchLatestTransactionsActions = (latestTransactionsList: TransactionsList) => {
  return {
    type: FETCH_LATEST_TRANSACTIONS,
    payload: {
      latestTransactionsListLoading: false,
      latestTransactionsList: latestTransactionsList,
    },
  };
};

export const CANCEL_FETCH_LATEST_TRANSACTIONS = 'CANCEL_FETCH_LATEST_TRANSACTIONS';
export const cancelFetchLatestTransactionsActions = () => {
  return {
    type: CANCEL_FETCH_LATEST_TRANSACTIONS,
    payload: {
      latestTransactionsListLoading: false,
    },
  };
};

export const FAILED_FETCH_LATEST_TRANSACTIONS = 'FAILED_FETCH_LATEST_TRANSACTIONS';
export const failedFetchLatestTransactionsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_LATEST_TRANSACTIONS,
    payload: {
      latestTransactionsListLoading: false,
      latestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_TRANSACTIONS = 'START_ADD_TRANSACTIONS';
export const startAddTransactionsActions = () => {
  return {
    type: START_ADD_TRANSACTIONS,
    payload: {
      transactionsListLoading: true,
      latestTransactionsListLoading: true,

      transactionsListError: {
        statusCode: null,
        errorMessage: '',
      },

      latestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const addTransactionsActions = (
  transactionsList: TransactionsList,
  latestTransactionsList: TransactionsList
) => {
  return {
    type: ADD_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      latestTransactionsListLoading: false,
      transactionsList: transactionsList,
      latestTransactionsList: latestTransactionsList,
    },
  };
};

export const FAILED_ADD_TRANSACTIONS = 'FAILED_ADD_TRANSACTIONS';
export const failedAddTransactionsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      latestTransactionsListLoading: false,

      transactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },

      latestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_TRANSACTIONS = 'START_EDIT_TRANSACTIONS';
export const startEditTransactionsActions = () => {
  return {
    type: START_EDIT_TRANSACTIONS,
    payload: {
      transactionsListLoading: true,
      latestTransactionsListLoading: true,

      transactionsListError: {
        statusCode: null,
        errorMessage: '',
      },

      latestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_TRANSACTIONS = 'EDIT_TRANSACTIONS';
export const editTransactionsActions = (
  transactionsList: TransactionsList,
  latestTransactionsList: TransactionsList
) => {
  return {
    type: EDIT_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      latestTransactionsListLoading: false,
      transactionsList: transactionsList,
      latestTransactionsList: latestTransactionsList,
    },
  };
};

export const FAILED_EDIT_TRANSACTIONS = 'FAILED_EDIT_TRANSACTIONS';
export const failedEditTransactionsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      latestTransactionsListLoading: false,

      transactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },

      latestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_TRANSACTIONS = 'START_DELETE_TRANSACTIONS';
export const startDeleteTransactionsActions = () => {
  return {
    type: START_DELETE_TRANSACTIONS,
    payload: {
      transactionsListLoading: true,
      latestTransactionsListLoading: true,

      transactionsListError: {
        statusCode: null,
        errorMessage: '',
      },

      latestTransactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const DELETE_TRANSACTIONS = 'DELETE_TRANSACTIONS';
export const deleteTransactionsActions = (
  transactionsList: TransactionsList,
  latestTransactionsList: TransactionsList
) => {
  return {
    type: DELETE_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      latestTransactionsListLoading: false,
      transactionsList: transactionsList,
      latestTransactionsList: latestTransactionsList,
    },
  };
};

export const FAILED_DELETE_TRANSACTIONS = 'FAILED_DELETE_TRANSACTIONS';
export const failedDeleteTransactionsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_TRANSACTIONS,
    payload: {
      transactionsListLoading: false,
      latestTransactionsListLoading: false,

      transactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },

      latestTransactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_SEARCH_TRANSACTIONS = 'START_SEARCH_TRANSACTIONS';
export const startSearchTransactionsActions = () => {
  return {
    type: START_SEARCH_TRANSACTIONS,
    payload: {
      searchTransactionsListLoading: true,

      transactionsListError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const SEARCH_TRANSACTIONS = 'SEARCH_TRANSACTIONS';
export const searchTransactionsActions = (
  searchTransactionsList: TransactionsList,
  notHistoryMessage: string
) => {
  return {
    type: SEARCH_TRANSACTIONS,
    payload: {
      searchTransactionsListLoading: false,
      searchTransactionsList: searchTransactionsList,
      notHistoryMessage: notHistoryMessage,
    },
  };
};

export const FAILED_SEARCH_TRANSACTIONS = 'FAILED_SEARCH_TRANSACTIONS';
export const failedSearchTransactionsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_SEARCH_TRANSACTIONS,
    payload: {
      searchTransactionsListLoading: false,

      transactionsListError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
