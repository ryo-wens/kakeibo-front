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
  startEditSearchTransactionsActions,
  editSearchTransactionsActions,
  failedEditSearchTransactionsActions,
  startDeleteSearchTransactionsActions,
  deleteSearchTransactionsActions,
  failedDeleteSearchTransactionsActions,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { accountServiceInstance } from '../axiosConfig';
import { Dispatch, Action } from 'redux';
import {
  TransactionsList,
  FetchTransactionsRes,
  FetchLatestTransactionsRes,
  TransactionsRes,
  DeleteTransactionRes,
} from './types';
import dayjs from 'dayjs';
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
      const result = await accountServiceInstance.get<FetchTransactionsRes>(
        `/transactions/${selectYears.selectedYear}-${selectYears.selectedMonth}`,
        { cancelToken: signal.token }
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
      const result = await accountServiceInstance.get<FetchLatestTransactionsRes>(
        '/transactions/latest',
        { cancelToken: signal.token }
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
      await accountServiceInstance.post<TransactionsRes>(
        '/transactions',
        JSON.stringify(requestData, function (key, value) {
          if (key === 'transaction_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchTransactionsResult = accountServiceInstance.get<FetchTransactionsRes>(
        `/transactions/${addTransactionYear}-${addTransactionMonth}`,
        { cancelToken: signal.token }
      );

      const fetchLatestTransactionsResult = accountServiceInstance.get<FetchLatestTransactionsRes>(
        'transactions/latest',
        { cancelToken: signal.token }
      );

      const addedTransactionsList = await fetchTransactionsResult;
      const addedLatestTransactionsList = await fetchLatestTransactionsResult;

      dispatch(
        addTransactionsActions(
          addedTransactionsList.data.transactions_list,
          addedLatestTransactionsList.data.transactions_list
        )
      );
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
      await accountServiceInstance.put<TransactionsRes>(
        `/transactions/${id}`,
        JSON.stringify(editRequestData, function (key, value) {
          if (key === 'transaction_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchTransactionsResult = accountServiceInstance.get<FetchTransactionsRes>(
        `/transactions/${editTransactionYear}-${editTransactionMonth}`,
        { cancelToken: signal.token }
      );

      const fetchLatestTransactionsResult = accountServiceInstance.get<FetchLatestTransactionsRes>(
        '/transactions/latest',
        { cancelToken: signal.token }
      );

      const editedTransactionsList = await fetchTransactionsResult;
      const editedLatestTransactionsList = await fetchLatestTransactionsResult;

      dispatch(
        editTransactionsActions(
          editedTransactionsList.data.transactions_list,
          editedLatestTransactionsList.data.transactions_list
        )
      );
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
      await accountServiceInstance.delete<DeleteTransactionRes>(`/transactions/${id}`);

      const fetchTransactionsResult = accountServiceInstance.get<FetchTransactionsRes>(
        `/transactions/${editTransactionYear}-${editTransactionMonth}`,
        { cancelToken: signal.token }
      );

      const fetchLatestTransactionsResult = accountServiceInstance.get<FetchLatestTransactionsRes>(
        '/transactions/latest',
        { cancelToken: signal.token }
      );

      const deletedTransactionsList =
        (await fetchTransactionsResult).data.transactions_list === undefined
          ? []
          : (await fetchTransactionsResult).data.transactions_list;

      const deletedLatestTransactionsList =
        fetchLatestTransactionsResult === undefined
          ? []
          : (await fetchLatestTransactionsResult).data.transactions_list;

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
      const result = await accountServiceInstance.get<FetchTransactionsRes>(
        `/transactions/search`,
        {
          params: {
            start_date:
              searchRequestData.start_date !== null
                ? dayjs(searchRequestData.start_date).format()
                : null,
            end_date:
              searchRequestData.end_date !== null
                ? dayjs(searchRequestData.end_date).format()
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

export const editSearchTransactions = (
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
  searchRequestData: {
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
  }
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditSearchTransactionsActions());

    try {
      await accountServiceInstance.put<TransactionsRes>(
        `/transactions/${id}`,
        JSON.stringify(editRequestData, function (key, value) {
          if (key === 'transaction_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const searchResult = await accountServiceInstance.get<FetchTransactionsRes>(
        '/transactions/search',
        {
          params: {
            start_date:
              searchRequestData.start_date !== null
                ? dayjs(searchRequestData.start_date).format()
                : null,
            end_date:
              searchRequestData.end_date !== null
                ? dayjs(searchRequestData.end_date).format()
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
      const message = searchResult.data.message;
      const searchTransactionsList: TransactionsList = searchResult.data.transactions_list;

      if (searchTransactionsList !== undefined) {
        const emptyMessage = '';
        dispatch(editSearchTransactionsActions(searchTransactionsList, emptyMessage));
      } else {
        const emptySearchTransactionsList: TransactionsList = [];
        dispatch(editSearchTransactionsActions(emptySearchTransactionsList, message));
      }
    } catch (error) {
      dispatch(
        failedEditSearchTransactionsActions(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const deleteSearchTransactions = (
  id: number,
  searchRequestData: {
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
  }
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteSearchTransactionsActions());

    try {
      await accountServiceInstance.delete<DeleteTransactionRes>(`/transactions/${id}`);

      const searchResult = await accountServiceInstance.get<FetchTransactionsRes>(
        '/transactions/search',
        {
          params: {
            start_date:
              searchRequestData.start_date !== null
                ? dayjs(searchRequestData.start_date).format()
                : null,
            end_date:
              searchRequestData.end_date !== null
                ? dayjs(searchRequestData.end_date).format()
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
      const message = searchResult.data.message;
      const searchTransactionsList: TransactionsList = searchResult.data.transactions_list;

      if (searchTransactionsList !== undefined) {
        const emptyMessage = '';
        dispatch(deleteSearchTransactionsActions(searchTransactionsList, emptyMessage));
      } else {
        const emptySearchTransactionsList: TransactionsList = [];
        dispatch(deleteSearchTransactionsActions(emptySearchTransactionsList, message));
      }
    } catch (error) {
      dispatch(
        failedDeleteSearchTransactionsActions(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
