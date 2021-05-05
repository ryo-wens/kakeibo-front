import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios, { CancelTokenSource } from 'axios';
import { getGroupTransactions } from '../../../reducks/groupTransactions/selectors';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import { fetchGroupTransactionsList } from '../../../reducks/groupTransactions/operations';
import { fetchGroupCategories } from '../../../reducks/groupCategories/operations';
import { fetchTransactionsList } from '../../../reducks/transactions/operations';
import { fetchCategories } from '../../../reducks/categories/operations';
import { fetchGroups } from '../../../reducks/groups/operations';
import { month, year } from '../../../lib/constant';
import { SelectYears } from '../../../lib/date';
import History from '../../../templates/history/History';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

const HistoryContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useLocation().search;
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const groupTransactionsList = useSelector(getGroupTransactions);
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [openSearchField, setOpenSearchField] = useState(false);
  const [notSpecified, setNotSpecified] = useState(false);

  const fetchGroupHistoryData = (signal: CancelTokenSource) => {
    const years: SelectYears = {
      selectedYear: String(selectedYear),
      selectedMonth: dayjs(String(selectedMonth)).format('MM'),
    };
    dispatch(fetchGroupTransactionsList(Number(group_id), years, signal));
    dispatch(fetchGroupCategories(Number(group_id), signal));
  };

  useEffect(() => {
    if (pathName === 'group') {
      const signal = axios.CancelToken.source();
      fetchGroupHistoryData(signal);

      const interval = setInterval(() => {
        fetchGroupHistoryData(signal);
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      const selectYears: SelectYears = {
        selectedYear: String(selectedYear),
        selectedMonth: dayjs(String(selectedMonth)).format('MM'),
      };

      dispatch(fetchTransactionsList(selectYears, signal));
      return () => signal.cancel();
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (pathName !== 'group' && !incomeCategories.length && !expenseCategories.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchCategories(signal));

      return () => signal.cancel();
    }
  }, [pathName]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroups(signal));

    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
    }, 3000);

    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [pathName, selectedYear, selectedMonth]);

  const searchFieldOpen = () => {
    setOpenSearchField(true);
    setNotSpecified(true);
  };

  const searchFieldClose = () => {
    setOpenSearchField(false);
    setNotSpecified(false);
  };

  const routingDailyHistory = () => {
    pathName !== 'group'
      ? history.push({
          pathname: '/history',
          search: `?daily&year=${selectedYear}&month=${dayjs(String(selectedMonth)).format('MM')}`,
        })
      : history.push({ pathname: `/group/${group_id}/history`, search: '?daily' });
  };

  const routingWeeklyHistory = () => {
    pathName !== 'group'
      ? history.push({
          pathname: '/history',
          search: `?weekly&year=${selectedYear}&month=${dayjs(String(selectedMonth)).format('MM')}`,
        })
      : history.push({ pathname: `/group/${group_id}/history`, search: '?weekly' });
  };

  return (
    <History
      query={query.split('&')[0]}
      pathName={pathName}
      groupId={group_id}
      openSearchField={openSearchField}
      notSpecified={notSpecified}
      groupTransactionsList={groupTransactionsList}
      searchFieldOpen={searchFieldOpen}
      searchFieldClose={searchFieldClose}
      selectedYear={selectedYear}
      selectedMonth={selectedMonth}
      setSelectedYear={setSelectedYear}
      setSelectedMonth={setSelectedMonth}
      routingDailyHistory={routingDailyHistory}
      routingWeeklyHistory={routingWeeklyHistory}
    />
  );
};
export default HistoryContainer;
