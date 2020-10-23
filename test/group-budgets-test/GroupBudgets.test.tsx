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
} from '../../src/reducks/groupBudgets/operations';
import groupStandardBudgets from './fetchGroupStandardBudgetsResponse.json';
import groupEditedStandardBudgets from './editGroupStandardBudgetsResponse.json';
import groupYearlyBudgets from './fetchGroupYearlyBudgetsResponse.json';
import groupAddedCustomBudgets from './addGroupCustomBudgetsResponse.json';
import groupCustomBudgets from './fetchGroupCustomBudgetsResponse.json';
import groupEditedCustomBudgets from './editGroupCustomBudgetsResponse.json';

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

    await fetchGroupStandardBudgets()(store.dispatch);
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

    const mockGroupStandardBudgetReq = {
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

    axiosMock.onPut(url, mockGroupStandardBudgetReq).reply(200, mockResponse);

    await editGroupStandardBudgets(mockGroupStandardBudgetReq.standard_budgets)(
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

    await fetchGroupYearlyBudgets()(store.dispatch);
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

    await fetchGroupCustomBudgets(selectYear, selectMonth)(store.dispatch);
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

    const mockCustomBudgetsReq = {
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
      mockCustomBudgetsReq.custom_budgets
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

    const nextCustomBudgets = {
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
      nextCustomBudgets.custom_budgets
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
