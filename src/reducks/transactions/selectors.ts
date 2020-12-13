import { createSelector } from 'reselect';
import { State } from '../store/types';
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
    return [
      ...transactionsList
        .reduce((acc, transaction) => {
          const key = transaction.big_category_name + '-' + transaction.big_category_name;

          const item =
            acc.get(key) ||
            Object.assign({}, transaction, {
              amount: 0,
            });

          item.amount += transaction.amount;

          return acc.set(key, item);
        }, new Map())
        .values(),
    ];
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
