import React from 'react';
import * as actionTypes from '../../src/reducks/categories/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchCategories,
  addCustomCategories,
  editCustomCategories,
  deleteCustomCategories,
} from '../../src/reducks/categories/operations';
import categories from './categories.json';
import addCategories from './addCategories.json';
import editCategories from './editCategories.json';
import addResponse from './addCategoryResponse.json';
import editResponse from './editCategoryResponse.json';
import deleteResponse from './deleteCategoryResponse.json';

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

    const mockIncomeResponse = addResponse.categories.incomeResponse;

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

    const mockExpenseResponse = addResponse.categories.expenseResponse;

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

describe('async actions editCustomCategories', () => {
  const store = mockStore({ addCategories });

  beforeEach(() => {
    store.clearActions();
  });

  it('Edit customCategory in income_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        categories: {
          incomeList: addCategories.income_categories_list,
        },
      };
    };

    const reqIncomeCategory = {
      name: '株配当金',
      big_category_id: 1,
    };

    const mockIncomeResponse = editResponse.categories.incomeResponse;

    const id = mockIncomeResponse.id;
    const url = `http://127.0.0.1:8081/categories/custom-categories/${id}`;

    const mockIncomeList = editCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.UPDATE_INCOME_CATEGORIES,
        payload: mockIncomeList,
      },
    ];

    axiosMock.onPut(url, reqIncomeCategory).reply(200, mockIncomeResponse);

    // @ts-ignore
    await editCustomCategories(16, '株配当金', 1)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Edit customCategory in expense_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        categories: {
          expenseList: addCategories.expense_categories_list,
        },
      };
    };

    const reqExpenseCategory = {
      name: '牛肉ブロック',
      big_category_id: 2,
    };

    const mockExpenseResponse = editResponse.categories.expenseResponse;

    const id = mockExpenseResponse.id;
    const url = `http://127.0.0.1:8081/categories/custom-categories/${id}`;

    const mockExpenseList = editCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.UPDATE_EXPENSE_CATEGORIES,
        payload: mockExpenseList,
      },
    ];

    axiosMock.onPut(url, reqExpenseCategory).reply(200, mockExpenseResponse);

    // @ts-ignore
    await editCustomCategories(17, '牛肉ブロック', 2)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });
});

describe('async actions deleteCustomCategories', () => {
  const store = mockStore({ editCategories });

  beforeEach(() => {
    store.clearActions();
  });

  const mockResponse = deleteResponse.message;

  const deleteCategories = JSON.parse(JSON.stringify(categories));

  it('Delete customCategory in income_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        categories: {
          incomeList: editCategories.income_categories_list,
        },
      };
    };

    const id = 16;
    const url = `http://127.0.0.1:8081/categories/custom-categories/${id}`;

    const mockIncomeList = deleteCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.UPDATE_INCOME_CATEGORIES,
        payload: mockIncomeList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);
    window.alert = jest.fn(() => mockResponse);

    // @ts-ignore
    await deleteCustomCategories(16, 1)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedIncomeActions);
    expect(window.alert).toHaveBeenCalled();
  });

  it('Delete customCategory in expense_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        categories: {
          expenseList: editCategories.expense_categories_list,
        },
      };
    };

    const id = 17;
    const url = `http://127.0.0.1:8081/categories/custom-categories/${id}`;

    const mockExpenseList = deleteCategories.expense_categories_list;
    const expectedExpenseActions = [
      {
        type: actionTypes.UPDATE_EXPENSE_CATEGORIES,
        payload: mockExpenseList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);
    window.alert = jest.fn(() => mockResponse);

    // @ts-ignore
    await deleteCustomCategories(17, 2)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedExpenseActions);
    expect(window.alert).toHaveBeenCalled();
  });
});
