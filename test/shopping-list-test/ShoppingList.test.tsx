import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchMonthlyShoppingList,
  fetchTodayShoppingList,
} from '../../src/reducks/shoppingList/operations';
import axios from 'axios';
import * as ShoppingListActions from '../../src/reducks/shoppingList/actions';
import fetchTodayShoppingListResponse from './fetchTodayShoppingListResponse.json';
import fetchMonthlyShoppingListResponse from './fetchMonthlyShoppingListResponse.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ shoppingList: [], modal: [], router: [] });

const getState = () => {
  return {
    shoppingList: {
      loading: false,
      expiredShoppingList: [],
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
      errorMessage: '',
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

  it('get todayShoppingList and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchTodayShoppingListResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.FETCH_TODAY_SHOPPING_LIST,
        payload: {
          loading: false,
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

  it('get monthlyShoppingList and regularShoppingList if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchMonthlyShoppingListResponse);

    const expectedAction = [
      {
        type: ShoppingListActions.FETCH_MONTHLY_SHOPPING_LIST,
        payload: {
          loading: false,
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
});
