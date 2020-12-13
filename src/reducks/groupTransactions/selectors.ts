import { createSelector } from 'reselect';
import { State } from '../store/types';

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

export const getSortCategoryGroupTransactions = createSelector(
  [groupTransactionsSelector],
  (state) => {
    return [
      ...state.groupTransactionsList
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
