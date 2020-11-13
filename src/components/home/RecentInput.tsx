import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getLatestTransactions } from '../../reducks/transactions/selectors';
import { getGroupLatestTransactions } from '../../reducks/groupTransactions/selectors';
import RecentInputBody from './RecentInputBody';
import GroupRecentInputBody from './GroupRecentInputBody';
import '../../assets/home/recent-input.scss';
import { fetchLatestTransactionsList } from '../../reducks/transactions/operations';
import { fetchLatestGroupTransactionsList } from '../../reducks/groupTransactions/operations';
import { guidanceMessage } from '../../lib/constant';
import { getPathTemplateName, getPathGroupId } from '../../lib/path';

const RecentInput = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const latestTransactionsList = getLatestTransactions(selector);
  const groupLatestTransactionList = getGroupLatestTransactions(selector);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);

  useEffect(() => {
    if (pathName !== 'group' && !latestTransactionsList.length) {
      dispatch(fetchLatestTransactionsList());
    } else if (pathName === 'group' && !groupLatestTransactionList.length) {
      dispatch(fetchLatestGroupTransactionsList(groupId));
    }
  }, [pathName]);

  return (
    <div className="recent-input box__recent ">
      <h3>最近の入力</h3>
      <div />
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
              <GroupRecentInputBody groupLatestTransactionsList={groupLatestTransactionList} />
            );
          }
        }
      })()}
    </div>
  );
};
export default RecentInput;
