import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { FetchTransactions } from '../../reducks/transactions/types';
import { GroupTransactions } from '../../reducks/groupTransactions/types';
import { incomeTransactionType, colors } from '../../lib/constant';
import { getPathTemplateName } from '../../lib/path';

interface HistoryPieChartProps {
  sortTransactionsList: (FetchTransactions | GroupTransactions)[];
}

const HistoryPieChart = (props: HistoryPieChartProps) => {
  const pathName = getPathTemplateName(window.location.pathname);

  const totalExpense = () => {
    let total = 0;

    if (pathName !== 'group') {
      for (const transaction of props.sortTransactionsList) {
        if (transaction.transaction_type !== incomeTransactionType) {
          total += transaction.amount;
        }
      }
    } else if (pathName === 'group') {
      for (const groupTransaction of props.sortTransactionsList) {
        if (groupTransaction.transaction_type !== incomeTransactionType) {
          total += groupTransaction.amount;
        }
      }
    }

    return total !== 0 ? '今月の総支出' + '\n' + '￥' + total.toLocaleString() : '-';
  };

  return (
    <PieChart className="pie__chart" width={200} height={200}>
      <Pie
        data={props.sortTransactionsList}
        innerRadius={60}
        outerRadius={100}
        nameKey={'big_category_name'}
        dataKey={'amount'}
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

        <Label width={30} position={'center'} value={totalExpense()} />
      </Pie>
      <Tooltip />
    </PieChart>
  );
};
export default HistoryPieChart;
