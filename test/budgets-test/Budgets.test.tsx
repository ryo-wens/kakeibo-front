import React from 'react';
import * as actionTypes from '../../src/reducks/budgets/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchStandardBudgets,
  editStandardBudgets,
  getYearlyBudgets,
  fetchCustomBudgets,
} from '../../src/reducks/budgets/operations';
import standardBudgets from './fetchBudgetsResponse.json';
import yearlyBudgets from './fetchYearlyBudgetsReponse.json';
import customBudgets from './fetchCustomBudgetsResponse.json';
import editBudgets from './editBudgetsResponse.json';

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

describe('async actions editStandardBudgets', () => {
  const store = mockStore({ standardBudgets });
  const url = 'http://127.0.0.1:8081/standard-budgets';

  it('Edit standard_budgets if fetch succeeds', async () => {
    const getState = () => {
      return {
        budgets: {
          standard_budgets_list: standardBudgets.standard_budgets,
        },
      };
    };

    const nextStandardBudget = {
      standard_budgets: [
        {
          big_category_id: 2,
          budget: 25000,
        },
        {
          big_category_id: 3,
          budget: 5000,
        },
        {
          big_category_id: 4,
          budget: 4500,
        },
        {
          big_category_id: 5,
          budget: 1000,
        },
        {
          big_category_id: 6,
          budget: 1000,
        },
        {
          big_category_id: 7,
          budget: 0,
        },
        {
          big_category_id: 8,
          budget: 4900,
        },
        {
          big_category_id: 9,
          budget: 4400,
        },
        {
          big_category_id: 10,
          budget: 10000,
        },
        {
          big_category_id: 11,
          budget: 15000,
        },
        {
          big_category_id: 12,
          budget: 3000,
        },
        {
          big_category_id: 13,
          budget: 0,
        },
        {
          big_category_id: 14,
          budget: 9800,
        },
        {
          big_category_id: 15,
          budget: 0,
        },
        {
          big_category_id: 16,
          budget: 0,
        },
        {
          big_category_id: 17,
          budget: 0,
        },
      ],
    };
    const mockStandardBudgets = editBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_STANDARD_BUDGETS,
        payload: mockStandardBudgets.standard_budgets,
      },
    ];

    axiosMock.onPut(url).reply(200, mockStandardBudgets);

    // @ts-ignore
    await editStandardBudgets(nextStandardBudget.standard_budgets)(store.dispatch, getState);
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
