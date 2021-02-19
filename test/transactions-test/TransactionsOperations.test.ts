import * as actionTypes from '../../src/reducks/transactions/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { TransactionsReq } from '../../src/reducks/transactions/types';
import { SelectYears } from '../../src/lib/date';
import {
  fetchTransactionsList,
  fetchLatestTransactionsList,
  addTransactions,
  editTransactions,
  deleteTransactions,
  searchTransactions,
} from '../../src/reducks/transactions/operations';
import transactionsList from './transactions.json';
import latestTransactionsList from './latestTransactions.json';
import addResTransaction from './addResponse.json';
import addTransactionsList from './addTransactions.json';
import editResTransaction from './editResponse.json';
import editTransactionsList from './editTransactions.json';
import deleteResTransaction from './deleteReponse.json';
import addLatestTransaction from './addLatestTransactions.json';
import editLatestTransaction from './editLatestTransactions.json';
import fetchResSearchTransaction from './fetchSearchTransactionsRes.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

const store = mockStore({
  transactions: { transactionsList: [], latestTransactionsList: [], searchTransactionsList: [] },
});

describe('async actions transactions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Get transactionsList if fetch succeeds', async () => {
    const years: SelectYears = {
      selectedYear: '2020',
      selectedMonth: '11',
    };
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${years.selectedYear}-${years.selectedMonth}`;

    const mockResponse = transactionsList;
    const signal = axios.CancelToken.source();

    const expectedAddActions = [
      {
        type: actionTypes.START_FETCH_TRANSACTIONS,
        payload: {
          transactionsListLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_TRANSACTIONS,
        payload: {
          transactionsListLoading: false,
          transactionsList: mockResponse.transactions_list,
          noTransactionsMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchTransactionsList(years, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAddActions);
  });

  it('Get latestTransactionsList if fetch succeeds', async () => {
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`;
    const mockResponse = latestTransactionsList;
    const signal = axios.CancelToken.source();

    const expectedActions = [
      {
        type: actionTypes.START_FETCH_LATEST_TRANSACTIONS,
        payload: {
          latestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.FETCH_LATEST_TRANSACTIONS,
        payload: {
          latestTransactionsListLoading: false,
          latestTransactionsList: mockResponse.transactions_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchLatestTransactionsList(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Add transaction in transactionsList and latestTransactionsList if fetch succeeds', async () => {
    const year = 2020;
    const month = '11';
    const signal = axios.CancelToken.source();
    const addUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions`;
    const fetchLatestUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${year}-${month}`;

    let now: Date;
    let spiedDate: Date;
    const originalDate = Date;
    now = new originalDate('2020-11-07T17:07:31Z');
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

    const requestData: TransactionsReq = {
      transaction_type: 'expense',
      transaction_date: actual,
      shop: 'ニトリ',
      memo: '椅子',
      amount: 9000,
      big_category_id: 3,
      medium_category_id: 16,
      custom_category_id: null,
    };

    const addResponse = addResTransaction;
    const addedLatestTransactionsList = addLatestTransaction;
    const addedTransactionsList = addTransactionsList;

    const expectedAddActions = [
      {
        type: actionTypes.START_ADD_TRANSACTIONS,
        payload: {
          transactionsListLoading: true,
          latestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.ADD_TRANSACTIONS,
        payload: {
          transactionsListLoading: false,
          latestTransactionsListLoading: false,
          transactionsList: addedTransactionsList.transactions_list,
          latestTransactionsList: addedLatestTransactionsList.transactions_list,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(201, addResponse);
    axiosMock.onGet(fetchUrl).reply(200, addTransactionsList);
    axiosMock.onGet(fetchLatestUrl).reply(200, addLatestTransaction);

    await addTransactions(requestData, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAddActions);
  });

  it('Edit transaction in transactionsList and latestTransactionsList if fetch succeeds', async () => {
    const year = 2020;
    const month = '11';
    const id = 130;
    const signal = axios.CancelToken.source();
    const editUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;
    const fetchLatestUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${year}-${month}`;

    let now: Date;
    let spiedDate: Date;
    const originalDate = Date;
    now = new originalDate('2020-07-26T17:00:15Z');
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

    const editResponse = editResTransaction;
    const editedTransactionsList = editTransactionsList;
    const editedLatestTransactionsList = editLatestTransaction;

    const requestData: TransactionsReq = {
      transaction_type: 'expense',
      transaction_date: actual,
      shop: 'ビッグカメラ',
      memo: 'コーヒーメーカー',
      amount: 25000,
      big_category_id: 3,
      medium_category_id: 17,
      custom_category_id: null,
    };

    const expectedEditActions = [
      {
        type: actionTypes.START_EDIT_TRANSACTIONS,
        payload: {
          transactionsListLoading: true,
          latestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.EDIT_TRANSACTIONS,
        payload: {
          transactionsListLoading: false,
          latestTransactionsListLoading: false,
          transactionsList: editedTransactionsList.transactions_list,
          latestTransactionsList: editedLatestTransactionsList.transactions_list,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editResponse);
    axiosMock.onGet(fetchUrl).reply(200, editTransactionsList);
    axiosMock.onGet(fetchLatestUrl).reply(200, editLatestTransaction);

    await editTransactions(130, requestData, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedEditActions);
  });

  it('Delete transaction in transactionsList and latestTransactionsList if fetch succeeds', async () => {
    const id = 130;
    const year = 2020;
    const month = '11';
    const signal = axios.CancelToken.source();
    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`;
    const fetchLatestUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`;
    const fetchUrl = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${year}-${month}`;

    const deletedMessage = deleteResTransaction.message;
    const deletedTransactionsList = transactionsList.transactions_list;
    const deletedLatestTransactionsList = latestTransactionsList.transactions_list;

    const expectedDeleteActions = [
      {
        type: actionTypes.START_DELETE_TRANSACTIONS,
        payload: {
          transactionsListLoading: true,
          latestTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.DELETE_TRANSACTIONS,
        payload: {
          transactionsListLoading: false,
          latestTransactionsListLoading: false,
          transactionsList: deletedTransactionsList,
          latestTransactionsList: deletedLatestTransactionsList,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, deletedMessage);
    axiosMock.onGet(fetchUrl).reply(200, transactionsList);
    axiosMock.onGet(fetchLatestUrl).reply(200, latestTransactionsList);

    await deleteTransactions(130, signal, year, month)(store.dispatch);
    expect(store.getActions()).toEqual(expectedDeleteActions);
  });

  it('Get transactionsList  search criteria match in  if fetch succeeds', async () => {
    const params = {
      transaction_type: 'expense',
      low_amount: 2000,
      high_amount: 10000,
      big_category_id: 2,
      sort: 'transaction_date',
    };

    const url = `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/search`;
    const mockResponse = fetchResSearchTransaction;

    const expectSearchActions = [
      {
        type: actionTypes.START_SEARCH_TRANSACTIONS,
        payload: {
          searchTransactionsListLoading: true,
        },
      },
      {
        type: actionTypes.SEARCH_TRANSACTIONS,
        payload: {
          searchTransactionsListLoading: false,
          searchTransactionsList: mockResponse.transactions_list,
          notHistoryMessage: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await searchTransactions(params)(store.dispatch);
    expect(store.getActions()).toEqual(expectSearchActions);
  });
});
