import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getYearlyBudgets } from '../../reducks/budgets/selectors';
import { deleteCustomBudgets, fetchYearlyBudgets } from '../../reducks/budgets/operations';
import { YearlyBudgetsList } from '../../reducks/budgets/types';
import YearlyBudgetsRow from '../../components/budget/YearlyBudgetsRow';

interface YearlyBudgetsRowContainerProps {
  budgetsYear: number;
}

const YearlyBudgetsRowContainer = (props: YearlyBudgetsRowContainerProps) => {
  const dispatch = useDispatch();
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
    dispatch(fetchYearlyBudgets(props.budgetsYear, signal));

    return () => signal.cancel();
  }, [props.budgetsYear]);

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
      budgetsYear={props.budgetsYear}
      yearBudget={yearBudget}
      deleteCustomBudgets={deleteCustom}
      routingAddCustomBudgets={(transitingBasePath, selectYear, selectMonth) =>
        dispatch(push(`${transitingBasePath}/${selectYear}/${selectMonth}`))
      }
    />
  );
};
export default YearlyBudgetsRowContainer;
