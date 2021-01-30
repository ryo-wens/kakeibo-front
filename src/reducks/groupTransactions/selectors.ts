import { createSelector } from 'reselect';
import { State } from '../store/types';
import { PieChartData, PieChartDataList } from '../transactions/types';
import { YearlyAccountStatus, CompleteAccountStatus, MonthWithoutSplit } from './types';
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

const yearlyAccountList = (state: State) => state.groupTransactions.groupYearlyAccountList;

export const getYearlyAccountListStatus = createSelector(
  [yearlyAccountList],
  (yearlyAccountList) => {
    const yearlyAccountStatus: YearlyAccountStatus = {
      year: '',
      accountedMonth: [],
    };

    for (const yearlyAccount of yearlyAccountList.yearly_accounting_status) {
      // 精算済みの場合は、家計簿の追加, 編集, 削除は行えないようにするため精算済みの月を取得する。
      if (yearlyAccount.calculation_status === '精算済') {
        yearlyAccountStatus.accountedMonth.push(yearlyAccount.month);
        yearlyAccountStatus.year = yearlyAccountList.Year;
      }
    }

    return yearlyAccountStatus;
  }
);

const yearlyAccountListForModal = (state: State) =>
  state.groupTransactions.groupYearlyAccountListForModal;

export const getYearlyAccountListStatusModals = createSelector(
  [yearlyAccountListForModal],
  (yearlyAccountListForModal) => {
    const yearlyAccountStatusForModal: YearlyAccountStatus = {
      year: '',
      accountedMonth: [],
    };

    for (const yearlyAccount of yearlyAccountListForModal.yearly_accounting_status) {
      // 精算済みの場合は、家計簿の追加, 編集, 削除は行えないようにするため精算済みの月を取得する。
      if (yearlyAccount.calculation_status === '精算済') {
        yearlyAccountStatusForModal.year = yearlyAccountListForModal.Year;
        yearlyAccountStatusForModal.accountedMonth.push(yearlyAccount.month);
      }
    }

    return yearlyAccountStatusForModal;
  }
);

const groupAccountList = (state: State) => state.groupTransactions.groupAccountList;

export const getMonthWithoutSplitList = createSelector([groupAccountList], (groupAccountList) => {
  const completeAccount: MonthWithoutSplit = {
    withoutMonth: [],
  };

  if (groupAccountList) {
    if (groupAccountList.group_accounts_list_by_payer) {
      for (const account of groupAccountList.group_accounts_list_by_payer) {
        for (const accountByPayer of account.group_accounts_list) {
          if (accountByPayer.payer_user_id === null && accountByPayer.recipient_user_id === null) {
            completeAccount.withoutMonth.push(accountByPayer.month.split('-')[1]);
          }
        }
      }
    }
  }

  return completeAccount;
});

export const getAccountCompleteMonthList = createSelector(
  [yearlyAccountList],
  (yearlyAccountList) => {
    const yearlyAccountStatus: CompleteAccountStatus = {
      completeMonth: [],
    };

    const september = 9;

    for (const yearlyAccount of yearlyAccountList.yearly_accounting_status) {
      if (yearlyAccount.calculation_status === '精算済') {
        yearlyAccountStatus.completeMonth.push(
          Number(yearlyAccount.month.split('月')[0]) <= september
            ? '0' + yearlyAccount.month.split('月')[0]
            : yearlyAccount.month.split('月')[0]
        );
      }
    }

    return yearlyAccountStatus;
  }
);

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

export const getGroupWeeklyTransaction = createSelector(
  [groupTransactionsList],
  (groupTransactionsList) => {
    return groupTransactionsList.filter(
      (transaction) => transaction.transaction_type !== incomeTransactionType
    );
  }
);
