import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  addGroupRegularShoppingListItem,
  addGroupShoppingListItem,
  deleteGroupShoppingListItem,
  editGroupShoppingListItem,
  fetchGroupExpiredShoppingList,
  fetchGroupMonthlyShoppingList,
  fetchGroupMonthlyShoppingListByCategories,
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../src/reducks/groupShoppingList/operations';
import axios from 'axios';
import * as GroupShoppingListActions from '../../src/reducks/groupShoppingList/actions';
import fetchGroupExpiredShoppingListResponse from './fetchGroupExpiredShoppingListResponse.json';
import fetchGroupTodayShoppingListResponse from './fetchGroupTodayShoppingListResponse.json';
import fetchGroupTodayShoppingListByCategoriesResponse from './fetchGroupTodayShoppingListByCategoriesResponse.json';
import fetchGroupMonthlyShoppingListResponse from './fetchGroupMonthlyShoppingListResponse.json';
import fetchGroupMonthlyShoppingListByCategoriesResponse from './fetchGroupMonthlyShoppingListByCategoriesResponse.json';
import addGroupShoppingListItemResponse from './addGroupShoppingListItemResponse.json';
import editGroupShoppingListItemResponse from './editGroupShoppingListItemResponse.json';
import deleteGroupShoppingListItemResponse from './deleteGroupShoppingListItemResponse.json';
import addGroupRegularShoppingListItemResponse from './addGroupRegularShoppingListItemResponse.json';
import * as ModalActions from '../../src/reducks/modal/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ groupShoppingList: [], modal: [], router: [] });

const getState = () => {
  return {
    groupShoppingList: {
      groupRegularShoppingListLoading: false,
      groupRegularShoppingList: [
        {
          id: 1,
          posted_date: '2020-12-20T10:00:00Z',
          updated_date: '2020-12-20T10:00:00Z',
          expected_purchase_date: '2020/12/24(木)',
          cycle_type: 'weekly',
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
          payment_user_id: null,
          transaction_auto_add: true,
        },
      ],
      groupRegularShoppingListError: {
        message: '',
        statusCode: 0,
      },
      groupExpiredShoppingListLoading: false,
      groupExpiredShoppingList: [],
      groupExpiredShoppingListError: {
        message: '',
        statusCode: 0,
      },
      groupTodayShoppingListLoading: false,
      groupTodayShoppingList: [
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
          regular_shopping_list_id: 1,
          payment_user_id: null,
          transaction_auto_add: true,
          related_transaction_data: null,
        },
      ],
      groupTodayShoppingListError: {
        message: '',
        statusCode: 0,
      },
      groupTodayShoppingListByCategoriesLoading: false,
      groupTodayShoppingListByCategories: [
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
              regular_shopping_list_id: 1,
              payment_user_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      ],
      groupTodayShoppingListByCategoriesError: {
        message: '',
        statusCode: 0,
      },
      groupMonthlyShoppingListLoading: false,
      groupMonthlyShoppingList: [
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
          regular_shopping_list_id: 1,
          payment_user_id: null,
          transaction_auto_add: true,
          related_transaction_data: null,
        },
      ],
      groupMonthlyShoppingListError: {
        message: '',
        statusCode: 0,
      },
      groupMonthlyShoppingListByCategoriesLoading: false,
      groupMonthlyShoppingListByCategories: [
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
              regular_shopping_list_id: 1,
              payment_user_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      ],
      groupMonthlyShoppingListByCategoriesError: {
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

  it('get groupExpiredShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/expired`;

    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupExpiredShoppingListResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_FETCH_GROUP_EXPIRED_SHOPPING_LIST,
        payload: {
          groupExpiredShoppingListLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.FETCH_GROUP_EXPIRED_SHOPPING_LIST,
        payload: {
          groupExpiredShoppingListLoading: false,
          groupExpiredShoppingList: [
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
              regular_shopping_list_id: null,
              payment_user_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchGroupExpiredShoppingList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupTodayShoppingList and groupRegularShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`;

    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupTodayShoppingListResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_FETCH_GROUP_TODAY_SHOPPING_LIST,
        payload: {
          groupRegularShoppingListLoading: true,
          groupTodayShoppingListLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.FETCH_GROUP_TODAY_SHOPPING_LIST,
        payload: {
          groupRegularShoppingListLoading: false,
          groupRegularShoppingList: [],
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: [
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
              regular_shopping_list_id: null,
              payment_user_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchGroupTodayShoppingList(groupId, year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupTodayShoppingListByCategories and groupRegularShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupTodayShoppingListByCategoriesResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          groupRegularShoppingListLoading: true,
          groupTodayShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          groupRegularShoppingListLoading: false,
          groupRegularShoppingList: [],
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories: [
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
                  regular_shopping_list_id: null,
                  payment_user_id: null,
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
    await fetchGroupTodayShoppingListByCategories(
      groupId,
      year,
      month,
      date,
      signal
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupMonthlyShoppingList and groupRegularShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}/daily`;

    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupMonthlyShoppingListResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_FETCH_GROUP_MONTHLY_SHOPPING_LIST,
        payload: {
          groupRegularShoppingListLoading: true,
          groupMonthlyShoppingListLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.FETCH_GROUP_MONTHLY_SHOPPING_LIST,
        payload: {
          groupRegularShoppingListLoading: false,
          groupRegularShoppingList: [],
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: [
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
              regular_shopping_list_id: null,
              payment_user_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchGroupMonthlyShoppingList(groupId, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupMonthlyShoppingListByCategories and groupRegularShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}/categories`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupMonthlyShoppingListByCategoriesResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          groupRegularShoppingListLoading: true,
          groupMonthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
        payload: {
          groupRegularShoppingListLoading: false,
          groupRegularShoppingList: [],
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories: [
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
                  regular_shopping_list_id: null,
                  payment_user_id: null,
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
    await fetchGroupMonthlyShoppingListByCategories(groupId, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add groupShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list`;
    const today = new Date();
    const currentYearMonth = '2020/12';
    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const transactionAutoAdd = true;
    const paymentUser = null;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(addGroupShoppingListItemResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_ADD_GROUP_SHOPPING_LIST_ITEM,
        payload: {
          groupTodayShoppingListLoading: true,
          groupTodayShoppingListByCategoriesLoading: true,
          groupMonthlyShoppingListLoading: true,
          groupMonthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.ADD_GROUP_SHOPPING_LIST_ITEM,
        payload: {
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: [
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
              regular_shopping_list_id: 1,
              payment_user_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories: [
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
                  regular_shopping_list_id: 1,
                  payment_user_id: null,
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: [
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
              regular_shopping_list_id: 1,
              payment_user_id: null,
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
              payment_user_id: null,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories: [
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
                  payment_user_id: null,
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
                  regular_shopping_list_id: 1,
                  payment_user_id: null,
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

    await addGroupShoppingListItem(
      groupId,
      today,
      currentYearMonth,
      expectedPurchaseDate,
      purchase,
      shop,
      amount,
      bigCategoryId,
      mediumCategoryId,
      customCategoryId,
      paymentUser,
      transactionAutoAdd,
      signal
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit groupShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const today = new Date();
    const shoppingListItemId = 1;
    const currentYearMonth = '2020/12';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${shoppingListItemId}`;
    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const checked = true;
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const paymentUserId = 'furusawa';
    const transactionAutoAdd = true;
    const regularShoppingListId = 1;
    const relatedTransactionData = null;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(editGroupShoppingListItemResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_EDIT_GROUP_SHOPPING_LIST_ITEM,
        payload: {
          groupExpiredShoppingListLoading: true,
          groupTodayShoppingListLoading: true,
          groupTodayShoppingListByCategoriesLoading: true,
          groupMonthlyShoppingListLoading: true,
          groupMonthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.EDIT_GROUP_SHOPPING_LIST_ITEM,
        payload: {
          groupExpiredShoppingListLoading: false,
          groupExpiredShoppingList: [],
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T10:00:00Z',
              updated_date: '2020-12-24T10:00:00Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: true,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 1,
              payment_user_id: 'furusawa',
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories: [
            {
              big_category_name: '通信費',
              shopping_list: [
                {
                  id: 1,
                  posted_date: '2020-12-23T10:00:00Z',
                  updated_date: '2020-12-24T10:00:00Z',
                  expected_purchase_date: '2020/12/24(木)',
                  complete_flag: true,
                  purchase: '携帯料金',
                  shop: 'auショップ',
                  amount: 5000,
                  big_category_id: 9,
                  big_category_name: '通信費',
                  medium_category_id: 51,
                  medium_category_name: '携帯電話',
                  custom_category_id: null,
                  custom_category_name: null,
                  regular_shopping_list_id: 1,
                  payment_user_id: 'furusawa',
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-23T10:00:00Z',
              updated_date: '2020-12-24T10:00:00Z',
              expected_purchase_date: '2020/12/24(木)',
              complete_flag: true,
              purchase: '携帯料金',
              shop: 'auショップ',
              amount: 5000,
              big_category_id: 9,
              big_category_name: '通信費',
              medium_category_id: 51,
              medium_category_name: '携帯電話',
              custom_category_id: null,
              custom_category_name: null,
              regular_shopping_list_id: 1,
              payment_user_id: 'furusawa',
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories: [
            {
              big_category_name: '通信費',
              shopping_list: [
                {
                  id: 1,
                  posted_date: '2020-12-23T10:00:00Z',
                  updated_date: '2020-12-24T10:00:00Z',
                  expected_purchase_date: '2020/12/24(木)',
                  complete_flag: true,
                  purchase: '携帯料金',
                  shop: 'auショップ',
                  amount: 5000,
                  big_category_id: 9,
                  big_category_name: '通信費',
                  medium_category_id: 51,
                  medium_category_name: '携帯電話',
                  custom_category_id: null,
                  custom_category_name: null,
                  regular_shopping_list_id: 1,
                  payment_user_id: 'furusawa',
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
        },
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editGroupShoppingListItem(
      groupId,
      today,
      currentYearMonth,
      shoppingListItemId,
      expectedPurchaseDate,
      checked,
      purchase,
      shop,
      amount,
      bigCategoryId,
      mediumCategoryId,
      customCategoryId,
      regularShoppingListId,
      paymentUserId,
      transactionAutoAdd,
      relatedTransactionData,
      signal
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete groupShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const shoppingListItemId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${shoppingListItemId}`;
    const bigCategoryName = '通信費';
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(deleteGroupShoppingListItemResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_DELETE_GROUP_SHOPPING_LIST_ITEM,
        payload: {
          groupExpiredShoppingListLoading: true,
          groupTodayShoppingListLoading: true,
          groupTodayShoppingListByCategoriesLoading: true,
          groupMonthlyShoppingListLoading: true,
          groupMonthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.DELETE_GROUP_SHOPPING_LIST_ITEM,
        payload: {
          groupExpiredShoppingListLoading: false,
          groupExpiredShoppingList: [],
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: [],
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories: [],
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: [],
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories: [],
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: 'ショッピングアイテムを削除しました。',
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    await deleteGroupShoppingListItem(
      groupId,
      shoppingListItemId,
      bigCategoryName,
      signal
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add regularShoppingListItem and shoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/regular`;
    const today = new Date();
    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const cycleType = 'weekly';
    const cycle = null;
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const paymentUser = null;
    const transactionAutoAdd = true;
    const currentYearMonth = '2020/12';
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(addGroupRegularShoppingListItemResponse);

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          groupRegularShoppingListLoading: true,
          groupTodayShoppingListLoading: true,
          groupTodayShoppingListByCategoriesLoading: true,
          groupMonthlyShoppingListLoading: true,
          groupMonthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.ADD_GROUP_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          groupRegularShoppingListLoading: false,
          groupRegularShoppingList: [
            {
              id: 1,
              posted_date: '2020-12-20T10:00:00Z',
              updated_date: '2020-12-20T10:00:00Z',
              expected_purchase_date: '2020/12/24(木)',
              cycle_type: 'weekly',
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
              payment_user_id: null,
              transaction_auto_add: true,
            },
            {
              id: 2,
              posted_date: '2020-12-24T10:00:00Z',
              updated_date: '2020-12-24T10:00:00Z',
              expected_purchase_date: '2020/12/26(土)',
              cycle_type: 'weekly',
              cycle: null,
              purchase: '鶏肉3kg',
              shop: 'コストコ',
              amount: 1000,
              big_category_id: 2,
              big_category_name: '食費',
              medium_category_id: 6,
              medium_category_name: '食料品',
              custom_category_id: null,
              custom_category_name: null,
              payment_user_id: null,
              transaction_auto_add: true,
            },
          ],
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: [
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
              payment_user_id: null,
              regular_shopping_list_id: 1,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories: [
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
                  payment_user_id: null,
                  regular_shopping_list_id: 1,
                  transaction_auto_add: true,
                  related_transaction_data: null,
                },
              ],
            },
          ],
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: [
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
              payment_user_id: null,
              regular_shopping_list_id: 1,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
            {
              id: 3,
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
              payment_user_id: null,
              regular_shopping_list_id: 2,
              transaction_auto_add: true,
              related_transaction_data: null,
            },
          ],
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories: [
            {
              big_category_name: '食費',
              shopping_list: [
                {
                  id: 3,
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
                  payment_user_id: null,
                  regular_shopping_list_id: 2,
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
                  payment_user_id: null,
                  regular_shopping_list_id: 1,
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

    await addGroupRegularShoppingListItem(
      groupId,
      today,
      currentYearMonth,
      expectedPurchaseDate,
      cycleType,
      cycle,
      purchase,
      shop,
      amount,
      bigCategoryId,
      mediumCategoryId,
      customCategoryId,
      paymentUser,
      transactionAutoAdd,
      signal
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
