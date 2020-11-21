import React from 'react';
import * as actionTypes from '../../src/reducks/transactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { TransactionsReq } from '../../src/reducks/transactions/types';
import {
  fetchTransactionsList,
  fetchLatestTransactionsList,
  addTransactions,
  addLatestTransactions,
  editTransactions,
  editLatestTransactions,
  deleteTransactions,
  deleteLatestTransactions,
  searchTransactions,
} from '../../src/reducks/transactions/operations';
import transactionsList from './transactions.json';
import latestTransactionsList from './latestTransactions.json';
import addResTransaction from './addResponse.json';
import addTransactionsList from './addTransactions.json';
import editResTransaction from './editResponse.json';
import editTransactionsList from './editTransactions.json';
import deleteResTransaction from './deleteReponse.json';
import addLatestTransaction from './addLatestTransactions.json';
import editLatestTransaction from './editLatestTransactions.json';
import deleteTransaction from './deleteLatestTransactions.json';
import fetchResSearchTransaction from './fetchSearchTransactionsRes.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions fetchTransactionsList', () => {
  const store = mockStore({ transactionsList: [] });
  const date = new Date();
  const year = date.getFullYear();
  const month = '11';
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${year}-${month}`;

  beforeEach(() => {
    store.clearActions();
  });

  it('Get transactionsList if fetch succeeds', async () => {
    const mockResponse = transactionsList;

    const expectedAddActions = [
      {
        type: actionTypes.FETCH_TRANSACTIONS,
        payload: {
          transactionsList: mockResponse.transactions_list,
          noTransactionsMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchTransactionsList(String(year), month)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAddActions);
  });
});

describe('async actions fetchLatestTransactionsList', () => {
  const store = mockStore({ latestTransactionsList: [] });

  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`;

  beforeEach(() => {
    store.clearActions();
  });

  it('Get latestTransactionsList if fetch succeeds', async () => {
    const mockResponse = latestTransactionsList;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_LATEST_TRANSACTIONS,
        payload: mockResponse.transactions_list,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchLatestTransactionsList()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions addTransactions', () => {
  const store = mockStore({
    transactionsList: transactionsList,
    latestTransactionsList: latestTransactionsList,
  });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions`;

  beforeEach(() => {
    store.clearActions();
  });

  let now: Date;
  let spiedDate: Date;
  const originalDate = Date;
  now = new originalDate('2020-11-07T17:07:31Z');
  Date.now = jest.fn().mockReturnValue(now.valueOf());
  const actual = new Date();

  // @ts-ignore
  spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
    if (arg === 0 || arg) {
      return new originalDate();
    }
    return now;
  });

  afterAll(() => {
    // @ts-ignore
    spiedDate.mockRestore();
  });

  it('Add latestTransactionsData in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          latestTransactionsList: latestTransactionsList.transactions_list,
        },
      };
    };

    const requestData: TransactionsReq = {
      transaction_type: 'expense',
      transaction_date: actual,
      shop: 'ニトリ',
      memo: '椅子',
      amount: 9000,
      big_category_id: 3,
      medium_category_id: 16,
      custom_category_id: null,
    };

    const mockResponse = addResTransaction;

    const addedLatestTransactionsList = addLatestTransaction;

    const expectedAddActions = [
      {
        type: actionTypes.UPDATE_LATEST_TRANSACTIONS,
        payload: addedLatestTransactionsList.transactions_list,
      },
    ];

    axiosMock.onPost(url).reply(201, mockResponse);

    await addLatestTransactions(requestData)(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedAddActions);
  });
});

describe('async actions addTransactions', () => {
  const store = mockStore({
    transactionsList: transactionsList,
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('Add transactionsData in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          transactionsList: transactionsList.transactions_list,
          latestTransactionsList: addLatestTransaction.transactions_list,
        },
      };
    };

    const addedTransactionsList = addTransactionsList;

    const expectedAddActions = [
      {
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: addedTransactionsList.transactions_list,
      },
    ];

    await addTransactions()(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedAddActions);
  });
});

describe('async actions editTransactions', () => {
  const store = mockStore({
    transactionsList: addTransactionsList,
    latestTransactionsList: addLatestTransaction,
  });

  let now: Date;
  let spiedDate: Date;
  const originalDate = Date;
  now = new originalDate('2020-07-26T17:00:15Z');
  Date.now = jest.fn().mockReturnValue(now.valueOf());
  const actual = new Date();

  // @ts-ignore
  spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
    if (arg === 0 || arg) {
      return new originalDate();
    }
    return now;
  });

  afterAll(() => {
    // @ts-ignore
    spiedDate.mockRestore();
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('Edit transactionsData in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          transactionsList: addTransactionsList.transactions_list,
        },
      };
    };

    const id = 130;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;

    const mockResTransaction = editResTransaction;

    const editedTransactionsList = editTransactionsList;

    const requestData: TransactionsReq = {
      transaction_type: 'expense',
      transaction_date: actual,
      shop: 'ビッグカメラ',
      memo: 'コーヒーメーカー',
      amount: 25000,
      big_category_id: 3,
      medium_category_id: 17,
      custom_category_id: null,
    };

    const expectedEditActions = [
      {
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: editedTransactionsList.transactions_list,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResTransaction);

    await editTransactions(130, requestData)(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedEditActions);
  });
});

describe('async actions editLatestTransactions', () => {
  const store = mockStore({
    latestTransactionsList: addLatestTransaction,
  });

  let now: Date;
  let spiedDate: Date;
  const originalDate = Date;
  now = new originalDate('2020-11-07T17:24:02Z');
  Date.now = jest.fn().mockReturnValue(now.valueOf());
  const actual = new Date();

  // @ts-ignore
  spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
    if (arg === 0 || arg) {
      return new originalDate();
    }
    return now;
  });

  afterAll(() => {
    // @ts-ignore
    spiedDate.mockRestore();
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('Edit latestTransaction in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          latestTransactionsList: addLatestTransaction.transactions_list,
        },
      };
    };

    const id = 130;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;

    const mockResponse = editResTransaction;

    const editedLatestTransactions = editLatestTransaction;

    const requestData: TransactionsReq = {
      transaction_type: 'expense',
      transaction_date: actual,
      shop: 'ビッグカメラ',
      memo: 'コーヒーメーカー',
      amount: 25000,
      big_category_id: 3,
      medium_category_id: 17,
      custom_category_id: null,
    };

    const expectedEditActions = [
      {
        type: actionTypes.UPDATE_LATEST_TRANSACTIONS,
        payload: editedLatestTransactions.transactions_list,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editLatestTransactions(130, requestData)(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedEditActions);
  });
});

describe('async actions deleteTransactions', () => {
  const store = mockStore({
    transactionsList: editTransactionsList,
    latestTransactionsList: editLatestTransaction,
  });
  beforeEach(() => {
    store.clearActions();
  });

  it('Delete transaction in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          transactionsList: editTransactionsList.transactions_list,
        },
      };
    };

    const id = 130;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;

    const mockResponseMessage = deleteResTransaction.message;

    const deletedTransactionsList = transactionsList.transactions_list;

    const expectedDeleteActions = [
      {
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: deletedTransactionsList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponseMessage);
    window.alert = jest.fn(() => mockResponseMessage);

    // @ts-ignore
    await deleteTransactions(130)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedDeleteActions);
    expect(window.alert).toHaveBeenCalled();
  });
});

describe('async actions deleteLatestTransactions', () => {
  const store = mockStore({
    latestTransactionsList: editLatestTransaction,
  });
  beforeEach(() => {
    store.clearActions();
  });

  it('Delete latestTransaction in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          latestTransactionsList: editLatestTransaction.transactions_list,
        },
      };
    };

    const id = 130;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;

    const mockResponseMessage = deleteResTransaction.message;

    const deletedLatestTransactionsList = deleteTransaction;

    const expectedDeleteActions = [
      {
        type: actionTypes.UPDATE_LATEST_TRANSACTIONS,
        payload: deletedLatestTransactionsList.transactions_list,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponseMessage);

    // @ts-ignore
    await deleteLatestTransactions(130)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedDeleteActions);
  });
});

it('Get transactionsList  search criteria match in  if fetch succeeds', async () => {
  const store = mockStore({
    transactions: {
      searchTransactionsList: [],
    },
  });
  beforeEach(() => {
    store.clearActions();
  });

  const args = {
    transaction_type: 'expense',
    low_amount: 2000,
    high_amount: 10000,
    big_category_id: 2,
    sort: 'transaction_date',
  };

  // const params = {
  //   transaction_type: 'expense',
  //   low_amount: 2000,
  //   high_amount: 10000,
  //   big_category_id: 2,
  //   sort: 'transaction_date',
  // };

  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/search?`;

  const mockResponse = fetchResSearchTransaction;

  const expectSearchActions = [
    {
      type: actionTypes.SEARCH_TRANSACTIONS,
      payload: mockResponse,
    },
  ];

  axiosMock.onGet(url).reply(200, mockResponse);

  await searchTransactions(args)(store.dispatch);
  expect(store.getActions()).toEqual(expectSearchActions);
});
