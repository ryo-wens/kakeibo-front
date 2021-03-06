import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import {
  CurrentMonthBudgetStatusList,
  CurrentMonthBudgetStatus,
} from '../../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../../reducks/groupBudgets/types';
import { monthStatusColor, weekStatusColor, dayStatusColor } from '../../../lib/colorConstant';
import './bar-chart.scss';

interface HistoryBarChartProps {
  dayIndex: number;
  currentDayBudget: CurrentMonthBudgetStatus;
  currentWeekBudget: CurrentMonthBudgetStatus;
  currentMonthBudget: CurrentMonthBudgetStatus;
  currentMonthBudgetsStatusList: CurrentMonthBudgetStatusList | CurrentMonthBudgetGroupStatusList;
}

const HistoryBarChart = (props: HistoryBarChartProps) => {
  const MonthTooltip = () => {
    return (
      <div className="bar-chart__tooltip bar-chart__label--expense">{`今月の支出は¥ ${props.currentMonthBudget.totalExpense.toLocaleString()}です。`}</div>
    );
  };

  const WeekTooltip = () => {
    return (
      <div className="bar-chart__tooltip bar-chart__label--expense">{`今週の支出は¥ ${props.currentWeekBudget.totalExpense.toLocaleString()}です。`}</div>
    );
  };

  const DayTooltip = () => {
    return (
      <div className="bar-chart__tooltip bar-chart__label--expense">{`今日の支出は¥ ${props.currentDayBudget.totalExpense.toLocaleString()}です。`}</div>
    );
  };

  const overBudget = (remainingBudget: number) => {
    if (remainingBudget <= props.dayIndex) {
      return { color: '#E74C3C' };
    }
  };

  return (
    <>
      <div className="bar-chart__bar-chart-position ">
        <div className="bar-chart__label--month">{'今月'}</div>
        <BarChart data={[props.currentMonthBudget]} width={400} height={60} layout="vertical">
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
        <BarChart data={[props.currentWeekBudget]} width={400} height={60} layout="vertical">
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
        <BarChart data={[props.currentDayBudget]} width={400} height={60} layout="vertical">
          <YAxis hide type="category" dataKey="totalExpense" reversed />
          <XAxis hide type="number" domain={[0, 100]} />
          <Tooltip content={<DayTooltip />} />
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
          <div style={overBudget(props.currentMonthBudget.remainingBudget)}>
            ¥ {props.currentMonthBudget.remainingBudget.toLocaleString()}
          </div>
        </div>
        <div className="bar-chart__message-spacer">
          <div style={overBudget(props.currentWeekBudget.remainingBudget)}>
            ¥ {props.currentWeekBudget.remainingBudget.toLocaleString()}
          </div>
        </div>
        <div className="bar-chart__message-spacer">
          <div style={overBudget(props.currentDayBudget.remainingBudget)}>
            ¥ {props.currentDayBudget.remainingBudget.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="bar-chart__square" />
    </>
  );
};
export default HistoryBarChart;
