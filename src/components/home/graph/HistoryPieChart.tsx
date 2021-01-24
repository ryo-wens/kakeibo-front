import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { PieChartDataList } from '../../../reducks/transactions/types';
import { colors } from '../../../lib/colorConstant';
import './bar-chart.scss';
import { CurrentMonthBudgetStatusList } from '../../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../../reducks/groupBudgets/types';

interface HistoryPieChartProps {
  amountPerDay: number;
  thisMonthTotalExpense: number;
  sortTransactionsList: PieChartDataList;
  emptyPieChartData: { amount: number }[];
  categoryIndex: (bigCategoryName: string) => number;
  currentMonthBudgetsStatusList: CurrentMonthBudgetStatusList | CurrentMonthBudgetGroupStatusList;
}

const HistoryPieChart = (props: HistoryPieChartProps) => {
  const EmptyTransactionMessage = () => {
    return (
      <div className="bar-chart__tooltip bar-chart__tooltip--empty-pie">
        表示するデータはありません。
      </div>
    );
  };

  return (
    <div className="bar-chart__pie-chart">
      <div className="bar-chart__amount-available bar-chart__amount-available--arrow">
        {`毎日 ¥${props.amountPerDay.toLocaleString()}  使えます。`}
      </div>
      <div className="bar-chart_spacer" />
      <div className="bar-chart__pie">
        {props.sortTransactionsList.length !== 0 ? (
          <PieChart width={270} height={200}>
            <Pie
              stroke="none"
              data={props.sortTransactionsList}
              innerRadius={60}
              outerRadius={100}
              nameKey="big_category_name"
              dataKey="amount"
              cx="50%"
              cy="50%"
            >
              {props.sortTransactionsList.map((transaction) => {
                return (
                  <Cell
                    key={transaction.big_category_name}
                    fill={colors[props.categoryIndex(transaction.big_category_name)]}
                  />
                );
              })}

              <Label
                width={30}
                position="center"
                value={
                  props.thisMonthTotalExpense !== 0
                    ? `今月の総支出 \n  ${'￥' + props.thisMonthTotalExpense.toLocaleString()}`
                    : '-'
                }
              />
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <PieChart width={230} height={200}>
            <Pie
              stroke="none"
              data={props.emptyPieChartData}
              innerRadius={60}
              outerRadius={100}
              dataKey="amount"
              cx="50%"
              cy="50%"
            >
              <Label width={30} position="center" value={`今月の総支出¥ \n -`} />
            </Pie>
            <Tooltip content={<EmptyTransactionMessage />} />
          </PieChart>
        )}
      </div>
    </div>
  );
};
export default HistoryPieChart;
