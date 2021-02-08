import React from 'react';
import { PieChartDataList } from '../../reducks/transactions/types';
import { CurrentMonthBudgetStatusList } from '../../reducks/budgets/types';
import { CurrentMonthBudgetGroupStatusList } from '../../reducks/groupBudgets/types';
import InputFormContainer from '../../containers/home/transactionInputForm/InputFormContainer';
import RecentInputContainer from '../../containers/home/recentTransaction/RecentInputContainer';
import HistoryPieChartContainer from '../../containers/home/graph/HistoryPieChartContainer';
import HistoryBarChartContainer from '../../containers/home/graph/HistoryBarChartContainer';
import WeeklyHistoryContainer from '../../containers/history/weekly/WeeklyHistoryContainer';
import HeaderContainer from '../../containers/header/HeaderContainer';
import { year, month } from '../../lib/constant';
import TodayScheduleContainer from '../../containers/home/todaySchedule/TodayScheduleContainer';

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
      <HeaderContainer />
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
          <WeeklyHistoryContainer month={month} year={year} />
        </div>
        <div className="home__right">
          <TodayScheduleContainer
            todoEditing={props.todoEditing}
            setTodoEditing={props.setTodoEditing}
          />
        </div>
      </main>
    </>
  );
};
export default Home;
