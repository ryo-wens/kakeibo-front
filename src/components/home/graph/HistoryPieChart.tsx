import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { FetchTransactions } from '../../../reducks/transactions/types';
import { GroupTransactions } from '../../../reducks/groupTransactions/types';
import { colors } from '../../../lib/colorConstant';
import './bar-chart.scss';

interface HistoryPieChartProps {
  sortTransactionsList: (FetchTransactions | GroupTransactions)[];
  thisMonthTotalExpense: number;
}

const HistoryPieChart = (props: HistoryPieChartProps) => {
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

  return (
    <PieChart className="pie__chart" width={200} height={200}>
      <Pie
        data={props.sortTransactionsList}
        innerRadius={60}
        outerRadius={100}
        nameKey="big_category_name"
        dataKey="amount"
        cx="50%"
        cy="50%"
      >
        {props.sortTransactionsList.map((transaction: FetchTransactions | GroupTransactions) => {
          return (
            <Cell
              key={transaction.id}
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
  );
};
export default HistoryPieChart;
