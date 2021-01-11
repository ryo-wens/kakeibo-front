import {
  addGroupAccountAction,
  deleteGroupAccountAction,
  editGroupAccountAction,
  failedFetchDataAction,
  fetchGroupAccountAction,
  fetchGroupYearlyAccountListAction,
  searchGroupTransactionsAction,
  updateGroupLatestTransactionsAction,
  updateGroupTransactionsAction,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import {
  deleteActionRes,
  FetchGroupTransactionsRes,
  GroupAccount,
  GroupAccountList,
  GroupAccountListRes,
  GroupLatestTransactionsListRes,
  GroupTransactions,
  GroupTransactionsList,
  GroupYearlyAccountList,
} from './types';
import { State } from '../store/types';
import { push } from 'connected-react-router';
import { errorHandling, isValidAmountFormat } from '../../lib/validation';
import moment from 'moment';
import { customMonth } from '../../lib/constant';

export const fetchGroupTransactionsList = (
  groupId: number,
  selectYears: {
    selectedYear: string;
    selectedMonth: string;
  },
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${selectYears.selectedYear}-${selectYears.selectedMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupTransactionsList = result.data.transactions_list;

      if (groupTransactionsList !== undefined) {
        dispatch(updateGroupTransactionsAction(groupTransactionsList));
      } else {
        const emptyGroupTransactionsList: GroupTransactionsList = [];

        dispatch(updateGroupTransactionsAction(emptyGroupTransactionsList));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const fetchLatestGroupTransactionsList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<GroupLatestTransactionsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`,
        {
          cancelToken: signal.token,
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
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
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

export const addGroupTransactions = (customMonth: string) => {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    const prevGroupTransactionsList = getState().groupTransactions.groupTransactionsList;
    const groupLatestTransactionsList = getState().groupTransactions.groupLatestTransactionsList;

    const addedTransaction = groupLatestTransactionsList[0];

    const nextGroupTransactionsList = () => {
      let addedTransactionsList: GroupTransactionsList = [];

      if (addedTransaction.transaction_date.slice(5, 7) === String(customMonth)) {
        addedTransactionsList = [...prevGroupTransactionsList, addedTransaction].sort(
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

      const editedGroupTransaction = result.data;
      const groupTransactionsList: GroupTransactionsList = getState().groupTransactions
        .groupTransactionsList;
      const editedTransactionMonth = editedGroupTransaction.transaction_date.slice(5, 7);
      const canEditMonth = customMonth === editedTransactionMonth;

      const changeTransactionIndex = groupTransactionsList.findIndex(
        (item) => item.id === editedGroupTransaction.id
      );

      const existTransaction = changeTransactionIndex !== -1;

      if (existTransaction) {
        if (canEditMonth) {
          groupTransactionsList[changeTransactionIndex] = editedGroupTransaction;
        } else if (!canEditMonth) {
          groupTransactionsList.splice(changeTransactionIndex, 1);
        }
      } else if (!existTransaction) {
        if (canEditMonth) {
          groupTransactionsList.push(editedGroupTransaction);
        }
      }

      groupTransactionsList.sort((a, b) => a.id - b.id);

      groupTransactionsList.sort(
        (a, b) => Number(a.transaction_date.slice(8, 10)) - Number(b.transaction_date.slice(8, 10))
      );

      dispatch(updateGroupTransactionsAction(groupTransactionsList));
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
      const editedTransaction = result.data;

      const groupLatestTransactionsList = getState().groupTransactions.groupLatestTransactionsList;

      const editTransactionIndex = groupLatestTransactionsList.findIndex(
        (item) => item.id === editedTransaction.id
      );

      const existTransaction = editTransactionIndex !== -1;

      if (existTransaction) {
        groupLatestTransactionsList.splice(editTransactionIndex, 1);
        groupLatestTransactionsList.unshift(editedTransaction);
      } else if (!existTransaction) {
        groupLatestTransactionsList.pop();
        groupLatestTransactionsList.unshift(editedTransaction);
      }

      dispatch(updateGroupLatestTransactionsAction(groupLatestTransactionsList));
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
      const result = await axios.delete<deleteActionRes>(
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
      await axios.delete<deleteActionRes>(
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

export const fetchGroupAccount = (
  groupId: number,
  year: number,
  customMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<GroupAccountListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupAccountList = result.data;
      dispatch(fetchGroupAccountAction(groupAccountList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        const groupTransactionsError = {
          loading: false,
          statusCode: error.response.status,
          errorMessage: error.response.data.error.message,
        };

        dispatch(failedFetchDataAction(groupTransactionsError));
      }
    }
  };
};

export const fetchGroupYearlyAccountList = (
  groupId: number,
  year: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<GroupYearlyAccountList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupYearlyAccountList = result.data;

      dispatch(fetchGroupYearlyAccountListAction(groupYearlyAccountList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        const groupTransactionsError = {
          loading: false,
          statusCode: error.response.status,
          errorMessage: error.response.data.error.message,
        };

        dispatch(failedFetchDataAction(groupTransactionsError));

        if (error.response.status === 401) {
          dispatch(push('/login'));
        }
      }
    }
  };
};

export const addGroupAccount = (groupId: number, year: string, customMonth: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.post<GroupAccountList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        null,
        {
          withCredentials: true,
        }
      );
      const groupAccountList = result.data;

      dispatch(addGroupAccountAction(groupAccountList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        const groupTransactionsError = {
          loading: false,
          statusCode: error.response.status,
          errorMessage: error.response.data.error.message,
        };

        dispatch(failedFetchDataAction(groupTransactionsError));
        if (error.response.status === 401) {
          dispatch(push('/login'));
        }
      }
    }
  };
};

export const editGroupAccount = (
  groupAccount: GroupAccount,
  groupId: number,
  year: string,
  customMonth: string
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.put<GroupAccount>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account/${groupAccount.id}`,
        JSON.stringify(groupAccount),
        { withCredentials: true }
      );
      const editedGroupAccount = result.data;
      const prevGroupAccountList = getState().groupTransactions.groupAccountList;

      prevGroupAccountList.group_accounts_list_by_payer = prevGroupAccountList.group_accounts_list_by_payer.map(
        (accountByPayer) => {
          accountByPayer.group_accounts_list = accountByPayer.group_accounts_list.map((account) => {
            if (account.id === editedGroupAccount.id) {
              return editedGroupAccount;
            }

            return account;
          });

          return accountByPayer;
        }
      );

      dispatch(editGroupAccountAction(prevGroupAccountList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const deleteGroupAccount = (groupId: number, year: string, customMonth: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    try {
      const result = await axios.delete<deleteActionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        {
          withCredentials: true,
        }
      );
      const deletedMessage = result.data.message;
      const prevGroupAccountList = getState().groupTransactions.groupAccountList;

      if (prevGroupAccountList.group_id === groupId) {
        const emptyGroupAccountList: GroupAccountList = {
          group_id: 0,
          month: '',
          group_total_payment_amount: 0,
          group_average_payment_amount: 0,
          group_remaining_amount: 0,
          group_accounts_list_by_payer: [],
        };

        dispatch(deleteGroupAccountAction(emptyGroupAccountList, deletedMessage));
      } else {
        return prevGroupAccountList;
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const searchGroupTransactions = (
  groupId: number,
  searchRequest: {
    transaction_type?: string | null;
    start_date?: Date | null;
    end_date?: Date | null;
    shop?: string | null;
    memo?: string | null;
    low_amount?: string | number | null;
    high_amount?: string | number | null;
    payment_user_id?: string | null;
    big_category_id?: number | null;
    limit?: string | null;
    sort?: string | null;
    sort_type?: string | null;
  }
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/search`,
        {
          withCredentials: true,
          params: {
            start_date:
              searchRequest.start_date !== null ? moment(searchRequest.start_date).format() : null,
            end_date:
              searchRequest.end_date !== null ? moment(searchRequest.end_date).format() : null,
            transaction_type: searchRequest.transaction_type,
            shop: searchRequest.shop,
            memo: searchRequest.memo,
            low_amount: searchRequest.low_amount,
            high_amount: searchRequest.high_amount,
            payment_user_id: searchRequest.payment_user_id,
            limit: searchRequest.limit,
            sort: searchRequest.sort,
            big_category_id: searchRequest.big_category_id,
            sort_type: searchRequest.sort_type,
          },
        }
      );
      const searchGroupTransactionsList: GroupTransactionsList = result.data.transactions_list;
      const notHistoryMessage = result.data.message;

      if (searchGroupTransactionsList !== undefined) {
        const emptyMessage = '';
        dispatch(searchGroupTransactionsAction(searchGroupTransactionsList, emptyMessage));
      } else {
        const emptySearchGroupTransactionsList: GroupTransactionsList = [];
        dispatch(
          searchGroupTransactionsAction(emptySearchGroupTransactionsList, notHistoryMessage)
        );
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
