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

export const getNotHistoryMessage = createSelector(
  [groupTransactionsSelector],
  (state) => state.notAccountMessage
);

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
