import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../reducks/transactions/selectors';
import { getGroupTransactions } from '../reducks/groupTransactions/selectors';
import { fetchTransactionsList } from '../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { State } from '../reducks/store/types';
import { customMonth, noTransactionMessage } from '../lib/constant';
import { getPathTemplateName } from '../lib/path';
import { DailyHistoryBody, GroupDailyHistoryBody } from '../components/history/index';
import '../assets/history/daily-history.scss';
import { getPathGroupId } from '../lib/path';

interface DailyHistoryProps {
  selectYears: number;
  selectMonth: string;
}

const DailyHistory = (props: DailyHistoryProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const transactionsList = getTransactions(selector);
  const groupTransactionsList = getGroupTransactions(selector);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);

  useEffect(() => {
    if (pathName !== 'group') {
      dispatch(fetchTransactionsList(String(props.selectYears), customMonth));
    } else if (pathName === 'group') {
      dispatch(fetchGroupTransactionsList(props.selectYears, customMonth, groupId));
    }
  }, [pathName, props.selectYears]);

  return (
    <>
      <div className="daily-history daily-history__background">
        {(() => {
          if (pathName !== 'group') {
            if (!transactionsList.length) {
              return <h3>{noTransactionMessage}</h3>;
            } else if (transactionsList.length) {
              return (
                <DailyHistoryBody
                  selectYears={props.selectYears}
                  selectMonth={props.selectMonth}
                  transactionsList={transactionsList}
                />
              );
            }
          } else {
            if (!groupTransactionsList.length) {
              return <h3>{noTransactionMessage}</h3>;
            } else if (groupTransactionsList.length) {
              return (
                <GroupDailyHistoryBody
                  selectYears={props.selectYears}
                  selectMonth={props.selectMonth}
                  groupTransactionsList={groupTransactionsList}
                />
              );
            }
          }
        })()}
      </div>
    </>
  );
};
export default DailyHistory;
