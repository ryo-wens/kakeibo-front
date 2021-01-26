import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getYearlyBudgets } from '../../reducks/budgets/selectors';
import { deleteCustomBudgets, fetchYearlyBudgets } from '../../reducks/budgets/operations';
import { YearlyBudgetsList } from '../../reducks/budgets/types';
import YearlyBudgetsRow from '../../components/budget/YearlyBudgetsRow';

interface YearlyBudgetsRowContainerProps {
  years: number;
}

const YearlyBudgetsRowContainer = (props: YearlyBudgetsRowContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const year = props.years;
  const yearlyBudgets = useSelector(getYearlyBudgets);
  const [yearBudget, setYearBudget] = useState<YearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    setYearBudget(yearlyBudgets);
  }, [yearlyBudgets]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(fetchYearlyBudgets(year, signal));
      return () => signal.cancel();
    }
  }, [year]);

  const deleteCustom = (selectYear: string, selectMonth: string) => {
    const signal = axios.CancelToken.source();
    async function deleteBudgets() {
      await dispatch(deleteCustomBudgets(selectYear, selectMonth));
      dispatch(fetchYearlyBudgets(Number(selectYear), signal));
    }
    deleteBudgets();
  };

  return (
    <YearlyBudgetsRow
      years={props.years}
      yearBudget={yearBudget}
      deleteCustomBudgets={deleteCustom}
      routingAddCustomBudgets={(transitingBasePath, selectYear, selectMonth) =>
        dispatch(push(`${transitingBasePath}/${selectYear}/${selectMonth}`))
      }
    />
  );
};
export default YearlyBudgetsRowContainer;
