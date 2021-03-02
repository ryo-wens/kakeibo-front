import { createSelector } from 'reselect';
import { State } from '../store/types';
import { CurrentMonthBudgetStatusList } from './types';
import { displayWeeks } from '../../lib/date';
import {
  year,
  month,
  todayDate,
  todayOfWeek,
  thisMonthEndDate,
  currentWeekNumber,
  incomeTransactionType,
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
    const remainingDays = {
      monthRemaining: 0,
      weekRemaining: 0,
    };
    const weekStartDate = todayDate - todayOfWeek;

    remainingDays.monthRemaining = thisMonthEndDate - todayDate;
    const lastDayRemainingDays =
      remainingDays.monthRemaining === 0 ? 1 : remainingDays.monthRemaining;

    remainingDays.weekRemaining =
      thisMonthEndDate - weekStartDate === 0 ? 1 : thisMonthEndDate - weekStartDate;

    const currentWeekDate = {
      weekEndDate: 0,
    };

    if (weekStartDate === 0) {
      currentWeekDate.weekEndDate = displayWeeks(year, month)[0].endDate;
    } else {
      currentWeekDate.weekEndDate = displayWeeks(year, month)[currentWeekNumber - 1].endDate;
    }

    const currentTotalExpense = {
      monthTotalExpense: 0,
      weekTotalExpense: 0,
      dayTotalExpense: 0,
    };

    for (const transaction of transactionsList) {
      const transactionDay = Number(transaction.transaction_date.slice(8, 10));

      if (transaction.transaction_type !== incomeTransactionType) {
        currentTotalExpense.monthTotalExpense += transaction.amount;

        if (weekStartDate <= transactionDay && transactionDay <= currentWeekDate.weekEndDate) {
          currentTotalExpense.weekTotalExpense += transaction.amount;
        }

        if (transactionDay === todayDate) {
          currentTotalExpense.dayTotalExpense += transaction.amount;
        }
      }
    }

    const currentMonthBudgets = yearlyBudgets.monthly_budgets.length
      ? yearlyBudgets.monthly_budgets[month - 1].monthly_total_budget
      : 0;

    const currentWeekBudgets = Math.round(
      ((currentMonthBudgets -
        currentTotalExpense.monthTotalExpense +
        currentTotalExpense.weekTotalExpense) /
        remainingDays.weekRemaining) *
        7 -
        currentTotalExpense.weekTotalExpense
    );

    const currentDayBudget = Math.round(
      (currentMonthBudgets -
        currentTotalExpense.monthTotalExpense +
        currentTotalExpense.dayTotalExpense) /
        lastDayRemainingDays -
        currentTotalExpense.dayTotalExpense
    );

    const weekBudgetForThisMonth = Math.round(
      (currentMonthBudgets / remainingDays.weekRemaining) * 7
    );

    const todayBudgetForThisMonth = currentMonthBudgets / lastDayRemainingDays;

    const currentMonthBudgetStatus = {
      label: '今月',
      totalExpense: currentTotalExpense.monthTotalExpense,
      remainingBudget: currentMonthBudgets - currentTotalExpense.monthTotalExpense,
      percentage: Math.round((currentTotalExpense.monthTotalExpense / currentMonthBudgets) * 100),
    };

    const currentWeekBudgetStatus = {
      label: '今週',
      totalExpense: currentTotalExpense.weekTotalExpense,
      remainingBudget: currentWeekBudgets - currentTotalExpense.weekTotalExpense,
      percentage: Math.round((currentTotalExpense.weekTotalExpense / weekBudgetForThisMonth) * 100),
    };

    const currentDayBudgetStatus = {
      label: '今日',
      totalExpense: currentTotalExpense.dayTotalExpense,
      remainingBudget: currentDayBudget,
      percentage: Math.round((currentTotalExpense.dayTotalExpense / todayBudgetForThisMonth) * 100),
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
    const lastDayRemainingDays = remainingDays === 0 ? 1 : remainingDays;

    const currentTotalExpense = {
      monthTotalExpense: 0,
    };

    for (const transaction of transactionsList) {
      if (transaction.transaction_type !== incomeTransactionType) {
        currentTotalExpense.monthTotalExpense += transaction.amount;
      }
    }

    const currentMonthBudgets = yearlyBudgets.monthly_budgets.length
      ? yearlyBudgets.monthly_budgets[month - 1].monthly_total_budget
      : 0;

    const remainingBudget = currentMonthBudgets - currentTotalExpense.monthTotalExpense;

    return Math.round(remainingBudget / lastDayRemainingDays);
  }
);

const standardBudgetsList = (state: State) => state.budgets.standard_budgets_list;

export const getTotalStandardBudget = createSelector(
  [standardBudgetsList],
  (standardBudgetsList) => {
    const totalBudget = {
      totalStandardBudget: 0,
    };

    for (let i = 0; i < standardBudgetsList.length; i++) {
      totalBudget.totalStandardBudget += standardBudgetsList[i].budget;
    }

    return totalBudget.totalStandardBudget;
  }
);

const customBudgetsList = (state: State) => state.budgets.custom_budgets_list;

export const getTotalCustomBudget = createSelector([customBudgetsList], (customBudgetsList) => {
  const totalBudget = {
    totalCustomBudget: 0,
  };

  for (let i = 0; i < customBudgetsList.length; i++) {
    totalBudget.totalCustomBudget += customBudgetsList[i].budget;
  }

  return totalBudget.totalCustomBudget;
});
