import { createSelector } from 'reselect';
import { State } from '../store/types';

const transactionsSelector = (state: State) => state.transactions;

export const getTransactionType = createSelector(
  [transactionsSelector],
  (state) => state.transaction_type
)

export const getTransactionDate = createSelector(
  [transactionsSelector],
  (state) => state.transaction_date
)

export const getShop = createSelector(
  [transactionsSelector],
  (state) =>state.shop
)

export const getMemo = createSelector(
  [transactionsSelector],
  (state) =>state.memo
)

export const getAmount = createSelector(
  [transactionsSelector],
  (state) =>state.amount
)

export const getBigCategoryId = createSelector(
  [transactionsSelector],
  (state) => state.big_category_id
)

export const getMediumCategoryId = createSelector(
  [transactionsSelector],
  (state) =>state.medium_category_id
)

export const getCustomCategoryId = createSelector(
  [transactionsSelector],
  (state) => state.custom_category_id
)
