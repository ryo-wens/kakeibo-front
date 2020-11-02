import { fetchTransactions, updateTransactionsAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import { State } from '../store/types';
import {
  TransactionsList,
  FetchTransactionsRes,
  TransactionsReq,
  TransactionsRes,
  DeleteTransactionRes,
} from './types';
import moment from 'moment';
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

        dispatch(fetchTransactions(aligningTransactionsList, resMessage));
      } else {
        const emptyTransactionsList: TransactionsList = [];

        dispatch(fetchTransactions(emptyTransactionsList, resMessage));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const addTransactions = (
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
      const newTransaction = result.data;

      const prevTransactions = getState().transactions.transactionsList;

      const transactionList = [newTransaction, ...prevTransactions];
      dispatch(updateTransactionsAction(transactionList));
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
      const editTransaction = result.data;

      const transactionsList = getState().transactions.transactionsList;

      const nextTransactionsList = transactionsList.map((transaction) => {
        if (transaction.id === editTransaction.id) {
          return editTransaction;
        }
        return transaction;
      });

      const aligningTransactionsList = nextTransactionsList.sort(
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

      const transactionsList = getState().transactions.transactionsList;

      const nextTransactionsList = transactionsList.filter((transaction) => transaction.id !== id);

      dispatch(updateTransactionsAction(nextTransactionsList));
      alert(message);
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
