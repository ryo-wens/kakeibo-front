import React from 'react';
import * as actionTypes from '../../src/reducks/budgets/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchStandardBudgets,
  editStandardBudgets,
  fetchYearlyBudgets,
  fetchCustomBudgets,
  addCustomBudgets,
  editCustomBudgets,
  deleteCustomBudgets,
} from '../../src/reducks/budgets/operations';
import standardBudgets from './fetchBudgetsResponse.json';
import yearlyBudgets from './fetchYearlyBudgetsResponse.json';
import customBudgets from './fetchCustomBudgetsResponse.json';
import editBudgets from './editBudgetsResponse.json';
import addCustomBudget from './addCustomBudgetsResponse.json';
import editCustomBudget from './editCustomBudgetsResponse.json';
import deleteCustomBudget from './deleteCustomBudgetsResponse.json';
import addCustomBudgetsPayload from './addCustomBudgetsPayload.json';
import editCustomBudgetsPayload from './editCustomBudgetsPayload.json';
const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions fetchBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const store = mockStore({ budgets: { standard_budgets_list: [] } });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`;

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
  beforeEach(() => {
    store.clearActions();
  });
  const store = mockStore({ standardBudgets });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`;

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
  beforeEach(() => {
    store.clearActions();
  });
  const date = new Date();
  const year = date.getFullYear();
  const store = mockStore({ budgets: { yearly_budgets_list: [] } });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${year}`;

  it('Get yearly_budgets if fetch succeeds', async () => {
    const mockYearlyBudgets = yearlyBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_YEARLY_BUDGETS,
        payload: mockYearlyBudgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockYearlyBudgets);

    await fetchYearlyBudgets(year)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions getCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const selectYear = '2020';
  const selectMonth = '07';
  const store = mockStore({ budgets: { custom_budgets_list: [] } });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;

  it('Get custom_budgets if fetch succeeds', async () => {
    const mockCustomBudgets = customBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_CUSTOM_BUDGETS,
        payload: mockCustomBudgets.custom_budgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockCustomBudgets);

    await fetchCustomBudgets(selectYear, selectMonth)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions addCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const selectYear = '2020';
  const selectMonth = '06';
  const store = mockStore({
    budgets: {
      yearly_budgets_list: yearlyBudgets,
      standard_budgets_list: editBudgets.standard_budgets,
    },
  });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;

  it('Add custom_budgets if fetch succeeds', async () => {
    const getState = () => {
      return {
        budgets: {
          yearly_budgets_list: yearlyBudgets,
          standard_budgets_list: editBudgets.standard_budgets,
        },
      };
    };

    const mockCustomBudgets = addCustomBudget;

    const nextCustomBudgets = {
      custom_budgets: [
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
          budget: 2000,
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

    const expectedActions = [
      {
        type: actionTypes.UPDATE_YEARLY_BUDGETS,
        payload: addCustomBudgetsPayload,
      },
    ];

    axiosMock.onPost(url).reply(201, mockCustomBudgets);

    await addCustomBudgets(
      selectYear,
      selectMonth,
      nextCustomBudgets.custom_budgets
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions editCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const selectYear = '2020';
  const selectMonth = '06';
  const store = mockStore({
    budgets: {
      yearly_budgets_list: addCustomBudgetsPayload,
    },
  });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;

  it('Edit custom_budgets if fetch succeeds', async () => {
    const getState = () => {
      return {
        budgets: {
          yearly_budgets_list: addCustomBudgetsPayload,
        },
      };
    };

    const nextCustomBudgets = {
      custom_budgets: [
        {
          big_category_id: 2,
          budget: 38000,
        },
        {
          big_category_id: 3,
          budget: 4000,
        },
        {
          big_category_id: 4,
          budget: 7500,
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
          budget: 3800,
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

    const mockCustomBudgets = editCustomBudget;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_YEARLY_BUDGETS,
        payload: editCustomBudgetsPayload,
      },
    ];

    axiosMock.onPut(url).reply(200, mockCustomBudgets);

    await editCustomBudgets(
      selectYear,
      selectMonth,
      nextCustomBudgets.custom_budgets
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions deleteCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const selectYear = '2020';
  const selectMonth = '07';
  const store = mockStore({ budgets: { yearly_budgets_list: editCustomBudgetsPayload } });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;
  it('Delete custom_budgets if fetch succeeds', async () => {
    const getState = () => {
      return {
        budgets: {
          standard_budgets_list: editBudgets.standard_budgets,
          yearly_budgets_list: editCustomBudgetsPayload,
        },
      };
    };

    const mockResponse = deleteCustomBudget.message;

    const mockCustomBudgets = {
      year: '2020-01-01T00:00:00Z',
      yearly_total_budget: 1028600,
      monthly_budgets: [
        {
          month: '2020年01月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年02月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年03月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年04月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年05月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年06月',
          budget_type: 'CustomBudget',
          monthly_total_budget: 92600,
        },
        {
          month: '2020年07月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年08月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年09月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年10月',
          budget_type: 'CustomBudget',
          monthly_total_budget: 100000,
        },
        {
          month: '2020年11月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
        {
          month: '2020年12月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 83600,
        },
      ],
    };

    const expectedActions = [
      {
        type: actionTypes.UPDATE_YEARLY_BUDGETS,
        payload: mockCustomBudgets,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);
    window.alert = jest.fn(() => mockResponse);

    // @ts-ignore
    await deleteCustomBudgets(selectYear, selectMonth)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
    expect(window.alert).toHaveBeenCalled();
  });
});
