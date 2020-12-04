import React, { useEffect } from 'react';
import { year, month } from '../lib/constant';
import { InputForm, RecentInput, MonthlyHistory, HistoryPieChart } from '../components/home';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchUserInfo } from '../reducks/users/operations';
import { getUserName } from '../reducks/users/selectors';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import { SelectYears } from '../lib/date';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const userName: string = getUserName(selector);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);

  useEffect(() => {
    if (pathName === 'group') {
      const years: SelectYears = {
        selectedYear: String(year),
        selectedMonth: month <= 9 ? '0' + month : String(month),
      };
      dispatch(fetchGroupTransactionsList(groupId, years));
      const interval = setInterval(() => {
        dispatch(fetchGroupTransactionsList(groupId, years));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [pathName]);

  useEffect(() => {
    dispatch(fetchGroups());
    const interval = setInterval(() => {
      dispatch(fetchGroups());
    }, 3000);
    return () => clearInterval(interval);
  }, [pathName]);

  useEffect(() => {
    if (!userName) {
      dispatch(fetchUserInfo());
    }
  }, []);

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
