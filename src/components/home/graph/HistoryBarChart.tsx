import React from 'react';
import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CurrentMonthBudgetStatusList } from '../../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../../reducks/groupBudgets/types';
import { monthStatusColor, weekStatusColor, dayStatusColor } from '../../../lib/colorConstant';
import './bar-chart.scss';

interface HistoryBarChartProps {
  currentMonthBudgetsStatusList: CurrentMonthBudgetStatusList | CurrentMonthBudgetGroupStatusList;
}

const HistoryBarChart = (props: HistoryBarChartProps) => {
  const remainingDayBudget = props.currentMonthBudgetsStatusList[0].remainingBudget;
  const remainingWeekBudget = props.currentMonthBudgetsStatusList[1].remainingBudget;
  const remainingMonthBudget = props.currentMonthBudgetsStatusList[2].remainingBudget;

  return (
    <>
      <BarChart
        data={props.currentMonthBudgetsStatusList}
        width={300}
        height={280}
        layout="vertical"
      >
        <YAxis hide type="category" dataKey="totalExpense" reversed />
        <XAxis hide type="number" domain={[0, 100]} />
        <Tooltip cursor={false} />
        <Bar
          animationDuration={1600}
          radius={3}
          background={true}
          barSize={40}
          dataKey="percentage"
          name="使用割合"
        >
          {props.currentMonthBudgetsStatusList.map((budgetStatus) => {
            if (budgetStatus.label === '今月') {
              return <Cell key="label" fill={monthStatusColor} />;
            } else if (budgetStatus.label === '今週') {
              return <Cell key="label" fill={weekStatusColor} />;
            } else if (budgetStatus.label === '今日') {
              return <Cell key="label" fill={dayStatusColor} />;
            }
          })}
        </Bar>
      </BarChart>

      <div className="bar-chart__remaining-budget">
        <div className="bar-chart__message-spacer__small">予算残り</div>
        <div className="bar-chart__message-spacer">
          {remainingMonthBudget <= 0 ? (
            <div className="bar-chart__remaining-budget__over-budget-color">{`今月は¥${remainingMonthBudget}`}</div>
          ) : (
            `今月は¥${remainingMonthBudget}`
          )}
        </div>
        <div className="bar-chart__message-spacer">
          {remainingWeekBudget <= 0 ? (
            <div className="bar-chart__remaining-budget__over-budget-color">{`今週は¥${remainingWeekBudget}`}</div>
          ) : (
            `今週は¥${remainingWeekBudget}`
          )}
        </div>
        <div className="bar-chart__message-spacer">
          {remainingDayBudget <= 0 ? (
            <div className="bar-chart__remaining-budget__over-budget-color">{`今日は¥${remainingDayBudget}`}</div>
          ) : (
            <div>{`今日は¥${remainingDayBudget}`}</div>
          )}
        </div>
      </div>
      <div className="bar-chart__square" />
    </>
  );
};
export default HistoryBarChart;
