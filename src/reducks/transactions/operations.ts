import { updateTransactionsAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import { State } from '../store/types';

interface transactionsReq {
  transaction_type: string;
  transaction_date: Date | null;
  shop: string | null;
  memo: string | null;
  amount: string | number;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
}

interface transactionsRes {
  id: number;
  transaction_type: string;
  updated_date: Date;
  transaction_date: string;
  shop: string | null;
  memo: string | null;
  amount: number;
  big_category_name: string;
  medium_category_name: string | null;
  custom_category_name: string | null;
}

const isValidAmountFormat = (amount: string) => {
  const regex = /^([1-9]\d*|0)$/;
  return regex.test(amount);
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

    const data: transactionsReq = {
      transaction_type: transaction_type,
      transaction_date: transaction_date,
      shop: shop,
      memo: memo,
      amount: Number(amount),
      big_category_id: big_category_id,
      medium_category_id: medium_category_id,
      custom_category_id: custom_category_id,
    };
    await axios
      .post<transactionsRes>('http://127.0.0.1:8081/transactions', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        const newTransaction = res.data;

        const prevTransactions = getState().transactions.transactionsList;

        const transactionList = [newTransaction, ...prevTransactions];
        dispatch(updateTransactionsAction(transactionList));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.error.message.join('\n'));
        }

        if (error.response.status === 401) {
          alert(error.response.data.error.message);
          dispatch(push('/login'));
        }

        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};

export const editTransactions = (
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

    const transactionsList = getState().transactions.transactionsList;
    const id = transactionsList.map((transaction) => {
      return transaction.id;
    });

    const data: transactionsReq = {
      transaction_type: transaction_type,
      transaction_date: transaction_date,
      shop: shop,
      memo: memo,
      amount: Number(amount),
      big_category_id: big_category_id,
      medium_category_id: medium_category_id,
      custom_category_id: custom_category_id,
    };
    await axios
      .put<transactionsRes>(`http://127.0.0.1:8081/transactions/${id}`, JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        const editTransaction = res.data;

        const nextTransactionsList = transactionsList.map((transaction) => {
          if (transaction.id === editTransaction.id) {
            return editTransaction;
          }
          return transaction;
        });
        dispatch(updateTransactionsAction(nextTransactionsList));
      });
  };
};
