import React from 'react';
import * as actionTypes from '../../src/reducks/transactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchTransactionsList,
  fetchLatestTransactionsList,
  addTransactions,
  editTransactions,
  deleteTransactions,
} from '../../src/reducks/transactions/operations';
import transactionsList from './transactions.json';
import latestTransactionsList from './latestTransactions.json';
import addResTransaction from './addResponse.json';
import addTransactionsList from './addTransactions.json';
import editResTransaction from './editResponse.json';
import editTransactionsList from './editTransactions.json';
import deleteResTransaction from './deleteReponse.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions fetchTransactionsList', () => {
  const store = mockStore({ transactionsList: [] });
  const date = new Date();
  const year = date.getFullYear();
  const month = '08';
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
        type: actionTypes.FETCH_LATEST_TRANSACTIONS,
        payload: mockResponse.transactions_list,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchLatestTransactionsList()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions addTransactions', () => {
  const store = mockStore({ transactionsList });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions`;

  beforeEach(() => {
    store.clearActions();
  });

  let now: Date;
  let spiedDate: Date;
  const originalDate = Date;
  now = new originalDate('2020-07-25T15:30:54.7772');
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

  it('Add transactionsData in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          transactionsList: transactionsList.transactions_list,
        },
      };
    };

    const mockResTransactions = addResTransaction;

    const mockTransactionsList = addTransactionsList.transactions_list;

    const expectedAddActions = [
      {
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: mockTransactionsList,
      },
    ];

    axiosMock.onPost(url).reply(201, mockResTransactions);

    await addTransactions(
      'expense',
      actual,
      'コストコ',
      null,
      2000,
      2,
      6,
      null
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedAddActions);
  });
});

describe('async actions editTransactions', () => {
  const store = mockStore({ addTransactionsList });

  let now: Date;
  let spiedDate: Date;
  const originalDate = Date;
  now = new originalDate('2020-08-09T17:00:15Z');
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

    const id = 47;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;

    const mockResTransaction = editResTransaction;

    const mockTransactionsList = editTransactionsList.transactions_list;

    const expectedEditActions = [
      {
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: mockTransactionsList,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResTransaction);

    await editTransactions(
      47,
      'expense',
      actual,
      'MIDWEST',
      'RickOwens',
      12000,
      7,
      39,
      null
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedEditActions);
  });
});

describe('async actions deleteTransactions', () => {
  const store = mockStore({ editTransactionsList });
  beforeEach(() => {
    store.clearActions();
  });

  it('Delete transactionsData in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        transactions: {
          transactionsList: editTransactionsList.transactions_list,
        },
      };
    };

    const id = 47;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;

    const mockResTransaction = deleteResTransaction.message;

    const mockTransactionsList = transactionsList.transactions_list;

    const expectedDeleteActions = [
      {
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: mockTransactionsList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResTransaction);
    window.alert = jest.fn(() => mockResTransaction);

    // @ts-ignore
    await deleteTransactions(47)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedDeleteActions);
    expect(window.alert).toHaveBeenCalled();
  });
});
