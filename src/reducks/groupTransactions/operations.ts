import { updateGroupTransactionsAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { GroupTransactions, GroupTransactionsReq, FetchGroupTransactionsRes } from './types';
import { State } from '../store/types';
import { push } from 'connected-react-router';
import { isValidAmountFormat, errorHandling } from '../../lib/validation';
import moment from 'moment';

export const fetchGroupTransactionsList = (year: number, customMonth: string) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/transactions/${year}-${customMonth}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          const groupTransactionsList = res.data.transactions_list;

          dispatch(updateGroupTransactionsAction(groupTransactionsList));
        }
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const addGroupTransactions = (
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

    const data: GroupTransactionsReq = {
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
      .post<GroupTransactions>(
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
      )
      .then((res) => {
        const newGroupTransaction = res.data;

        const prevGroupTransactions = getState().groupTransactions.groupTransactionsList;

        const nextGroupTransactionsList = [newGroupTransaction, ...prevGroupTransactions];

        dispatch(updateGroupTransactionsAction(nextGroupTransactionsList));
      })
      .catch((error) => {
        if (error && error.response) {
          if (error.response.status === 400) {
            if (Array.isArray(error.response.data.error.message)) {
              alert(error.response.data.error.message.join('\n'));
            } else if (!Array.isArray(error.response.data.error.message)) {
              alert(error.response.data.error.message);
            }
          }

          if (error.response.status === 401) {
            alert(error.response.data.error.message);
            dispatch(push('/login'));
          }

          if (error.response.status === 500) {
            alert(error.response.data.error.message);
          }
        } else {
          alert(error);
        }
      });
  };
};

export const editGroupTransactions = (
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

    const data: GroupTransactionsReq = {
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
      .put<GroupTransactions>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/transactions/${id}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const editedGroupTransaction = res.data;

        const groupTransactionsList = getState().groupTransactions.groupTransactionsList;

        const nextGroupTransactionsList = groupTransactionsList.map((groupTransaction) => {
          if (groupTransaction.id === editedGroupTransaction.id) {
            return editedGroupTransaction;
          }
          return groupTransaction;
        });
        dispatch(updateGroupTransactionsAction(nextGroupTransactionsList));
      })
      .catch((error) => {
        if (error && error.response) {
          if (error.response.status === 400) {
            if (Array.isArray(error.response.data.error.message)) {
              alert(error.response.data.error.message.join('\n'));
            } else if (!Array.isArray(error.response.data.error.message)) {
              alert(error.response.data.error.message);
            }
          }

          if (error.response.status === 401) {
            alert(error.response.data.error.message);
            dispatch(push('/login'));
          }

          if (error.response.status === 500) {
            alert(error.response.data.error.message);
          }
        } else {
          alert(error);
        }
      });
  };
};
