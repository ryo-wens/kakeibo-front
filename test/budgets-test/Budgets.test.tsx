import React from 'react';
import * as actionTypes from '../../src/reducks/budgets/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { fetchBudgets } from '../../src/reducks/budgets/operations';
import standardBudgets from './fetchBudgetsResponse.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions fetchBudgets', () => {
  const store = mockStore({ budgets: { standard_budgets_list: [] } });
  const url = 'http://127.0.0.1:8081/standard-budgets';

  it('Get standard_budgets if fetch succeeds', async () => {
    const mockStandardBudgets = standardBudgets;

    const expectedActions = [
      {
        type: actionTypes.FETCH_STANDARD_BUDGETS,
        payload: mockStandardBudgets.standard_budgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockStandardBudgets);

    await fetchBudgets()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
