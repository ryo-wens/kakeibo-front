import * as actionTypes from '../../src/reducks/groupTransactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { GroupTransactionsReq } from '../../src/reducks/groupTransactions/types';
import { SelectYears } from '../../src/lib/date';
import {
  fetchGroupTransactionsList,
  fetchLatestGroupTransactionsList,
  addGroupTransactions,
  editGroupTransactions,
  deleteGroupTransactions,
  fetchGroupAccount,
  fetchGroupYearlyAccountList,
  fetchGroupYearlyAccountListForModal,
  addGroupAccount,
  editGroupAccount,
  deleteGroupAccount,
  searchGroupTransactions,
} from '../../src/reducks/groupTransactions/operations';
import groupTransactions from './groupTransactions.json';
import groupLatestTransactions from './groupLatestTransactions.json';
import addResponse from './addResponse.json';
import addedGroupTransactions from './addedGroupTransactions.json';
import addedGroupLatestTransactions from './addedGroupLatestTransactions.json';
import editResponse from './editResponse.json';
import editedGroupTransaction from './editedGroupTransactions.json';
import editedGroupLatestTransactions from './editedGroupLatestTransactions.json';
import deleteResponse from './deleteResponse.json';
import deletedGroupLatestTransaction from './deletedGroupLatestTransactions.json';
import groupAccountList from './groupAccountList.json';
import editGroupAccountList from './editGroupAccoountPayload.json';
import editGroupAccountResponse from './editGroupAccountResponse.json';
import deleteAccountResponse from './deleteGroupAccountResponse.json';
import searchGroupTransactionsRes from './fetchSearchGroupTransactionsResponse.json';
import groupYearlyAccountListRes from './groupYearlyAccountList.json';
import groupYearlyAccountListForModalRes from './groupYearlyAccountListForModal.json';
import deleteGroupYearlyAccountListRes from './deletedYearlyAccountList.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions groupTransactions', () => {
  it('Get groupTransactionsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const mockResponse = groupTransactions;

    const store = mockStore({ groupTransactions: { groupTransactionsList: [] } });

    const groupId = 1;

    const years: SelectYears = {
      selectedYear: '2020',
      selectedMonth: '11',
    };

    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${years.selectedYear}-${years.selectedMonth}`;
    const signal = axios.CancelToken.source();

    const expectedAddActions = [
      {
        type: actionTypes.START_FETCH_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: false,
          groupTransactionsList: mockResponse.transactions_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupTransactionsList(groupId, years, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAddActions);
  });

  it('Get groupLatestTransactionsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const mockResponse = groupLatestTransactions;

    const store = mockStore({ groupTransactions: { groupLatestTransactionsList: [] } });

    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`;
    const signal = axios.CancelToken.source();

    const expectedAddActions = [
      {
        type: actionTypes.START_FETCH_GROUP_LATEST_TRANSACTIONS,
        payload: {
          groupLatestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_GROUP_LATEST_TRANSACTIONS,
        payload: {
          groupLatestTransactionsListLoading: false,
          groupLatestTransactionsList: mockResponse.transactions_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchLatestGroupTransactionsList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAddActions);
  });

  it('Add groupTransaction in groupTransactionsList and groupLatestTransactionsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({
      groupTransactions: { groupLatestTransactionsList: groupLatestTransactions },
    });

    const groupId = 1;
    const year = 2020;
    const month = '11';
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${month}`;
    const fetchLatestUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`;

    let now: Date;
    let spiedDate: Date;
    const originalDate = Date;
    now = new originalDate('2020-11-12T23:54:59Z');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
    const actual = new Date();

    // @ts-ignore
    spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
      if (arg === 0 || arg) {
        return new originalDate();
      }
      return now;
    });

    afterAll(() => {
      // @ts-ignore
      spiedDate.mockRestore();
    });

    const addGroupTransactionResponse = addResponse;
    const addedGroupTransactionsList = addedGroupTransactions.transactions_list;
    const addedGroupLatestTransactionsList = addedGroupLatestTransactions.transactions_list;

    const requestData: GroupTransactionsReq = {
      transaction_type: 'expense',
      transaction_date: actual,
      shop: 'ビッグカメラ',
      memo: 'コーヒーメーカー',
      amount: 20000,
      payment_user_id: 'taira',
      big_category_id: 3,
      medium_category_id: 17,
      custom_category_id: null,
    };

    const expectedActions = [
      {
        type: actionTypes.START_ADD_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: true,
          groupLatestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.ADD_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: false,
          groupTransactionsList: addedGroupTransactionsList,
          groupLatestTransactionsListLoading: false,
          groupLatestTransactionsList: addedGroupLatestTransactionsList,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(201, addGroupTransactionResponse);
    axiosMock.onGet(fetchUrl).reply(200, addedGroupTransactions);
    axiosMock.onGet(fetchLatestUrl).reply(200, addedGroupLatestTransactions);

    await addGroupTransactions(groupId, signal, year, month, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Edit groupTransactions in groupTransactionsList and groupLatestTransactionsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({
      groupTransactions: { groupTransactionsList: addedGroupTransactions },
    });

    let now: Date;
    let spiedDate: Date;
    const originalDate = Date;
    now = new originalDate('2020-11-12T23:54:59Z');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
    const actual = new Date();

    // @ts-ignore
    spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
      if (arg === 0 || arg) {
        return new originalDate();
      }
      return now;
    });

    afterAll(() => {
      // @ts-ignore
      spiedDate.mockRestore();
    });

    const id = 101;
    const groupId = 1;
    const year = 2020;
    const month = '11';
    const signal = axios.CancelToken.source();
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${month}`;
    const fetchLatestUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`;

    const requestData: GroupTransactionsReq = {
      transaction_type: 'expense',
      transaction_date: actual,
      shop: 'ニトリ',
      memo: 'テーブル',
      amount: 8000,
      payment_user_id: 'taira',
      big_category_id: 3,
      medium_category_id: 16,
      custom_category_id: null,
    };

    const editGroupTransactionResponse = editResponse;
    const editedGroupTransactionsList = editedGroupTransaction.transactions_list;
    const editedGroupLatestTransactionsList = editedGroupLatestTransactions.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.START_EDIT_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: true,
          groupLatestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.EDIT_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: false,
          groupTransactionsList: editedGroupTransactionsList,
          groupLatestTransactionsListLoading: false,
          groupLatestTransactionsList: editedGroupLatestTransactionsList,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editGroupTransactionResponse);
    axiosMock.onGet(fetchUrl).reply(200, editedGroupTransaction);
    axiosMock.onGet(fetchLatestUrl).reply(200, editedGroupLatestTransactions);

    await editGroupTransactions(id, groupId, signal, year, month, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Delete groupTransactions in groupTransactionsList and groupLatestTransactionsList if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: { groupTransactionsList: editedGroupTransaction },
    });
    beforeEach(() => {
      store.clearActions();
    });

    const id = 101;
    const groupId = 1;
    const year = 2020;
    const month = '11';
    const signal = axios.CancelToken.source();
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${month}`;
    const fetchLatestUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`;

    const deleteGroupTransactionsResponse = deleteResponse.message;

    const deletedGroupTransactionsList = groupTransactions.transactions_list;
    const deletedGroupLatestTransactionsList = deletedGroupLatestTransaction.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.START_DELETE_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: true,
          groupLatestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.DELETE_GROUP_TRANSACTIONS,
        payload: {
          groupTransactionsListLoading: false,
          groupTransactionsList: deletedGroupTransactionsList,
          groupLatestTransactionsListLoading: false,
          groupLatestTransactionsList: deletedGroupLatestTransactionsList,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deleteGroupTransactionsResponse);
    axiosMock.onGet(fetchUrl).reply(200, groupTransactions);
    axiosMock.onGet(fetchLatestUrl).reply(200, deletedGroupLatestTransaction);

    // @ts-ignore
    await deleteGroupTransactions(id, groupId, signal, year, month)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Get groupAccountList  if fetch succeeds', async () => {
    const store = mockStore({ groupTransactions: { groupAccountList: [] } });

    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const year = 2020;
    const customMonth = '11';
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;

    const mockResponse = groupAccountList;

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_GROUP_ACCOUNT,
        payload: {
          groupAccountListLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_GROUP_ACCOUNT,
        payload: {
          groupAccountListLoading: false,
          groupAccountList: mockResponse,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupAccount(groupId, year, customMonth, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Post groupAccountList  if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: { groupAccountList: groupAccountList },
    });

    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const year = '2020';
    const customMonth = '11';
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;
    const fetchAccountUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;
    const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`;

    const addedAccountList = groupAccountList;
    const addedAccountYearlyList = groupYearlyAccountListRes;

    const expectedActions = [
      {
        type: actionTypes.START_ADD_GROUP_ACCOUNT,
        payload: {
          groupAccountListLoading: true,
          groupYearlyAccountListLoading: true,
        },
      },
      {
        type: actionTypes.ADD_GROUP_ACCOUNT,
        payload: {
          groupAccountListLoading: false,
          groupAccountList: addedAccountList,
          groupYearlyAccountListLoading: false,
          groupYearlyAccountList: addedAccountYearlyList,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(201, addedAccountList);
    axiosMock.onGet(fetchAccountUrl).reply(200, groupAccountList);
    axiosMock.onGet(fetchYearlyUrl).reply(200, groupYearlyAccountListRes);

    // @ts-ignore
    await addGroupAccount(groupId, year, customMonth, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Edit groupAccountList  if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: { groupAccountList: groupAccountList },
    });

    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const year = '2020';
    const customMonth = '11';
    const editAccountId = 14;
    const signal = axios.CancelToken.source();
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account/${editAccountId}`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;

    const requestData = {
      id: 14,
      group_id: 1,
      month: '2020-11-01T00:00:00Z',
      payer_user_id: 'test4',
      recipient_user_id: 'anraku',
      payment_amount: 19000,
      payment_confirmation: true,
      receipt_confirmation: false,
    };

    const expectedActions = [
      {
        type: actionTypes.START_EDIT_GROUP_ACCOUNT,
        payload: {
          groupAccountListLoading: true,
        },
      },
      {
        type: actionTypes.EDIT_GROUP_ACCOUNT,
        payload: {
          groupAccountListLoading: false,
          groupAccountList: editGroupAccountList,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editGroupAccountResponse);
    axiosMock.onGet(fetchUrl).reply(200, editGroupAccountList);

    // @ts-ignore
    await editGroupAccount(requestData, groupId, year, customMonth, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Delete groupAccountList  if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: {
        groupAccountList: editGroupAccountList,
        groupYearlyAccountList: groupYearlyAccountListRes,
      },
    });

    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const year = '2020';
    const customMonth = '11';
    const signal = axios.CancelToken.source();
    const deleteUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;
    const fetchAccountUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;
    const fetchYearlyUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`;

    const deletedAccountListMessage = deleteAccountResponse;
    const deletedYearlyAccountList = deleteGroupYearlyAccountListRes;
    const deletedAccountList = {
      groupAccountList: {
        group_id: 0,
        month: '',
        group_total_payment_amount: 0,
        group_average_payment_amount: 0,
        group_remaining_amount: 0,
        group_accounts_list_by_payer: [],
      },
    };

    const expectActions = [
      {
        type: actionTypes.START_DELETE_GROUP_ACCOUNT,
        payload: {
          groupAccountListLoading: true,
          groupYearlyAccountListLoading: true,
        },
      },
      {
        type: actionTypes.DELETE_GROUP_ACCOUNT,
        payload: {
          deletedMessage: deletedAccountListMessage.message,
          groupAccountListLoading: false,
          groupAccountList: deletedAccountList.groupAccountList,
          groupYearlyAccountListLoading: false,
          groupYearlyAccountList: deletedYearlyAccountList,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deletedAccountListMessage);
    axiosMock.onGet(fetchAccountUrl).reply(200, deletedAccountList.groupAccountList);
    axiosMock.onGet(fetchYearlyUrl).reply(200, deleteGroupYearlyAccountListRes);

    // @ts-ignore
    await deleteGroupAccount(groupId, year, customMonth, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectActions);
  });

  it('Get groupTransactionsList search criteria match in  if fetch succeeds', async () => {
    const store = mockStore({ groupTransactions: { groupSearchTransactionsList: [] } });

    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/search`;

    const params = {
      transaction_type: 'expense',
      low_amount: 1000,
      high_amount: 5000,
      big_category_id: 2,
    };

    const mockResponse = searchGroupTransactionsRes;

    const expectActions = [
      {
        type: actionTypes.START_SEARCH_GROUP_TRANSACTIONS,
        payload: {
          groupSearchTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.SEARCH_GROUP_TRANSACTIONS,
        payload: {
          groupSearchTransactionsListLoading: false,
          groupSearchTransactionsList: mockResponse.transactions_list,
          notHistoryMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await searchGroupTransactions(groupId, params)(store.dispatch);
    expect(store.getActions()).toEqual(expectActions);
  });

  it('Get groupYearlyAccountList if fetch succeeds', async () => {
    const store = mockStore({ groupTransactions: { groupYearlyAccountList: {} } });

    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const year = 2020;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`;
    const signal = axios.CancelToken.source();

    const mockResponse = groupYearlyAccountListRes;

    const expectActions = [
      {
        type: actionTypes.START_FETCH_GROUP_YEARLY_ACCOUNT,
        payload: {
          groupYearlyAccountListLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_GROUP_YEARLY_ACCOUNT,
        payload: {
          groupYearlyAccountListLoading: false,
          groupYearlyAccountList: mockResponse,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupYearlyAccountList(groupId, year, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectActions);
  });

  it('Get groupYearlyAccountList for Modal if fetch succeeds', async () => {
    const store = mockStore({ groupTransactions: { groupYearlyAccountListForModal: {} } });

    beforeEach(() => {
      store.clearActions();
    });

    const groupId = 1;
    const year = 2021;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`;
    const signal = axios.CancelToken.source();

    const mockResponse = groupYearlyAccountListForModalRes;

    const expectActions = [
      {
        type: actionTypes.START_FETCH_YEARLY_ACCOUNT_MODAL,
        payload: {
          groupYearlyAccountListForModalLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_YEARLY_ACCOUNT_MODAL,
        payload: {
          groupYearlyAccountListForModalLoading: false,
          groupYearlyAccountListForModal: mockResponse,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupYearlyAccountListForModal(groupId, year, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectActions);
  });
});
