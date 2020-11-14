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

    await fetchGroupCategories(groupId)(store.dispatch);
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

describe('async actions editGroupCustomCategories', () => {
  const store = mockStore({ addedGroupCategories });
  const groupId = 1;

  beforeEach(() => {
    store.clearActions();
  });

  it('Edit groupCustomGroupCategory in income_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupCategories: {
          groupIncomeList: addedGroupCategories.income_categories_list,
        },
      };
    };

    const reqGroupIncomeCategory = {
      name: '宝くじ',
      big_category_id: 1,
    };

    const mockGroupIncomeResponse = editGroupCategoriesRes.groupCategories.groupIncomeResponse;

    const id = mockGroupIncomeResponse.id;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockGroupIncomeList = editedGroupCategories.income_categories_list;

    const expectedGroupIncomeActions = [
      {
        type: actionTypes.UPDATE_GROUP_INCOME_CATEGORIES,
        payload: mockGroupIncomeList,
      },
    ];

    axiosMock.onPut(url, reqGroupIncomeCategory).reply(200, mockGroupIncomeResponse);

    // @ts-ignore
    await editGroupCustomCategories(16, '宝くじ', 1)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedGroupIncomeActions);
  });

  it('Edit groupCustomCategory in expense_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupCategories: {
          groupExpenseList: addedGroupCategories.expense_categories_list,
        },
      };
    };

    const reqGroupExpenseCategory = {
      name: 'シュークリーム',
      big_category_id: 2,
    };

    const mockGroupExpenseResponse = editGroupCategoriesRes.groupCategories.groupExpenseResponse;

    const id = mockGroupExpenseResponse.id;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockGroupExpenseList = editedGroupCategories.expense_categories_list;

    const expectedGroupExpenseActions = [
      {
        type: actionTypes.UPDATE_GROUP_EXPENSE_CATEGORIES,
        payload: mockGroupExpenseList,
      },
    ];

    axiosMock.onPut(url, reqGroupExpenseCategory).reply(200, mockGroupExpenseResponse);

    // @ts-ignore
    await editGroupCustomCategories(17, 'シュークリーム', 2)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedGroupExpenseActions);
  });
});

describe('async actions deleteGroupCustomCategories', () => {
  const store = mockStore({ editedGroupCategories });
  const groupId = 1;

  beforeEach(() => {
    store.clearActions();
  });

  // @ts-ignore
  const mockDeleteResponse = deleteGroupCategoriesRes.message;

  const deletedGroupCategories = JSON.parse(JSON.stringify(groupCategories));

  it('Delete groupCustomCategory in income_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupCategories: {
          groupIncomeList: editedGroupCategories.income_categories_list,
        },
      };
    };

    const id = 16;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockGroupIncomeList = deletedGroupCategories.income_categories_list;

    const expectedGroupIncomeActions = [
      {
        type: actionTypes.UPDATE_GROUP_INCOME_CATEGORIES,
        payload: mockGroupIncomeList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockDeleteResponse);
    window.alert = jest.fn(() => mockDeleteResponse);

    // @ts-ignore
    await deleteGroupCustomCategories(16, 1)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedGroupIncomeActions);
    expect(window.alert).toHaveBeenCalled();
  });

  it('Delete groupCustomCategory in expense_categories_list if fetch succeeds', async () => {
    const getState = () => {
      return {
        groupCategories: {
          groupExpenseList: editedGroupCategories.expense_categories_list,
        },
      };
    };

    const id = 17;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockGroupExpenseList = deletedGroupCategories.expense_categories_list;
    const expectedGroupExpenseActions = [
      {
        type: actionTypes.UPDATE_GROUP_EXPENSE_CATEGORIES,
        payload: mockGroupExpenseList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockDeleteResponse);
    window.alert = jest.fn(() => mockDeleteResponse);

    // @ts-ignore
    await deleteGroupCustomCategories(17, 2)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedGroupExpenseActions);
    expect(window.alert).toHaveBeenCalled();
  });
});
