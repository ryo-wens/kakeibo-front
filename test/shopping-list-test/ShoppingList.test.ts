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
} from '../../src/reducks/shoppingList/operations';
import axios from 'axios';
import * as ShoppingListActions from '../../src/reducks/shoppingList/actions';
import fetchExpiredShoppingListResponse from './fetchExpiredShoppingListResponse.json';
import fetchTodayShoppingListResponse from './fetchTodayShoppingListResponse.json';
import fetchTodayShoppingListByCategoriesResponse from './fetchTodayShoppingListByCategoriesResponse.json';
import fetchMonthlyShoppingListResponse from './fetchMonthlyShoppingListResponse.json';
import fetchMonthlyShoppingListByCategoriesResponse from './fetchMonthlyShoppingListByCategoriesResponse.json';
import addShoppingListItemResponse from './addShoppingListItemResponse.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ shoppingList: [], modal: [], router: [] });

const getState = () => {
  return {
    shoppingList: {
      regularShoppingList: [
        {
          id: 1,
          posted_date: '2020-12-20T10:00:00Z',
          updated_date: '2020-12-20T10:00:00Z',
          expected_purchase_date: '2020/12/24(木)',
          cycle_type: 'monthly',
          cycle: null,
          purchase: '携帯料金',
          shop: 'auショップ',
          amount: 5000,
          big_category_id: 9,
          big_category_name: '通信費',
          medium_category_id: 51,
          medium_category_name: '携帯電話',
          custom_category_id: null,
          custom_category_name: null,
          transaction_auto_add: true,
        },
      ],
      expiredShoppingListLoading: false,
      expiredShoppingList: [],
      expiredShoppingListError: {
        message: '',
        statusCode: 0,
      },
      todayShoppingListLoading: false,
      todayShoppingList: [
        {
          id: 1,
          posted_date: '2020-12-20T10:00:00Z',
          updated_date: '2020-12-20T10:00:00Z',
          expected_purchase_date: '2020/12/24(木)',
          complete_flag: false,
          purchase: '携帯料金',
          shop: 'auショップ',
          amount: 5000,
          big_category_id: 9,
          big_category_name: '通信費',
          medium_category_id: 51,
          medium_category_name: '携帯電話',
          custom_category_id: null,
          custom_category_name: null,
          regular_shopping_list_id: 2,
          transaction_auto_add: true,
          related_transaction_data: null,
        },
      ],
      todayShoppingListError: {
        message: '',
        statusCode: 0,
      },
      todayShoppingListByCategoriesLoading: false,
      todayShoppingListByCategories: [
        {
          big_category_name: '通信費',
          shopping_list: [
            {
              id: 1,
              posted_date: '2020-12-20T10:00:00Z',
              updated_date: '2020-12-20T10:00:00Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: false,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 2,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      ],
      todayShoppingListByCategoriesError: {
        message: '',
        statusCode: 0,
      },
      monthlyShoppingListLoading: false,
      monthlyShoppingList: [
        {
          id: 1,
          posted_date: '2020-12-20T10:00:00Z',
          updated_date: '2020-12-20T10:00:00Z',
          expected_purchase_date: '2020/12/24(木)',
          complete_flag: false,
          purchase: '携帯料金',
          shop: 'auショップ',
          amount: 5000,
          big_category_id: 9,
          big_category_name: '通信費',
          medium_category_id: 51,
          medium_category_name: '携帯電話',
          custom_category_id: null,
          custom_category_name: null,
          regular_shopping_list_id: 2,
          transaction_auto_add: true,
          related_transaction_data: null,
        },
      ],
      monthlyShoppingListError: {
        message: '',
        statusCode: 0,
      },
      monthlyShoppingListByCategoriesLoading: false,
      monthlyShoppingListByCategories: [
        {
          big_category_name: '通信費',
          shopping_list: [
            {
              id: 1,
              posted_date: '2020-12-20T10:00:00Z',
              updated_date: '2020-12-20T10:00:00Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: false,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 2,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      ],
      monthlyShoppingListByCategoriesError: {
        message: '',
        statusCode: 0,
      },
    },
    modal: {
      message: '',
      open: false,
    },
    router: {
      action: 'PUSH',
      location: {
        hash: '',
        key: 'hogehoge',
        pathname: '/todo',
        search: '',
        state: undefined,
      },
    },
  };
};

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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`;
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
          expiredShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T17:10:11Z',
              updated_date: '2020-12-23T17:10:11Z',
              expected_purchase_date: '2020/12/24(木)',
              cycle_type: 'monthly',
              cycle: null,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              transaction_auto_add: true,
            },
          ],
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchTodayShoppingListResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_TODAY_SHOPPING_LIST,
        payload: {
          todayShoppingListLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_TODAY_SHOPPING_LIST,
        payload: {
          regularShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T17:10:11Z',
              updated_date: '2020-12-23T17:10:11Z',
              expected_purchase_date: '2020/12/24(木)',
              cycle_type: 'monthly',
              cycle: null,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              transaction_auto_add: true,
            },
          ],
          todayShoppingListLoading: false,
          todayShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T17:10:11Z',
              updated_date: '2020-12-23T17:10:11Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: false,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 2,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchTodayShoppingList(year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get todayShoppingListByCategories and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchTodayShoppingListByCategoriesResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          todayShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          regularShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T17:10:11Z',
              updated_date: '2020-12-23T17:10:11Z',
              expected_purchase_date: '2020/12/24(木)',
              cycle_type: 'monthly',
              cycle: null,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              transaction_auto_add: true,
            },
          ],
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories: [
            {
              big_category_name: '通信費',
              shopping_list: [
                {
                  id: 1,
                  posted_date: '2020-12-23T17:10:11Z',
                  updated_date: '2020-12-23T17:10:11Z',
                  expected_purchase_date: '2020/12/24(木)',
                  complete_flag: false,
                  purchase: '携帯料金',
                  shop: 'auショップ',
                  amount: 5000,
                  big_category_id: 9,
                  big_category_name: '通信費',
                  medium_category_id: 51,
                  medium_category_name: '携帯電話',
                  custom_category_id: null,
                  custom_category_name: null,
                  regular_shopping_list_id: 2,
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchTodayShoppingListByCategories(year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get monthlyShoppingList and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchMonthlyShoppingListResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_MONTHLY_SHOPPING_LIST,
        payload: {
          monthlyShoppingListLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_MONTHLY_SHOPPING_LIST,
        payload: {
          regularShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T17:10:11Z',
              updated_date: '2020-12-23T17:10:11Z',
              expected_purchase_date: '2020/12/24(木)',
              cycle_type: 'monthly',
              cycle: null,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              transaction_auto_add: true,
            },
          ],
          monthlyShoppingListLoading: false,
          monthlyShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T17:10:11Z',
              updated_date: '2020-12-23T17:10:11Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: false,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 2,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchMonthlyShoppingList(year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get monthlyShoppingListByCategories and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchMonthlyShoppingListByCategoriesResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.START_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          regularShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T17:10:11Z',
              updated_date: '2020-12-23T17:10:11Z',
              expected_purchase_date: '2020/12/24(木)',
              cycle_type: 'monthly',
              cycle: null,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              transaction_auto_add: true,
            },
          ],
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories: [
            {
              big_category_name: '通信費',
              shopping_list: [
                {
                  id: 1,
                  posted_date: '2020-12-23T17:10:11Z',
                  updated_date: '2020-12-23T17:10:11Z',
                  expected_purchase_date: '2020/12/24(木)',
                  complete_flag: false,
                  purchase: '携帯料金',
                  shop: 'auショップ',
                  amount: 5000,
                  big_category_id: 9,
                  big_category_name: '通信費',
                  medium_category_id: 51,
                  medium_category_name: '携帯電話',
                  custom_category_id: null,
                  custom_category_name: null,
                  regular_shopping_list_id: 2,
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchMonthlyShoppingListByCategories(year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get monthlyShoppingListByCategories and regularShoppingList if fetch succeeds', async () => {
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list`;
    const today = new Date();
    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const transactionAutoAdd = true;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(addShoppingListItemResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.START_ADD_SHOPPING_LIST_ITEM,
        payload: {
          expiredShoppingListLoading: true,
          todayShoppingListLoading: true,
          todayShoppingListByCategoriesLoading: true,
          monthlyShoppingListLoading: true,
          monthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: ShoppingListActions.ADD_SHOPPING_LIST_ITEM,
        payload: {
          expiredShoppingListLoading: false,
          expiredShoppingList: [],
          todayShoppingListLoading: false,
          todayShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-20T10:00:00Z',
              updated_date: '2020-12-20T10:00:00Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: false,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 2,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories: [
            {
              big_category_name: '通信費',
              shopping_list: [
                {
                  id: 1,
                  posted_date: '2020-12-20T10:00:00Z',
                  updated_date: '2020-12-20T10:00:00Z',
                  expected_purchase_date: '2020/12/24(木)',
                  complete_flag: false,
                  purchase: '携帯料金',
                  shop: 'auショップ',
                  amount: 5000,
                  big_category_id: 9,
                  big_category_name: '通信費',
                  medium_category_id: 51,
                  medium_category_name: '携帯電話',
                  custom_category_id: null,
                  custom_category_name: null,
                  regular_shopping_list_id: 2,
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
          monthlyShoppingListLoading: false,
          monthlyShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-20T10:00:00Z',
              updated_date: '2020-12-20T10:00:00Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: false,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 2,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
            {
              id: 2,
              posted_date: '2020-12-24T10:00:00Z',
              updated_date: '2020-12-24T10:00:00Z',
              expected_purchase_date: '2020/12/26(土)',
              complete_flag: false,
              purchase: '鶏肉3kg',
              shop: 'コストコ',
              amount: 1000,
              big_category_id: 2,
              big_category_name: '食費',
              medium_category_id: 6,
              medium_category_name: '食料品',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories: [
            {
              big_category_name: '食費',
              shopping_list: [
                {
                  id: 2,
                  posted_date: '2020-12-24T10:00:00Z',
                  updated_date: '2020-12-24T10:00:00Z',
                  expected_purchase_date: '2020/12/26(土)',
                  complete_flag: false,
                  purchase: '鶏肉3kg',
                  shop: 'コストコ',
                  amount: 1000,
                  big_category_id: 2,
                  big_category_name: '食費',
                  medium_category_id: 6,
                  medium_category_name: '食料品',
                  custom_category_id: null,
                  custom_category_name: null,
                  regular_shopping_list_id: null,
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
            {
              big_category_name: '通信費',
              shopping_list: [
                {
                  id: 1,
                  posted_date: '2020-12-20T10:00:00Z',
                  updated_date: '2020-12-20T10:00:00Z',
                  expected_purchase_date: '2020/12/24(木)',
                  complete_flag: false,
                  purchase: '携帯料金',
                  shop: 'auショップ',
                  amount: 5000,
                  big_category_id: 9,
                  big_category_name: '通信費',
                  medium_category_id: 51,
                  medium_category_name: '携帯電話',
                  custom_category_id: null,
                  custom_category_name: null,
                  regular_shopping_list_id: 2,
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    await addShoppingListItem(
      today,
      expectedPurchaseDate,
      purchase,
      shop,
      amount,
      bigCategoryId,
      mediumCategoryId,
      customCategoryId,
      transactionAutoAdd,
      signal
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
