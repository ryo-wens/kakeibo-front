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
import { START_DELETE_CUSTOM_BUDGETS } from '../../src/reducks/budgets/actions';
const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions Budgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const store = mockStore({ budgets: { standard_budgets_list: [] } });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`;

  it('Get standard_budgets if fetch succeeds', async () => {
    const signal = axios.CancelToken.source();
    const mockStandardBudgets = standardBudgets;

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_STANDARD_BUDGETS,
        payload: {
          standardBudgetsLoading: true,

          standardBudgetsError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FETCH_STANDARD_BUDGETS,
        payload: {
          standardBudgetsLoading: false,
          standard_budgets_list: mockStandardBudgets.standard_budgets,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockStandardBudgets);

    await fetchStandardBudgets(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it('Edit standard_budgets if fetch succeeds', async () => {
  beforeEach(() => {
    store.clearActions();
  });

  const store = mockStore({ standardBudgets });
  const signal = axios.CancelToken.source();
  const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`;
  const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`;
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
      type: actionTypes.START_EDIT_STANDARD_BUDGETS,
      payload: {
        standardBudgetsLoading: true,

        standardBudgetsError: {
          statusCode: null,
          errorMessage: '',
        },
      },
    },
    {
      type: actionTypes.EDIT_STANDARD_BUDGETS,
      payload: {
        standardBudgetsLoading: false,
        standard_budgets_list: mockStandardBudgets.standard_budgets,
      },
    },
  ];

  axiosMock.onPut(editUrl).reply(200, mockStandardBudgets);
  axiosMock.onGet(fetchUrl).reply(200, editBudgets);

  await editStandardBudgets(nextStandardBudget.standard_budgets, signal)(store.dispatch);
  expect(store.getActions()).toEqual(expectedActions);
});

it('Get yearly_budgets if fetch succeeds', async () => {
  beforeEach(() => {
    store.clearActions();
  });

  const date = new Date();
  const year = date.getFullYear();
  const signal = axios.CancelToken.source();
  const store = mockStore({ budgets: { yearly_budgets_list: [] } });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${year}`;
  const mockYearlyBudgets = yearlyBudgets;

  const expectedActions = [
    {
      type: actionTypes.START_FETCH_YEARLY_BUDGETS,
      payload: {
        yearlyBudgetsLoading: true,

        yearlyBudgetsError: {
          statusCode: null,
          errorMessage: '',
        },
      },
    },
    {
      type: actionTypes.FETCH_YEARLY_BUDGETS,
      payload: {
        yearlyBudgetsLoading: false,
        yearly_budgets_list: mockYearlyBudgets,
      },
    },
  ];

  axiosMock.onGet(url).reply(200, mockYearlyBudgets);

  await fetchYearlyBudgets(year, signal)(store.dispatch);
  expect(store.getActions()).toEqual(expectedActions);
});

it('Get custom_budgets if fetch succeeds', async () => {
  beforeEach(() => {
    store.clearActions();
  });

  const selectYear = '2020';
  const selectMonth = '07';
  const signal = axios.CancelToken.source();
  const store = mockStore({ budgets: { custom_budgets_list: [] } });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;
  const mockCustomBudgets = customBudgets;

  const expectedActions = [
    {
      type: actionTypes.START_FETCH_CUSTOM_BUDGETS,
      payload: {
        customBudgetsLoading: true,

        customBudgetsError: {
          statusCode: null,
          errorMessage: '',
        },
      },
    },
    {
      type: actionTypes.FETCH_CUSTOM_BUDGETS,
      payload: {
        customBudgetsLoading: false,
        custom_budgets_list: mockCustomBudgets.custom_budgets,
      },
    },
  ];

  axiosMock.onGet(url).reply(200, mockCustomBudgets);

  await fetchCustomBudgets(selectYear, selectMonth, signal)(store.dispatch);
  expect(store.getActions()).toEqual(expectedActions);
});

it('Add custom_budgets if fetch succeeds', async () => {
  beforeEach(() => {
    store.clearActions();
  });

  const selectYear = '2020';
  const selectMonth = '06';
  const signal = axios.CancelToken.source();
  const store = mockStore({
    budgets: {
      yearly_budgets_list: yearlyBudgets,
      standard_budgets_list: editBudgets.standard_budgets,
    },
  });
  const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;
  const fetchCustomUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;
  const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${selectYear}`;

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
      type: actionTypes.START_ADD_CUSTOM_BUDGETS,
      payload: {
        customBudgetsLoading: true,
        yearlyBudgetsLoading: true,

        customBudgetsError: {
          statusCode: null,
          errorMessage: '',
        },
      },
    },
    {
      type: actionTypes.ADD_CUSTOM_BUDGETS,
      payload: {
        customBudgetsLoading: false,
        custom_budgets_list: addCustomBudget.custom_budgets,
        yearlyBudgetsLoading: false,
        yearly_budgets_list: addCustomBudgetsPayload,
      },
    },
  ];

  axiosMock.onPost(addUrl).reply(201, addCustomBudget);
  axiosMock.onGet(fetchCustomUrl).reply(200, addCustomBudget);
  axiosMock.onGet(fetchYearlyUrl).reply(200, addCustomBudgetsPayload);

  await addCustomBudgets(
    selectYear,
    selectMonth,
    signal,
    nextCustomBudgets.custom_budgets
  )(store.dispatch);
  expect(store.getActions()).toEqual(expectedActions);
});

it('Edit custom_budgets if fetch succeeds', async () => {
  beforeEach(() => {
    store.clearActions();
  });

  const selectYear = '2020';
  const selectMonth = '06';
  const signal = axios.CancelToken.source();
  const store = mockStore({
    budgets: {
      yearly_budgets_list: addCustomBudgetsPayload,
    },
  });
  const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;
  const fetchCustomUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;
  const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${selectYear}`;

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

  const expectedActions = [
    {
      type: actionTypes.START_EDIT_CUSTOM_BUDGETS,
      payload: {
        customBudgetsLoading: true,
        yearlyBudgetsLoading: true,

        customBudgetsError: {
          statusCode: null,
          errorMessage: '',
        },
      },
    },
    {
      type: actionTypes.EDIT_CUSTOM_BUDGETS,
      payload: {
        customBudgetsLoading: false,
        custom_budgets_list: editCustomBudget.custom_budgets,
        yearlyBudgetsLoading: false,
        yearly_budgets_list: editCustomBudgetsPayload,
      },
    },
  ];

  axiosMock.onPut(editUrl).reply(200, editCustomBudget);
  axiosMock.onGet(fetchCustomUrl).reply(200, editCustomBudget);
  axiosMock.onGet(fetchYearlyUrl).reply(200, editCustomBudgetsPayload);

  await editCustomBudgets(
    selectYear,
    selectMonth,
    signal,
    nextCustomBudgets.custom_budgets
  )(store.dispatch);
  expect(store.getActions()).toEqual(expectedActions);
});

it('Delete custom_budgets if fetch succeeds', async () => {
  beforeEach(() => {
    store.clearActions();
  });

  const selectYear = '2020';
  const selectMonth = '07';
  const signal = axios.CancelToken.source();
  const store = mockStore({ budgets: { yearly_budgets_list: editCustomBudgetsPayload } });
  const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`;
  const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${selectYear}`;

  const mockResponse = deleteCustomBudget.message;

  const deletedCustomBudgets = {
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
      type: START_DELETE_CUSTOM_BUDGETS,
      payload: {
        yearlyBudgetsLoading: true,

        yearlyBudgetsError: {
          statusCode: null,
          errorMessage: '',
        },
      },
    },
    {
      type: actionTypes.DELETE_CUSTOM_BUDGETS,
      payload: {
        yearlyBudgetsLoading: false,
        yearly_budgets_list: deletedCustomBudgets,
      },
    },
  ];

  axiosMock.onDelete(deleteUrl).reply(200, mockResponse);
  axiosMock.onGet(fetchYearlyUrl).reply(200, deletedCustomBudgets);

  // @ts-ignore
  await deleteCustomBudgets(selectYear, selectMonth, signal)(store.dispatch);
  expect(store.getActions()).toEqual(expectedActions);
});
