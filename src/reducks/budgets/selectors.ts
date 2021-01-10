import { createSelector } from 'reselect';
import { State } from '../store/types';
import { CurrentMonthBudgetStatusList } from './types';
import {
  incomeTransactionType,
  month,
  thisMonthEndDate,
  todayDate,
  todayOfWeek,
} from '../../lib/constant';

const budgetsSelector = (state: State) => state.budgets;

export const getStandardBudgets = createSelector(
  [budgetsSelector],
  (state) => state.standard_budgets_list
);
export const getYearlyBudgets = createSelector(
  [budgetsSelector],
  (state) => state.yearly_budgets_list
);
export const getCustomBudgets = createSelector(
  [budgetsSelector],
  (state) => state.custom_budgets_list
);

const yearlyBudgets = (state: State) => state.budgets.yearly_budgets_list;
const transactionsList = (state: State) => state.transactions.transactionsList;

export const getCurrentMonthBudgets = createSelector(
  [yearlyBudgets, transactionsList],
  (yearlyBudgets, transactionsList) => {
    const remainingDays = thisMonthEndDate - todayDate;
    const weekStartDate = todayDate - todayOfWeek;
    const weekEndDate = weekStartDate + 7;

    let currentMonthTotalExpense = 0;
    let currentWeekTotalExpense = 0;
    let currentDayTotalExpense = 0;

    for (const transaction of transactionsList) {
      const transactionDay = Number(transaction.transaction_date.slice(8, 10));

      if (transaction.transaction_type !== incomeTransactionType) {
        currentMonthTotalExpense += transaction.amount;

        if (weekStartDate <= transactionDay && transactionDay <= weekEndDate) {
          currentWeekTotalExpense += transaction.amount;
        }

        if (transactionDay === todayDate) {
          currentDayTotalExpense += transaction.amount;
        }
      }
    }

    const currentMonthBudgets = yearlyBudgets.monthly_budgets.length
      ? yearlyBudgets.monthly_budgets[month - 1].monthly_total_budget
      : 0;

    const currentWeekBudgets = Math.round(
      ((currentMonthBudgets - currentMonthTotalExpense + currentWeekTotalExpense) / remainingDays) *
        7
    );

    const currentDayBudget = Math.round(
      (currentMonthBudgets - currentMonthTotalExpense + currentDayTotalExpense) / remainingDays
    );

    const currentMonthBudgetStatus = {
      label: '今月',
      totalExpense: currentMonthTotalExpense,
      remainingBudget: currentMonthBudgets - currentMonthTotalExpense,
      percentage: Math.round((currentMonthTotalExpense / currentMonthBudgets) * 100),
    };

    const currentWeekBudgetStatus = {
      label: '今週',
      totalExpense: currentWeekTotalExpense,
      remainingBudget: currentWeekBudgets - currentWeekTotalExpense,
      percentage: Math.round((currentWeekTotalExpense / currentWeekBudgets) * 100),
    };

    const currentDayBudgetStatus = {
      label: '今日',
      totalExpense: currentDayTotalExpense,
      remainingBudget: currentDayBudget - currentDayTotalExpense,
      percentage: Math.round((currentDayTotalExpense / currentDayBudget) * 100),
    };

    const currentBudgetStatusList: CurrentMonthBudgetStatusList = [
      currentDayBudgetStatus,
      currentWeekBudgetStatus,
      currentMonthBudgetStatus,
    ];

    return currentBudgetStatusList;
  }
);

export const getAmountPerDay = createSelector(
  [yearlyBudgets, transactionsList],
  (yearlyBudgets, transactionsList) => {
    const remainingDays = thisMonthEndDate - todayDate;
    let currentMonthTotalExpense = 0;

    for (const transaction of transactionsList) {
      if (transaction.transaction_type !== incomeTransactionType) {
        currentMonthTotalExpense += transaction.amount;
      }
    }

    const currentMonthBudgets = yearlyBudgets.monthly_budgets.length
      ? yearlyBudgets.monthly_budgets[month - 1].monthly_total_budget
      : 0;

    const remainingBudget = currentMonthBudgets - currentMonthTotalExpense;

    return Math.round(remainingBudget / remainingDays);
  }
);

const standardBudgetsList = (state: State) => state.budgets.standard_budgets_list;

export const getTotalStandardBudget = createSelector(
  [standardBudgetsList],
  (standardBudgetsList) => {
    let totalStandardBudget = 0;

    for (let i = 0; i < standardBudgetsList.length; i++) {
      totalStandardBudget += standardBudgetsList[i].budget;
    }

    return totalStandardBudget;
  }
);

const customBudgetsList = (state: State) => state.budgets.custom_budgets_list;

export const getTotalCustomBudget = createSelector([customBudgetsList], (customBudgetsList) => {
  let totalCustomBudget = 0;

  for (let i = 0; i < customBudgetsList.length; i++) {
    totalCustomBudget += customBudgetsList[i].budget;
  }

  return totalCustomBudget;
});
