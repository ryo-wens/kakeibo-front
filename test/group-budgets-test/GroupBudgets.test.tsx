import React from 'react';
import * as actionTypes from '../../src/reducks/groupBudgets/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchGroupStandardBudgets,
  editGroupStandardBudgets,
  fetchGroupYearlyBudgets,
  addGroupCustomBudgets,
  fetchGroupCustomBudgets,
  editGroupCustomBudgets,
  deleteGroupCustomBudgets,
} from '../../src/reducks/groupBudgets/operations';
import groupStandardBudgets from './fetchGroupStandardBudgetsResponse.json';
import groupEditedStandardBudgets from './editGroupStandardBudgetsResponse.json';
import groupYearlyBudgets from './fetchGroupYearlyBudgetsResponse.json';
import groupAddedCustomBudgets from './addGroupCustomBudgetsResponse.json';
import groupCustomBudgets from './fetchGroupCustomBudgetsResponse.json';
import groupEditedCustomBudgets from './editGroupCustomBudgetsResponse.json';
import groupDeletedCustomBudgets from './deleteGroupCustomBudgetsResponse.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions fetchGroupStandardBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const store = mockStore({ groupBudgets: { groupStandardBudgetsList: [] } });

  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`;

  it('Get groupStandardBudgetsList if fetch succeeds', async () => {
    const mockResponse = groupStandardBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_STANDARD_BUDGETS,
        payload: mockResponse.standard_budgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupStandardBudgets(groupId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions editGroupStandardBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const store = mockStore({ groupStandardBudgets });

  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`;

  it('Edit groupStandard_budgets if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupBudgets: {
          groupStandardBudgetsList: groupStandardBudgets.standard_budgets,
        },
      };
    };

    const mockRequest = {
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
          budget: 5000,
        },
        {
          big_category_id: 7,
          budget: 0,
        },
        {
          big_category_id: 8,
          budget: 5000,
        },
        {
          big_category_id: 9,
          budget: 10000,
        },
        {
          big_category_id: 10,
          budget: 10000,
        },
        {
          big_category_id: 11,
          budget: 60000,
        },
        {
          big_category_id: 12,
          budget: 8000,
        },
        {
          big_category_id: 13,
          budget: 0,
        },
        {
          big_category_id: 14,
          budget: 10000,
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
    const mockResponse = groupEditedStandardBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_STANDARD_BUDGETS,
        payload: mockResponse.standard_budgets,
      },
    ];

    axiosMock.onPut(url, mockRequest).reply(200, mockResponse);

    await editGroupStandardBudgets(mockRequest.standard_budgets)(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions getGroupYearlyBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const store = mockStore({ groupBudgets: { groupYearlyBudgetsList: [] } });

  const date = new Date();
  const year = date.getFullYear();

  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${year}`;

  it('Get groupYearlyBudgets if fetch succeeds', async () => {
    const mockResponse = groupYearlyBudgets;

    const expectedActions = [
      {
        type: actionTypes.FETCH_GROUP_YEARLY_BUDGETS,
        payload: mockResponse,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupYearlyBudgets(groupId, year)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions getGroupCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const selectYear = '2020';
  const selectMonth = '01';
  const store = mockStore({ groupBudgets: { groupCustomBudgetsList: [] } });

  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;

  it('Get groupCustomBudgets if fetch succeeds', async () => {
    const mockResponse = groupCustomBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_CUSTOM_BUDGETS,
        payload: mockResponse.custom_budgets,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupCustomBudgets(selectYear, selectMonth, groupId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions addGroupCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const groupId = 1;
  const selectYear = '2020';
  const selectMonth = '01';
  const store = mockStore({ groupCustomBudgets });
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;

  it('Add groupCustomBudgets if fetch succeeds', async () => {
    const mockResponse = groupAddedCustomBudgets;

    const mockRequest = {
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
          budget: 5000,
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
          budget: 8000,
        },
        {
          big_category_id: 9,
          budget: 10000,
        },
        {
          big_category_id: 10,
          budget: 10000,
        },
        {
          big_category_id: 11,
          budget: 65000,
        },
        {
          big_category_id: 12,
          budget: 7000,
        },
        {
          big_category_id: 13,
          budget: 0,
        },
        {
          big_category_id: 14,
          budget: 10000,
        },
        {
          big_category_id: 15,
          budget: 0,
        },
        {
          big_category_id: 16,
          budget: 8000,
        },
        {
          big_category_id: 17,
          budget: 0,
        },
      ],
    };

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_CUSTOM_BUDGETS,
        payload: mockResponse.custom_budgets,
      },
    ];

    axiosMock.onPost(url).reply(201, mockResponse);

    await addGroupCustomBudgets(
      selectYear,
      selectMonth,
      groupId,
      mockRequest.custom_budgets
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions editGroupCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const selectYear = '2020';
  const selectMonth = '01';
  const store = mockStore({ groupAddedCustomBudgets });

  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;

  it('Edit groupCustomBudgets  if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupBudgets: {
          groupCustomBudgetsList: groupAddedCustomBudgets.custom_budgets,
        },
      };
    };

    const mockRequest = {
      custom_budgets: [
        {
          big_category_id: 2,
          budget: 25000,
        },
        {
          big_category_id: 3,
          budget: 8000,
        },
        {
          big_category_id: 4,
          budget: 9000,
        },
        {
          big_category_id: 5,
          budget: 1000,
        },
        {
          big_category_id: 6,
          budget: 3000,
        },
        {
          big_category_id: 7,
          budget: 0,
        },
        {
          big_category_id: 8,
          budget: 8000,
        },
        {
          big_category_id: 9,
          budget: 10000,
        },
        {
          big_category_id: 10,
          budget: 10000,
        },
        {
          big_category_id: 11,
          budget: 65000,
        },
        {
          big_category_id: 12,
          budget: 7000,
        },
        {
          big_category_id: 13,
          budget: 0,
        },
        {
          big_category_id: 14,
          budget: 10000,
        },
        {
          big_category_id: 15,
          budget: 0,
        },
        {
          big_category_id: 16,
          budget: 8000,
        },
        {
          big_category_id: 17,
          budget: 0,
        },
      ],
    };

    const mockResponse = groupEditedCustomBudgets;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_CUSTOM_BUDGETS,
        payload: mockResponse.custom_budgets,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editGroupCustomBudgets(
      selectYear,
      selectMonth,
      groupId,
      mockRequest.custom_budgets
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions deleteGroupCustomBudgets', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const store = mockStore({ groupYearlyBudgets });

  const selectYear = '2020';
  const selectMonth = '01';
  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`;

  it('Delete groupCustomBudgets if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupBudgets: {
          groupStandardBudgetsList: groupEditedStandardBudgets.standard_budgets,
          groupYearlyBudgetsList: groupYearlyBudgets,
        },
      };
    };

    const mockResponse = groupDeletedCustomBudgets.message;

    const mockRequest = {
      year: '2020-01-01T00:00:00Z',
      yearly_total_budget: 1775000,
      monthly_budgets: [
        {
          month: '2020年01月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年02月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年03月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年04月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年05月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年06月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年07月',
          budget_type: 'CustomBudget',
          monthly_total_budget: 170000,
        },
        {
          month: '2020年08月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年09月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年10月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年11月',
          budget_type: 'StandardBudget',
          monthly_total_budget: 143500,
        },
        {
          month: '2020年12月',
          budget_type: 'CustomBudget',
          monthly_total_budget: 170000,
        },
      ],
    };

    const expectedActions = [
      {
        type: actionTypes.DELETE_GROUP_CUSTOM_BUDGETS,
        payload: mockRequest,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);
    window.alert = jest.fn(() => mockResponse);

    // @ts-ignore
    await deleteGroupCustomBudgets(selectYear, selectMonth, groupId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
    expect(window.alert).toHaveBeenCalled();
  });
});
