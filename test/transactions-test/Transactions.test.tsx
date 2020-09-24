import React from 'react';
import * as actionTypes from '../../src/reducks/transactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { addTransactions } from '../../src/reducks/transactions/operations';
import transactionsList from './transactions.json';
import addResTransaction from './addResponse.json';
import addTransactionsList from './addTransactions.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions addTransactions', () => {
  const store = mockStore({ transactionsList });
  const url = 'http://127.0.0.1:8081/transactions';

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
      return new originalDate(arg);
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
