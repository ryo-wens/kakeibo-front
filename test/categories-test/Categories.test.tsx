import React from 'react';
import * as actionTypes from '../../src/reducks/categories/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { fetchCategories, addCustomCategories } from '../../src/reducks/categories/operations';
import categories from './categories.json';
import addCategories from './addCategories.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions getCategories', () => {
  const store = mockStore({ categories: { incomeList: [], expenseList: [] } });
  const url = 'http://127.0.0.1:8081/categories';

  beforeEach(() => {
    store.clearActions();
  });

  it('Get categories if fetch succeeds', async () => {
    const mockResponse = categories;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_INCOME_CATEGORIES,
        payload: mockResponse.income_categories_list,
      },
      {
        type: actionTypes.UPDATE_EXPENSE_CATEGORIES,
        payload: mockResponse.expense_categories_list,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchCategories()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions addCustomCategories', () => {
  const store = mockStore({ categories });
  const url = 'http://127.0.0.1:8081/categories/custom-categories';

  beforeEach(() => {
    store.clearActions();
  });

  it('Add customCategory in income_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        categories: {
          incomeList: categories.income_categories_list,
        },
      };
    };
    const reqIncomeCategory = {
      name: '失業手当',
      big_category_id: 1,
    };

    const mockIncomeResponse = {
      category_type: 'CustomCategory',
      id: 16,
      name: '失業手当',
      big_category_id: 1,
    };

    const mockIncomeList = addCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.UPDATE_INCOME_CATEGORIES,
        payload: mockIncomeList,
      },
    ];

    axiosMock.onPost(url, reqIncomeCategory).reply(201, mockIncomeResponse);

    // @ts-ignore
    await addCustomCategories('失業手当', 1)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Add customCategory in expense_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        categories: {
          expenseList: categories.expense_categories_list,
        },
      };
    };

    const reqExpenseCategory = {
      name: '調味料',
      big_category_id: 2,
    };

    const mockExpenseResponse = {
      category_type: 'CustomCategory',
      id: 17,
      name: '調味料',
      big_category_id: 2,
    };

    const mockExpenseList = addCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.UPDATE_EXPENSE_CATEGORIES,
        payload: mockExpenseList,
      },
    ];

    axiosMock.onPost(url, reqExpenseCategory).reply(201, mockExpenseResponse);

    // @ts-ignore
    await addCustomCategories('調味料', 2)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });
});
