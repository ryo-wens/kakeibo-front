import React from 'react';
import { PieChartDataList } from '../reducks/transactions/types';
import { CurrentMonthBudgetStatusList } from '../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../reducks/groupBudgets/types';
import InputFormContainer from '../containers/home/transactionInputForm/InputFormContainer';
import RecentInputContainer from '../containers/home/recentTransaction/RecentInputContainer';
import CurrentSchedule from '../components/home/CurrentSchedule/CurrentSchedule';
import HistoryPieChartContainer from '../containers/home/graph/HistoryPieChartContainer';
import HistoryBarChartContainer from '../containers/home/graph/HistoryBarChartContainer';
import { MonthlyHistory } from '../components/home';
import { Header } from '../components/header';
import { year, month } from '../lib/constant';

interface HomeProps {
  pathName: string;
  todoEditing: boolean;
  thisMonthTotalExpense: number;
  sortCategoryTransactionsList: PieChartDataList;
  sortCategoryGroupTransactionsList: PieChartDataList;
  thisMonthGroupTotalExpense: number;
  currentMonthBudgetStatus: CurrentMonthBudgetStatusList;
  currentMonthGroupBudgetStatus: CurrentMonthBudgetGroupStatusList;
  amountPerDay: number;
  groupAmountPerDay: number;
  setTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = (props: HomeProps) => {
  return (
    <>
      <Header />
      <main className="section__container">
        <div className="home__left">
          <InputFormContainer />
          <RecentInputContainer />
        </div>
        <div className="home__center">
          <div className=" box__monthlyExpense">
            <h2 className="">{month}月の状況</h2>
            <div className="box__monthlyExpense__graph">
              <HistoryBarChartContainer
                currentMonthBudgetsStatusList={
                  props.pathName !== 'group'
                    ? props.currentMonthBudgetStatus
                    : props.currentMonthGroupBudgetStatus
                }
              />
              <HistoryPieChartContainer
                sortTransactionsList={
                  props.pathName !== 'group'
                    ? props.sortCategoryTransactionsList
                    : props.sortCategoryGroupTransactionsList
                }
                thisMonthTotalExpense={
                  props.pathName !== 'group'
                    ? props.thisMonthTotalExpense
                    : props.thisMonthGroupTotalExpense
                }
                currentMonthBudgetsStatusList={
                  props.pathName !== 'group'
                    ? props.currentMonthBudgetStatus
                    : props.currentMonthGroupBudgetStatus
                }
                amountPerDay={
                  props.pathName !== 'group' ? props.amountPerDay : props.groupAmountPerDay
                }
              />
            </div>
          </div>
          <MonthlyHistory month={month} year={year} />
        </div>
        <div className="home__right">
          <CurrentSchedule todoEditing={props.todoEditing} setTodoEditing={props.setTodoEditing} />
        </div>
      </main>
    </>
  );
};
export default Home;
