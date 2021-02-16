import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import axios from 'axios';
import { editStandardBudgets, fetchStandardBudgets } from '../../reducks/budgets/operations';
import { getStandardBudgets, getTotalStandardBudget } from '../../reducks/budgets/selectors';
import { StandardBudgetsList } from '../../reducks/budgets/types';
import StandardBudgets from '../../components/budget/StandardBudgets';

const StandardBudgetsContainer = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const standardBudgets = useSelector(getStandardBudgets);
  const totalStandardBudget = useSelector(getTotalStandardBudget);
  const [budgets, setBudgets] = useState<StandardBudgetsList>([]);
  const unEditBudgets = budgets === standardBudgets;

  useEffect(() => {
    if (!standardBudgets.length && pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchStandardBudgets(signal));

      return () => signal.cancel();
    }
  }, []);

  useEffect(() => {
    setBudgets(standardBudgets);
  }, [standardBudgets]);

  return (
    <StandardBudgets
      budgets={budgets}
      setBudgets={setBudgets}
      pathName={pathName}
      unEditBudgets={unEditBudgets}
      totalStandardBudget={totalStandardBudget}
      editStandardBudgetOperation={() => {
        const signal = axios.CancelToken.source();
        dispatch(
          editStandardBudgets(
            budgets.map((budget) => {
              const { big_category_name, last_month_expenses, ...rest } = budget; // eslint-disable-line
              return {
                big_category_id: rest.big_category_id,
                budget: Number(rest.budget),
              };
            }),
            signal
          )
        );
      }}
    />
  );
};
export default StandardBudgetsContainer;
