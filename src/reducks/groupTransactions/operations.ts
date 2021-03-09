import {
  startFetchGroupTransactionsAction,
  fetchGroupTransactionsAction,
  cancelFetchTransactionsAction,
  failedFetchGroupTransactionsAction,
  startFetchGroupLatestTransactionsAction,
  fetchGroupLatestTransactionsAction,
  cancelFetchGroupLatestTransactionsAction,
  failedFetchGroupLatestTransactionsAction,
  startAddGroupTransactionsAction,
  addGroupTransactionsAction,
  failedAddGroupTransactionsAction,
  startEditGroupTransactionsAction,
  editGroupTransactionsAction,
  failedEditGroupTransactionsAction,
  startDeleteGroupTransactionsAction,
  deleteGroupTransactionsAction,
  failedDeleteGroupTransactionsAction,
  startSearchGroupTransactionsAction,
  searchGroupTransactionsAction,
  failedSearchGroupTransactionsAction,
  startFetchGroupAccountAction,
  fetchGroupAccountAction,
  cancelFetchGroupAccountAction,
  failedFetchGroupAccountAction,
  startFetchGroupYearlyAccountList,
  fetchGroupYearlyAccountListAction,
  cancelFetchGroupYearlyAccountList,
  failedFetchGroupYearlyAccountList,
  startFetchYearlyAccountListForModalAction,
  fetchYearlyAccountListForModalAction,
  cancelFetchYearlyAccountListForModalAction,
  failedFetchYearlyAccountListForModalAction,
  startAddGroupAccountAction,
  addGroupAccountAction,
  failedAddGroupAccountAction,
  startEditGroupAccountAction,
  editGroupAccountAction,
  failedEditGroupAccountAction,
  startDeleteGroupAccountAction,
  deleteGroupAccountAction,
  failedDeleteGroupAccountAction,
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
import { errorHandling, isValidAmountFormat } from '../../lib/validation';
import moment from 'moment';

export const fetchGroupTransactionsList = (
  groupId: number,
  selectYears: {
    selectedYear: string;
    selectedMonth: string;
  },
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTransactionsAction());

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
        dispatch(fetchGroupTransactionsAction(groupTransactionsList));
      } else {
        const emptyGroupTransactionsList: GroupTransactionsList = [];

        dispatch(fetchGroupTransactionsAction(emptyGroupTransactionsList));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchTransactionsAction());
      } else {
        dispatch(
          failedFetchGroupTransactionsAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchLatestGroupTransactionsList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupLatestTransactionsAction());
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
        dispatch(fetchGroupLatestTransactionsAction(latestGroupTransactionsList));
      } else {
        const emptyGroupLatestTransactionsList: GroupTransactionsList = [];
        dispatch(fetchGroupLatestTransactionsAction(emptyGroupLatestTransactionsList));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupLatestTransactionsAction());
      } else {
        dispatch(
          failedFetchGroupLatestTransactionsAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addGroupTransactions = (
  groupId: number,
  signal: CancelTokenSource,
  addTransactionYear: number,
  addTransactionMonth: string,
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
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidAmountFormat(requestData.amount as string)) {
      alert('金額は数字で入力してください。');
    }
    dispatch(startAddGroupTransactionsAction());

    try {
      await axios.post<GroupTransactions>(
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

      const fetchGroupTransactionsResult = axios.get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${addTransactionYear}-${addTransactionMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchGroupLatestTransactionsResult = axios.get<GroupLatestTransactionsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const addedGroupTransactionsList = await fetchGroupTransactionsResult;
      const addedGroupLatestTransactionsList = await fetchGroupLatestTransactionsResult;

      dispatch(
        addGroupTransactionsAction(
          addedGroupTransactionsList.data.transactions_list,
          addedGroupLatestTransactionsList.data.transactions_list
        )
      );
    } catch (error) {
      dispatch(
        failedAddGroupTransactionsAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editGroupTransactions = (
  id: number,
  groupId: number,
  signal: CancelTokenSource,
  editTransactionYear: number,
  editTransactionMonth: string,
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
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidAmountFormat(requestData.amount as string)) {
      alert('金額は数字で入力してください。');
    }
    dispatch(startEditGroupTransactionsAction());

    try {
      await axios.put<GroupTransactions>(
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

      const fetchGroupTransactionsResult = axios.get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${editTransactionYear}-${editTransactionMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchGroupLatestTransactionsResult = axios.get<GroupLatestTransactionsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedGroupTransactionsList = await fetchGroupTransactionsResult;
      const editedGroupLatestTransactionsList = await fetchGroupLatestTransactionsResult;

      dispatch(
        editGroupTransactionsAction(
          editedGroupTransactionsList.data.transactions_list,
          editedGroupLatestTransactionsList.data.transactions_list
        )
      );
    } catch (error) {
      dispatch(
        failedEditGroupTransactionsAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const deleteGroupTransactions = (
  id: number,
  groupId: number,
  signal: CancelTokenSource,
  editTransactionYear: number,
  editTransactionMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupTransactionsAction());

    try {
      await axios.delete<deleteActionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${id}`,
        {
          withCredentials: true,
        }
      );

      const fetchGroupTransactionsResult = axios.get<FetchGroupTransactionsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${editTransactionYear}-${editTransactionMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchGroupLatestTransactionsResult = await axios.get<GroupLatestTransactionsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/latest`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const deletedGroupTransactionsList =
        (await fetchGroupTransactionsResult).data.transactions_list === undefined
          ? []
          : (await fetchGroupTransactionsResult).data.transactions_list;

      const deletedGroupLatestTransactionsList =
        (await fetchGroupLatestTransactionsResult).data.transactions_list === undefined
          ? []
          : (await fetchGroupLatestTransactionsResult).data.transactions_list;

      dispatch(
        deleteGroupTransactionsAction(
          deletedGroupTransactionsList,
          deletedGroupLatestTransactionsList
        )
      );
    } catch (error) {
      dispatch(
        failedDeleteGroupTransactionsAction(
          error.response.status,
          error.response.error.data.error.message
        )
      );
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
    dispatch(startFetchGroupAccountAction());
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
        dispatch(cancelFetchGroupAccountAction());
      } else {
        dispatch(
          failedFetchGroupAccountAction(error.response.status, error.response.data.error.message)
        );
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
    dispatch(startFetchGroupYearlyAccountList());

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
        dispatch(cancelFetchGroupYearlyAccountList());
      } else {
        dispatch(
          failedFetchGroupYearlyAccountList(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchGroupYearlyAccountListForModal = (
  groupId: number,
  year: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchYearlyAccountListForModalAction());

    try {
      const result = await axios.get<GroupYearlyAccountList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupYearlyAccountList = result.data;

      dispatch(fetchYearlyAccountListForModalAction(groupYearlyAccountList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchYearlyAccountListForModalAction());
      } else {
        dispatch(
          failedFetchYearlyAccountListForModalAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addGroupAccount = (
  groupId: number,
  year: string,
  customMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupAccountAction());

    try {
      await axios.post<GroupAccountList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        null,
        {
          withCredentials: true,
        }
      );

      const fetchAccountResult = axios.get<GroupAccountListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchYearlyAccountResult = axios.get<GroupYearlyAccountList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const addedGroupAccountList = await fetchAccountResult;
      const addedGroupYearlyAccountList = await fetchYearlyAccountResult;

      dispatch(addGroupAccountAction(addedGroupYearlyAccountList.data, addedGroupAccountList.data));
    } catch (error) {
      dispatch(
        failedAddGroupAccountAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editGroupAccount = (
  groupAccount: GroupAccount,
  groupId: number,
  year: string,
  customMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditGroupAccountAction());

    try {
      await axios.put<GroupAccount>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account/${groupAccount.id}`,
        JSON.stringify(groupAccount),
        { withCredentials: true }
      );

      const fetchAccountResult = axios.get<GroupAccountListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedAccountList = await fetchAccountResult;

      dispatch(editGroupAccountAction(editedAccountList.data));
    } catch (error) {
      dispatch(
        failedEditGroupAccountAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const deleteGroupAccount = (
  groupId: number,
  year: string,
  customMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupAccountAction());

    try {
      const result = await axios.delete<deleteActionRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        {
          withCredentials: true,
        }
      );

      const fetchYearlyAccountResult = axios.get<GroupYearlyAccountList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/transactions/${year}/account`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const deletedMessage = result.data.message;
      const deletedYearlyAccountList = await fetchYearlyAccountResult;
      const emptyGroupAccountList: GroupAccountList = {
        group_id: 0,
        month: '',
        group_total_payment_amount: 0,
        group_average_payment_amount: 0,
        group_remaining_amount: 0,
        group_accounts_list_by_payer: [],
      };

      dispatch(
        deleteGroupAccountAction(
          emptyGroupAccountList,
          deletedYearlyAccountList.data,
          deletedMessage
        )
      );
    } catch (error) {
      dispatch(
        failedDeleteGroupAccountAction(error.response.status, error.response.data.error.message)
      );
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
    dispatch(startSearchGroupTransactionsAction());
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
      dispatch(
        failedSearchGroupTransactionsAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
