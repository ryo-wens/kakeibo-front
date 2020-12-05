import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchTransactionsList } from '../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { getPathTemplateName, getPathGroupId } from '../lib/path';
import { month, year } from '../lib/constant';
import { SelectYears } from '../lib/date';
import { DailyHistory } from './index';
import { MonthlyHistory, GroupMonthlyHistory } from '../components/home';
import InputYears from '../components/uikit/InputYears';
import '../assets/history/history.scss';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchGroupCategories } from '../reducks/groupCategories/operations';
import { Header } from '../components/header';

const History = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);

  const fetchGroupHistoryData = () => {
    const years: SelectYears = {
      selectedYear: String(selectedYear),
      selectedMonth: selectedMonth <= 9 ? '0' + selectedMonth : String(selectedMonth),
    };
    dispatch(fetchGroupTransactionsList(groupId, years));
    dispatch(fetchGroupCategories(groupId));
  };

  useEffect(() => {
    if (pathName === 'group') {
      fetchGroupHistoryData();
      const interval = setInterval(() => {
        fetchGroupHistoryData();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (pathName !== 'group') {
      const selectYears: SelectYears = {
        selectedYear: String(selectedYear),
        selectedMonth: selectedMonth <= 9 ? '0' + selectedMonth : String(selectedMonth),
      };

      dispatch(fetchTransactionsList(selectYears));
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    dispatch(fetchGroups());
    const interval = setInterval(() => {
      dispatch(fetchGroups());
    }, 3000);
    return () => clearInterval(interval);
  }, [pathName]);

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
                  dispatch(push(`/group/${groupId}/daily/history`));
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
                  dispatch(push(`/group/${groupId}/weekly/history`));
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
          if (path === '/daily/history' || path === `/group/${groupId}/daily/history`) {
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
          } else if (`/group/${groupId}/weekly/history`) {
            return (
              <div className="history__table-size">
                <GroupMonthlyHistory month={selectedMonth} year={selectedYear} />
              </div>
            );
          }
        })()}
      </main>
    </>
  );
};
export default History;
