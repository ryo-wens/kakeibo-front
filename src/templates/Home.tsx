import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { SelectYears } from '../lib/date';
import { year, month } from '../lib/constant';
import { Header } from '../components/header';
import { InputForm, RecentInput, MonthlyHistory } from '../components/home';
import { HistoryPieChart, HistoryBarChart } from '../components/home/graph';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { getSortCategoryTransactions, getTotalExpense } from '../reducks/transactions/selectors';
import {
  getSortCategoryGroupTransactions,
  getTotalGroupExpense,
} from '../reducks/groupTransactions/selectors';
import { getCurrentMonthBudgets } from '../reducks/budgets/selectors';
import { getCurrentMonthGroupBudget } from '../reducks/groupBudgets/selectors';
import { fetchYearlyBudgets } from '../reducks/budgets/operations';
import { fetchGroupYearlyBudgets } from '../reducks/groupBudgets/operations';
import CurrentSchedule from '../components/home/CurrentSchedule/CurrentSchedule';

const Home = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const sortCategoryTransactionsList = useSelector(getSortCategoryTransactions);
  const thisMonthTotalExpense = useSelector(getTotalExpense);
  const sortCategoryGroupTransactionsList = useSelector(getSortCategoryGroupTransactions);
  const thisMonthGroupTotalExpense = useSelector(getTotalGroupExpense);
  const currentMonthBudgetStatus = useSelector(getCurrentMonthBudgets);
  const currentMonthGroupBudgetStatus = useSelector(getCurrentMonthGroupBudget);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchYearlyBudgets(year, signal));
  }, []);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName === 'group') {
      const years: SelectYears = {
        selectedYear: String(year),
        selectedMonth: month <= 9 ? '0' + month : String(month),
      };
      dispatch(fetchGroupTransactionsList(Number(id), years, signal));
      dispatch(fetchGroupYearlyBudgets(Number(id), year, signal));
      dispatch(fetchGroups(signal));
      const interval = setInterval(() => {
        dispatch(fetchGroupTransactionsList(Number(id), years, signal));
        dispatch(fetchGroups(signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName, id]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(fetchGroups(signal));
      const interval = setInterval(() => {
        dispatch(fetchGroups(signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName]);

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="home__left">
          <InputForm />
          <RecentInput />
        </div>
        <div className="home__center">
          <div className=" box__monthlyExpense">
            <h2 className="">{month}月の状況</h2>
            <div className="box__monthlyExpense__graph">
              <HistoryBarChart
                currentMonthBudgetsStatusList={
                  pathName !== 'group' ? currentMonthBudgetStatus : currentMonthGroupBudgetStatus
                }
              />
              <HistoryPieChart
                sortTransactionsList={
                  pathName !== 'group'
                    ? sortCategoryTransactionsList
                    : sortCategoryGroupTransactionsList
                }
                thisMonthTotalExpense={
                  pathName !== 'group' ? thisMonthTotalExpense : thisMonthGroupTotalExpense
                }
              />
            </div>
          </div>
          <MonthlyHistory month={month} year={year} />
        </div>
        <div className="home__right">
          <CurrentSchedule />
        </div>
      </main>
    </>
  );
};
export default Home;
