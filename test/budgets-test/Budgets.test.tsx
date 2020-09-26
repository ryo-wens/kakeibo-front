import React from 'react';
import * as actionTypes from '../../src/reducks/budgets/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchStandardBudgets,
  getYearlyBudgets,
  fetchCustomBudgets,
} from '../../src/reducks/budgets/operations';
import standardBudgets from './fetchBudgetsResponse.json';
import yearlyBudgets from './fetchYearlyBudgetsReponse.json';
import customBudgets from './fetchCustomBudgetsResponse.json';

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
        type: actionTypes.UPDATE_STANDARD_BUDGETS,
        payload: mockStandardBudgets.standard_budgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockStandardBudgets);

    await fetchStandardBudgets()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions getYearlyBudgets', () => {
  const store = mockStore({ budgets: { yearly_budgets_list: [] } });
  const url = 'http://127.0.0.1:8081/budgets/2020';

  it('Get yearly_budgets if fetch succeeds', async () => {
    const mockYearlyBudgets = yearlyBudgets;

    const expectedActions = [
      {
        type: actionTypes.FETCH_YEARLY_BUDGETS,
        payload: mockYearlyBudgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockYearlyBudgets);

    await getYearlyBudgets()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions getCustomBudgets', () => {
  const store = mockStore({ budgets: { custom_budgets_list: [] } });
  const url = 'http://127.0.0.1:8081/custom-budgets/2020-07';

  it('Get custom_budgets if fetch succeeds', async () => {
    const mockCustomBudgets = customBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_CUSTOM_BUDGETS,
        payload: mockCustomBudgets.custom_budgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockCustomBudgets);

    await fetchCustomBudgets()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
