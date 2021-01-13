import { createSelector } from 'reselect';
import { State } from '../store/types';
import { PieChartData, PieChartDataList } from '../transactions/types';
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

export const getGroupYearlyAccountList = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupYearlyAccountList
);

export const getGroupAccountList = createSelector(
  [groupTransactionsSelector],
  (state) => state.groupAccountList
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

export const getRemainingTotalAmount = createSelector([groupAccountList], (groupAccountList) => {
  const remainingAmountList: number[] = [];

  for (const groupAccountListByPayer of groupAccountList.group_accounts_list_by_payer) {
    let remainingAmount = 0;

    for (const account of groupAccountListByPayer.group_accounts_list) {
      if (account.receipt_confirmation) {
        continue;
      }

      remainingAmount += account.payment_amount;
    }

    remainingAmountList.push(remainingAmount);
  }

  return remainingAmountList;
});

const groupTransactionsList = (state: State) => state.groupTransactions.groupTransactionsList;

export const getSortCategoryGroupTransactions = createSelector(
  [groupTransactionsList],
  (groupTransactionsList) => {
    const pieChartDataList: PieChartDataList = [];
    const copyGroupTransactionsList = groupTransactionsList.concat();
    copyGroupTransactionsList.sort((a, b) => a.big_category_id - b.big_category_id);

    let prevBigCategoryName = '';

    for (const transaction of copyGroupTransactionsList) {
      if (transaction.transaction_type === 'income') {
        continue;
      }

      if (transaction.big_category_name === prevBigCategoryName) {
        const lastIndex = pieChartDataList.length - 1;
        pieChartDataList[lastIndex].amount += transaction.amount;

        continue;
      }

      const pieChartData: PieChartData = {
        big_category_name: transaction.big_category_name,
        amount: transaction.amount,
      };

      pieChartDataList.push(pieChartData);

      prevBigCategoryName = transaction.big_category_name;
    }

    return pieChartDataList;
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
