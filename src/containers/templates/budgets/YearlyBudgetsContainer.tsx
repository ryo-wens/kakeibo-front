import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getYearlyTotalBudgets } from '../../../reducks/budgets/selectors';
import { getGroupYearlyBudgets } from '../../../reducks/groupBudgets/selectors';
import YearlyBudgets from '../../../templates/budgets/YearlyBudgets';

interface YearlyBudgetsContainerProps {
  budgetsYear: number;
  setBudgetsYear: React.Dispatch<React.SetStateAction<number>>;
}

const YearlyBudgetsContainer = (props: YearlyBudgetsContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];
  const totalBudget = useSelector(getYearlyTotalBudgets);
  const totalGroupBudget = useSelector(getGroupYearlyBudgets).yearly_total_budget;

  return (
    <YearlyBudgets
      pathName={pathName}
      budgetsYear={props.budgetsYear}
      setBudgetsYear={props.setBudgetsYear}
      totalBudget={totalBudget}
      totalGroupBudget={totalGroupBudget}
    />
  );
};
export default YearlyBudgetsContainer;
