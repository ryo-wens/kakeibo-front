import React from 'react';
import * as actionTypes from '../../src/reducks/groupCategories/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { fetchGroupCategories } from '../../src/reducks/groupCategories/operations';
import groupCategories from './groupCategories.json';

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
