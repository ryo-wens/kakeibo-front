import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
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
    dispatch(deleteCustomBudgets(selectYear, selectMonth, signal));
  };

  return (
    <YearlyBudgetsRow
      budgetsYear={props.budgetsYear}
      yearBudget={yearBudget}
      deleteCustomBudgets={deleteCustom}
      routingEditCustomBudgets={(routingAddress, selectYear, selectMonth) => {
        if (routingAddress === 'custom') {
          history.push({
            pathname: '/budgets',
            search: `?edit_custom&year=${props.budgetsYear}&month=${selectMonth}`,
          });
        } else {
          history.push({
            pathname: '/budgets',
            search: `?add_custom&year=${props.budgetsYear}&month=${selectMonth}`,
          });
        }
      }}
    />
  );
};
export default YearlyBudgetsRowContainer;
