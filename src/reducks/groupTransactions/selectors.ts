import { createSelector } from 'reselect';
import { State } from '../store/types';
import { incomeTransactionType } from '../../lib/constant';

const groupTransactionsSelector = (state: State) => state.groupTransactions;

export const getGroupTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupTransactionsList
);

export const getGroupLatestTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupLatestTransactionsList
);

export const getGroupAccountList = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupAccountList
);

export const getGroupYearlyAccountList = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupYearlyAccountList
);

export const getDeleteAccountMessage = createSelector(
  [groupTransactionsSelector],
  (state) => state.deletedMessage
);

export const getSearchGroupTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupSearchTransactionsList
);

const errorInfo = (state: State) => state.groupTransactions.groupTransactionsError;

export const getStatusNotFoundMessage = createSelector([errorInfo], (errorInfo) => {
  let errorMessage;

  if (errorInfo.statusCode === 404) {
    if (errorInfo.errorMessage) {
      errorMessage = errorInfo.errorMessage;
    }
  }

  return errorMessage;
});

const groupAccountList = (state: State) => state.groupTransactions.groupAccountList;

export const getAccountCompleteJudgment = createSelector([groupAccountList], (groupAccountList) => {
  const completeAccount = {
    completeJudge: false,
    completeMonth: '',
  };

  if (groupAccountList) {
    if (groupAccountList.group_accounts_list_by_payer) {
      for (const account of groupAccountList.group_accounts_list_by_payer) {
        for (const accountByPayer of account.group_accounts_list) {
          if (accountByPayer.payer_user_id === null && accountByPayer.recipient_user_id === null) {
            completeAccount.completeJudge = true;
            completeAccount.completeMonth = accountByPayer.month;
          }
        }
      }
    }
  }

  return completeAccount;
});

const groupTransactionsList = (state: State) => state.groupTransactions.groupTransactionsList;

export const getSortCategoryGroupTransactions = createSelector(
  [groupTransactionsList],
  (groupTransactionsList) => {
    return [
      ...groupTransactionsList
        .reduce((acc, groupTransaction) => {
          const key = groupTransaction.big_category_name + '-' + groupTransaction.big_category_name;

          const item =
            acc.get(key) ||
            Object.assign({}, groupTransaction, {
              amount: 0,
            });

          item.amount += groupTransaction.amount;

          return acc.set(key, item);
        }, new Map())
        .values(),
    ];
  }
);

export const getTotalGroupExpense = createSelector(
  [groupTransactionsList],
  (groupTransactionsList) => {
    let total = 0;

    for (const groupTransaction of groupTransactionsList) {
      if (groupTransaction.transaction_type !== incomeTransactionType) {
        total += groupTransaction.amount;
      }
    }
    return total;
  }
);
