import * as actionTypes from '../../src/reducks/groupTransactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { GroupTransactionsReq } from '../../src/reducks/groupTransactions/types';
import { SelectYears } from '../../src/lib/date';
import {
  addGroupTransactions,
  fetchGroupTransactionsList,
  editGroupTransactions,
  deleteGroupTransactions,
  fetchLatestGroupTransactionsList,
  addGroupLatestTransactions,
  editGroupLatestTransactionsList,
  deleteGroupLatestTransactions,
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
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockResponse.transactions_list,
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
        type: actionTypes.UPDATE_GROUP_LATEST_TRANSACTIONS,
        payload: mockResponse.transactions_list,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchLatestGroupTransactionsList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAddActions);
  });

  it('Add groupLatestTransactionsData in groupLatestTransactionsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({
      groupTransactions: { groupLatestTransactionsList: groupLatestTransactions },
    });

    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions`;

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

    const getState = () => {
      return {
        groupTransactions: {
          groupLatestTransactionsList: groupLatestTransactions.transactions_list,
        },
      };
    };

    const mockResponse = addResponse;

    const mockGroupTransactionsList = addedGroupLatestTransactions.transactions_list;

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
        type: actionTypes.UPDATE_GROUP_LATEST_TRANSACTIONS,
        payload: mockGroupTransactionsList,
      },
    ];

    axiosMock.onPost(url).reply(201, mockResponse);

    await addGroupLatestTransactions(groupId, requestData)(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Add groupTransactionsData in groupTransactionsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({ groupTransactions: { groupTransactionsList: groupTransactions } });

    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions`;

    const getState = () => {
      return {
        groupTransactions: {
          groupTransactionsList: groupTransactions.transactions_list,
          groupLatestTransactionsList: addedGroupLatestTransactions.transactions_list,
        },
      };
    };

    const mockResponse = addResponse;

    const mockGroupTransactionsList = addedGroupTransactions.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockGroupTransactionsList,
      },
    ];

    axiosMock.onPost(url).reply(201, mockResponse);

    await addGroupTransactions('11')(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Edit groupTransactionsData in groupTransactionsList if fetch succeeds', async () => {
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

    const getState = () => {
      return {
        groupTransactions: {
          groupTransactionsList: addedGroupTransactions.transactions_list,
        },
      };
    };

    const id = 101;
    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;

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

    const mockResponse = editResponse;

    const mockGroupTransactionsList = editedGroupTransaction.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockGroupTransactionsList,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editGroupTransactions(
      id,
      groupId,
      requestData
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Edit groupLatestTransactionsData in groupLatestTransactionsList if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({
      groupTransactions: { groupLatestTransactionsList: addedGroupLatestTransactions },
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

    const getState = () => {
      return {
        groupTransactions: {
          groupLatestTransactionsList: addedGroupLatestTransactions.transactions_list,
        },
      };
    };

    const id = 101;
    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;

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

    const mockResponse = editResponse;

    const mockGroupTransactionsList = editedGroupLatestTransactions.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_LATEST_TRANSACTIONS,
        payload: mockGroupTransactionsList,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editGroupLatestTransactionsList(
      id,
      groupId,
      requestData
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Delete groupTransactionsData in transactionsList if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: { groupTransactionsList: editedGroupTransaction },
    });
    beforeEach(() => {
      store.clearActions();
    });

    const getState = () => {
      return {
        groupTransactions: {
          groupTransactionsList: editedGroupTransaction.transactions_list,
        },
      };
    };

    const id = 101;
    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;

    const mockResponse = deleteResponse.message;

    const mockDeletedGroupTransactionsList = groupTransactions.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_TRANSACTIONS,
        payload: mockDeletedGroupTransactionsList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);
    window.alert = jest.fn(() => mockResponse);

    // @ts-ignore
    await deleteGroupTransactions(id, groupId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
    expect(window.alert).toHaveBeenCalled();
  });

  it('Delete groupLatestTransactionsData in groupLatestTransactionsList if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: { groupLatestTransactionsList: editedGroupLatestTransactions },
    });
    beforeEach(() => {
      store.clearActions();
    });

    const getState = () => {
      return {
        groupTransactions: {
          groupLatestTransactionsList: editedGroupLatestTransactions.transactions_list,
        },
      };
    };

    const id = 101;
    const groupId = 1;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`;

    const mockResponse = deleteResponse.message;

    const mockDeletedGroupTransactionsList = deletedGroupLatestTransaction.transactions_list;

    const expectedActions = [
      {
        type: actionTypes.UPDATE_GROUP_LATEST_TRANSACTIONS,
        payload: mockDeletedGroupTransactionsList,
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await deleteGroupLatestTransactions(id, groupId)(store.dispatch, getState);
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
        type: actionTypes.FETCH_GROUP_ACCOUNT,
        payload: mockResponse,
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

    const getState = () => {
      return {
        groupTransactions: {
          groupAccountList: groupAccountList,
        },
      };
    };

    const groupId = 1;
    const year = '2020';
    const customMonth = '11';
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;

    const mockResponse = groupAccountList;

    const expectedActions = [
      {
        type: actionTypes.ADD_GROUP_ACCOUNT,
        payload: mockResponse,
      },
    ];

    axiosMock.onPost(url).reply(201, mockResponse);

    // @ts-ignore
    await addGroupAccount(groupId, year, customMonth)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Edit groupAccountList  if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: { groupAccountList: groupAccountList },
    });

    beforeEach(() => {
      store.clearActions();
    });

    const getState = () => {
      return {
        groupTransactions: {
          groupAccountList: groupAccountList,
        },
      };
    };

    const groupId = 1;
    const year = '2020';
    const customMonth = '11';
    const editAccountId = 14;
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account/${editAccountId}`;

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

    const mockResponse = editGroupAccountResponse;

    const expectedActions = [
      {
        type: actionTypes.EDIT_GROUP_ACCOUNT,
        payload: editGroupAccountList,
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    // @ts-ignore
    await editGroupAccount(requestData, groupId, year, customMonth)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Delete groupAccountList  if fetch succeeds', async () => {
    const store = mockStore({
      groupTransactions: { groupAccountList: editGroupAccountList },
    });

    beforeEach(() => {
      store.clearActions();
    });

    const getState = () => {
      return {
        groupTransactions: {
          groupAccountList: editGroupAccountList,
        },
      };
    };

    const groupId = 1;
    const year = '2020';
    const customMonth = '11';
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`;

    const mockResponse = deleteAccountResponse;

    const expectActions = [
      {
        type: actionTypes.DELETE_GROUP_ACCOUNT,
        payload: {
          groupAccountList: {
            group_id: 0,
            month: '',
            group_total_payment_amount: 0,
            group_average_payment_amount: 0,
            group_remaining_amount: 0,
            group_accounts_list_by_payer: [],
          },
          deletedMessage: mockResponse.message,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await deleteGroupAccount(groupId, year, customMonth)(store.dispatch, getState);
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
        type: actionTypes.SEARCH_GROUP_TRANSACTIONS,
        payload: {
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
        type: actionTypes.FETCH_GROUP_YEARLY_ACCOUNT,
        payload: {
          loading: false,
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
        type: actionTypes.FETCH_YEARLY_ACCOUNT_MODAL,
        payload: {
          loading: false,
          groupYearlyAccountListForModal: mockResponse,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupYearlyAccountListForModal(groupId, year, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectActions);
  });
});