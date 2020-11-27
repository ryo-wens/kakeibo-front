import React, { useEffect } from 'react';
import { InputForm, RecentInput, MonthlyHistory, HistoryPieChart } from '../components/home';
import { useDispatch, useSelector } from 'react-redux';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { State } from '../reducks/store/types';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchUserInfo } from '../reducks/users/operations';
import { getUserName } from '../reducks/users/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const userName: string = getUserName(selector);

  useEffect(() => {
    if (!approvedGroups.length && !unapprovedGroups.length) {
      dispatch(fetchGroups());
    }
  }, []);

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
        <MonthlyHistory />
      </div>
      <div className="home__right">
        <div className="box__input" />
      </div>
    </>
  );
};
export default Home;
