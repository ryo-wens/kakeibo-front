import React from 'react';
import { CurrentMonthBudgetStatusList } from '../../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../../reducks/groupBudgets/types';
import HistoryBarChart from '../../../components/home/graph/HistoryBarChart';

interface HistoryBarChartContainerProps {
  currentMonthBudgetsStatusList: CurrentMonthBudgetStatusList | CurrentMonthBudgetGroupStatusList;
}

const HistoryBarChartContainer = (props: HistoryBarChartContainerProps) => {
  const dayIndex = 0;
  const weekIndex = 1;
  const monthIndex = 2;
  const currentDayBudget = props.currentMonthBudgetsStatusList[dayIndex];
  const currentWeekBudget = props.currentMonthBudgetsStatusList[weekIndex];
  const currentMonthBudget = props.currentMonthBudgetsStatusList[monthIndex];

  return (
    <HistoryBarChart
      dayIndex={dayIndex}
      currentDayBudget={currentDayBudget}
      currentWeekBudget={currentWeekBudget}
      currentMonthBudget={currentMonthBudget}
      currentMonthBudgetsStatusList={props.currentMonthBudgetsStatusList}
    />
  );
};
export default HistoryBarChartContainer;
