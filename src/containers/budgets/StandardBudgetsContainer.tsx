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
  const [standardBudgetsList, setStandardBudgetsList] = useState<StandardBudgetsList>([]);

  useEffect(() => {
    if (!standardBudgets.length && pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchStandardBudgets(signal));

      return () => signal.cancel();
    }
  }, []);

  useEffect(() => {
    setStandardBudgetsList(standardBudgets);
  }, [standardBudgets]);

  const disabledEditStandardBudget = () => {
    const totalBudget = standardBudgetsList.reduce(
      (prevBudget, currentBudget) => prevBudget + Number(currentBudget.budget),
      0
    );

    return totalBudget === totalStandardBudget;
  };

  const handleEditStandardBudget = () => {
    dispatch(
      editStandardBudgets(
        standardBudgetsList.map((budget) => {
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
  };

  return (
    <StandardBudgets
      budgets={standardBudgetsList}
      setBudgets={setStandardBudgetsList}
      pathName={pathName}
      unEditBudgets={disabledEditStandardBudget()}
      totalStandardBudget={totalStandardBudget}
      editStandardBudgetOperation={handleEditStandardBudget}
    />
  );
};
export default StandardBudgetsContainer;
