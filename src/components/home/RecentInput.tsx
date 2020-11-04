import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getLatestTransactions } from '../../reducks/transactions/selectors';
import RecentInputBody from './RecentInputBody';
import '../../assets/recent-input.scss';
import { fetchLatestTransactionsList } from '../../reducks/transactions/operations';

const RecentInput = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const latestTransactionsList = getLatestTransactions(selector);
  const guidanceMessage = '「入力フォーム」から家計簿の追加を行ってください';

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
          return <RecentInputBody />;
        }
      })()}
    </div>
  );
};
export default RecentInput;
