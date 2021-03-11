import React from 'react';
import { SelectYears } from '../../components/uikit';
import YearlyBudgetsRowContainer from '../../containers/budgets/YearlyBudgetsRowContainer';
import GroupYearlyBudgetsRowContainer from '../../containers/budgets/GroupYearlyBudgetsRowContainer';
import '../../components/budget/yearly-budgets.scss';

interface YearlyBudgetsProps {
  pathName: string;
  budgetsYear: number;
  setBudgetsYear: React.Dispatch<React.SetStateAction<number>>;
  totalBudget: number;
  totalGroupBudget: number;
}

const YearlyBudgets = (props: YearlyBudgetsProps) => {
  return (
    <>
      <div className="yearly-budgets__yearly-table-position">
        <div className="yearly-budgets__select-year">
          <SelectYears selectedYear={props.budgetsYear} setSelectedYear={props.setBudgetsYear} />
        </div>
        <div className="yearly-budgets__background">
          <h2>
            総額 ¥{' '}
            {props.pathName !== 'group'
              ? props.totalBudget !== null && props.totalBudget.toLocaleString()
              : props.totalGroupBudget !== null && props.totalGroupBudget.toLocaleString()}
          </h2>
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
                <YearlyBudgetsRowContainer budgetsYear={props.budgetsYear} />
              ) : (
                <GroupYearlyBudgetsRowContainer budgetsYear={props.budgetsYear} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default YearlyBudgets;
