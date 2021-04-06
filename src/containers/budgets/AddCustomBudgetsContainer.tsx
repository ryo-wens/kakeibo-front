import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getInitialCustomBudgets, getTotalStandardBudget } from '../../reducks/budgets/selectors';
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
  const searchQuery = new URLSearchParams(useLocation().search);
  const queryMonth = searchQuery.get('month');
  const initialCustomBudgets = useSelector(getInitialCustomBudgets);
  const totalStandardBudget = useSelector(getTotalStandardBudget);
  const [initialCustomBudgetsList, setInitialCustomBudgetsList] = useState<CustomBudgetsList>([]);
  const yearsInPersonal = `${props.budgetsYear}年${queryMonth}月`;

  useEffect(() => {
    const signal = axios.CancelToken.source();

    dispatch(fetchCustomBudgets(String(props.budgetsYear), String(queryMonth), signal));
    dispatch(fetchStandardBudgets(signal));

    return () => signal.cancel();
  }, []);

  useEffect(() => {
    setInitialCustomBudgetsList(initialCustomBudgets);
  }, [initialCustomBudgets]);

  const disabledAddCustomBudget = () => {
    const totalCustomBudget = initialCustomBudgetsList.reduce(
      (prevBudget, currentBudget) => prevBudget + Number(currentBudget.budget),
      0
    );

    return totalCustomBudget === totalStandardBudget || queryMonth === null;
  };

  const handleBackPage = () => {
    history.push({
      pathname: '/budgets',
      search: `?yearly&year=${props.budgetsYear}`,
    });
  };

  const handleAddCustomBudget = () => {
    dispatch(
      addCustomBudgets(
        String(props.budgetsYear),
        String(queryMonth),
        initialCustomBudgetsList.map((budget) => {
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
    <AddCustomBudgets
      pathName={pathName}
      budgetsYear={props.budgetsYear}
      customBudgets={initialCustomBudgetsList}
      setCustomBudgets={setInitialCustomBudgetsList}
      unInputBudgets={disabledAddCustomBudget()}
      totalStandardBudget={totalStandardBudget}
      yearsInPersonal={yearsInPersonal}
      backPageOperation={handleBackPage}
      addCustomBudgetOperation={handleAddCustomBudget}
    />
  );
};
export default AddCustomBudgetsContainer;
