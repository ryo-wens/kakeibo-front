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
  cancelSearchGroupTransactionsAction,
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
  startEditSearchGroupTransactionsAction,
  searchEditGroupTransactionsAction,
  failedEditSearchGroupTransactionsAction,
  startDeleteSearchGroupTransactionsAction,
  searchDeleteGroupTransactionsAction,
  failedDeleteSearchGroupTransactionsAction,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { accountServiceInstance } from '../axiosConfig';
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
import dayjs from 'dayjs';

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
      const result = await accountServiceInstance.get<FetchGroupTransactionsRes>(
        `/groups/${groupId}/transactions/${selectYears.selectedYear}-${selectYears.selectedMonth}`,
        { cancelToken: signal.token }
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
      const result = await accountServiceInstance.get<GroupLatestTransactionsListRes>(
        `/groups/${groupId}/transactions/latest`,
        { cancelToken: signal.token }
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
      await accountServiceInstance.post<GroupTransactions>(
        `/groups/${groupId}/transactions`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'transaction_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchGroupTransactionsResult = accountServiceInstance.get<FetchGroupTransactionsRes>(
        `/groups/${groupId}/transactions/${addTransactionYear}-${addTransactionMonth}`
      );

      const fetchGroupLatestTransactionsResult = accountServiceInstance.get<GroupLatestTransactionsListRes>(
        `/groups/${groupId}/transactions/latest`
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
      await accountServiceInstance.put<GroupTransactions>(
        `/groups/${groupId}/transactions/${id}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'transaction_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchGroupTransactionsResult = accountServiceInstance.get<FetchGroupTransactionsRes>(
        `/groups/${groupId}/transactions/${editTransactionYear}-${editTransactionMonth}`
      );

      const fetchGroupLatestTransactionsResult = accountServiceInstance.get<GroupLatestTransactionsListRes>(
        `/groups/${groupId}/transactions/latest`
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
  editTransactionYear: number,
  editTransactionMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupTransactionsAction());

    try {
      await accountServiceInstance.delete<deleteActionRes>(`/groups/${groupId}/transactions/${id}`);

      const fetchGroupTransactionsResult = accountServiceInstance.get<FetchGroupTransactionsRes>(
        `/groups/${groupId}/transactions/${editTransactionYear}-${editTransactionMonth}`
      );

      const fetchGroupLatestTransactionsResult = accountServiceInstance.get<GroupLatestTransactionsListRes>(
        `/groups/${groupId}/transactions/latest`
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
      const result = await accountServiceInstance.get<GroupAccountListRes>(
        `/groups/${groupId}/transactions/${year}-${customMonth}/account`,
        { cancelToken: signal.token }
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
      const result = await accountServiceInstance.get<GroupYearlyAccountList>(
        `/groups/${groupId}/transactions/${year}/account`,
        { cancelToken: signal.token }
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
      const result = await accountServiceInstance.get<GroupYearlyAccountList>(
        `/groups/${groupId}/transactions/${year}/account`,
        { cancelToken: signal.token }
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

export const addGroupAccount = (groupId: number, year: string, customMonth: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupAccountAction());

    try {
      await accountServiceInstance.post<GroupAccountList>(
        `/groups/${groupId}/transactions/${year}-${customMonth}/account`
      );

      const fetchAccountResult = accountServiceInstance.get<GroupAccountListRes>(
        `/groups/${groupId}/transactions/${year}-${customMonth}/account`
      );

      const fetchYearlyAccountResult = accountServiceInstance.get<GroupYearlyAccountList>(
        `/groups/${groupId}/transactions/${year}/account`
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
  customMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditGroupAccountAction());

    try {
      await accountServiceInstance.put<GroupAccount>(
        `/groups/${groupId}/transactions/${year}-${customMonth}/account/${groupAccount.id}`,
        JSON.stringify(groupAccount)
      );

      const fetchAccountResult = accountServiceInstance.get<GroupAccountListRes>(
        `/groups/${groupId}/transactions/${year}-${customMonth}/account`
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

export const deleteGroupAccount = (groupId: number, year: string, customMonth: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupAccountAction());

    try {
      const result = await accountServiceInstance.delete<deleteActionRes>(
        `/groups/${groupId}/transactions/${year}-${customMonth}/account`
      );

      const fetchYearlyAccountResult = accountServiceInstance.get<GroupYearlyAccountList>(
        `/groups/${groupId}/transactions/${year}/account`
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
  signal: CancelTokenSource,
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
      const result = await accountServiceInstance.get<FetchGroupTransactionsRes>(
        `/groups/${groupId}/transactions/search`,
        {
          cancelToken: signal.token,
          params: {
            start_date:
              searchRequest.start_date !== null ? dayjs(searchRequest.start_date).format() : null,
            end_date:
              searchRequest.end_date !== null ? dayjs(searchRequest.end_date).format() : null,
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
      if (axios.isCancel(error)) {
        dispatch(cancelSearchGroupTransactionsAction());
      }
      dispatch(
        failedSearchGroupTransactionsAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const editSearchGroupTransactions = (
  groupId: number,
  id: number,
  editRequestData: {
    transaction_type: string;
    transaction_date: Date | null;
    shop: string | null;
    memo: string | null;
    amount: string | number;
    payment_user_id: string;
    big_category_id: number;
    medium_category_id: number | null;
    custom_category_id: number | null;
  },
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
    dispatch(startEditSearchGroupTransactionsAction());

    try {
      await accountServiceInstance.put<GroupTransactions>(
        `/groups/${groupId}/transactions/${id}`,
        JSON.stringify(editRequestData, function (key, value) {
          if (key === 'transaction_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const result = await accountServiceInstance.get<FetchGroupTransactionsRes>(
        `/groups/${groupId}/transactions/search`,
        {
          params: {
            start_date:
              searchRequest.start_date !== null ? dayjs(searchRequest.start_date).format() : null,
            end_date:
              searchRequest.end_date !== null ? dayjs(searchRequest.end_date).format() : null,
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
        dispatch(searchEditGroupTransactionsAction(searchGroupTransactionsList, emptyMessage));
      } else {
        const emptySearchGroupTransactionsList: GroupTransactionsList = [];
        dispatch(
          searchEditGroupTransactionsAction(emptySearchGroupTransactionsList, notHistoryMessage)
        );
      }
    } catch (error) {
      dispatch(
        failedEditSearchGroupTransactionsAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const deleteSearchGroupTransactions = (
  groupId: number,
  id: number,
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
    dispatch(startDeleteSearchGroupTransactionsAction());

    try {
      await accountServiceInstance.delete<deleteActionRes>(`/groups/${groupId}/transactions/${id}`);

      const result = await accountServiceInstance.get<FetchGroupTransactionsRes>(
        `/groups/${groupId}/transactions/search`,
        {
          params: {
            start_date:
              searchRequest.start_date !== null ? dayjs(searchRequest.start_date).format() : null,
            end_date:
              searchRequest.end_date !== null ? dayjs(searchRequest.end_date).format() : null,
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
        dispatch(searchDeleteGroupTransactionsAction(searchGroupTransactionsList, emptyMessage));
      } else {
        const emptySearchGroupTransactionsList: GroupTransactionsList = [];
        dispatch(
          searchDeleteGroupTransactionsAction(emptySearchGroupTransactionsList, notHistoryMessage)
        );
      }
    } catch (error) {
      dispatch(
        failedDeleteSearchGroupTransactionsAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
