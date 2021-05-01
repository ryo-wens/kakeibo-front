import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  addGroupRegularShoppingListItem,
  addGroupShoppingListItem,
  deleteGroupRegularShoppingListItem,
  deleteGroupShoppingListItem,
  editGroupRegularShoppingListItem,
  editGroupShoppingListItem,
  fetchGroupExpiredShoppingList,
  fetchGroupMonthlyShoppingList,
  fetchGroupMonthlyShoppingListByCategories,
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../src/reducks/groupShoppingList/operations';
import axios from 'axios';
import * as GroupShoppingListActions from '../../src/reducks/groupShoppingList/actions';
import fetchGroupExpiredShoppingListResponse from './fetchGroupExpiredShoppingListResponse/fetchGroupExpiredShoppingListResponse.json';
import fetchGroupTodayShoppingListResponse from './fetchGroupTodayShoppingListResponse/fetchGroupTodayShoppingListResponse.json';
import fetchGroupTodayShoppingListByCategoriesResponse from './fetchGroupTodayShoppingListByCategoriesResponse/fetchGroupTodayShoppingListByCategoriesResponse.json';
import fetchGroupMonthlyShoppingListResponse from './fetchGroupMonthlyShoppingListResponse/fetchGroupMonthlyShoppingListResponse.json';
import fetchGroupMonthlyShoppingListByCategoriesResponse from './fetchGroupMonthlyShoppingListByCategoriesResponse/fetchGroupMonthlyShoppingListByCategoriesResponse.json';
import addGroupShoppingListItemResponse from './addGroupShoppingListItemResponse.json';
import editGroupShoppingListItemResponse from './editGroupShoppingListItemResponse/editGroupShoppingListItemResponse.json';
import editGroupExpiredShoppingListResponse from './editGroupShoppingListItemResponse/editGroupExpiredShoppingListResponse.json';
import editGroupTodayShoppingListByDateResponse from './editGroupShoppingListItemResponse/editGroupTodayShoppingListByDateResponse.json';
import editGroupTodayShoppingListByCategoriesResponse from './editGroupShoppingListItemResponse/editGroupTodayShoppingListByCategoriesResponse.json';
import editGroupMonthlyShoppingListByDateResponse from './editGroupShoppingListItemResponse/editGroupMonthlyShoppingListByDateResponse.json';
import editGroupMonthlyShoppingListByCategoriesResponse from './editGroupShoppingListItemResponse/editGroupMonthlyShoppingListByCategoriesResponse.json';
import deleteGroupShoppingListItemResponse from './deleteGroupShoppingListItemResponse/deleteGroupShoppingListItemResponse.json';
import deleteGroupExpiredShoppingListResponse from './deleteGroupShoppingListItemResponse/deleteGroupExpiredShoppingListResponse.json';
import deleteGroupTodayShoppingListByDateResponse from './deleteGroupShoppingListItemResponse/deleteGroupTodayShoppingListByDateResponse.json';
import deleteGroupTodayShoppingListByCategoriesResponse from './deleteGroupShoppingListItemResponse/deleteGroupTodayShoppingListByCategoriesResponse.json';
import deleteGroupMonthlyShoppingListByDateResponse from './deleteGroupShoppingListItemResponse/deleteGroupMonthlyShoppingListByDateResponse.json';
import deleteGroupMonthlyShoppingListByCategoriesResponse from './deleteGroupShoppingListItemResponse/deleteGroupMonthlyShoppingListByCategoriesResponse.json';
import addGroupRegularShoppingListItemResponse from './addGroupRegularShoppingListItemResponse/addGroupRegularShoppingListItemResponse.json';
import addGroupRegularTodayShoppingListByDateResponse from './addGroupRegularShoppingListItemResponse/addGroupRegularTodayShoppingListByDateResponse.json';
import addGroupRegularTodayShoppingListByCategoriesResponse from './addGroupRegularShoppingListItemResponse/addGroupRegularTodayShoppingListByCategoriesResponse.json';
import addGroupRegularMonthlyShoppingListByDateResponse from './addGroupRegularShoppingListItemResponse/addGroupRegularMonthlyShoppingListByDateResponse.json';
import addGroupRegularMonthlyShoppingListByCategoriesResponse from './addGroupRegularShoppingListItemResponse/addGroupRegularMonthlyShoppingListByCategoriesResponse.json';
import editGroupRegularShoppingListItemResponse from './editGroupRegularShoppingListItemResponse/editGroupRegularShoppingListItemResponse.json';
import editGroupRegularExpiredShoppingListResponse from './editGroupRegularShoppingListItemResponse/editGroupRegularExpiredShoppingListResponse.json';
import editGroupRegularTodayShoppingListByDateResponse from './editGroupRegularShoppingListItemResponse/editGroupRegularTodayShoppingListByDateResponse.json';
import editGroupRegularTodayShoppingListByCategoriesResponse from './editGroupRegularShoppingListItemResponse/editGroupRegularTodayShoppingListByCategoriesResponse.json';
import editGroupRegularMonthlyShoppingListByDateResponse from './editGroupRegularShoppingListItemResponse/editGroupRegularMonthlyShoppingListByDateResponse.json';
import editGroupRegularMonthlyShoppingListByCategoriesResponse from './editGroupRegularShoppingListItemResponse/editGroupRegularMonthlyShoppingListByCategoriesResponse.json';
import deleteGroupRegularShoppingListItemResponse from './deleteGroupRegularShoppingListItemResponse/deleteGroupRegularShoppingListItemResponse.json';
import deleteGroupRegularExpiredShoppingListResponse from './deleteGroupRegularShoppingListItemResponse/deleteGroupRegularExpiredShoppingListResponse.json';
import deleteGroupRegularTodayShoppingListByDateResponse from './deleteGroupRegularShoppingListItemResponse/deleteGroupRegularTodayShoppingListByDateResponse.json';
import deleteGroupRegularTodayShoppingListByCategoriesResponse from './deleteGroupRegularShoppingListItemResponse/deleteGroupRegularTodayShoppingListByCategoriesResponse.json';
import deleteGroupRegularMonthlyShoppingListByDateResponse from './deleteGroupRegularShoppingListItemResponse/deleteGroupRegularMonthlyShoppingListByDateResponse.json';
import deleteGroupRegularMonthlyShoppingListByCategoriesResponse from './deleteGroupRegularShoppingListItemResponse/deleteGroupRegularMonthlyShoppingListByCategoriesResponse.json';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  AddGroupRegularShoppingListItemReq,
  AddGroupShoppingListItemReq,
  EditGroupRegularShoppingListItemReq,
  EditGroupShoppingListItemReq,
} from '../../src/reducks/groupShoppingList/types';
import { todoServiceInstance } from '../../src/reducks/axiosConfig';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ groupShoppingList: [], modal: [], router: [] });

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

  it('get groupExpiredShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const url = `/groups/${groupId}/shopping-list/expired`;

    const signal = axios.CancelToken.source();

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
          groupExpiredShoppingList: fetchGroupExpiredShoppingListResponse.expired_shopping_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchGroupExpiredShoppingListResponse);

    // @ts-ignore
    await fetchGroupExpiredShoppingList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupTodayShoppingList and groupRegularShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`;

    const signal = axios.CancelToken.source();

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
          groupRegularShoppingList: fetchGroupTodayShoppingListResponse.regular_shopping_list,
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: fetchGroupTodayShoppingListResponse.shopping_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchGroupTodayShoppingListResponse);

    // @ts-ignore
    await fetchGroupTodayShoppingList(groupId, year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupTodayShoppingListByCategories and groupRegularShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const date = '24';
    const url = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`;
    const signal = axios.CancelToken.source();

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
          groupRegularShoppingList:
            fetchGroupTodayShoppingListByCategoriesResponse.regular_shopping_list,
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories:
            fetchGroupTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchGroupTodayShoppingListByCategoriesResponse);

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
    const url = `/groups/${groupId}/shopping-list/${year}-${month}/daily`;

    const signal = axios.CancelToken.source();

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
          groupRegularShoppingList: fetchGroupMonthlyShoppingListResponse.regular_shopping_list,
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: fetchGroupMonthlyShoppingListResponse.shopping_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchGroupMonthlyShoppingListResponse);

    // @ts-ignore
    await fetchGroupMonthlyShoppingList(groupId, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupMonthlyShoppingListByCategories and groupRegularShoppingList if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const url = `/groups/${groupId}/shopping-list/${year}-${month}/categories`;
    const signal = axios.CancelToken.source();

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
          groupRegularShoppingList:
            fetchGroupMonthlyShoppingListByCategoriesResponse.regular_shopping_list,
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories:
            fetchGroupMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchGroupMonthlyShoppingListByCategoriesResponse);

    // @ts-ignore
    await fetchGroupMonthlyShoppingListByCategories(groupId, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add groupShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;

    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const paymentUserId = null;
    const transactionAutoAdd = true;

    const requestData: AddGroupShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      payment_user_id: paymentUserId,
      transaction_auto_add: transactionAutoAdd,
    };

    const url = `/groups/${groupId}/shopping-list`;

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
          groupShoppingListItem: addGroupShoppingListItemResponse,
        },
      },
    ];

    axiosMock.onPost(url).reply(200, addGroupShoppingListItemResponse);

    await addGroupShoppingListItem(groupId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit groupShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';

    const shoppingListItemId = 1;
    const expectedPurchaseDate = new Date('2020-12-26T10:00:00');
    const checked = true;
    const purchase = '鶏肉3kg';
    const shop = 'コストコ';
    const amount = 1000;
    const bigCategoryId = 2;
    const mediumCategoryId = 6;
    const customCategoryId = null;
    const regularShoppingListId = 1;
    const paymentUserId = 'furusawa';
    const transactionAutoAdd = true;
    const relatedTransactionData = null;

    const requestData: EditGroupShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      complete_flag: checked,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      regular_shopping_list_id: regularShoppingListId,
      payment_user_id: paymentUserId,
      transaction_auto_add: transactionAutoAdd,
      related_transaction_data: relatedTransactionData,
    };

    const editUrl = `/groups/${groupId}/shopping-list/${shoppingListItemId}`;
    const fetchExpiredUrl = `/groups/${groupId}/shopping-list/expired`;
    const fetchTodayByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}/categories`;

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
          groupExpiredShoppingList: editGroupExpiredShoppingListResponse.expired_shopping_list,
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: editGroupTodayShoppingListByDateResponse.shopping_list,
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories:
            editGroupTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: editGroupMonthlyShoppingListByDateResponse.shopping_list,
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories:
            editGroupMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editGroupShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, editGroupExpiredShoppingListResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, editGroupTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, editGroupTodayShoppingListByCategoriesResponse);
    axiosMock.onGet(fetchMonthlyByDateUrl).reply(200, editGroupMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, editGroupMonthlyShoppingListByCategoriesResponse);

    await editGroupShoppingListItem(
      groupId,
      shoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete groupShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';

    const shoppingListItemId = 1;

    const deleteUrl = `/groups/${groupId}/shopping-list/${shoppingListItemId}`;
    const fetchExpiredUrl = `/groups/${groupId}/shopping-list/expired`;
    const fetchTodayByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}/categories`;

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
          groupExpiredShoppingList: deleteGroupExpiredShoppingListResponse.expired_shopping_list,
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: deleteGroupTodayShoppingListByDateResponse.shopping_list,
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories:
            deleteGroupTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: deleteGroupMonthlyShoppingListByDateResponse.shopping_list,
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories:
            deleteGroupMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteGroupShoppingListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deleteGroupShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, deleteGroupExpiredShoppingListResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, deleteGroupTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, deleteGroupTodayShoppingListByCategoriesResponse);
    axiosMock.onGet(fetchMonthlyByDateUrl).reply(200, deleteGroupMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, deleteGroupMonthlyShoppingListByCategoriesResponse);

    await deleteGroupShoppingListItem(
      groupId,
      shoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add groupRegularShoppingListItem and groupShoppingList if fetch succeeds', async () => {
    const groupId = 1;
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
    const paymentUserId = null;
    const transactionAutoAdd = true;

    const requestData: AddGroupRegularShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      cycle_type: cycleType,
      cycle: cycle,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      payment_user_id: paymentUserId,
      transaction_auto_add: transactionAutoAdd,
    };

    const addRegularUrl = `/groups/${groupId}/shopping-list/regular`;
    const fetchTodayByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}/categories`;

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
          groupRegularShoppingList:
            addGroupRegularTodayShoppingListByDateResponse.regular_shopping_list,
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: addGroupRegularTodayShoppingListByDateResponse.shopping_list,
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories:
            addGroupRegularTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: addGroupRegularMonthlyShoppingListByDateResponse.shopping_list,
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories:
            addGroupRegularMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onPost(addRegularUrl).reply(200, addGroupRegularShoppingListItemResponse);
    axiosMock.onGet(fetchTodayByDateUrl).reply(200, addGroupRegularTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, addGroupRegularTodayShoppingListByCategoriesResponse);
    axiosMock
      .onGet(fetchMonthlyByDateUrl)
      .reply(200, addGroupRegularMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, addGroupRegularMonthlyShoppingListByCategoriesResponse);

    await addGroupRegularShoppingListItem(
      groupId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit groupRegularShoppingListItem and groupShoppingList if fetch succeeds', async () => {
    const groupId = 1;
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
    const paymentUserId = null;
    const transactionAutoAdd = true;

    const requestData: EditGroupRegularShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      cycle_type: cycleType,
      cycle: cycle,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      payment_user_id: paymentUserId,
      transaction_auto_add: transactionAutoAdd,
    };

    const editRegularUrl = `/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`;
    const fetchExpiredUrl = `/groups/${groupId}/shopping-list/expired`;
    const fetchTodayByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}/categories`;

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          groupRegularShoppingListLoading: true,
          groupExpiredShoppingListLoading: true,
          groupTodayShoppingListLoading: true,
          groupTodayShoppingListByCategoriesLoading: true,
          groupMonthlyShoppingListLoading: true,
          groupMonthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.EDIT_GROUP_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          groupRegularShoppingListLoading: false,
          groupRegularShoppingList:
            editGroupRegularTodayShoppingListByDateResponse.regular_shopping_list,
          groupExpiredShoppingListLoading: false,
          groupExpiredShoppingList:
            editGroupRegularExpiredShoppingListResponse.expired_shopping_list,
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: editGroupRegularTodayShoppingListByDateResponse.shopping_list,
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories:
            editGroupRegularTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList: editGroupRegularMonthlyShoppingListByDateResponse.shopping_list,
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories:
            editGroupRegularMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
    ];

    axiosMock.onPut(editRegularUrl).reply(200, editGroupRegularShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, editGroupRegularExpiredShoppingListResponse);
    axiosMock
      .onGet(fetchTodayByDateUrl)
      .reply(200, editGroupRegularTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, editGroupRegularTodayShoppingListByCategoriesResponse);
    axiosMock
      .onGet(fetchMonthlyByDateUrl)
      .reply(200, editGroupRegularMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, editGroupRegularMonthlyShoppingListByCategoriesResponse);

    await editGroupRegularShoppingListItem(
      groupId,
      regularShoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete regularShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '12';
    const date = '24';
    const currentYear = '2020';
    const currentMonth = '12';
    const regularShoppingListItemId = 1;

    const deleteRegularUrl = `/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`;
    const fetchExpiredUrl = `/groups/${groupId}/shopping-list/expired`;
    const fetchTodayByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`;
    const fetchTodayByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`;
    const fetchMonthlyByDateUrl = `/groups/${groupId}/shopping-list/${year}-${month}/daily`;
    const fetchMonthlyByCategoriesUrl = `/groups/${groupId}/shopping-list/${year}-${month}/categories`;

    const expectedAction = [
      {
        type: GroupShoppingListActions.START_DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          groupRegularShoppingListLoading: true,
          groupExpiredShoppingListLoading: true,
          groupTodayShoppingListLoading: true,
          groupTodayShoppingListByCategoriesLoading: true,
          groupMonthlyShoppingListLoading: true,
          groupMonthlyShoppingListByCategoriesLoading: true,
        },
      },
      {
        type: GroupShoppingListActions.DELETE_GROUP_REGULAR_SHOPPING_LIST_ITEM,
        payload: {
          groupRegularShoppingListLoading: false,
          groupRegularShoppingList:
            deleteGroupRegularTodayShoppingListByDateResponse.regular_shopping_list,
          groupExpiredShoppingListLoading: false,
          groupExpiredShoppingList:
            deleteGroupRegularExpiredShoppingListResponse.expired_shopping_list,
          groupTodayShoppingListLoading: false,
          groupTodayShoppingList: deleteGroupRegularTodayShoppingListByDateResponse.shopping_list,
          groupTodayShoppingListByCategoriesLoading: false,
          groupTodayShoppingListByCategories:
            deleteGroupRegularTodayShoppingListByCategoriesResponse.shopping_list_by_categories,
          groupMonthlyShoppingListLoading: false,
          groupMonthlyShoppingList:
            deleteGroupRegularMonthlyShoppingListByDateResponse.shopping_list,
          groupMonthlyShoppingListByCategoriesLoading: false,
          groupMonthlyShoppingListByCategories:
            deleteGroupRegularMonthlyShoppingListByCategoriesResponse.shopping_list_by_categories,
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteGroupRegularShoppingListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(deleteRegularUrl).reply(200, deleteGroupRegularShoppingListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, deleteGroupRegularExpiredShoppingListResponse);
    axiosMock
      .onGet(fetchTodayByDateUrl)
      .reply(200, deleteGroupRegularTodayShoppingListByDateResponse);
    axiosMock
      .onGet(fetchTodayByCategoriesUrl)
      .reply(200, deleteGroupRegularTodayShoppingListByCategoriesResponse);
    axiosMock
      .onGet(fetchMonthlyByDateUrl)
      .reply(200, deleteGroupRegularMonthlyShoppingListByDateResponse);
    axiosMock
      .onGet(fetchMonthlyByCategoriesUrl)
      .reply(200, deleteGroupRegularMonthlyShoppingListByCategoriesResponse);

    await deleteGroupRegularShoppingListItem(
      groupId,
      regularShoppingListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
