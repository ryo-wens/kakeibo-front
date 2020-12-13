import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import axios from 'axios';
import { SelectYears } from '../lib/date';
import { year, month } from '../lib/constant';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import { Header } from '../components/header';
import { InputForm, RecentInput, MonthlyHistory, HistoryPieChart } from '../components/home';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { getSortCategoryTransactions } from '../reducks/transactions/selectors';
import { getSortCategoryGroupTransactions } from '../reducks/groupTransactions/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const sortCategoryTransactionsList = getSortCategoryTransactions(selector);
  const sortCategoryGroupTransactionsList = getSortCategoryGroupTransactions(selector);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);

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
