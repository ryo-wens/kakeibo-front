import { addTransactionsAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import { State } from '../store/types';

interface addTransactionsReq {
  transaction_type: string;
  transaction_date: Date | null;
  shop: string | null;
  memo: string | null;
  amount: string | number;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
}

interface addTransactionsRes {
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

    const data: addTransactionsReq = {
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
      .post<addTransactionsRes>('http://127.0.0.1:8081/transactions', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        const newTransaction = res.data;

        const prevTransactions = getState().transactions.transactionsList;

        const transactionList = [newTransaction, ...prevTransactions];
        dispatch(addTransactionsAction(transactionList));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const errMessages: string[] = [];

          if (error.response.data.error.transaction_type.length > 0) {
            errMessages.push(error.response.data.error.transaction_type);
          }

          if (error.response.data.err.shop.length > 0) {
            errMessages.push(error.response.data.error.shop);
          }

          if (error.response.data.error.memo.length > 0) {
            errMessages.push(error.response.data.error.memo);
          }

          if (error.response.data.error.password.big_category_id > 0) {
            errMessages.push(error.response.data.error.big_category_id);
          }

          if (errMessages.length > 0) {
            alert(errMessages.join('\n'));
          }
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
