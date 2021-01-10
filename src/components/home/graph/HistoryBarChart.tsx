import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CurrentMonthBudgetStatusList } from '../../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../../reducks/groupBudgets/types';
import { monthStatusColor, weekStatusColor, dayStatusColor } from '../../../lib/colorConstant';
import './bar-chart.scss';

interface HistoryBarChartProps {
  currentMonthBudgetsStatusList: CurrentMonthBudgetStatusList | CurrentMonthBudgetGroupStatusList;
}

const HistoryBarChart = (props: HistoryBarChartProps) => {
  const dayIndex = 0;
  const weekIndex = 1;
  const monthIndex = 2;
  const currentDayBudget = props.currentMonthBudgetsStatusList[dayIndex];
  const currentWeekBudget = props.currentMonthBudgetsStatusList[weekIndex];
  const currentMonthBudget = props.currentMonthBudgetsStatusList[monthIndex];

  const MonthTooltip = () => {
    return (
      <div className="bar-chart__tooltip bar-chart__label--month">{`今月の支出は¥ ${currentMonthBudget.totalExpense.toLocaleString()}です。`}</div>
    );
  };

  const WeekTooltip = () => {
    return (
      <div className="bar-chart__tooltip bar-chart__label--week">{`今週の支出は¥ ${currentWeekBudget.totalExpense.toLocaleString()}です。`}</div>
    );
  };

  const DyTooltip = () => {
    return (
      <div className="bar-chart__tooltip bar-chart__label--day">{`今日の支出は¥ ${currentDayBudget.totalExpense.toLocaleString()}です。`}</div>
    );
  };

  const overBudget = (remainingBudget: number) => {
    if (remainingBudget <= dayIndex) {
      return { color: '#E74C3C' };
    }
  };

  return (
    <>
      <div className="bar-chart__bar-chart-position ">
        <div className="bar-chart__label--month">{'今月'}</div>
        <BarChart data={[currentMonthBudget]} width={300} height={60} layout="vertical">
          <YAxis hide type="category" dataKey="totalExpense" reversed />
          <XAxis hide type="number" domain={[0, 100]} />
          <Tooltip contentStyle={{ border: 'none' }} content={<MonthTooltip />} />
          <Bar
            fill={monthStatusColor}
            barSize={40}
            background={true}
            radius={3}
            dataKey="percentage"
          />
        </BarChart>

        <div className="bar-chart__label--week">{'今週'}</div>
        <BarChart data={[currentWeekBudget]} width={300} height={60} layout="vertical">
          <YAxis hide type="category" dataKey="totalExpense" reversed />
          <XAxis hide type="number" domain={[0, 100]} />
          <Tooltip content={<WeekTooltip />} />
          <Bar
            fill={weekStatusColor}
            barSize={40}
            background={true}
            radius={3}
            dataKey="percentage"
          />
        </BarChart>

        <div className="bar-chart__label--day">{'今日'}</div>
        <BarChart data={[currentDayBudget]} width={300} height={60} layout="vertical">
          <YAxis hide type="category" dataKey="totalExpense" reversed />
          <XAxis hide type="number" domain={[0, 100]} />
          <Tooltip content={<DyTooltip />} />
          <Bar
            fill={dayStatusColor}
            barSize={40}
            background={true}
            radius={3}
            dataKey="percentage"
          />
        </BarChart>
      </div>

      <div className="bar-chart__remaining-budget">
        <div className="bar-chart__message-spacer__small">予算残り</div>
        <div className="bar-chart__message-spacer">
          <div style={overBudget(currentMonthBudget.remainingBudget)}>
            ¥ {currentMonthBudget.remainingBudget.toLocaleString()}
          </div>
        </div>
        <div className="bar-chart__message-spacer">
          <div style={overBudget(currentWeekBudget.remainingBudget)}>
            ¥ {currentWeekBudget.remainingBudget.toLocaleString()}
          </div>
        </div>
        <div className="bar-chart__message-spacer">
          <div style={overBudget(currentDayBudget.remainingBudget)}>
            ¥ {currentDayBudget.remainingBudget.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="bar-chart__square" />
    </>
  );
};
export default HistoryBarChart;
