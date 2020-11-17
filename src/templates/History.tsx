import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchTransactionsList } from '../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { getPathTemplateName, getPathGroupId } from '../lib/path';
import { customMonth, month, year } from '../lib/constant';
import { DailyHistory } from './index';
import { MonthlyHistory, GroupMonthlyHistory } from '../components/home';
import InputYears from '../components/uikit/InputYears';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import '../assets/history/history.scss';

const History = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const [selectedYear, setSelectedYear] = useState<number[]>([year]);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const [openSelectYears, setOpenSelectYears] = useState<boolean>(false);

  const handleSelectYearsOpen = useCallback(() => {
    setOpenSelectYears(true);
  }, [setOpenSelectYears]);

  const handleSelectYearsClose = useCallback(() => {
    setOpenSelectYears(false);
  }, [setOpenSelectYears]);

  const changeSelectedYear = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedYear(event.target.value as number[]);
    },
    [setSelectedYear]
  );

  const changeSelectedMonth = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedMonth(event.target.value as number);
    },
    [setSelectedMonth]
  );

  return (
    <>
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
        {(() => {
          if (!openSelectYears) {
            return (
              <div className="history">
                <button
                  className="skip-date__prev-btn history__prev-btn"
                  onClick={() => {
                    if (pathName !== 'group') {
                      dispatch(
                        fetchTransactionsList(String(selectedYear), String(selectedMonth - 1))
                      ) && setSelectedMonth(selectedMonth - 1);
                    } else {
                      dispatch(
                        fetchGroupTransactionsList(
                          Number(selectedYear),
                          String(selectedMonth - 1),
                          groupId
                        )
                      ) && setSelectedMonth(selectedMonth - 1);
                    }
                  }}
                >
                  <ArrowLeftIcon />
                </button>
                <button className="input-years__btn__jump-years" onClick={handleSelectYearsOpen}>
                  {selectedYear} 年 {selectedMonth} 月
                  <ExpandMoreIcon className="input-years__icon" />
                </button>
                <button
                  className="skip-date__next-btn history__next-btn"
                  onClick={() => {
                    if (pathName !== 'group') {
                      dispatch(
                        fetchTransactionsList(String(selectedYear), String(selectedMonth + 1))
                      ) && setSelectedMonth(selectedMonth + 1);
                    } else {
                      dispatch(
                        fetchGroupTransactionsList(
                          Number(selectedYear),
                          String(selectedMonth + 1),
                          groupId
                        )
                      ) && setSelectedMonth(selectedMonth + 1);
                    }
                  }}
                >
                  <ArrowRightIcon />
                </button>
              </div>
            );
          } else {
            return (
              <InputYears
                handleSelectYearsClose={handleSelectYearsClose}
                changeSelectedMonth={changeSelectedMonth}
                changeSelectedYear={changeSelectedYear}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            );
          }
        })()}
      </div>
      {(() => {
        if (path === '/daily/history' || path === `/group/${groupId}/daily/history`) {
          return (
            <div className="history__table-size">
              <DailyHistory selectYears={year} selectMonth={customMonth} />
            </div>
          );
        } else if (path === '/weekly/history') {
          return (
            <div className="history__table-size">
              <MonthlyHistory />
            </div>
          );
        } else if (`/group/${groupId}/weekly/history`) {
          return (
            <div className="history__table-size">
              <GroupMonthlyHistory />
            </div>
          );
        }
      })()}
    </>
  );
};
export default History;
