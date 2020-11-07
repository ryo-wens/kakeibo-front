import {
  fetchTransactionsActions,
  updateTransactionsAction,
  updateLatestTransactionsActions,
} from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import { State } from '../store/types';
import {
  TransactionsList,
  FetchTransactionsRes,
  FetchLatestTransactionsRes,
  TransactionsReq,
  TransactionsRes,
  DeleteTransactionRes,
} from './types';
import moment from 'moment';
import { customMonth } from '../../lib/constant';
import { isValidAmountFormat, errorHandling } from '../../lib/validation';

export const fetchTransactionsList = (year: string, customMonth: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${year}-${customMonth}`,
        {
          withCredentials: true,
        }
      );
      const resMessage = result.data.message;
      const transactionsList = result.data.transactions_list;

      if (transactionsList !== undefined) {
        const resMessage = '';
        const aligningTransactionsList = transactionsList.sort(
          (a, b) =>
            Number(a.transaction_date.slice(8, 10)) - Number(b.transaction_date.slice(8, 10))
        );

        dispatch(fetchTransactionsActions(aligningTransactionsList, resMessage));
      } else {
        const emptyTransactionsList: TransactionsList = [];

        dispatch(fetchTransactionsActions(emptyTransactionsList, resMessage));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchLatestTransactionsList = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchLatestTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/latest`,
        {
          withCredentials: true,
        }
      );
      const latestTransactionsList = result.data.transactions_list;

      dispatch(updateLatestTransactionsActions(latestTransactionsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const addLatestTransactions = (
  transaction_type: string,
  transaction_date: Date | null,
  shop: string | null,
  memo: string | null,
  amount: string | number,
  big_category_id: number,
  medium_category_id: number | null,
  custom_category_id: number | null
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (shop === '') {
      shop = null;
    }

    if (memo === '') {
      memo = null;
    }

    if (!isValidAmountFormat(amount as string)) {
      alert('金額は数字で入力してください。');
    }

    const data: TransactionsReq = {
      transaction_type: transaction_type,
      transaction_date: transaction_date,
      shop: shop,
      memo: memo,
      amount: Number(amount),
      big_category_id: big_category_id,
      medium_category_id: medium_category_id,
      custom_category_id: custom_category_id,
    };
    try {
      const result = await axios.post<TransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions`,
        JSON.stringify(data, function (key, value) {
          if (key === 'transaction_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );
      const addedTransaction = result.data;

      const prevLatestTransactionsList = getState().transactions.latestTransactionsList;

      const addedLatestTransactionsList = prevLatestTransactionsList.filter(
        (transaction, index) => index !== 9
      );

      const nextLatestTransactionsList = [addedTransaction, ...addedLatestTransactionsList];

      dispatch(updateLatestTransactionsActions(nextLatestTransactionsList));
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.error.message.join('\n'));
        return;
      }

      if (error.response.status === 401) {
        alert(error.response.data.error.message);
        dispatch(push('/login'));
        return;
      }

      if (error.response.status === 500) {
        alert(error.response.data.error.message);
        return;
      }
      if (error) {
        alert(error);
      }
    }
  };
};

export const addTransactions = () => {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    const prevTransactionsList = getState().transactions.transactionsList;
    const latestTransactionsList = getState().transactions.latestTransactionsList;

    const addedTransaction = latestTransactionsList[0];

    const nextTransactionsList = () => {
      let addedTransactionsList: TransactionsList = [];

      if (addedTransaction.transaction_date.slice(5, 7) === String(customMonth)) {
        addedTransactionsList = [addedTransaction, ...prevTransactionsList].sort(
          (a, b) =>
            Number(a.transaction_date.slice(8, 10)) - Number(b.transaction_date.slice(8, 10))
        );
      } else {
        return prevTransactionsList;
      }

      return addedTransactionsList;
    };

    dispatch(updateTransactionsAction(nextTransactionsList()));
  };
};

export const editTransactions = (
  id: number,
  transaction_type: string,
  transaction_date: Date | null,
  shop: string | null,
  memo: string | null,
  amount: string | number,
  big_category_id: number,
  medium_category_id: number | null,
  custom_category_id: number | null
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (shop === '') {
      shop = null;
    }

    if (memo === '') {
      memo = null;
    }

    if (!isValidAmountFormat(amount as string)) {
      alert('金額は数字で入力してください。');
    }

    const data: TransactionsReq = {
      transaction_type: transaction_type,
      transaction_date: transaction_date,
      shop: shop,
      memo: memo,
      amount: Number(amount),
      big_category_id: big_category_id,
      medium_category_id: medium_category_id,
      custom_category_id: custom_category_id,
    };

    try {
      const result = await axios.put<TransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`,
        JSON.stringify(data, function (key, value) {
          if (key === 'transaction_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );
      const editedTransaction = result.data;

      const transactionsList: TransactionsList = getState().transactions.transactionsList;

      const editedTransactionsList = transactionsList.map((transaction) => {
        if (transaction.id === editedTransaction.id) {
          return editedTransaction;
        }
        return transaction;
      });

      const aligningTransactionsList = editedTransactionsList.sort(
        (a, b) => Number(a.transaction_date.slice(8, 10)) - Number(b.transaction_date.slice(8, 10))
      );

      dispatch(updateTransactionsAction(aligningTransactionsList));
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.error.message.join('\n'));
        return;
      }

      if (error.response.status === 401) {
        alert(error.response.data.error.message);
        dispatch(push('/login'));
        return;
      }

      if (error.response.status === 500) {
        alert(error.response.data.error.message);
        return;
      }

      if (error) {
        alert(error);
      }
    }
  };
};

export const editLatestTransactions = (
  id: number,
  transaction_type: string,
  transaction_date: Date | null,
  shop: string | null,
  memo: string | null,
  amount: string | number,
  big_category_id: number,
  medium_category_id: number | null,
  custom_category_id: number | null
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (shop === '') {
      shop = null;
    }

    if (memo === '') {
      memo = null;
    }

    if (!isValidAmountFormat(amount as string)) {
      alert('金額は数字で入力してください。');
    }

    const data: TransactionsReq = {
      transaction_type: transaction_type,
      transaction_date: transaction_date,
      shop: shop,
      memo: memo,
      amount: Number(amount),
      big_category_id: big_category_id,
      medium_category_id: medium_category_id,
      custom_category_id: custom_category_id,
    };

    try {
      const result = await axios.put<TransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`,
        JSON.stringify(data, function (key, value) {
          if (key === 'transaction_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );
      const editedTransaction = result.data;

      const latestTransactionsList: TransactionsList = getState().transactions
        .latestTransactionsList;

      const editedLatestTransactionsList = latestTransactionsList.map((transaction) => {
        if (transaction.id === editedTransaction.id) {
          return editedTransaction;
        }

        return transaction;
      });

      const aligningLatestTransactionsList = editedLatestTransactionsList.sort((a, b) =>
        a.updated_date < b.updated_date ? 1 : -1
      );

      dispatch(updateLatestTransactionsActions(aligningLatestTransactionsList));
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.error.message.join('\n'));
        return;
      }

      if (error.response.status === 401) {
        alert(error.response.data.error.message);
        dispatch(push('/login'));
        return;
      }

      if (error.response.status === 500) {
        alert(error.response.data.error.message);
        return;
      }

      if (error) {
        alert(error);
      }
    }
  };
};

export const deleteTransactions = (id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<DeleteTransactionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`,
        {
          withCredentials: true,
        }
      );
      const message = result.data.message;

      const transactionsList: TransactionsList = getState().transactions.transactionsList;

      const nextTransactionsList = transactionsList.filter((transaction) => transaction.id !== id);

      dispatch(updateTransactionsAction(nextTransactionsList));
      alert(message);
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const deleteLatestTransactions = (id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      await axios.delete<DeleteTransactionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/transactions/${id}`,
        {
          withCredentials: true,
        }
      );
      const latestTransactionsList: TransactionsList = getState().transactions
        .latestTransactionsList;

      const nextLatestTransactionsList = latestTransactionsList.filter(
        (transaction) => transaction.id !== id
      );

      dispatch(updateLatestTransactionsActions(nextLatestTransactionsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
