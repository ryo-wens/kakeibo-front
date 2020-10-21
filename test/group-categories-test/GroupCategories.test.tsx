import React from 'react';
import * as actionTypes from '../../src/reducks/groupCategories/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchGroupCategories,
  addGroupCustomCategories,
} from '../../src/reducks/groupCategories/operations';
import groupCategories from './groupCategories.json';
import addedGroupCategories from './addedGroupCategories.json';
import addGroupCategoriesRes from './addGroupCategoriesResponse.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions fetchGroupCategories', () => {
  const store = mockStore({ groupCategories: { groupIncomeList: [], groupExpenseList: [] } });
  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;

  beforeEach(() => {
    store.clearActions();
  });

  it('Get groupCategories if fetch succeeds', async () => {
    const mockResponse = groupCategories;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_INCOME_CATEGORIES,
        payload: mockResponse.income_categories_list,
      },
      {
        type: actionTypes.UPDATE_GROUP_EXPENSE_CATEGORIES,
        payload: mockResponse.expense_categories_list,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupCategories()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions addGroupCustomCategories', () => {
  const store = mockStore({ groupCategories });
  const groupId = 1;
  const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories`;

  beforeEach(() => {
    store.clearActions();
  });

  it('Add groupCustomCategory in income_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupCategories: {
          groupIncomeList: groupCategories.income_categories_list,
        },
      };
    };
    const reqIncomeCategory = {
      name: '給付金',
      big_category_id: 1,
    };

    const mockIncomeResponse = addGroupCategoriesRes.groupCategories.groupIncomeResponse;

    const mockGroupIncomeList = addedGroupCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.UPDATE_GROUP_INCOME_CATEGORIES,
        payload: mockGroupIncomeList,
      },
    ];

    axiosMock.onPost(url, reqIncomeCategory).reply(201, mockIncomeResponse);

    // @ts-ignore
    await addGroupCustomCategories('給付金', 1)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Add customCategory in expense_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupCategories: {
          groupExpenseList: groupCategories.expense_categories_list,
        },
      };
    };

    const reqExpenseCategory = {
      name: '宮崎牛',
      big_category_id: 2,
    };

    const mockExpenseResponse = addGroupCategoriesRes.groupCategories.groupExpenseResponse;

    const mockGroupExpenseList = addedGroupCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.UPDATE_GROUP_EXPENSE_CATEGORIES,
        payload: mockGroupExpenseList,
      },
    ];

    axiosMock.onPost(url, reqExpenseCategory).reply(201, mockExpenseResponse);

    // @ts-ignore
    await addGroupCustomCategories('宮崎牛', 2)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });
});
