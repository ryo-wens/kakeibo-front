import {
  startFetchTransactionsActions,
  fetchTransactionsActions,
  cancelFetchTransactionsActions,
  failedFetchTransactionsActions,
  startFetchLatestTransactionsActions,
  fetchLatestTransactionsActions,
  cancelFetchLatestTransactionsActions,
  failedFetchLatestTransactionsActions,
  startAddTransactionsActions,
  addTransactionsActions,
  failedAddTransactionsActions,
  startEditTransactionsActions,
  editTransactionsActions,
  failedEditTransactionsActions,
  startDeleteTransactionsActions,
  deleteTransactionsActions,
  failedDeleteTransactionsActions,
  startSearchTransactionsActions,
  searchTransactionsActions,
  failedSearchTransactionsActions,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Dispatch, Action } from 'redux';
import {
  TransactionsList,
  FetchTransactionsRes,
  FetchLatestTransactionsRes,
  TransactionsRes,
  DeleteTransactionRes,
} from './types';
import moment from 'moment';
import { isValidAmountFormat } from '../../lib/validation';

export const fetchTransactionsList = (
  selectYears: {
    selectedYear: string;
    selectedMonth: string;
  },
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchTransactionsActions());

    try {
      const result = await axios.get<FetchTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${selectYears.selectedYear}-${selectYears.selectedMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const resMessage = result.data.message;
      const transactionsList = result.data.transactions_list;

      if (transactionsList !== undefined) {
        const message = '';

        dispatch(fetchTransactionsActions(transactionsList, message));
      } else {
        const emptyTransactionsList: TransactionsList = [];

        dispatch(fetchTransactionsActions(emptyTransactionsList, resMessage));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchTransactionsActions());
      } else {
        dispatch(
          failedFetchTransactionsActions(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const fetchLatestTransactionsList = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchLatestTransactionsActions());

    try {
      const result = await axios.get<FetchLatestTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const latestTransactionsList = result.data.transactions_list;
      const emptyTransactionsList: TransactionsList = [];

      if (latestTransactionsList !== undefined) {
        dispatch(fetchLatestTransactionsActions(latestTransactionsList));
      } else {
        dispatch(fetchLatestTransactionsActions(emptyTransactionsList));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchLatestTransactionsActions());
      } else {
        dispatch(
          failedFetchLatestTransactionsActions(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addTransactions = (
  requestData: {
    transaction_type: string;
    transaction_date: Date | null;
    shop: string | null;
    memo: string | null;
    amount: string | number;
    big_category_id: number;
    medium_category_id: number | null;
    custom_category_id: number | null;
  },
  addTransactionYear: number,
  addTransactionMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidAmountFormat(requestData.amount as string)) {
      alert('金額は数字で入力してください。');
      return;
    }

    dispatch(startAddTransactionsActions());

    try {
      await axios.post<TransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'transaction_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchTransactionsResult = await axios.get<FetchTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${addTransactionYear}-${addTransactionMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchLatestTransactionsResult = await axios.get<FetchLatestTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const addedTransactionsList = fetchTransactionsResult.data.transactions_list;
      const addedLatestTransactionsList = fetchLatestTransactionsResult.data.transactions_list;

      dispatch(addTransactionsActions(addedTransactionsList, addedLatestTransactionsList));
    } catch (error) {
      dispatch(
        failedAddTransactionsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editTransactions = (
  id: number,
  editRequestData: {
    transaction_type: string;
    transaction_date: Date | null;
    shop: string | null;
    memo: string | null;
    amount: string | number;
    big_category_id: number;
    medium_category_id: number | null;
    custom_category_id: number | null;
  },
  editTransactionYear: number,
  editTransactionMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidAmountFormat(editRequestData.amount as string)) {
      alert('金額は数字で入力してください。');
      return;
    }

    dispatch(startEditTransactionsActions());

    try {
      await axios.put<TransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`,
        JSON.stringify(editRequestData, function (key, value) {
          if (key === 'transaction_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchTransactionsResult = await axios.get<FetchTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${editTransactionYear}-${editTransactionMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchLatestTransactionsResult = await axios.get<FetchLatestTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedTransactionsList = fetchTransactionsResult.data.transactions_list;
      const editedLatestTransactionsList = fetchLatestTransactionsResult.data.transactions_list;

      dispatch(editTransactionsActions(editedTransactionsList, editedLatestTransactionsList));
    } catch (error) {
      dispatch(
        failedEditTransactionsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const deleteTransactions = (
  id: number,
  signal: CancelTokenSource,
  editTransactionYear: number,
  editTransactionMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteTransactionsActions());

    try {
      await axios.delete<DeleteTransactionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`,
        {
          withCredentials: true,
        }
      );

      const fetchTransactionsResult = await axios.get<FetchTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${editTransactionYear}-${editTransactionMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchLatestTransactionsResult = await axios.get<FetchLatestTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const deletedTransactionsList =
        fetchTransactionsResult.data.transactions_list === undefined
          ? []
          : fetchTransactionsResult.data.transactions_list;

      const deletedLatestTransactionsList =
        fetchLatestTransactionsResult.data.transactions_list === undefined
          ? []
          : fetchLatestTransactionsResult.data.transactions_list;

      dispatch(deleteTransactionsActions(deletedTransactionsList, deletedLatestTransactionsList));
    } catch (error) {
      dispatch(
        failedDeleteTransactionsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const searchTransactions = (searchRequestData: {
  transaction_type?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  shop?: string | null;
  memo?: string | null;
  low_amount?: string | number | null;
  high_amount?: string | number | null;
  big_category_id?: number | null;
  sort?: string | null;
  sort_type?: string | null;
  limit?: string | null;
}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startSearchTransactionsActions());

    try {
      const result = await axios.get<FetchTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/search`,
        {
          withCredentials: true,
          params: {
            start_date:
              searchRequestData.start_date !== null
                ? moment(searchRequestData.start_date).format()
                : null,
            end_date:
              searchRequestData.end_date !== null
                ? moment(searchRequestData.end_date).format()
                : null,
            transaction_type: searchRequestData.transaction_type,
            low_amount: searchRequestData.low_amount,
            high_amount: searchRequestData.high_amount,
            shop: searchRequestData.shop,
            memo: searchRequestData.memo,
            big_category_id: searchRequestData.big_category_id,
            sort: searchRequestData.sort,
            sort_type: searchRequestData.sort_type,
            limit: searchRequestData.limit,
          },
        }
      );
      const message = result.data.message;
      const searchTransactionsList: TransactionsList = result.data.transactions_list;

      if (searchTransactionsList !== undefined) {
        const emptyMessage = '';
        dispatch(searchTransactionsActions(searchTransactionsList, emptyMessage));
      } else {
        const emptySearchTransactionsList: TransactionsList = [];
        dispatch(searchTransactionsActions(emptySearchTransactionsList, message));
      }
    } catch (error) {
      dispatch(
        failedSearchTransactionsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};
