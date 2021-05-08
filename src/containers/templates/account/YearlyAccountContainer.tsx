import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios, { CancelTokenSource } from 'axios';
import qs from 'qs';
import { getGroupYearlyAccountList } from '../../../reducks/groupTransactions/selectors';
import { fetchGroups } from '../../../reducks/groups/operations';
import { fetchGroupYearlyAccountList } from '../../../reducks/groupTransactions/operations';
import { GroupYearlyAccountList } from '../../../reducks/groupTransactions/types';
import YearlyAccount from '../../../templates/account/YearlyAccount';

const YearlyAccountContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const monthIndex = 0;
  const singleDigitMonth = 9;
  const queryParamsLength = 10;
  const history = useHistory();
  const searchLocation = useLocation().search;
  const queryParams = qs.parse(searchLocation);
  const getQuery = new URLSearchParams(searchLocation);
  const queryYear = getQuery.get('year');
  const yearlyAccountList = useSelector(getGroupYearlyAccountList);
  const [selectedYear, setSelectedYear] = useState<number>(Number(queryYear));
  const [currentItem, setCurrentItem] = useState<boolean>(false);
  const [yearlyAccount, setYearlyAccount] = useState<GroupYearlyAccountList>({
    Year: '',
    yearly_accounting_status: [],
  });

  useEffect(() => {
    const signal: CancelTokenSource = axios.CancelToken.source();
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      dispatch(fetchGroupYearlyAccountList(Number(group_id), Number(queryYear), signal));
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [group_id, queryYear]);

  useEffect(() => {
    const signal: CancelTokenSource = axios.CancelToken.source();
    dispatch(fetchGroupYearlyAccountList(Number(group_id), Number(queryYear), signal));
  }, [queryYear]);

  useEffect(() => {
    setYearlyAccount(yearlyAccountList);
  }, [yearlyAccountList]);

  const defaultStyle = (status: string) => {
    const style = {
      color: '',
      underLine: '',
    };

    if (status === '-') {
      style.color = '#000';
      style.underLine = 'none';
    }

    return { color: style.color, borderBottom: style.underLine };
  };

  const routingPayOff = (nextQueryPageQuery: { month: string }) => {
    history.push({
      search: decodeURIComponent(qs.stringify(nextQueryPageQuery)),
    });
  };

  return (
    <>
      <YearlyAccount
        monthIndex={monthIndex}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        yearlyAccount={yearlyAccount}
        searchLocation={searchLocation}
        singleDigitMonth={singleDigitMonth}
        queryParams={queryParams}
        queryParamsLength={queryParamsLength}
        defaultStyle={defaultStyle}
        routingPayOff={routingPayOff}
      />
    </>
  );
};
export default YearlyAccountContainer;
