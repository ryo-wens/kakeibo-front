import React from 'react';
import { Header } from '../../components/header';
import { SelectYears } from '../../components/uikit';
import YearlyBudgetsRowContainer from '../../containers/budgets/YearlyBudgetsRowContainer';
import GroupYearlyBudgetsRowContainer from '../../containers/budgets/GroupYearlyBudgetsRowContainer';
import '../../components/budget/yearly-budgets.scss';

interface YearlyBudgetsProps {
  pathName: string;
  years: number;
  setYears: React.Dispatch<React.SetStateAction<number>>;
  totalBudget: number;
  totalGroupBudget: number;
  currentPageColor: () => { color: string; background: string };
  routingStandardBudgets: () => void;
  routingYearlyBudgets: () => void;
}

const YearlyBudgets = (props: YearlyBudgetsProps) => {
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
                  props.routingStandardBudgets();
                }}
              >
                標準予算
              </button>
              <button
                style={props.currentPageColor()}
                onClick={() => {
                  props.routingYearlyBudgets();
                }}
              >
                月別カスタム予算
              </button>
            </div>
          </div>
          <div className="budget__spacer budget__spacer--small" />
          <div className="yearly-budgets__select-year">
            <SelectYears selectedYear={props.years} setSelectedYear={props.setYears} />
          </div>
          <h2>
            総額 ¥{' '}
            {props.pathName !== 'group'
              ? props.totalBudget.toLocaleString()
              : props.totalGroupBudget.toLocaleString()}
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
                {props.pathName !== 'group' ? (
                  <YearlyBudgetsRowContainer years={props.years} />
                ) : (
                  <GroupYearlyBudgetsRowContainer years={props.years} />
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
