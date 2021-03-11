import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { getLatestTransactions } from '../../../reducks/transactions/selectors';
import { getGroupLatestTransactions } from '../../../reducks/groupTransactions/selectors';
import { fetchLatestTransactionsList } from '../../../reducks/transactions/operations';
import { fetchLatestGroupTransactionsList } from '../../../reducks/groupTransactions/operations';
import RecentInput from '../../../components/home/recentTransaction/RecentInput';

const RecentInputContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const latestTransactionsList = useSelector(getLatestTransactions);
  const groupLatestTransactionList = useSelector(getGroupLatestTransactions);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName === 'group') {
      dispatch(fetchLatestGroupTransactionsList(Number(group_id), signal));
      const interval = setInterval(() => {
        dispatch(fetchLatestGroupTransactionsList(Number(group_id), signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName, group_id]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(fetchLatestTransactionsList(signal));
      return () => signal.cancel();
    }
  }, [pathName]);

  return (
    <RecentInput
      pathName={pathName}
      latestTransactionsList={latestTransactionsList}
      groupLatestTransactionList={groupLatestTransactionList}
    />
  );
};
export default RecentInputContainer;
