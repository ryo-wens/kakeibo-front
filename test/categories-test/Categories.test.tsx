import React from 'react';
import * as actionTypes from '../../src/reducks/categories/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { fetchCategories, addCustomCategories } from '../../src/reducks/categories/operations';
import categories from './categories.json';

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
