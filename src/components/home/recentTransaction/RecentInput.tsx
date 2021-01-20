import React from 'react';
import { TransactionsList } from '../../../reducks/transactions/types';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';
import RecentInputBodyContainer from '../../../containers/home/recentTransaction/RecentInputBodyContainer';
import GroupRecentInputBodyContainer from '../../../containers/home/recentTransaction/GroupRecentInputBodyContainer';
import { guidanceMessage } from '../../../lib/constant';
import '../../../assets/home/recent-input.scss';

interface RecentInputProps {
  pathName: string;
  latestTransactionsList: TransactionsList;
  groupLatestTransactionList: GroupTransactionsList;
}

const RecentInput = (props: RecentInputProps) => {
  return (
    <div className="recent-input box__recent ">
      <h3>最近の入力</h3>
      {(() => {
        if (props.pathName !== 'group') {
          if (!props.latestTransactionsList.length) {
            return <dt>{guidanceMessage}</dt>;
          } else {
            return <RecentInputBodyContainer />;
          }
        } else {
          if (!props.groupLatestTransactionList.length) {
            return <dt>{guidanceMessage}</dt>;
          } else {
            return <GroupRecentInputBodyContainer />;
          }
        }
      })()}
    </div>
  );
};
export default RecentInput;
