import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import axios from 'axios';
import { SelectYears } from '../lib/date';
import { year, month } from '../lib/constant';
import { Header } from '../components/header';
import { InputForm, RecentInput, MonthlyHistory, HistoryPieChart } from '../components/home';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { getSortCategoryTransactions, getTotalExpense } from '../reducks/transactions/selectors';
import {
  getSortCategoryGroupTransactions,
  getTotalGroupExpense,
} from '../reducks/groupTransactions/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const groupId = Number(useLocation().pathname.split('/')[2]);
  const sortCategoryTransactionsList = useSelector(getSortCategoryTransactions);
  const thisMonthTotalExpense = useSelector(getTotalExpense);
  const sortCategoryGroupTransactionsList = useSelector(getSortCategoryGroupTransactions);
  const thisMonthGroupTotalExpense = useSelector(getTotalGroupExpense);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName === 'group') {
      const years: SelectYears = {
        selectedYear: String(year),
        selectedMonth: month <= 9 ? '0' + month : String(month),
      };
      dispatch(fetchGroupTransactionsList(groupId, years, signal));
      dispatch(fetchGroups(signal));
      const interval = setInterval(() => {
        dispatch(fetchGroupTransactionsList(groupId, years, signal));
        dispatch(fetchGroups(signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName, groupId]);

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
          <div className="box__monthlyExpense">
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
          <MonthlyHistory month={month} year={year} />
        </div>
        <div className="home__right">
          <div className="box__input" />
        </div>
      </main>
    </>
  );
};
export default Home;
