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

const store = mockStore({ categories: { incomeList: [], expenseList: [] } });

describe('async actions categories', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Get categories if fetch succeeds', async () => {
    const mockResponse = categories;
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`;

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_CATEGORIES,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FETCH_INCOME_CATEGORIES,
        payload: {
          incomeCategoriesLoading: false,
          incomeList: mockResponse.income_categories_list,
        },
      },
      {
        type: actionTypes.FETCH_EXPENSE_CATEGORIES,
        payload: {
          expenseCategoriesLoading: false,
          expenseList: mockResponse.expense_categories_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchCategories(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Add customCategory in income_categories_list if fetch succeeds', async () => {
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`;

    const reqIncomeCategory = {
      name: '失業手当',
      big_category_id: 1,
    };

    const mockAddIncomeResponse = addResponse.categories.incomeResponse;

    const mockFetchIncomeList = addCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.START_ADD_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.ADD_INCOME_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          incomeList: mockFetchIncomeList,
        },
      },
    ];

    axiosMock.onPost(addUrl, reqIncomeCategory).reply(201, mockAddIncomeResponse);
    axiosMock.onGet(fetchUrl).reply(200, addCategories);

    await addCustomCategories('失業手当', 1, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Add customCategory in expense_categories_list if fetch succeeds', async () => {
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`;

    const reqExpenseCategory = {
      name: '調味料',
      big_category_id: 2,
    };

    const mockAddExpenseResponse = addResponse.categories.expenseResponse;

    const mockFetchExpenseList = addCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.START_ADD_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.ADD_EXPENSE_CUSTOM_CATEGORY,
        payload: {
          expenseCategoriesLoading: false,
          expenseList: mockFetchExpenseList,
        },
      },
    ];

    axiosMock.onPost(addUrl, reqExpenseCategory).reply(201, mockAddExpenseResponse);
    axiosMock.onGet(fetchUrl).reply(200, addCategories);

    await addCustomCategories('調味料', 2, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });

  it('If the incomeCategory you added already exists, it will output an error message and status code', async () => {
    const signal = axios.CancelToken.source();
    const addedStore = mockStore({
      categories: {
        incomeList: addCategories.income_categories_list,
        expenseList: addCategories.expense_categories_list,
      },
    });
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories`;

    const addRequestIncomeCategory = {
      name: '失業手当',
      big_category_id: 1,
    };

    const errorResponse = {
      status: 409,
      error: {
        message:
          '中カテゴリーの登録に失敗しました。 同じカテゴリー名が既に存在していないか確認してください。',
      },
    };

    const expectedAddIncomeCategoryFailActions = [
      {
        type: actionTypes.START_ADD_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FAILED_ADD_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          expenseCategoriesLoading: false,

          categoriesError: {
            statusCode: errorResponse.status,
            errorMessage: errorResponse.error.message,
          },
        },
      },
    ];

    axiosMock.onPost(addUrl, addRequestIncomeCategory).reply(409, errorResponse);

    try {
      await addCustomCategories('失業手当', 1, signal)(addedStore.dispatch);
    } catch (error) {
      expect(addedStore.getActions()).toEqual(expectedAddIncomeCategoryFailActions);
    }
  });

  it('If the expenseCategory you added already exists, it will output an error message and status code', async () => {
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories`;

    const addRequestExpenseCategory = {
      name: '調味料',
      big_category_id: 2,
    };

    const errorResponse = {
      status: 409,
      error: {
        message:
          '中カテゴリーの登録に失敗しました。 同じカテゴリー名が既に存在していないか確認してください。',
      },
    };

    const expectedAddExpenseCategoryFailActions = [
      {
        type: actionTypes.START_ADD_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FAILED_ADD_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          expenseCategoriesLoading: false,

          categoriesError: {
            statusCode: errorResponse.status,
            errorMessage: errorResponse.error.message,
          },
        },
      },
    ];

    axiosMock.onPost(addUrl, addRequestExpenseCategory).reply(409, errorResponse);

    try {
      await addCustomCategories('調味料', 2, signal)(store.dispatch);
    } catch (error) {
      expect(store.getActions()).toEqual(expectedAddExpenseCategoryFailActions);
    }
  });

  it('Edit customCategory in income_categories_list if fetch succeeds', async () => {
    const reqIncomeCategory = {
      name: '株配当金',
      big_category_id: 1,
    };

    const mockIncomeResponse = editResponse.categories.incomeResponse;
    const id = mockIncomeResponse.id;
    const signal = axios.CancelToken.source();
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`;

    const mockIncomeList = editCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.START_EDIT_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.EDIT_INCOME_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          incomeList: mockIncomeList,
        },
      },
    ];

    axiosMock.onPut(editUrl, reqIncomeCategory).reply(200, mockIncomeResponse);
    axiosMock.onGet(fetchUrl).reply(200, editCategories);

    await editCustomCategories(16, '株配当金', 1, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Edit customCategory in expense_categories_list if fetch succeeds', async () => {
    const reqExpenseCategory = {
      name: '牛肉ブロック',
      big_category_id: 2,
    };

    const mockExpenseResponse = editResponse.categories.expenseResponse;
    const id = mockExpenseResponse.id;
    const signal = axios.CancelToken.source();
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`;

    const mockExpenseList = editCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.START_EDIT_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.EDIT_EXPENSE_CUSTOM_CATEGORY,
        payload: {
          expenseCategoriesLoading: false,
          expenseList: mockExpenseList,
        },
      },
    ];

    axiosMock.onPut(editUrl, reqExpenseCategory).reply(200, mockExpenseResponse);
    axiosMock.onGet(fetchUrl).reply(200, editCategories);

    await editCustomCategories(17, '牛肉ブロック', 2, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });

  it('If the incomeCategory you edited already exists, it will output an error message and status code', async () => {
    const signal = axios.CancelToken.source();
    const id = 14;
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;

    const editRequestIncomeCategory = {
      name: '事業所得',
      big_category_id: 1,
    };

    const errorResponse = {
      status: 409,
      error: {
        message:
          '中カテゴリーの更新に失敗しました。 同じカテゴリー名が既に存在していないか確認してください。',
      },
    };

    const expectedEditIncomeCategoryFailActions = [
      {
        type: actionTypes.START_EDIT_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FAILED_EDIT_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          expenseCategoriesLoading: false,

          categoriesError: {
            statusCode: errorResponse.status,
            errorMessage: errorResponse.error.message,
          },
        },
      },
    ];

    axiosMock.onPut(editUrl, editRequestIncomeCategory).reply(409, errorResponse);

    try {
      await editCustomCategories(14, '事業所得', 1, signal)(store.dispatch);
    } catch (error) {
      expect(store.getActions()).toEqual(expectedEditIncomeCategoryFailActions);
    }
  });

  it('If the expenseCategory you edited already exists, it will output an error message and status code', async () => {
    const signal = axios.CancelToken.source();
    const id = 21;
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;

    const editRequestExpenseCategory = {
      name: '消耗品',
      big_category_id: 3,
    };

    const errorResponse = {
      status: 409,
      error: {
        message:
          '中カテゴリーの更新に失敗しました。 同じカテゴリー名が既に存在していないか確認してください。',
      },
    };

    const expectedEditExpenseCategoryFailActions = [
      {
        type: actionTypes.START_EDIT_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FAILED_EDIT_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          expenseCategoriesLoading: false,

          categoriesError: {
            statusCode: errorResponse.status,
            errorMessage: errorResponse.error.message,
          },
        },
      },
    ];

    axiosMock.onPut(editUrl, editRequestExpenseCategory).reply(409, errorResponse);

    try {
      await editCustomCategories(21, '消耗品', 3, signal)(store.dispatch);
    } catch (error) {
      expect(store.getActions()).toEqual(expectedEditExpenseCategoryFailActions);
    }
  });

  it('If the id specified when deleting incomeCategory does not exist in the specified bigCategoryId, an error message and status code will be output', async () => {
    const signal = axios.CancelToken.source();
    const id = 16;
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;

    const errorResponse = {
      status: 404,
      error: {
        message: 'カスタムカテゴリーに関連する大カテゴリーが見つかりませんでした。',
      },
    };

    const expectedDeleteIncomeCategoryFailActions = [
      {
        type: actionTypes.START_DELETE_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FAILED_DELETE_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          expenseCategoriesLoading: false,

          categoriesError: {
            statusCode: errorResponse.status,
            errorMessage: errorResponse.error.message,
          },
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(404, errorResponse);

    await deleteCustomCategories(16, 1, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedDeleteIncomeCategoryFailActions);
  });

  it('If the id specified when deleting expenseCategory does not exist in the specified bigCategoryId, an error message and status code will be output', async () => {
    const signal = axios.CancelToken.source();
    const id = 17;
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;

    const errorResponse = {
      status: 404,
      error: {
        message: 'カスタムカテゴリーに関連する大カテゴリーが見つかりませんでした。',
      },
    };

    const expectedDeleteExpenseCategoryFailActions = [
      {
        type: actionTypes.START_DELETE_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.FAILED_DELETE_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          expenseCategoriesLoading: false,

          categoriesError: {
            statusCode: errorResponse.status,
            errorMessage: errorResponse.error.message,
          },
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(404, errorResponse);

    await deleteCustomCategories(17, 2, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedDeleteExpenseCategoryFailActions);
  });

  it('Delete customCategory in income_categories_list if fetch succeeds', async () => {
    const signal = axios.CancelToken.source();
    const deletedResponse = deleteResponse.message;
    const deleteCategories = JSON.parse(JSON.stringify(categories));

    const id = 16;
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`;

    const mockIncomeList = deleteCategories.income_categories_list;

    const expectedIncomeActions = [
      {
        type: actionTypes.START_DELETE_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.DELETE_INCOME_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: false,
          incomeList: mockIncomeList,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deletedResponse);
    axiosMock.onGet(fetchUrl).reply(200, deleteCategories);

    await deleteCustomCategories(16, 1, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedIncomeActions);
  });

  it('Delete customCategory in expense_categories_list if fetch succeeds', async () => {
    const id = 17;
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`;

    const deleteCategories = JSON.parse(JSON.stringify(categories));
    const deletedResponse = deleteResponse.message;
    const mockExpenseList = deleteCategories.expense_categories_list;

    const expectedExpenseActions = [
      {
        type: actionTypes.START_DELETE_CUSTOM_CATEGORY,
        payload: {
          incomeCategoriesLoading: true,
          expenseCategoriesLoading: true,

          categoriesError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: actionTypes.DELETE_EXPENSE_CUSTOM_CATEGORY,
        payload: {
          expenseCategoriesLoading: false,
          expenseList: mockExpenseList,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, deletedResponse);
    axiosMock.onGet(fetchUrl).reply(200, deleteCategories);

    await deleteCustomCategories(17, 2, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedExpenseActions);
  });
});
