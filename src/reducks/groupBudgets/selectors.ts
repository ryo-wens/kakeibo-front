import { createSelector } from 'reselect';
import { State } from '../store/types';
import { CurrentMonthBudgetGroupStatusList } from './types';
import {
  todayDate,
  thisMonthEndDate,
  todayOfWeek,
  incomeTransactionType,
  month,
} from '../../lib/constant';

const groupBudgetsSelector = (state: State) => state.groupBudgets;

export const getGroupStandardBudgets = createSelector(
  [groupBudgetsSelector],
  (state) => state.groupStandardBudgetsList
);

export const getGroupCustomBudgets = createSelector(
  [groupBudgetsSelector],
  (state) => state.groupCustomBudgetsList
);

export const getGroupYearlyBudgets = createSelector(
  [groupBudgetsSelector],
  (state) => state.groupYearlyBudgetsList
);

const groupYearlyBudgets = (state: State) => state.groupBudgets.groupYearlyBudgetsList;
const groupTransactionsList = (state: State) => state.groupTransactions.groupTransactionsList;

export const getCurrentMonthGroupBudget = createSelector(
  [groupYearlyBudgets, groupTransactionsList],
  (groupYearlyBudgets, groupTransactionsList) => {
    const remainingDays = thisMonthEndDate - todayDate;
    const weekStartDate = todayDate - todayOfWeek;
    const weekEndDate = weekStartDate + 7;

    let currentMonthTotalExpense = 0;
    let currentWeekTotalExpense = 0;
    let currentDayTotalExpense = 0;

    for (const transaction of groupTransactionsList) {
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

    const currentMonthBudgets = groupYearlyBudgets.monthly_budgets.length
      ? groupYearlyBudgets.monthly_budgets[month - 1].monthly_total_budget
      : 0;

    const currentWeekBudgets = Math.round(
      ((currentMonthBudgets - currentMonthTotalExpense + currentWeekTotalExpense) / remainingDays) *
        7
    );

    const currentDayBudget = Math.round(
      (currentMonthBudgets - currentMonthTotalExpense + currentDayTotalExpense) / remainingDays
    );

    const currentMonthGroupBudgetStatus = {
      label: '今月',
      totalExpense: `今月の支出は ¥${currentMonthTotalExpense.toLocaleString()}です。`,
      remainingBudget: currentMonthBudgets - currentMonthTotalExpense,
      remainingBudgetMessage: `今月の使える残金は¥${
        currentMonthBudgets - currentMonthTotalExpense
      }です。`,
      percentage: Math.round((currentMonthTotalExpense / currentMonthBudgets) * 100),
    };

    const currentWeekGroupBudgetStatus = {
      label: '今週',
      totalExpense: `今週の支出は ¥${currentWeekTotalExpense.toLocaleString()}です。`,
      remainingBudget: currentWeekBudgets - currentWeekTotalExpense,
      remainingBudgetMessage: `今週の使える残金は¥${
        currentWeekBudgets - currentWeekTotalExpense
      }です。`,
      percentage: Math.round((currentWeekTotalExpense / currentWeekBudgets) * 100),
    };

    const currentDayGroupBudgetStatus = {
      label: '今日',
      totalExpense: `今日の支出は ¥${currentDayTotalExpense.toLocaleString()}です。`,
      remainingBudget: currentDayBudget - currentDayTotalExpense,
      remainingBudgetMessage: `今日の使える残金は¥${
        currentDayBudget - currentDayTotalExpense
      }です。`,
      percentage: Math.round((currentDayTotalExpense / currentDayBudget) * 100),
    };

    const currentBudgetStatusList: CurrentMonthBudgetGroupStatusList = [
      currentDayGroupBudgetStatus,
      currentWeekGroupBudgetStatus,
      currentMonthGroupBudgetStatus,
    ];

    return currentBudgetStatusList;
  }
);

const groupStandardBudgetsList = (state: State) => state.groupBudgets.groupStandardBudgetsList;

export const getGroupTotalStandardBudget = createSelector(
  [groupStandardBudgetsList],
  (groupStandardBudgetsList) => {
    let totalStandardBudget = 0;

    for (let i = 0; i < groupStandardBudgetsList.length; i++) {
      totalStandardBudget += groupStandardBudgetsList[i].budget;
    }

    return totalStandardBudget;
  }
);

const groupCustomBudgetsList = (state: State) => state.groupBudgets.groupCustomBudgetsList;

export const getTotalGroupCustomBudget = createSelector(
  [groupCustomBudgetsList],
  (groupCustomBudgetsList) => {
    let totalCustomBudget = 0;

    for (let i = 0; i < groupCustomBudgetsList.length; i++) {
      totalCustomBudget += groupCustomBudgetsList[i].budget;
    }

    return totalCustomBudget;
  }
);
