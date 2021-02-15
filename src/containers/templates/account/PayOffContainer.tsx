import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../../reducks/groups/operations';
import {
  addGroupAccount,
  deleteGroupAccount,
  fetchGroupAccount,
} from '../../../reducks/groupTransactions/operations';
import { getUserId } from '../../../reducks/users/selectors';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import {
  getAccountCompleteMonthList,
  getGroupAccountList,
  getMonthWithoutSplitList,
  getRemainingTotalAmount,
  getStatusNotFoundMessage,
} from '../../../reducks/groupTransactions/selectors';
import PayOff from '../../../templates/account/PayOff';

interface PayOffContainerProps {
  selectedYear: number;
  setCurrentItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const PayOffContainer = (props: PayOffContainerProps) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const history = useHistory();
  const signal: CancelTokenSource = axios.CancelToken.source();
  const groupAccountList = useSelector(getGroupAccountList);
  const badRequestMessage = useSelector(getStatusNotFoundMessage);
  const monthWithoutSplitList = useSelector(getMonthWithoutSplitList);
  const completeAccountMonth = useSelector(getAccountCompleteMonthList);
  const approvedGroup = useSelector(getApprovedGroups);
  const remainingTotalAmount = useSelector(getRemainingTotalAmount);
  const currentUserId = useSelector(getUserId);
  const searchLocation = useLocation().search;
  const getQuery = () => {
    return new URLSearchParams(searchLocation);
  };
  const query = getQuery();
  const selectMonth = query.get('month');
  const [selectedMonth, setSelectedMonth] = useState<number>(Number(selectMonth));
  const [subMonth, setSubMonth] = useState<string | null>(selectMonth);
  const [message, setMessage] = useState<string | undefined>(badRequestMessage);
  const getMonthIndexNumber = 1;
  const currentSelectMonth = groupAccountList.month.split('-')[getMonthIndexNumber];

  const displayAmount = (amount: number): boolean => {
    return amount !== undefined && currentSelectMonth === subMonth;
  };

  useEffect(() => {
    dispatch(fetchGroups(signal));
    if (subMonth != null) {
      dispatch(fetchGroupAccount(Number(group_id), props.selectedYear, subMonth, signal));
    }
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      if (groupAccountList.group_accounts_list_by_payer) {
        if (subMonth != null) {
          dispatch(fetchGroupAccount(Number(group_id), props.selectedYear, subMonth, signal));
        }
      }
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [subMonth]);

  useEffect(() => {
    setMessage(badRequestMessage);
  }, [badRequestMessage]);

  const accountedJude = {
    jude: false,
  };

  for (const account of completeAccountMonth.completeMonth) {
    if (account === subMonth) {
      accountedJude.jude = true;
    }
  }

  return (
    <PayOff
      message={message}
      setMessage={setMessage}
      subMonth={subMonth}
      setSubMonth={setSubMonth}
      currentUserId={currentUserId}
      approvedGroup={approvedGroup}
      accountedJude={accountedJude}
      selectedYear={props.selectedYear}
      setCurrentItem={props.setCurrentItem}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
      badRequestMessage={badRequestMessage}
      remainingTotalAmount={remainingTotalAmount}
      groupAccountList={groupAccountList}
      currentSelectMonth={currentSelectMonth}
      monthWithoutSplitList={monthWithoutSplitList}
      displayAmount={displayAmount}
      backPageOperation={() =>
        history.replace(`/group/${group_id}/accounting?year=${props.selectedYear}`)
      }
      addAccountOperation={() => {
        const signal = axios.CancelToken.source();
        dispatch(
          addGroupAccount(Number(group_id), String(props.selectedYear), String(subMonth), signal)
        );
      }}
      deleteAccountOperation={() => {
        const signal = axios.CancelToken.source();
        dispatch(
          deleteGroupAccount(Number(group_id), String(props.selectedYear), String(subMonth), signal)
        );
      }}
    />
  );
};
export default PayOffContainer;
