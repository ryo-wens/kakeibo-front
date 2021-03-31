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

  const totalBudget = () => {
    let total = 0;

    for (let i = 0; i < budgets.length; i++) {
      total += Number(budgets[i].budget);
    }

    return total === totalStandardBudget;
  };

  return (
    <StandardBudgets
      budgets={budgets}
      setBudgets={setBudgets}
      pathName={pathName}
      unEditBudgets={totalBudget()}
      totalStandardBudget={totalStandardBudget}
      editStandardBudgetOperation={() => {
        dispatch(
          editStandardBudgets(
            budgets.map((budget) => {
              const {
                big_category_name: _big_category_name, // eslint-disable-line @typescript-eslint/no-unused-vars
                last_month_expenses: _last_month_expenses, // eslint-disable-line @typescript-eslint/no-unused-vars
                ...rest
              } = budget;
              return {
                big_category_id: rest.big_category_id,
                budget: Number(rest.budget),
              };
            })
          )
        );
      }}
    />
  );
};
export default StandardBudgetsContainer;
