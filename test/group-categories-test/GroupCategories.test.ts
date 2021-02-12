import React from 'react';
import * as actionTypes from '../../src/reducks/groupCategories/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  fetchGroupCategories,
  addGroupCustomCategories,
  editGroupCustomCategories,
  deleteGroupCustomCategories,
} from '../../src/reducks/groupCategories/operations';
import groupCategories from './groupCategories.json';
import addedGroupCategories from './addedGroupCategories.json';
import addGroupCategoriesRes from './addGroupCategoriesResponse.json';
import editedGroupCategories from './editedGroupCategories.json';
import editGroupCategoriesRes from './editGroupCategoriesResponse.json';
import deleteGroupCategoriesRes from './deleteGroupCustomCategoriesResponse.json';

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
    const signal = axios.CancelToken.source();

    const expectedActions = [
      {
        type: actionTypes.FETCH_GROUP_INCOME_CATEGORIES,
        payload: mockResponse.income_categories_list,
      },
      {
        type: actionTypes.FETCH_GROUP_EXPENSE_CATEGORIES,
        payload: mockResponse.expense_categories_list,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupCategories(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('async actions addGroupCustomCategories', () => {
  const store = mockStore({ groupCategories });
  const groupId = 1;
  const signal = axios.CancelToken.source();
  const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories`;
  const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;

  beforeEach(() => {
    store.clearActions();
  });

  it('Add groupCustomCategory in income_categories_list if fetch succeeds', async () => {
    const reqIncomeCategory = {
      name: '給付金',
      big_category_id: 1,
    };

    const mockAddIncomeResponse = addGroupCategoriesRes.groupCategories.groupIncomeResponse;

    const mockFetchGroupIncomeList = addedGroupCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.ADD_GROUP_INCOME_CATEGORY,
        payload: mockFetchGroupIncomeList,
      },
    ];

    axiosMock.onPost(addUrl, reqIncomeCategory).reply(201, mockAddIncomeResponse);
    axiosMock.onGet(fetchUrl).reply(200, addedGroupCategories);

    // @ts-ignore
    await addGroupCustomCategories('給付金', 1, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Add customCategory in expense_categories_list if fetch succeeds', async () => {
    const reqExpenseCategory = {
      name: '宮崎牛',
      big_category_id: 2,
    };

    const mockAddExpenseResponse = addGroupCategoriesRes.groupCategories.groupExpenseResponse;

    const mockFetchGroupExpenseList = addedGroupCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.ADD_GROUP_EXPENSE_CATEGORY,
        payload: mockFetchGroupExpenseList,
      },
    ];

    axiosMock.onPost(addUrl, reqExpenseCategory).reply(201, mockAddExpenseResponse);
    axiosMock.onGet(fetchUrl).reply(200, addedGroupCategories);

    // @ts-ignore
    await addGroupCustomCategories('宮崎牛', 2, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });
});

describe('async actions editGroupCustomCategories', () => {
  const store = mockStore({ addedGroupCategories });
  const groupId = 1;
  const signal = axios.CancelToken.source();
  const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;

  beforeEach(() => {
    store.clearActions();
  });

  it('Edit groupCustomGroupCategory in income_categories_list if fetch succeeds', async () => {
    const reqGroupIncomeCategory = {
      name: '宝くじ',
      big_category_id: 1,
    };

    const mockEditGroupIncomeResponse = editGroupCategoriesRes.groupCategories.groupIncomeResponse;
    const mockFetchGroupIncomeList = editedGroupCategories.income_categories_list;

    const id = mockEditGroupIncomeResponse.id;
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const expectedGroupIncomeActions = [
      {
        type: actionTypes.EDIT_GROUP_INCOME_CATEGORY,
        payload: mockFetchGroupIncomeList,
      },
    ];

    axiosMock.onPut(editUrl, reqGroupIncomeCategory).reply(200, mockEditGroupIncomeResponse);
    axiosMock.onGet(fetchUrl).reply(200, editedGroupCategories);

    // @ts-ignore
    await editGroupCustomCategories(16, '宝くじ', 1, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedGroupIncomeActions);
  });

  it('Edit groupCustomCategory in expense_categories_list if fetch succeeds', async () => {
    const reqGroupExpenseCategory = {
      name: 'シュークリーム',
      big_category_id: 2,
    };

    const mockEditGroupExpenseResponse =
      editGroupCategoriesRes.groupCategories.groupExpenseResponse;
    const mockFetchGroupExpenseList = editedGroupCategories.expense_categories_list;

    const id = mockEditGroupExpenseResponse.id;
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const expectedGroupExpenseActions = [
      {
        type: actionTypes.EDIT_GROUP_EXPENSE_CATEGORY,
        payload: mockFetchGroupExpenseList,
      },
    ];

    axiosMock.onPut(editUrl, reqGroupExpenseCategory).reply(200, mockEditGroupExpenseResponse);
    axiosMock.onGet(fetchUrl).reply(200, editedGroupCategories);

    // @ts-ignore
    await editGroupCustomCategories(17, 'シュークリーム', 2, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedGroupExpenseActions);
  });
});

describe('async actions deleteGroupCustomCategories', () => {
  const store = mockStore({ editedGroupCategories });
  const groupId = 1;
  const signal = axios.CancelToken.source();
  const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;

  beforeEach(() => {
    store.clearActions();
  });

  // @ts-ignore
  const mockDeleteResponse = deleteGroupCategoriesRes.message;

  const deletedGroupCategories = JSON.parse(JSON.stringify(groupCategories));

  it('Delete groupCustomCategory in income_categories_list if fetch succeeds', async () => {
    const id = 16;
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockFetchGroupIncomeList = deletedGroupCategories.income_categories_list;

    const expectedGroupIncomeActions = [
      {
        type: actionTypes.DELETE_GROUP_INCOME_CATEGORY,
        payload: mockFetchGroupIncomeList,
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, mockDeleteResponse);
    axiosMock.onGet(fetchUrl).reply(200, deletedGroupCategories);

    // @ts-ignore
    await deleteGroupCustomCategories(16, 1, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedGroupIncomeActions);
  });

  it('Delete groupCustomCategory in expense_categories_list if fetch succeeds', async () => {
    const id = 17;
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockFetchGroupExpenseList = deletedGroupCategories.expense_categories_list;

    const expectedGroupExpenseActions = [
      {
        type: actionTypes.DELETE_GROUP_EXPENSE_CATEGORY,
        payload: mockFetchGroupExpenseList,
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, mockDeleteResponse);
    axiosMock.onGet(fetchUrl).reply(200, deletedGroupCategories);

    // @ts-ignore
    await deleteGroupCustomCategories(17, 2, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedGroupExpenseActions);
  });
});
