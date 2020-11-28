import React from 'react';
import { year, month } from '../lib/constant';
import { InputForm, RecentInput, MonthlyHistory, HistoryPieChart } from '../components/home';

const Home = () => {
  return (
    <>
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
    </>
  );
};
export default Home;
