import React from 'react';
import * as actionTypes from '../../src/reducks/groupBudgets/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { fetchGroupStandardBudgets } from '../../src/reducks/groupBudgets/operations';
import groupStandardBudgets from './fetchGroupStandardBudgetsResponse.json';

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
        payload: mockResponse.groupStandardBudgetsList,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupStandardBudgets()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
