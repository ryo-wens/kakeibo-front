import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getLatestTransactions } from '../../reducks/transactions/selectors';
import RecentInputBody from './RecentInputBody';
import '../../assets/recent-input.scss';
import { fetchLatestTransactionsList } from '../../reducks/transactions/operations';
import { guidanceMessage } from '../../lib/constant';

const RecentInput = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const latestTransactionsList = getLatestTransactions(selector);

  useEffect(() => {
    dispatch(fetchLatestTransactionsList());
  }, []);

  return (
    <div className="recent-input box__recent ">
      <h3>最近の入力</h3>
      <div />
      {(() => {
        if (latestTransactionsList.length === 0) {
          return <dt>{guidanceMessage}</dt>;
        } else {
          return <RecentInputBody latestTransactionsList={latestTransactionsList} />;
        }
      })()}
    </div>
  );
};
export default RecentInput;
