import React from 'react';
import { PieChartDataList } from '../../../reducks/transactions/types';
import { CurrentMonthBudgetStatusList } from '../../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../../reducks/groupBudgets/types';
import HistoryPieChart from '../../../components/home/graph/HistoryPieChart';

interface HistoryPieChartContainerProps {
  amountPerDay: number;
  thisMonthTotalExpense: number;
  sortTransactionsList: PieChartDataList;
  currentMonthBudgetsStatusList: CurrentMonthBudgetStatusList | CurrentMonthBudgetGroupStatusList;
}

const HistoryPieChartContainer = (props: HistoryPieChartContainerProps) => {
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

  return (
    <HistoryPieChart
      categoryIndex={categoryIndex}
      amountPerDay={props.amountPerDay}
      emptyPieChartData={emptyPieChartData}
      sortTransactionsList={props.sortTransactionsList}
      thisMonthTotalExpense={props.thisMonthTotalExpense}
      currentMonthBudgetsStatusList={props.currentMonthBudgetsStatusList}
    />
  );
};
export default HistoryPieChartContainer;
