import React, { useEffect } from 'react';
import { year, month } from '../lib/constant';
import { InputForm, RecentInput, MonthlyHistory, HistoryPieChart } from '../components/home';
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import { SelectYears } from '../lib/date';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { Header } from '../components/header';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
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
  }, [pathName]);

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
            <HistoryPieChart />
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
