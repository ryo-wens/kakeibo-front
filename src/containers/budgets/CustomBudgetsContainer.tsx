import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from 'axios';
import { CustomBudgetsList } from '../../reducks/budgets/types';
import { editCustomBudgets, fetchCustomBudgets } from '../../reducks/budgets/operations';
import { getCustomBudgets, getTotalCustomBudget } from '../../reducks/budgets/selectors';
import CustomBudgets from '../../components/budget/CustomBudgets';

interface CustomBudgetsContainerProps {
  budgetsYear: number;
}

const CustomBudgetsContainer = (props: CustomBudgetsContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pathName = useLocation().pathname.split('/')[1];
  const searchQuery = new URLSearchParams(useLocation().search);
  const queryMonth = searchQuery.get('month');
  const customBudgets = useSelector(getCustomBudgets);
  const totalCustomBudget = useSelector(getTotalCustomBudget);
  const yearsInPersonal = `${props.budgetsYear}年${queryMonth}月`;
  const [customBudgetsList, setCustomBudgetsList] = useState<CustomBudgetsList>([]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchCustomBudgets(String(props.budgetsYear), String(queryMonth), signal));

    return () => signal.cancel();
  }, []);

  useEffect(() => {
    setCustomBudgetsList(customBudgets);
  }, [customBudgets]);

  const disabledEditCustomBudget = () => {
    const totalBudget = customBudgetsList.reduce(
      (prevBudget, currentBudget) => prevBudget + Number(currentBudget.budget),
      0
    );

    return totalBudget === totalCustomBudget || queryMonth === null;
  };

  const handleBackPage = () => {
    history.push({
      pathname: '/budgets',
      search: `?yearly&year=${props.budgetsYear}`,
    });
  };

  const handleEditCustomBudget = () => {
    dispatch(
      editCustomBudgets(
        String(props.budgetsYear),
        String(queryMonth),
        customBudgetsList.map((budget) => {
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
    <CustomBudgets
      unInput={disabledEditCustomBudget()}
      pathName={pathName}
      budgetsYear={props.budgetsYear}
      customBudgets={customBudgetsList}
      setCustomBudgets={setCustomBudgetsList}
      yearsInPersonal={yearsInPersonal}
      totalCustomBudget={totalCustomBudget}
      backPageOperation={handleBackPage}
      editCustomBudgetOperation={handleEditCustomBudget}
    />
  );
};
export default CustomBudgetsContainer;
