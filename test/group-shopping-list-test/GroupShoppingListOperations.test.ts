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
import fetchGroupExpiredShoppingListResponse from './fetchGroupExpiredShoppingListResponse.json';
import fetchGroupTodayShoppingListResponse from './fetchGroupTodayShoppingListResponse.json';
import fetchGroupTodayShoppingListByCategoriesResponse from './fetchGroupTodayShoppingListByCategoriesResponse.json';
import fetchGroupMonthlyShoppingListResponse from './fetchGroupMonthlyShoppingListResponse.json';
import fetchGroupMonthlyShoppingListByCategoriesResponse from './fetchGroupMonthlyShoppingListByCategoriesResponse.json';
import addGroupShoppingListItemResponse from './addGroupShoppingListItemResponse.json';
import editGroupShoppingListItemResponse from './editGroupShoppingListItemResponse.json';
import deleteGroupShoppingListItemResponse from './deleteGroupShoppingListItemResponse.json';
import addGroupRegularShoppingListItemResponse from './addGroupRegularShoppingListItemResponse.json';
import editGroupRegularShoppingListItemResponse from './editGroupRegularShoppingListItemResponse.json';
import deleteGroupRegularShoppingListItemResponse from './deleteGroupRegularShoppingListItemResponse.json';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  AddGroupRegularShoppingListItemReq,
  AddGroupShoppingListItemReq,
  EditGroupRegularShoppingListItemReq,
  EditGroupShoppingListItemReq,
} from '../../src/reducks/groupShoppingList/types';
import { todoServiceInstance } from '../../src/reducks/axiosConfig';
import { date } from '../../src/lib/constant';

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

    const url = `/groups/${groupId}/shopping-list/${shoppingListItemId}`;

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
          groupShoppingListItem: editGroupShoppingListItemResponse,
        },
      },
    ];

    axiosMock.onPut(url).reply(200, editGroupShoppingListItemResponse);

    await editGroupShoppingListItem(groupId, shoppingListItemId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete groupShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const shoppingListItemId = 1;

    const url = `/groups/${groupId}/shopping-list/${shoppingListItemId}`;

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
          groupShoppingListItem: {
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
            payment_user_id: null,
            transaction_auto_add: false,
            related_transaction_data: null,
          },
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

    axiosMock.onDelete(url).reply(200, deleteGroupShoppingListItemResponse);

    await deleteGroupShoppingListItem(groupId, shoppingListItemId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add groupRegularShoppingListItem and groupShoppingList if fetch succeeds', async () => {
    const groupId = 1;

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

    const url = `/groups/${groupId}/shopping-list/regular`;

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
          groupRegularShoppingListItem:
            addGroupRegularShoppingListItemResponse.regular_shopping_item,
        },
      },
    ];

    axiosMock.onPost(url).reply(200, addGroupRegularShoppingListItemResponse);

    await addGroupRegularShoppingListItem(groupId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit groupRegularShoppingListItem and groupShoppingList if fetch succeeds', async () => {
    const groupId = 1;
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

    const url = `/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`;

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
          groupRegularShoppingListItem:
            editGroupRegularShoppingListItemResponse.regular_shopping_item,
        },
      },
    ];

    axiosMock.onPut(url).reply(200, editGroupRegularShoppingListItemResponse);

    await editGroupRegularShoppingListItem(
      groupId,
      regularShoppingListItemId,
      requestData
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete regularShoppingListItem if fetch succeeds', async () => {
    const groupId = 1;
    const regularShoppingListItemId = 1;

    const url = `/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`;

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
          groupRegularShoppingListItem: {
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
            payment_user_id: null,
            transaction_auto_add: false,
          },
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

    axiosMock.onDelete(url).reply(200, deleteGroupRegularShoppingListItemResponse);

    await deleteGroupRegularShoppingListItem(groupId, regularShoppingListItemId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
