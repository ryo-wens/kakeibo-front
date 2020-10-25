import React from 'react';
import * as actionTypes from '../../src/reducks/groupTransactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { addGroupTransactions } from '../../src/reducks/groupTransactions/operations';
import groupTransactions from './groupTransactions.json';
import addGroupTransaction from './addGroupTransactions.json';
import addedGroupTransactions from './addedGroupTransactions.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

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
