import React from 'react';
import * as actionTypes from '../../src/reducks/groupTransactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  addGroupTransactions,
  fetchGroupTransactionsList,
  editGroupTransactions,
  deleteGroupTransactions,
} from '../../src/reducks/groupTransactions/operations';
import groupTransactions from './groupTransactions.json';
import addGroupTransaction from './addGroupTransactions.json';
import addedGroupTransactions from './addedGroupTransactions.json';
import editGroupTransaction from './editGroupTransactionResponse.json';
import editedGroupTransaction from './editedGroupTransactions.json';
import deletedGroupTransaction from './deleteGroupTransaction.json';
import { year, customMonth } from '../../src/lib/constant';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions fetchGroupTransactionsList', () => {
  const store = mockStore({ groupTransactions: { groupTransactionsList: [] } });

  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}`;

  beforeEach(() => {
    store.clearActions();
  });

  it('Get groupTransactionsList if fetch succeeds', async () => {
    const mockResponse = groupTransactions;

    const expectedAddActions = [
      {
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockResponse.transactions_list,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupTransactionsList(year, customMonth, groupId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAddActions);
  });
});

describe('async actions addGroupTransactions', () => {
  const store = mockStore({ groupTransactions });

  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions`;

  beforeEach(() => {
    store.clearActions();
  });

  let now: Date;
  let spiedDate: Date;
  const originalDate = Date;
  now = new originalDate('2020-10-25T15:55:50.7772');
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

  it('Add GroupTransactionsData in groupTransactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupTransactions: {
          groupTransactionsList: groupTransactions.transactions_list,
        },
      };
    };

    const payment_user_id = 'suzuki';

    const mockResponse = addGroupTransaction;

    const mockGroupTransactionsList = addedGroupTransactions.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockGroupTransactionsList,
      },
    ];

    axiosMock.onPost(url).reply(201, mockResponse);

    await addGroupTransactions(
      'expense',
      actual,
      'ビックカメラ',
      'コーヒーメーカー',
      17000,
      payment_user_id,
      3,
      17,
      null
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions editGroupTransactions', () => {
  const store = mockStore({ addedGroupTransactions });

  let now: Date;
  let spiedDate: Date;
  const originalDate = Date;
  now = new originalDate('2020-10-25T17:50:50Z');
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

  it('Edit groupTransactionsData in groupTransactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupTransactions: {
          groupTransactionsList: addedGroupTransactions.transactions_list,
        },
      };
    };

    const id = 16;
    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;

    const payment_user_id = 'suzuki';

    const mockResponse = editGroupTransaction;

    const mockGroupTransactionsList = editedGroupTransaction.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockGroupTransactionsList,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editGroupTransactions(
      16,
      'expense',
      actual,
      '虎視淡々',
      'お疲れ会',
      25000,
      payment_user_id,
      5,
      29,
      null
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions deleteGroupTransactions', () => {
  const store = mockStore({ editedGroupTransaction });
  beforeEach(() => {
    store.clearActions();
  });

  it('Delete groupTransactionsData in transactionsList if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupTransactions: {
          groupTransactionsList: editedGroupTransaction.transactions_list,
        },
      };
    };

    const id = 16;
    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;

    const mockResponse = deletedGroupTransaction.message;

    const mockDeletedGroupTransactionsList = groupTransactions.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockDeletedGroupTransactionsList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);
    window.alert = jest.fn(() => mockResponse);

    // @ts-ignore
    await deleteGroupTransactions(16)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
    expect(window.alert).toHaveBeenCalled();
  });
});
