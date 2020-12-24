import { createSelector } from 'reselect';
import { State } from '../store/types';
import { CurrentMonthBudgetStatusList } from './types';
import {
  todayDate,
  thisMonthEndDate,
  todayOfWeek,
  incomeTransactionType,
  month,
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
      totalExpense: `今月の支出は ¥${currentMonthTotalExpense.toLocaleString()}です。`,
      remainingBudget: currentMonthBudgets - currentMonthTotalExpense,
      remainingBudgetMessage: `今月の使える残金は¥${
        currentMonthBudgets - currentMonthTotalExpense
      }です。`,
      percentage: Math.round((currentMonthTotalExpense / currentMonthBudgets) * 100),
    };

    const currentWeekBudgetStatus = {
      label: '今週',
      totalExpense: `今週の支出は ¥${currentWeekTotalExpense.toLocaleString()}です。`,
      remainingBudget: currentWeekBudgets - currentWeekTotalExpense,
      remainingBudgetMessage: `今週の使える残金は¥${
        currentWeekBudgets - currentWeekTotalExpense
      }です。`,
      percentage: Math.round((currentWeekTotalExpense / currentWeekBudgets) * 100),
    };

    const currentDayBudgetStatus = {
      label: '今日',
      totalExpense: `今日の支出は ¥${currentDayTotalExpense.toLocaleString()}です。`,
      remainingBudget: currentDayBudget - currentDayTotalExpense,
      remainingBudgetMessage: `今日の使える残金は¥${
        currentDayBudget - currentDayTotalExpense
      }です。`,
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
