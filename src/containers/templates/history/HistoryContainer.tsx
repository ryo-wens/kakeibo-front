import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
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

const HistoryContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const path = window.location.pathname;
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
      selectedMonth: selectedMonth <= 9 ? '0' + selectedMonth : String(selectedMonth),
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
        selectedMonth: selectedMonth <= 9 ? '0' + selectedMonth : String(selectedMonth),
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

  const currentPageColor = (currentPath: string) => {
    if (path === currentPath) {
      return {
        backgroundColor: '#ff802b',
        color: '#fff',
      };
    }
  };

  const searchFieldOpen = () => {
    setOpenSearchField(true);
    setNotSpecified(true);
  };

  const searchFieldClose = () => {
    setOpenSearchField(false);
    setNotSpecified(false);
  };

  return (
    <History
      path={path}
      pathName={pathName}
      groupId={group_id}
      openSearchField={openSearchField}
      notSpecified={notSpecified}
      groupTransactionsList={groupTransactionsList}
      searchFieldOpen={searchFieldOpen}
      searchFieldClose={searchFieldClose}
      currentPageColor={currentPageColor}
      selectedYear={selectedYear}
      selectedMonth={selectedMonth}
      setSelectedYear={setSelectedYear}
      setSelectedMonth={setSelectedMonth}
      routingDailyHistory={() => {
        pathName !== 'group'
          ? dispatch(push('/daily/history'))
          : dispatch(push(`/group/${group_id}/daily/history`));
      }}
      routingWeeklyHistory={() => {
        pathName !== 'group'
          ? dispatch(push('/weekly/history'))
          : dispatch(push(`/group/${group_id}/weekly/history`));
      }}
    />
  );
};
export default HistoryContainer;
