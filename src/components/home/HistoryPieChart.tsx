import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { FetchTransactions } from '../../reducks/transactions/types';
import { GroupTransactions } from '../../reducks/groupTransactions/types';
import { colors } from '../../lib/constant';

interface HistoryPieChartProps {
  sortTransactionsList: (FetchTransactions | GroupTransactions)[];
  thisMonthTotalExpense: number;
}

const HistoryPieChart = (props: HistoryPieChartProps) => {
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
              fill={colors[transaction.big_category_name.length % colors.length]}
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
