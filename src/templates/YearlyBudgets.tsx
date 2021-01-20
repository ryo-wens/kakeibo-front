import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
import axios from 'axios';
import { fetchStandardBudgets, fetchYearlyBudgets } from '../reducks/budgets/operations';
import { getYearlyBudgets } from '../reducks/budgets/selectors';
import { getGroupYearlyBudgets } from '../reducks/groupBudgets/selectors';
import YearlyBudgetsRow from '../components/budget/YearlyBudgetsRow';
import GroupYearlyBudgetsRow from '../components/budget/GroupYearlyBudgetsRow';
import { fetchGroups } from '../reducks/groups/operations';
import { Header } from '../components/header';
import { SelectYears } from '../components/uikit/';
import '../components/budget/yearly-budgets.scss';

const YearlyBudgets = () => {
  const date = new Date();
  const { group_id } = useParams();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const pathName = useLocation().pathname.split('/')[1];
  const totalBudget = useSelector(getYearlyBudgets).yearly_total_budget;
  const totalGroupBudget = useSelector(getGroupYearlyBudgets).yearly_total_budget;
  const [years, setYears] = useState<number>(date.getFullYear());

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroups(signal));
      const interval = setInterval(() => {
        dispatch(fetchGroups(signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(fetchStandardBudgets(signal));
      dispatch(fetchYearlyBudgets(years, signal));
    }

    return () => signal.cancel();
  }, []);

  const currentPageColor = () => {
    if (path === '/yearly/budgets' || path === `/group/${group_id}/yearly/budgets`) {
      return {
        background: 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)',
        color: '#fff',
      };
    }
  };

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="yearly-budgets__yearly-table-position">
          <div className="budget__spacer budget__spacer--medium" />
          <div>
            <div
              className="switch-item-tabs__buttons budget__switch-type "
              aria-label="budgets-kind"
            >
              <button
                onClick={() => {
                  {
                    pathName !== 'group'
                      ? dispatch(push('/standard/budgets'))
                      : dispatch(push(`/group/${group_id}/standard/budgets`));
                  }
                }}
              >
                標準予算
              </button>
              <button
                style={currentPageColor()}
                onClick={() => {
                  pathName !== 'group'
                    ? dispatch(push('/yearly/budgets'))
                    : dispatch(push(`/group/${group_id}/yearly/budgets`));
                }}
              >
                月別カスタム予算
              </button>
            </div>
          </div>
          <div className="budget__spacer budget__spacer--small" />
          <div className="yearly-budgets__select-year">
            <SelectYears selectedYear={years} setSelectedYear={setYears} />
          </div>
          <h2>
            総額 ¥{' '}
            {pathName !== 'group'
              ? totalBudget.toLocaleString()
              : totalGroupBudget.toLocaleString()}
          </h2>
          <div className="yearly-budgets__background">
            <table className="yearly-budgets__background__table">
              <tbody>
                <tr className="budget__th">
                  <th align="center">月</th>
                  <th align="center">予算の種類</th>
                  <th align="center">期間</th>
                  <th align="center">1ヶ月の予算</th>
                  <th align="center">操作</th>
                </tr>
                {pathName !== 'group' ? (
                  <YearlyBudgetsRow years={years} />
                ) : (
                  <GroupYearlyBudgetsRow years={years} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};
export default YearlyBudgets;
