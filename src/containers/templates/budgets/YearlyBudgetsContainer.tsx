import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import axios from 'axios';
import { getYearlyBudgets } from '../../../reducks/budgets/selectors';
import { getGroupYearlyBudgets } from '../../../reducks/groupBudgets/selectors';
import { fetchStandardBudgets, fetchYearlyBudgets } from '../../../reducks/budgets/operations';
import YearlyBudgets from '../../../templates/budgets/YearlyBudgets';

interface YearlyBudgetsContainerProps {
  budgetsYear: number;
  setBudgetsYear: React.Dispatch<React.SetStateAction<number>>;
}

const YearlyBudgetsContainer = (props: YearlyBudgetsContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const totalBudget = useSelector(getYearlyBudgets).yearly_total_budget;
  const totalGroupBudget = useSelector(getGroupYearlyBudgets).yearly_total_budget;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(fetchStandardBudgets(signal));
      dispatch(fetchYearlyBudgets(props.budgetsYear, signal));
    }

    return () => signal.cancel();
  }, []);

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
