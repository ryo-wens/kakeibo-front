import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { PieChartDataList } from '../../../reducks/transactions/types';
import { colors } from '../../../lib/colorConstant';
import './bar-chart.scss';
import { CurrentMonthBudgetStatusList } from '../../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../../reducks/groupBudgets/types';

interface HistoryPieChartProps {
  currentMonthBudgetsStatusList: CurrentMonthBudgetStatusList | CurrentMonthBudgetGroupStatusList;
  sortTransactionsList: PieChartDataList;
  thisMonthTotalExpense: number;
  amountPerDay: number;
}

const HistoryPieChart = (props: HistoryPieChartProps) => {
  const emptyPieChartData = [{ amount: 1 }];

  const categoryIndex = (bigCategoryName: string) => {
    switch (bigCategoryName) {
      case '食費':
        return 0;
      case '日用品':
        return 1;
      case '趣味・娯楽':
        return 2;
      case '交際費':
        return 3;
      case '交通費':
        return 4;
      case '衣服・美容':
        return 5;
      case '健康・医療':
        return 6;
      case '通信費':
        return 7;
      case '教養・教育':
        return 8;
      case '住宅':
        return 9;
      case '水道・光熱費':
        return 10;
      case '自動車':
        return 11;
      case '保険':
        return 12;
      case '税金・社会保険':
        return 13;
      case '現金・カード':
        return 14;
      case 'その他':
        return 15;
      default:
        return 0;
    }
  };

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
                    fill={colors[categoryIndex(transaction.big_category_name)]}
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
              data={emptyPieChartData}
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
