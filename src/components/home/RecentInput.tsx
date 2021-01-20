import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import { State } from '../../reducks/store/types';
import { getLatestTransactions } from '../../reducks/transactions/selectors';
import { getGroupLatestTransactions } from '../../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import RecentInputBody from './RecentInputBody';
import GroupRecentInputBody from './GroupRecentInputBody';
import '../../assets/home/recent-input.scss';
import { fetchLatestTransactionsList } from '../../reducks/transactions/operations';
import { fetchLatestGroupTransactionsList } from '../../reducks/groupTransactions/operations';
import { guidanceMessage } from '../../lib/constant';
import axios from 'axios';

const RecentInput = () => {
  const dispatch = useDispatch();
  const signal = axios.CancelToken.source();
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const selector = useSelector((state: State) => state);
  const latestTransactionsList = getLatestTransactions(selector);
  const groupLatestTransactionList = getGroupLatestTransactions(selector);
  const approvedGroup = getApprovedGroups(selector);
  const currentGroupId = approvedGroup.findIndex((group) => group.group_id === Number(group_id));
  const currentGroup = approvedGroup[currentGroupId];

  useEffect(() => {
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
    if (pathName !== 'group' && !latestTransactionsList.length) {
      dispatch(fetchLatestTransactionsList(signal));
      return () => signal.cancel();
    }
  }, [pathName]);

  return (
    <div className="recent-input box__recent ">
      <h3>最近の入力</h3>
      {(() => {
        if (pathName !== 'group') {
          if (!latestTransactionsList.length) {
            return <dt>{guidanceMessage}</dt>;
          } else {
            return <RecentInputBody latestTransactionsList={latestTransactionsList} />;
          }
        } else {
          if (!groupLatestTransactionList.length) {
            return <dt>{guidanceMessage}</dt>;
          } else {
            return (
              <GroupRecentInputBody
                groupLatestTransactionsList={groupLatestTransactionList}
                approvedGroup={approvedGroup}
                currentGroup={currentGroup}
              />
            );
          }
        }
      })()}
    </div>
  );
};
export default RecentInput;
