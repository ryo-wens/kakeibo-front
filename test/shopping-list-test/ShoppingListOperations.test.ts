import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchTodayShoppingList,
  fetchTodayShoppingListByCategories,
  fetchMonthlyShoppingList,
  fetchMonthlyShoppingListByCategories,
  fetchExpiredShoppingList,
  addShoppingListItem,
  deleteShoppingListItem,
  addRegularShoppingListItem,
  deleteRegularShoppingListItem,
  editShoppingListItem,
  editRegularShoppingListItem,
} from '../../src/reducks/shoppingList/operations';
import axios from 'axios';
import * as ShoppingListActions from '../../src/reducks/shoppingList/actions';
import fetchExpiredShoppingListResponse from './fetchExpiredShoppingListResponse.json';
import fetchTodayShoppingListResponse from './fetchTodayShoppingListResponse.json';
import fetchTodayShoppingListByCategoriesResponse from './fetchTodayShoppingListByCategoriesResponse.json';
import fetchMonthlyShoppingListResponse from './fetchMonthlyShoppingListResponse.json';
import fetchMonthlyShoppingListByCategoriesResponse from './fetchMonthlyShoppingListByCategoriesResponse.json';
import addShoppingListItemResponse from './addShoppingListItemResponse.json';
import editShoppingListItemResponse from './editShoppingListItemResponse.json';
import deleteShoppingListItemResponse from './deleteShoppingListItemResponse.json';
import addRegularShoppingListItemResponse from './addRegularShoppingListItemResponse.json';
import editRegularShoppingListItemResponse from './editRegularShoppingListItemResponse.json';
import deleteRegularShoppingListItemResponse from './deleteRegularShoppingListItemResponse.json';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  AddRegularShoppingListItemReq,
  AddShoppingListItemReq,
  EditRegularShoppingListItemReq,
  EditShoppingListItemReq,
} from '../../src/reducks/shoppingList/types';
import { todoServiceInstance } from '../../src/reducks/axiosConfig';
import { date } from '../../src/lib/constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ shoppingList: [], modal: [], router: [] });

const axiosMock = new MockAdapter(todoServiceInstance);

describe('async actions shoppingList', () => {
  beforeEach(() => {
    store.clearActions();
  });

  let now: Date;
  let spiedDate: Date;

  const originalDate = Date;
  now = new originalDate('2020-12-24T10:00:00Z');
  Date.now = jest.fn().mockReturnValue(now.valueOf());

  // @ts-ignore
  spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
    if (arg === 0 || arg) {
      return new originalDate(arg);
    }
    return now;
  });

  afterAll(() => {
    // @ts-ignore
    spiedDate.mockRestore();
  });

  it('get expiredShoppingList if fetch succeeds', async () => {
    const url = `/shopping-list/expired`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchExpiredShoppingListResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_EXPIRED_SHOPPING_LIST,
        payload: {
          expiredShoppingListLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_EXPIRED_SHOPPING_LIST,
        payload: {
          expiredShoppingListLoading: false,
          expiredShoppingList: fetchExpiredShoppingListResponse.expired_shopping_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchExpiredShoppingList(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get todayShoppingList and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `/shopping-list/${year}-${month}-${date}/daily`;
    const signal = axios.CancelToken.source();

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_TODAY_SHOPPING_LIST,
        payload: {
          regularShoppingListLoading: true,
          todayShoppingListLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_TODAY_SHOPPING_LIST,
        payload: {
          regularShoppingListLoading: false,
          regularShoppingList: fetchTodayShoppingListResponse.regular_shopping_list,
          todayShoppingListLoading: false,
          todayShoppingList: fetchTodayShoppingListResponse.shopping_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchTodayShoppingListResponse);

    // @ts-ignore
    await fetchTodayShoppingList(year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get todayShoppingListByCategories and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `/shopping-list/${year}-${month}-${date}/categories`;
    const signal = axios.CancelToken.source();

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          regularShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          regularShoppingListLoading: false,
          regularShoppingList: fetchTodayShoppingListByCategoriesResponse.regular_shopping_list,
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories:
            fetchTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchTodayShoppingListByCategoriesResponse);

    // @ts-ignore
    await fetchTodayShoppingListByCategories(year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get monthlyShoppingList and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const url = `/shopping-list/${year}-${month}/daily`;
    const signal = axios.CancelToken.source();

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_MONTHLY_SHOPPING_LIST,
        payload: {
          regularShoppingListLoading: true,
          monthlyShoppingListLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_MONTHLY_SHOPPING_LIST,
        payload: {
          regularShoppingListLoading: false,
          regularShoppingList: fetchMonthlyShoppingListResponse.regular_shopping_list,
          monthlyShoppingListLoading: false,
          monthlyShoppingList: fetchMonthlyShoppingListResponse.shopping_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchMonthlyShoppingListResponse);

    // @ts-ignore
    await fetchMonthlyShoppingList(year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get monthlyShoppingListByCategories and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const url = `/shopping-list/${year}-${month}/categories`;
    const signal = axios.CancelToken.source();

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          regularShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          regularShoppingListLoading: false,
          regularShoppingList: fetchMonthlyShoppingListByCategoriesResponse.regular_shopping_list,
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories:
            fetchMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchMonthlyShoppingListByCategoriesResponse);

    // @ts-ignore
    await fetchMonthlyShoppingListByCategories(year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add shoppingListItem if fetch succeeds', async () => {
    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const transactionAutoAdd = true;

    const requestData: AddShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      transaction_auto_add: transactionAutoAdd,
    };

    const url = `/shopping-list`;

    const expectedAction = [
      {
        type: ShoppingListActions.START_ADD_SHOPPING_LIST_ITEM,
        payload: {
          todayShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
          monthlyShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.ADD_SHOPPING_LIST_ITEM,
        payload: {
          shoppingListItem: addShoppingListItemResponse,
        },
      },
    ];

    axiosMock.onPost(url).reply(200, addShoppingListItemResponse);

    await addShoppingListItem(requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit shoppingListItem if fetch succeeds', async () => {
    const shoppingListItemId = 1;

    const expectedPurchaseDate = new Date('2020-12-24T10:00:00');
    const checked = true;
    const purchase = '携帯料金';
    const shop = 'auショップ';
    const amount = 5000;
    const bigCategoryId = 9;
    const mediumCategoryId = 51;
    const customCategoryId = null;
    const regularShoppingListId = null;
    const transactionAutoAdd = true;
    const relatedTransactionData = null;

    const requestData: EditShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      complete_flag: checked,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      regular_shopping_list_id: regularShoppingListId,
      transaction_auto_add: transactionAutoAdd,
      related_transaction_data: relatedTransactionData,
    };

    const url = `/shopping-list/${shoppingListItemId}`;

    const expectedAction = [
      {
        type: ShoppingListActions.START_EDIT_SHOPPING_LIST_ITEM,
        payload: {
          expiredShoppingListLoading: true,
          todayShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
          monthlyShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.EDIT_SHOPPING_LIST_ITEM,
        payload: {
          shoppingListItem: editShoppingListItemResponse,
        },
      },
    ];

    axiosMock.onPut(url).reply(200, editShoppingListItemResponse);

    await editShoppingListItem(shoppingListItemId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete shoppingListItem if fetch succeeds', async () => {
    const shoppingListItemId = 1;

    const url = `/shopping-list/${shoppingListItemId}`;

    const expectedAction = [
      {
        type: ShoppingListActions.START_DELETE_SHOPPING_LIST_ITEM,
        payload: {
          expiredShoppingListLoading: true,
          todayShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
          monthlyShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.DELETE_SHOPPING_LIST_ITEM,
        payload: {
          shoppingListItem: {
            id: 0,
            posted_date: date,
            updated_date: date,
            expected_purchase_date: '',
            complete_flag: false,
            purchase: '',
            shop: null,
            amount: null,
            big_category_id: 0,
            big_category_name: '',
            medium_category_id: null,
            medium_category_name: null,
            custom_category_id: null,
            custom_category_name: null,
            regular_shopping_list_id: null,
            transaction_auto_add: false,
            related_transaction_data: null,
          },
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteShoppingListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, deleteShoppingListItemResponse);

    await deleteShoppingListItem(shoppingListItemId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add regularShoppingListItem if fetch succeeds', async () => {
    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const cycleType = 'weekly';
    const cycle = null;
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const transactionAutoAdd = true;

    const requestData: AddRegularShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      cycle_type: cycleType,
      cycle: cycle,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      transaction_auto_add: transactionAutoAdd,
    };

    const url = `/shopping-list/regular`;

    const expectedAction = [
      {
        type: ShoppingListActions.START_ADD_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          regularShoppingListLoading: true,
          todayShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
          monthlyShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.ADD_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          regularShoppingListItem: addRegularShoppingListItemResponse.regular_shopping_item,
        },
      },
    ];

    axiosMock.onPost(url).reply(200, addRegularShoppingListItemResponse);

    await addRegularShoppingListItem(requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit regularShoppingListItem if fetch succeeds', async () => {
    const regularShoppingListItemId = 1;

    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const cycleType = 'monthly';
    const cycle = null;
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const transactionAutoAdd = true;

    const requestData: EditRegularShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      cycle_type: cycleType,
      cycle: cycle,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      transaction_auto_add: transactionAutoAdd,
    };

    const url = `/shopping-list/regular/${regularShoppingListItemId}`;

    const expectedAction = [
      {
        type: ShoppingListActions.START_EDIT_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          regularShoppingListLoading: true,
          expiredShoppingListLoading: true,
          todayShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
          monthlyShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.EDIT_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          regularShoppingListItem: editRegularShoppingListItemResponse.regular_shopping_item,
        },
      },
    ];

    axiosMock.onPut(url).reply(200, editRegularShoppingListItemResponse);

    await editRegularShoppingListItem(regularShoppingListItemId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete regularShoppingListItem if fetch succeeds', async () => {
    const regularShoppingListItemId = 1;

    const url = `/shopping-list/regular/${regularShoppingListItemId}`;

    const expectedAction = [
      {
        type: ShoppingListActions.START_DELETE_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          regularShoppingListLoading: true,
          expiredShoppingListLoading: true,
          todayShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
          monthlyShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.DELETE_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          regularShoppingListItem: {
            id: 0,
            posted_date: date,
            updated_date: date,
            expected_purchase_date: '',
            cycle_type: '',
            cycle: null,
            purchase: '',
            shop: null,
            amount: null,
            big_category_id: 0,
            big_category_name: '',
            medium_category_id: null,
            medium_category_name: null,
            custom_category_id: null,
            custom_category_name: null,
            transaction_auto_add: false,
          },
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteRegularShoppingListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, deleteRegularShoppingListItemResponse);

    await deleteRegularShoppingListItem(regularShoppingListItemId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
