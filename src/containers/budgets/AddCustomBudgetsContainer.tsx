import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getTotalStandardBudget, getCopiedCustomBudgets } from '../../reducks/budgets/selectors';
import {
  addCustomBudgets,
  fetchCustomBudgets,
  fetchStandardBudgets,
} from '../../reducks/budgets/operations';
import { CustomBudgetsList } from '../../reducks/budgets/types';
import AddCustomBudgets from '../../components/budget/AddCustomBudgets';

interface AddCustomBudgetsContainerProps {
  budgetsYear: number;
}

const AddCustomBudgetsContainer = (props: AddCustomBudgetsContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pathName = useLocation().pathname.split('/')[1];
  const searchLocation = useLocation().search;
  const getQuery = new URLSearchParams(searchLocation);
  const queryMonth = getQuery.get('month');
  const copiedCustomBudgetsList = useSelector(getCopiedCustomBudgets);
  const totalStandardBudget = useSelector(getTotalStandardBudget);
  const [customBudgets, setCustomBudgets] = useState<CustomBudgetsList>([]);
  const yearsInPersonal = `${props.budgetsYear}年${queryMonth}月`;

  useEffect(() => {
    const signal = axios.CancelToken.source();

    if (pathName !== 'group') {
      if (queryMonth != null) {
        dispatch(fetchCustomBudgets(String(props.budgetsYear), queryMonth, signal));
        dispatch(fetchStandardBudgets(signal));
      }
    }

    return () => signal.cancel();
  }, []);

  useEffect(() => {
    setCustomBudgets(copiedCustomBudgetsList);
  }, [copiedCustomBudgetsList]);

  const totalCustomBudget = () => {
    let total = 0;

    for (let i = 0; i < customBudgets.length; i++) {
      total += Number(customBudgets[i].budget);
    }

    return total === totalStandardBudget;
  };

  return (
    <AddCustomBudgets
      pathName={pathName}
      budgetsYear={props.budgetsYear}
      customBudgets={customBudgets}
      setCustomBudgets={setCustomBudgets}
      unInputBudgets={totalCustomBudget()}
      totalStandardBudget={totalStandardBudget}
      yearsInPersonal={yearsInPersonal}
      backPageOperation={() =>
        history.push({
          pathname: '/budgets',
          search: `?yearly&year=${props.budgetsYear}`,
        })
      }
      addCustomBudgetOperation={() => {
        if (queryMonth != null) {
          dispatch(
            addCustomBudgets(
              String(props.budgetsYear),
              queryMonth,
              customBudgets.map((budget) => {
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
        }
      }}
    />
  );
};
export default AddCustomBudgetsContainer;
