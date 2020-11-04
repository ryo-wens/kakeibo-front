import { updateGroupTransactionsAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import {
  GroupTransactions,
  GroupTransactionsReq,
  FetchGroupTransactionsRes,
  deleteGroupTransactionRes,
} from './types';
import { State } from '../store/types';
import { push } from 'connected-react-router';
import { isValidAmountFormat, errorHandling } from '../../lib/validation';
import moment from 'moment';

export const fetchGroupTransactionsList = (year: number, customMonth: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/transactions/${year}-${customMonth}`,
        {
          withCredentials: true,
        }
      );
      if (result.data.message) {
        alert(result.data.message);
      } else {
        const groupTransactionsList = result.data.transactions_list;

        dispatch(updateGroupTransactionsAction(groupTransactionsList));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const addGroupTransactions = (
  transaction_type: string,
  transaction_date: Date | null,
  shop: string | null,
  memo: string | null,
  amount: string | number,
  payment_user_id: string,
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

    const data: GroupTransactionsReq = {
      transaction_type: transaction_type,
      transaction_date: transaction_date,
      shop: shop,
      memo: memo,
      amount: Number(amount),
      payment_user_id: payment_user_id,
      big_category_id: big_category_id,
      medium_category_id: medium_category_id,
      custom_category_id: custom_category_id,
    };
    try {
      const result = await axios.post<GroupTransactions>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/transactions`,
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

      const newGroupTransaction = result.data;

      const prevGroupTransactions = getState().groupTransactions.groupTransactionsList;

      const nextGroupTransactionsList = [newGroupTransaction, ...prevGroupTransactions];

      dispatch(updateGroupTransactionsAction(nextGroupTransactionsList));
    } catch (error) {
      if (error && error.response) {
        if (error.response.status === 400) {
          if (Array.isArray(error.response.data.error.message)) {
            alert(error.response.data.error.message.join('\n'));
            return;
          } else if (!Array.isArray(error.response.data.error.message)) {
            alert(error.response.data.error.message);
            return;
          }
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
      } else {
        alert(error);
      }
    }
  };
};

export const editGroupTransactions = (
  id: number,
  transaction_type: string,
  transaction_date: Date | null,
  shop: string | null,
  memo: string | null,
  amount: string | number,
  payment_user_id: string,
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

    const data: GroupTransactionsReq = {
      transaction_type: transaction_type,
      transaction_date: transaction_date,
      shop: shop,
      memo: memo,
      amount: Number(amount),
      payment_user_id: payment_user_id,
      big_category_id: big_category_id,
      medium_category_id: medium_category_id,
      custom_category_id: custom_category_id,
    };
    try {
      const result = await axios.put<GroupTransactions>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/transactions/${id}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const editedGroupTransaction = result.data;

      const groupTransactionsList = getState().groupTransactions.groupTransactionsList;

      const nextGroupTransactionsList = groupTransactionsList.map((groupTransaction) => {
        if (groupTransaction.id === editedGroupTransaction.id) {
          return editedGroupTransaction;
        }
        return groupTransaction;
      });
      dispatch(updateGroupTransactionsAction(nextGroupTransactionsList));
    } catch (error) {
      if (error && error.response) {
        if (error.response.status === 400) {
          if (Array.isArray(error.response.data.error.message)) {
            alert(error.response.data.error.message.join('\n'));
            return;
          } else if (!Array.isArray(error.response.data.error.message)) {
            alert(error.response.data.error.message);
            return;
          }
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
      } else {
        alert(error);
      }
    }
  };
};

export const deleteGroupTransactions = (id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<deleteGroupTransactionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/transactions/${id}`,
        {
          withCredentials: true,
        }
      );
      const message = result.data.message;

      const groupTransactionsList = getState().groupTransactions.groupTransactionsList;

      const nextGroupTransactionsList = groupTransactionsList.filter(
        (groupTransaction) => groupTransaction.id !== id
      );

      dispatch(updateGroupTransactionsAction(nextGroupTransactionsList));
      alert(message);
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
