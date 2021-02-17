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

const store = mockStore({ groupCategories: { groupIncomeList: [], groupExpenseList: [] } });

describe('async actions groupCategories', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Get groupCategories if fetch succeeds', async () => {
    const mockResponse = groupCategories;
    const groupId = 1;
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_GROUP_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: true,
          groupExpenseCategoriesLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_GROUP_INCOME_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: false,
          groupIncomeList: mockResponse.income_categories_list,
        },
      },
      {
        type: actionTypes.FETCH_GROUP_EXPENSE_CATEGORIES,
        payload: {
          groupExpenseCategoriesLoading: false,
          groupExpenseList: mockResponse.expense_categories_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupCategories(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Add groupCustomCategory in income_categories_list if fetch succeeds', async () => {
    const groupId = 1;
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;

    const reqIncomeCategory = {
      name: '給付金',
      big_category_id: 1,
    };

    const mockAddIncomeResponse = addGroupCategoriesRes.groupCategories.groupIncomeResponse;

    const mockFetchGroupIncomeList = addedGroupCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.START_ADD_GROUP_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: true,
          groupExpenseCategoriesLoading: true,
        },
      },
      {
        type: actionTypes.ADD_GROUP_INCOME_CATEGORY,
        payload: {
          groupIncomeCategoriesLoading: false,
          groupIncomeList: mockFetchGroupIncomeList,
        },
      },
    ];

    axiosMock.onPost(addUrl, reqIncomeCategory).reply(201, mockAddIncomeResponse);
    axiosMock.onGet(fetchUrl).reply(200, addedGroupCategories);

    await addGroupCustomCategories('給付金', 1, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Add customCategory in expense_categories_list if fetch succeeds', async () => {
    const groupId = 1;
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;

    const reqExpenseCategory = {
      name: '宮崎牛',
      big_category_id: 2,
    };

    const mockAddExpenseResponse = addGroupCategoriesRes.groupCategories.groupExpenseResponse;

    const mockFetchGroupExpenseList = addedGroupCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.START_ADD_GROUP_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: true,
          groupExpenseCategoriesLoading: true,
        },
      },
      {
        type: actionTypes.ADD_GROUP_EXPENSE_CATEGORY,
        payload: {
          groupExpenseCategoriesLoading: false,
          groupExpenseList: mockFetchGroupExpenseList,
        },
      },
    ];

    axiosMock.onPost(addUrl, reqExpenseCategory).reply(201, mockAddExpenseResponse);
    axiosMock.onGet(fetchUrl).reply(200, addedGroupCategories);

    await addGroupCustomCategories('宮崎牛', 2, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });

  it('Edit groupCustomGroupCategory in income_categories_list if fetch succeeds', async () => {
    const editGroupIncomeResponse = editGroupCategoriesRes.groupCategories.groupIncomeResponse;
    const editedGroupIncomeList = editedGroupCategories.income_categories_list;

    const groupId = 1;
    const signal = axios.CancelToken.source();
    const id = editGroupIncomeResponse.id;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const reqGroupIncomeCategory = {
      name: '宝くじ',
      big_category_id: 1,
    };

    const expectedGroupIncomeActions = [
      {
        type: actionTypes.START_EDIT_GROUP_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: true,
          groupExpenseCategoriesLoading: true,
        },
      },
      {
        type: actionTypes.EDIT_GROUP_INCOME_CATEGORY,
        payload: {
          groupIncomeCategoriesLoading: false,
          groupIncomeList: editedGroupIncomeList,
        },
      },
    ];

    axiosMock.onPut(editUrl, reqGroupIncomeCategory).reply(200, editGroupIncomeResponse);
    axiosMock.onGet(fetchUrl).reply(200, editedGroupCategories);

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

    const groupId = 1;
    const signal = axios.CancelToken.source();
    const id = mockEditGroupExpenseResponse.id;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const expectedGroupExpenseActions = [
      {
        type: actionTypes.START_EDIT_GROUP_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: true,
          groupExpenseCategoriesLoading: true,
        },
      },
      {
        type: actionTypes.EDIT_GROUP_EXPENSE_CATEGORY,
        payload: {
          groupExpenseCategoriesLoading: false,
          groupExpenseList: mockFetchGroupExpenseList,
        },
      },
    ];

    axiosMock.onPut(editUrl, reqGroupExpenseCategory).reply(200, mockEditGroupExpenseResponse);
    axiosMock.onGet(fetchUrl).reply(200, editedGroupCategories);

    await editGroupCustomCategories(17, 'シュークリーム', 2, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedGroupExpenseActions);
  });

  it('Delete groupCustomCategory in income_categories_list if fetch succeeds', async () => {
    const deletedResponse = deleteGroupCategoriesRes.message;
    const deletedGroupCategories = JSON.parse(JSON.stringify(groupCategories));
    const id = 16;
    const groupId = 1;
    const signal = axios.CancelToken.source();
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockFetchGroupIncomeList = deletedGroupCategories.income_categories_list;

    const expectedGroupIncomeActions = [
      {
        type: actionTypes.START_DELETE_GROUP_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: true,
          groupExpenseCategoriesLoading: true,
        },
      },
      {
        type: actionTypes.DELETE_GROUP_INCOME_CATEGORY,
        payload: {
          groupIncomeCategoriesLoading: false,
          groupIncomeList: mockFetchGroupIncomeList,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deletedResponse);
    axiosMock.onGet(fetchUrl).reply(200, deletedGroupCategories);

    await deleteGroupCustomCategories(16, 1, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedGroupIncomeActions);
  });

  it('Delete groupCustomCategory in expense_categories_list if fetch succeeds', async () => {
    const id = 17;
    const groupId = 1;
    const signal = axios.CancelToken.source();
    const deletedResponse = deleteGroupCategoriesRes.message;
    const deletedGroupCategories = JSON.parse(JSON.stringify(groupCategories));
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`;
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`;

    const mockFetchGroupExpenseList = deletedGroupCategories.expense_categories_list;

    const expectedGroupExpenseActions = [
      {
        type: actionTypes.START_DELETE_GROUP_CATEGORIES,
        payload: {
          groupIncomeCategoriesLoading: true,
          groupExpenseCategoriesLoading: true,
        },
      },
      {
        type: actionTypes.DELETE_GROUP_EXPENSE_CATEGORY,
        payload: {
          groupExpenseCategoriesLoading: false,
          groupExpenseList: mockFetchGroupExpenseList,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deletedResponse);
    axiosMock.onGet(fetchUrl).reply(200, deletedGroupCategories);

    await deleteGroupCustomCategories(17, 2, groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedGroupExpenseActions);
  });
});
