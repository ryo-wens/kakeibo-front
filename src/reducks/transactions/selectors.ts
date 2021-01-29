import { createSelector } from 'reselect';
import { State } from '../store/types';
import { PieChartData, PieChartDataList } from './types';
import { incomeTransactionType } from '../../lib/constant';

const transactionsSelector = (state: State) => state.transactions;

export const getTransactions = createSelector(
  [transactionsSelector],
  (state) => state.transactionsList
);

export const getLatestTransactions = createSelector(
  [transactionsSelector],
  (state) => state.latestTransactionsList
);

export const getTransactionsMessage = createSelector(
  [transactionsSelector],
  (state) => state.noTransactionsMessage
);

export const getSearchTransactions = createSelector(
  [transactionsSelector],
  (state) => state.searchTransactionsList
);

export const notHistoryMessage = createSelector(
  [transactionsSelector],
  (state) => state.notHistoryMessage
);

const transactionsList = (state: State) => state.transactions.transactionsList;

export const getSortCategoryTransactions = createSelector(
  [transactionsList],
  (transactionsList) => {
    const pieChartDataList: PieChartDataList = [];
    const copyTransactionsList = transactionsList.concat();
    copyTransactionsList.sort((a, b) => a.big_category_id - b.big_category_id);

    let prevBigCategoryName = '';

    for (const transaction of copyTransactionsList) {
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

export const getTotalExpense = createSelector([transactionsList], (transactionsList) => {
  let total = 0;

  for (const transaction of transactionsList) {
    if (transaction.transaction_type !== incomeTransactionType) {
      total += transaction.amount;
    }
  }
  return total;
});

export const getWeeklyHistoryTransactions = createSelector(
  [transactionsList],
  (transactionsList) => {
    return transactionsList.filter(
      (transaction) => transaction.transaction_type !== incomeTransactionType
    );
  }
);
