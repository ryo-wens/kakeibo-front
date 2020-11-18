import { updateGroupTransactionsAction, updateGroupLatestTransactionsAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import {
  GroupTransactions,
  GroupTransactionsList,
  FetchGroupTransactionsRes,
  GroupLatestTransactionsListRes,
  deleteGroupTransactionRes,
} from './types';
import { State } from '../store/types';
import { push } from 'connected-react-router';
import { isValidAmountFormat, errorHandling } from '../../lib/validation';
import moment from 'moment';
import { customMonth } from '../../lib/constant';

export const fetchGroupTransactionsList = (year: number, customMonth: string, groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}`,
        {
          withCredentials: true,
        }
      );
      const groupTransactionsList = result.data.transactions_list;

      if (groupTransactionsList !== undefined) {
        const aligningGroupTransactionsList = groupTransactionsList.sort(
          (a, b) =>
            Number(a.transaction_date.slice(8, 10)) - Number(b.transaction_date.slice(8, 10))
        );

        dispatch(updateGroupTransactionsAction(aligningGroupTransactionsList));
      } else {
        const emptyGroupTransactionsList: GroupTransactionsList = [];

        dispatch(updateGroupTransactionsAction(emptyGroupTransactionsList));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchLatestGroupTransactionsList = (groupId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<GroupLatestTransactionsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`,
        {
          withCredentials: true,
        }
      );
      const latestGroupTransactionsList = result.data.transactions_list;

      if (latestGroupTransactionsList !== undefined) {
        dispatch(updateGroupLatestTransactionsAction(latestGroupTransactionsList));
      } else {
        const emptyGroupLatestTransactionsList: GroupTransactionsList = [];
        dispatch(updateGroupLatestTransactionsAction(emptyGroupLatestTransactionsList));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const addGroupLatestTransactions = (
  groupId: number,
  requestData: {
    transaction_type: string;
    transaction_date: Date | null;
    shop: string | null;
    memo: string | null;
    amount: string | number;
    payment_user_id: string;
    big_category_id: number;
    medium_category_id: number | null;
    custom_category_id: number | null;
  }
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (!isValidAmountFormat(requestData.amount as string)) {
      alert('金額は数字で入力してください。');
    }
    try {
      const result = await axios.post<GroupTransactions>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions`,
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
      const addedTransaction = result.data;

      const prevGroupLatestTransactionsList = getState().groupTransactions
        .groupLatestTransactionsList;

      const addedLatestTransactionsList = prevGroupLatestTransactionsList.filter(
        (transaction, index) => index !== 9
      );

      const nextGroupLatestTransactionsList = [addedTransaction, ...addedLatestTransactionsList];

      dispatch(updateGroupLatestTransactionsAction(nextGroupLatestTransactionsList));
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

export const addGroupTransactions = () => {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    const prevGroupTransactionsList = getState().groupTransactions.groupTransactionsList;
    const groupLatestTransactionsList = getState().groupTransactions.groupLatestTransactionsList;

    const addedTransaction = groupLatestTransactionsList[0];

    const nextGroupTransactionsList = () => {
      let addedTransactionsList: GroupTransactionsList = [];

      if (addedTransaction.transaction_date.slice(5, 7) === String(customMonth)) {
        addedTransactionsList = [addedTransaction, ...prevGroupTransactionsList].sort(
          (a, b) =>
            Number(a.transaction_date.slice(8, 10)) - Number(b.transaction_date.slice(8, 10))
        );
      } else {
        return prevGroupTransactionsList;
      }

      return addedTransactionsList;
    };

    dispatch(updateGroupTransactionsAction(nextGroupTransactionsList()));
  };
};

export const editGroupTransactions = (
  id: number,
  groupId: number,
  requestData: {
    transaction_type: string;
    transaction_date: Date | null;
    shop: string | null;
    memo: string | null;
    amount: string | number;
    payment_user_id: string;
    big_category_id: number;
    medium_category_id: number | null;
    custom_category_id: number | null;
  }
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (!isValidAmountFormat(requestData.amount as string)) {
      alert('金額は数字で入力してください。');
    }

    try {
      const result = await axios.put<GroupTransactions>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`,
        JSON.stringify(requestData),
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

      const aligningGroupTransactionsList = nextGroupTransactionsList.sort(
        (a, b) => Number(a.transaction_date.slice(8, 10)) - Number(b.transaction_date.slice(8, 10))
      );

      dispatch(updateGroupTransactionsAction(aligningGroupTransactionsList));
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

export const editGroupLatestTransactionsList = (
  id: number,
  groupId: number,
  requestData: {
    transaction_type: string;
    transaction_date: Date | null;
    shop: string | null;
    memo: string | null;
    amount: string | number;
    payment_user_id: string;
    big_category_id: number;
    medium_category_id: number | null;
    custom_category_id: number | null;
  }
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (!isValidAmountFormat(requestData.amount as string)) {
      alert('金額は数字で入力してください。');
    }

    try {
      const result = await axios.put<GroupTransactions>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`,
        JSON.stringify(requestData),
        {
          withCredentials: true,
        }
      );
      const editedTransaction = result.data;

      const groupLatestTransactionsList = getState().groupTransactions.groupLatestTransactionsList;

      const editedGroupLatestTransactionsList = groupLatestTransactionsList.map(
        (groupTransaction) => {
          if (groupTransaction.id === editedTransaction.id) {
            return editedTransaction;
          }

          return groupTransaction;
        }
      );

      const aligningGroupLatestTransactionsList = editedGroupLatestTransactionsList.sort((a, b) =>
        a.updated_date < b.updated_date ? 1 : -1
      );

      dispatch(updateGroupLatestTransactionsAction(aligningGroupLatestTransactionsList));
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

export const deleteGroupTransactions = (id: number, groupId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<deleteGroupTransactionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`,
        {
          withCredentials: true,
        }
      );
      const message = result.data.message;

      const groupTransactionsList: GroupTransactionsList = getState().groupTransactions
        .groupTransactionsList;

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

export const deleteGroupLatestTransactions = (id: number, groupId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      await axios.delete<deleteGroupTransactionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`,
        {
          withCredentials: true,
        }
      );
      const groupLatestTransactionsList: GroupTransactionsList = getState().groupTransactions
        .groupLatestTransactionsList;

      const nextGroupLatestTransactionsList = groupLatestTransactionsList.filter(
        (groupLatestTransaction) => groupLatestTransaction.id !== id
      );

      dispatch(updateGroupLatestTransactionsAction(nextGroupLatestTransactionsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
