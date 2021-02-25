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
import fetchExpiredShoppingListResponse from './fetchExpiredShoppingListResponse/fetchExpiredShoppingListResponse.json';
import fetchTodayShoppingListResponse from './fetchTodayShoppingListResponse/fetchTodayShoppingListResponse.json';
import fetchTodayShoppingListByCategoriesResponse from './fetchTodayShoppingListByCategoriesResponse/fetchTodayShoppingListByCategoriesResponse.json';
import fetchMonthlyShoppingListResponse from './fetchMonthlyShoppingListResponse/fetchMonthlyShoppingListResponse.json';
import fetchMonthlyShoppingListByCategoriesResponse from './fetchMonthlyShoppingListByCategoriesResponse/fetchMonthlyShoppingListByCategoriesResponse.json';
import addShoppingListItemResponse from './addShoppingListItemResponse/addShoppingListItemResponse.json';
import addTodayShoppingListByDateResponse from './addShoppingListItemResponse/addTodayShoppingListByDateResponse.json';
import addTodayShoppingListByCategoriesResponse from './addShoppingListItemResponse/addTodayShoppingListByCategoriesResponse.json';
import addMonthlyShoppingListByDateResponse from './addShoppingListItemResponse/addMonthlyShoppingListByDateResponse.json';
import addMonthlyShoppingListByCategoriesResponse from './addShoppingListItemResponse/addMonthlyShoppingListByCategoriesResponse.json';
import editShoppingListItemResponse from './editShoppingListItemResponse/editShoppingListItemResponse.json';
import editExpiredShoppingListResponse from './editShoppingListItemResponse/editExpiredShoppingListResponse.json';
import editTodayShoppingListByDateResponse from './editShoppingListItemResponse/editTodayShoppingListByDateResponse.json';
import editTodayShoppingListByCategoriesResponse from './editShoppingListItemResponse/editTodayShoppingListByCategoriesResponse.json';
import editMonthlyShoppingListByDateResponse from './editShoppingListItemResponse/editMonthlyShoppingListByDateResponse.json';
import editMonthlyShoppingListByCategoriesResponse from './editShoppingListItemResponse/editMonthlyShoppingListByCategoriesResponse.json';
import deleteShoppingListItemResponse from './deleteShoppingListItemResponse/deleteShoppingListItemResponse.json';
import deleteExpiredShoppingListResponse from './deleteShoppingListItemResponse/deleteExpiredShoppingListResponse.json';
import deleteTodayShoppingListByDateResponse from './deleteShoppingListItemResponse/deleteTodayShoppingListByDateResponse.json';
import deleteTodayShoppingListByCategoriesResponse from './deleteShoppingListItemResponse/deleteTodayShoppingListByCategoriesResponse.json';
import deleteMonthlyShoppingListByDateResponse from './deleteShoppingListItemResponse/deleteMonthlyShoppingListByDateResponse.json';
import deleteMonthlyShoppingListByCategoriesResponse from './deleteShoppingListItemResponse/deleteMonthlyShoppingListByCategoriesResponse.json';
import addRegularShoppingListItemResponse from './addRegularShoppingListItemResponse/addRegularShoppingListItemResponse.json';
import addRegularTodayShoppingListByDateResponse from './addRegularShoppingListItemResponse/addRegularTodayShoppingListByDateResponse.json';
import addRegularTodayShoppingListByCategoriesResponse from './addRegularShoppingListItemResponse/addRegularTodayShoppingListByCategoriesResponse.json';
import addRegularMonthlyShoppingListByDateResponse from './addRegularShoppingListItemResponse/addRegularMonthlyShoppingListByDateResponse.json';
import addRegularMonthlyShoppingListByCategoriesResponse from './addRegularShoppingListItemResponse/addRegularMonthlyShoppingListByCategoriesResponse.json';
import editRegularShoppingListItemResponse from './editRegularShoppingListItemResponse/editRegularShoppingListItemResponse.json';
import editRegularExpiredShoppingListResponse from './editRegularShoppingListItemResponse/editRegularExpiredShoppingListResponse.json';
import editRegularTodayShoppingListByDateResponse from './editRegularShoppingListItemResponse/editRegularTodayShoppingListByDateResponse.json';
import editRegularTodayShoppingListByCategoriesResponse from './editRegularShoppingListItemResponse/editRegularTodayShoppingListByCategoriesResponse.json';
import editRegularMonthlyShoppingListByDateResponse from './editRegularShoppingListItemResponse/editRegularMonthlyShoppingListByDateResponse.json';
import editRegularMonthlyShoppingListByCategoriesResponse from './editRegularShoppingListItemResponse/editRegularMonthlyShoppingListByCategoriesResponse.json';
import deleteRegularShoppingListItemResponse from './deleteRegularShoppingListItemResponse/deleteRegularShoppingListItemResponse.json';
import deleteRegularExpiredShoppingListResponse from './deleteRegularShoppingListItemResponse/deleteRegularExpiredShoppingListResponse.json';
import deleteRegularTodayShoppingListByDateResponse from './deleteRegularShoppingListItemResponse/deleteRegularTodayShoppingListByDateResponse.json';
import deleteRegularTodayShoppingListByCategoriesResponse from './deleteRegularShoppingListItemResponse/deleteRegularTodayShoppingListByCategoriesResponse.json';
import deleteRegularMonthlyShoppingListByDateResponse from './deleteRegularShoppingListItemResponse/deleteRegularMonthlyShoppingListByDateResponse.json';
import deleteRegularMonthlyShoppingListByCategoriesResponse from './deleteRegularShoppingListItemResponse/deleteRegularMonthlyShoppingListByCategoriesResponse.json';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  AddRegularShoppingListItemReq,
  AddShoppingListItemReq,
  EditRegularShoppingListItemReq,
  EditShoppingListItemReq,
} from '../../src/reducks/shoppingList/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ shoppingList: [], modal: [], router: [] });

const getState = () => {
  return {
    shoppingList: {
      regularShoppingListLoading: false,
      regularShoppingList: [
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
          transaction_auto_add: true,
        },
      ],
      regularShoppingListError: {
        message: '',
        statusCode: 0,
      },
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
          regular_shopping_list_id: 1,
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
              regular_shopping_list_id: 1,
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
          regular_shopping_list_id: 1,
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
              regular_shopping_list_id: 1,
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;
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
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';

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

    const addUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list`;
    const fetchTodayByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;

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
          todayShoppingListLoading: false,
          todayShoppingList: addTodayShoppingListByDateResponse.shopping_list,
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories:
            addTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          monthlyShoppingListLoading: false,
          monthlyShoppingList: addMonthlyShoppingListByDateResponse.shopping_list,
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories:
            addMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(200, addShoppingListItemResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, addTodayShoppingListByDateResponse);
    axiosMock.onGet(fetchTodayByCategoriesUrl).reply(200, addTodayShoppingListByCategoriesResponse);
    axiosMock.onGet(fetchMonthlyByDateUrl).reply(200, addMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, addMonthlyShoppingListByCategoriesResponse);

    await addShoppingListItem(
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
      // @ts-ignore
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit shoppingListItem if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';
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

    const editUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${shoppingListItemId}`;
    const fetchExpiredUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`;
    const fetchTodayByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;

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
          expiredShoppingListLoading: false,
          expiredShoppingList: editExpiredShoppingListResponse.expired_shopping_list,
          todayShoppingListLoading: false,
          todayShoppingList: editTodayShoppingListByDateResponse.shopping_list,
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories:
            editTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          monthlyShoppingListLoading: false,
          monthlyShoppingList: editMonthlyShoppingListByDateResponse.shopping_list,
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories:
            editMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, editExpiredShoppingListResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, editTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, editTodayShoppingListByCategoriesResponse);
    axiosMock.onGet(fetchMonthlyByDateUrl).reply(200, editMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, editMonthlyShoppingListByCategoriesResponse);

    await editShoppingListItem(
      shoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete shoppingListItem if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';
    const shoppingListItemId = 1;

    const deleteUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${shoppingListItemId}`;
    const fetchExpiredUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`;
    const fetchTodayByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;

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
          expiredShoppingListLoading: false,
          expiredShoppingList: deleteExpiredShoppingListResponse.expired_shopping_list,
          todayShoppingListLoading: false,
          todayShoppingList: deleteTodayShoppingListByDateResponse.shopping_list,
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories:
            deleteTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          monthlyShoppingListLoading: false,
          monthlyShoppingList: deleteMonthlyShoppingListByDateResponse.shopping_list,
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories:
            deleteMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
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

    axiosMock.onDelete(deleteUrl).reply(200, deleteShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, deleteExpiredShoppingListResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, deleteTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, deleteTodayShoppingListByCategoriesResponse);
    axiosMock.onGet(fetchMonthlyByDateUrl).reply(200, deleteMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, deleteMonthlyShoppingListByCategoriesResponse);

    await deleteShoppingListItem(
      shoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add regularShoppingListItem if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';

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

    const addRegularUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular`;
    const fetchTodayByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;

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
          regularShoppingListLoading: false,
          regularShoppingList: addRegularTodayShoppingListByDateResponse.regular_shopping_list,
          todayShoppingListLoading: false,
          todayShoppingList: addRegularTodayShoppingListByDateResponse.shopping_list,
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories:
            addRegularTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          monthlyShoppingListLoading: false,
          monthlyShoppingList: addRegularMonthlyShoppingListByDateResponse.shopping_list,
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories:
            addRegularMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onPost(addRegularUrl).reply(200, addRegularShoppingListItemResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, addRegularTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, addRegularTodayShoppingListByCategoriesResponse);
    axiosMock.onGet(fetchMonthlyByDateUrl).reply(200, addRegularMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, addRegularMonthlyShoppingListByCategoriesResponse);

    await addRegularShoppingListItem(
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit regularShoppingListItem if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';
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

    const editRegularUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular/${regularShoppingListItemId}`;
    const fetchExpiredUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`;
    const fetchTodayByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;

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
          regularShoppingListLoading: false,
          regularShoppingList: editRegularTodayShoppingListByDateResponse.regular_shopping_list,
          expiredShoppingListLoading: false,
          expiredShoppingList: editRegularExpiredShoppingListResponse.expired_shopping_list,
          todayShoppingListLoading: false,
          todayShoppingList: editRegularTodayShoppingListByDateResponse.shopping_list,
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories:
            editRegularTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          monthlyShoppingListLoading: false,
          monthlyShoppingList: editRegularMonthlyShoppingListByDateResponse.shopping_list,
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories:
            editRegularMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onPut(editRegularUrl).reply(200, editRegularShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, editRegularExpiredShoppingListResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, editRegularTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, editRegularTodayShoppingListByCategoriesResponse);
    axiosMock.onGet(fetchMonthlyByDateUrl).reply(200, editRegularMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, editRegularMonthlyShoppingListByCategoriesResponse);

    await editRegularShoppingListItem(
      regularShoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete regularShoppingListItem if fetch succeeds', async () => {
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';
    const regularShoppingListItemId = 1;

    const deleteRegularUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular/${regularShoppingListItemId}`;
    const fetchExpiredUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`;
    const fetchTodayByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`;

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
          regularShoppingListLoading: false,
          regularShoppingList: deleteRegularTodayShoppingListByDateResponse.regular_shopping_list,
          expiredShoppingListLoading: false,
          expiredShoppingList: deleteRegularExpiredShoppingListResponse.expired_shopping_list,
          todayShoppingListLoading: false,
          todayShoppingList: deleteRegularTodayShoppingListByDateResponse.shopping_list,
          todayShoppingListByCategoriesLoading: false,
          todayShoppingListByCategories:
            deleteRegularTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          monthlyShoppingListLoading: false,
          monthlyShoppingList: deleteRegularMonthlyShoppingListByDateResponse.shopping_list,
          monthlyShoppingListByCategoriesLoading: false,
          monthlyShoppingListByCategories:
            deleteRegularMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
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

    axiosMock.onDelete(deleteRegularUrl).reply(200, deleteRegularShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, deleteRegularExpiredShoppingListResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, deleteRegularTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, deleteRegularTodayShoppingListByCategoriesResponse);
    axiosMock
      .onGet(fetchMonthlyByDateUrl)
      .reply(200, deleteRegularMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, deleteRegularMonthlyShoppingListByCategoriesResponse);

    await deleteRegularShoppingListItem(
      regularShoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
