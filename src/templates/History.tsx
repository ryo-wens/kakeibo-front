import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchTransactionsList } from '../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { getPathTemplateName, getPathGroupId } from '../lib/path';
import { month, year } from '../lib/constant';
import {
  prevSelectYears,
  nextSelectYears,
  prevButtonDisable,
  nextButtonDisable,
  SelectYears,
} from '../lib/date';
import { DailyHistory } from './index';
import { MonthlyHistory, GroupMonthlyHistory } from '../components/home';
import InputYears from '../components/uikit/InputYears';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
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
  const [openSelectYears, setOpenSelectYears] = useState<boolean>(false);
  const [itemYear, setItemYear] = useState<number>(selectedYear);
  const [itemMonth, setItemMonth] = useState<number>(selectedMonth);

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
    dispatch(fetchGroups());
    const interval = setInterval(() => {
      dispatch(fetchGroups());
    }, 3000);
    return () => clearInterval(interval);
  }, [pathName]);

  const handleSelectYearsOpen = useCallback(() => {
    setOpenSelectYears(true);
  }, [setOpenSelectYears]);

  const handleSelectYearsClose = useCallback(() => {
    setOpenSelectYears(false);
  }, [setOpenSelectYears]);

  const updateSelectYear = (year: number) => {
    setSelectedYear(year);
  };

  const updateSelectMonth = (month: number) => {
    setSelectedMonth(month);
  };

  const updatePrevYears = () => {
    const prevYears = prevSelectYears(selectedYear, selectedMonth);

    setSelectedYear(Number(prevYears.selectedYear));
    setSelectedMonth(Number(prevYears.selectedMonth));
  };

  const updateNextYears = () => {
    const nextYears = nextSelectYears(selectedYear, selectedMonth);

    setSelectedYear(Number(nextYears.selectedYear));
    setSelectedMonth(Number(nextYears.selectedMonth));
  };

  const onClickDisplayYears = () => {
    const selectYears: SelectYears = {
      selectedYear: String(itemYear),
      selectedMonth: itemMonth <= 9 ? '0' + itemMonth : String(itemMonth),
    };
    if (pathName !== 'group') {
      dispatch(fetchTransactionsList(selectYears));
      updateSelectYear(itemYear);
      updateSelectMonth(itemMonth);
      handleSelectYearsClose();
    } else {
      const selectYears: SelectYears = {
        selectedYear: String(itemYear),
        selectedMonth: itemMonth <= 9 ? '0' + itemMonth : String(itemMonth),
      };
      dispatch(fetchGroupTransactionsList(groupId, selectYears));
      updateSelectYear(itemYear);
      updateSelectMonth(itemMonth);
      handleSelectYearsClose();
    }
  };

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
          {(() => {
            if (!openSelectYears) {
              return (
                <div className="history">
                  <button
                    disabled={prevButtonDisable(selectedYear, selectedMonth)}
                    className="skip-date__prev-btn history__prev-btn"
                    onClick={() => {
                      if (pathName !== 'group') {
                        dispatch(
                          fetchTransactionsList(prevSelectYears(selectedYear, selectedMonth))
                        ) && updatePrevYears();
                      } else {
                        dispatch(
                          fetchGroupTransactionsList(
                            groupId,
                            prevSelectYears(selectedYear, selectedMonth)
                          )
                        ) && updatePrevYears();
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
                    disabled={nextButtonDisable(selectedYear, selectedMonth)}
                    className="skip-date__next-btn history__next-btn"
                    onClick={() => {
                      if (pathName !== 'group') {
                        dispatch(
                          fetchTransactionsList(nextSelectYears(selectedYear, selectedMonth))
                        ) && updateNextYears();
                      } else {
                        dispatch(
                          fetchGroupTransactionsList(
                            groupId,
                            nextSelectYears(selectedYear, selectedMonth)
                          )
                        ) && updateNextYears();
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
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  setItemYear={setItemYear}
                  setItemMonth={setItemMonth}
                  onClickDisplayYears={onClickDisplayYears}
                />
              );
            }
          })()}
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
