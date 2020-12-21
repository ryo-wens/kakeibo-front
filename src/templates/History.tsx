import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchTransactionsList } from '../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { getGroupTransactions } from '../reducks/groupTransactions/selectors';
import { month, year } from '../lib/constant';
import { SelectYears } from '../lib/date';
import { DailyHistory } from './index';
import { MonthlyHistory, GroupMonthlyHistory } from '../components/home';
import InputYears from '../components/uikit/InputYears';
import '../assets/history/history.scss';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchGroupCategories } from '../reducks/groupCategories/operations';
import { Header } from '../components/header';
import axios, { CancelTokenSource } from 'axios';
import { useLocation, useParams } from 'react-router';

const History = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const groupTransactionsList = useSelector(getGroupTransactions);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  const fetchGroupHistoryData = (signal: CancelTokenSource) => {
    const years: SelectYears = {
      selectedYear: String(selectedYear),
      selectedMonth: selectedMonth <= 9 ? '0' + selectedMonth : String(selectedMonth),
    };
    dispatch(fetchGroupTransactionsList(Number(id), years, signal));
    dispatch(fetchGroupCategories(Number(id), signal));
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

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="history__position">
          <div className=" history" aria-label="small outlined button group">
            <button
              className="history__top-button"
              onClick={() => {
                if (pathName !== 'group') {
                  dispatch(push('/daily/history'));
                } else {
                  dispatch(push(`/group/${Number(id)}/daily/history`));
                }
              }}
            >
              日ごと
            </button>
            <button
              className="history__top-button"
              onClick={() => {
                if (pathName !== 'group') {
                  dispatch(push('/weekly/history'));
                } else {
                  dispatch(push(`/group/${Number(id)}/weekly/history`));
                }
              }}
            >
              週ごと
            </button>
            <button className="history__top-button">月ごと</button>
          </div>
          <div className="history__spacer" />
          <InputYears
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
        </div>
        {(() => {
          if (path === '/daily/history' || path === `/group/${Number(id)}/daily/history`) {
            return (
              <div className="history__table-size">
                <DailyHistory selectYear={selectedYear} selectMonth={selectedMonth} />
              </div>
            );
          } else if (path === '/weekly/history') {
            return (
              <div className="history__table-size">
                <MonthlyHistory month={selectedMonth} year={selectedYear} />
              </div>
            );
          } else if (`/group/${Number(id)}/weekly/history`) {
            return (
              <div className="history__table-size">
                <GroupMonthlyHistory
                  month={selectedMonth}
                  year={selectedYear}
                  groupTransactionsList={groupTransactionsList}
                />
              </div>
            );
          }
        })()}
      </main>
    </>
  );
};
export default History;
