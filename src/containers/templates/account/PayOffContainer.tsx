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
import dayjs from 'dayjs';

interface PayOffContainerProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const PayOffContainer = (props: PayOffContainerProps) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
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
  const selectYear = query.get('year');
  const selectMonth = query.get('month');
  const [selectedMonth, setSelectedMonth] = useState<number>(Number(selectMonth));
  const [subMonth, setSubMonth] = useState<string | null>(selectMonth);
  const [message, setMessage] = useState<string | undefined>(badRequestMessage);
  const getMonthIndexNumber = 1;
  const getYearIndexNumber = 0;
  const [currentSelectMonth, setCurrentSelectMonth] = useState<string>(
    groupAccountList.month.split('-')[getMonthIndexNumber]
  );
  const [currentSelectYear, setCurrentSelectYear] = useState<string>(
    groupAccountList.month.split('-')[getYearIndexNumber]
  );

  const displayAmount = (amount: number): boolean => {
    return amount !== undefined && currentSelectMonth === dayjs(String(selectedMonth)).format('MM');
  };

  useEffect(() => {
    dispatch(fetchGroups(signal));
    if (selectMonth != null && selectYear !== null) {
      dispatch(fetchGroupAccount(Number(group_id), props.selectedYear, selectMonth, signal));
    }
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      if (groupAccountList.group_accounts_list_by_payer) {
        if (selectMonth != null && selectYear !== null) {
          dispatch(fetchGroupAccount(Number(group_id), props.selectedYear, selectMonth, signal));
        }
      }
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [selectYear, selectMonth]);

  useEffect(() => {
    setMessage(badRequestMessage);
  }, [badRequestMessage]);

  const accountedJude = {
    jude: false,
  };

  for (const account of completeAccountMonth.completeMonth) {
    if (account === selectMonth && props.selectedYear === Number(currentSelectYear)) {
      accountedJude.jude = true;
    }
  }

  let noTransactions = false;

  for (const month of monthWithoutSplitList.withoutMonth) {
    if (month === String(selectMonth) && props.selectedYear === Number(currentSelectYear)) {
      noTransactions = true;
    }
  }

  useEffect(() => {
    if (
      groupAccountList.month.split('-')[getMonthIndexNumber] === undefined &&
      accountedJude.jude
    ) {
      setCurrentSelectMonth('0');
    } else {
      setCurrentSelectMonth(groupAccountList.month.split('-')[getMonthIndexNumber]);
    }
  }, [groupAccountList.month.split('-')[getMonthIndexNumber]]);

  useEffect(() => {
    if (groupAccountList.month.split('-')[getYearIndexNumber] === undefined && accountedJude.jude) {
      setCurrentSelectYear('0');
    } else {
      setCurrentSelectYear(groupAccountList.month.split('-')[getYearIndexNumber]);
    }
  }, [groupAccountList.month.split('-')[getYearIndexNumber]]);

  return (
    <PayOff
      noTransactions={noTransactions}
      message={message}
      setMessage={setMessage}
      subMonth={subMonth}
      setSubMonth={setSubMonth}
      currentUserId={currentUserId}
      approvedGroup={approvedGroup}
      accountedJude={accountedJude}
      setCurrentItem={props.setCurrentItem}
      selectedYear={props.selectedYear}
      selectedMonth={selectedMonth}
      setSelectedYear={props.setSelectedYear}
      setSelectedMonth={setSelectedMonth}
      badRequestMessage={message}
      remainingTotalAmount={remainingTotalAmount}
      groupAccountList={groupAccountList}
      currentSelectYear={currentSelectYear}
      currentSelectMonth={currentSelectMonth}
      monthWithoutSplitList={monthWithoutSplitList}
      displayAmount={displayAmount}
      backPageOperation={() =>
        history.replace(`/group/${group_id}/accounting?year=${props.selectedYear}`)
      }
      addAccountOperation={() => {
        dispatch(
          addGroupAccount(
            Number(group_id),
            String(props.selectedYear),
            dayjs(String(selectedMonth)).format('MM')
          )
        );
      }}
      deleteAccountOperation={() => {
        dispatch(
          deleteGroupAccount(
            Number(group_id),
            String(props.selectedYear),
            dayjs(String(selectedMonth)).format('MM')
          )
        );
      }}
    />
  );
};
export default PayOffContainer;
