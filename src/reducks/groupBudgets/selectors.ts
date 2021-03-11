import { createSelector } from 'reselect';
import { State } from '../store/types';
import { CurrentMonthBudgetGroupStatusList } from './types';
import {
  todayDate,
  thisMonthEndDate,
  todayOfWeek,
  incomeTransactionType,
  month,
  year,
  currentWeekNumber,
} from '../../lib/constant';
import { displayWeeks } from '../../lib/date';

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

export const getGroupYearlyTotalBudgets = (state: State) =>
  state.groupBudgets.groupYearlyBudgetsList.yearly_total_budget;

const groupYearlyBudgets = (state: State) => state.groupBudgets.groupYearlyBudgetsList;
const groupTransactionsList = (state: State) => state.groupTransactions.groupTransactionsList;

export const getCurrentMonthGroupBudget = createSelector(
  [groupYearlyBudgets, groupTransactionsList],
  (groupYearlyBudgets, groupTransactionsList) => {
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

    for (const transaction of groupTransactionsList) {
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

    const currentMonthBudgets = groupYearlyBudgets.monthly_budgets.length
      ? groupYearlyBudgets.monthly_budgets[month - 1].monthly_total_budget
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

    const dayBudgetForThisMonth = currentMonthBudgets / lastDayRemainingDays;

    const currentMonthGroupBudgetStatus = {
      label: '今月',
      totalExpense: currentTotalExpense.monthTotalExpense,
      remainingBudget: currentMonthBudgets - currentTotalExpense.monthTotalExpense,
      percentage: Math.round((currentTotalExpense.monthTotalExpense / currentMonthBudgets) * 100),
    };

    const currentWeekGroupBudgetStatus = {
      label: '今週',
      totalExpense: currentTotalExpense.weekTotalExpense,
      remainingBudget: currentWeekBudgets,
      percentage: Math.round((currentTotalExpense.weekTotalExpense / weekBudgetForThisMonth) * 100),
    };

    const currentDayGroupBudgetStatus = {
      label: '今日',
      totalExpense: currentTotalExpense.dayTotalExpense,
      remainingBudget: currentDayBudget,
      percentage: Math.round((currentTotalExpense.dayTotalExpense / dayBudgetForThisMonth) * 100),
    };

    const currentBudgetStatusList: CurrentMonthBudgetGroupStatusList = [
      currentDayGroupBudgetStatus,
      currentWeekGroupBudgetStatus,
      currentMonthGroupBudgetStatus,
    ];

    return currentBudgetStatusList;
  }
);

export const getGroupAmountPerDay = createSelector(
  [groupYearlyBudgets, groupTransactionsList],
  (groupYearlyBudgets, groupTransactionsList) => {
    const remainingDays = thisMonthEndDate - todayDate;
    const lastDayRemainingDays = remainingDays === 0 ? 1 : remainingDays;

    const currentTotalExpense = {
      monthTotalExpense: 0,
    };

    for (const transaction of groupTransactionsList) {
      if (transaction.transaction_type !== incomeTransactionType) {
        currentTotalExpense.monthTotalExpense += transaction.amount;
      }
    }

    const currentMonthBudget = groupYearlyBudgets.monthly_budgets.length
      ? groupYearlyBudgets.monthly_budgets[month - 1].monthly_total_budget
      : 0;

    const remainingBudget = currentMonthBudget - currentTotalExpense.monthTotalExpense;

    return Math.round(remainingBudget / lastDayRemainingDays);
  }
);

const groupStandardBudgetsList = (state: State) => state.groupBudgets.groupStandardBudgetsList;

export const getGroupTotalStandardBudget = createSelector(
  [groupStandardBudgetsList],
  (groupStandardBudgetsList) => {
    const currentTotalBudget = {
      standardTotalBudget: 0,
    };

    for (let i = 0; i < groupStandardBudgetsList.length; i++) {
      currentTotalBudget.standardTotalBudget += groupStandardBudgetsList[i].budget;
    }

    return currentTotalBudget.standardTotalBudget;
  }
);

const groupCustomBudgetsList = (state: State) => state.groupBudgets.groupCustomBudgetsList;

export const getTotalGroupCustomBudget = createSelector(
  [groupCustomBudgetsList],
  (groupCustomBudgetsList) => {
    const currentTotalBudget = {
      customTotalBudget: 0,
    };

    for (let i = 0; i < groupCustomBudgetsList.length; i++) {
      currentTotalBudget.customTotalBudget += groupCustomBudgetsList[i].budget;
    }

    return currentTotalBudget.customTotalBudget;
  }
);
