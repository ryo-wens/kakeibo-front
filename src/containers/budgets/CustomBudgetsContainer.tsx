import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { CustomBudgetsList } from '../../reducks/budgets/types';
import { editCustomBudgets, fetchCustomBudgets } from '../../reducks/budgets/operations';
import { getCustomBudgets, getTotalCustomBudget } from '../../reducks/budgets/selectors';
import CustomBudgets from '../../components/budget/CustomBudgets';
import { fetchGroupCustomBudgets } from '../../reducks/groupBudgets/operations';

interface CustomBudgetsContainerProps {
  budgetsYear: number;
}

const CustomBudgetsContainer = (props: CustomBudgetsContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const searchLocation = useLocation().search;
  const getQuery = new URLSearchParams(searchLocation);
  const queryMonth = getQuery.get('month');
  const customBudgets = useSelector(getCustomBudgets);
  const totalCustomBudget = useSelector(getTotalCustomBudget);
  const yearsInPersonal = `${props.budgetsYear}年${queryMonth}月`;
  const [customBudgetsList, setCustomBudgetsList] = useState<CustomBudgetsList>([]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      if (queryMonth != null) {
        dispatch(fetchCustomBudgets(String(props.budgetsYear), queryMonth, signal));
      }
    } else {
      if (queryMonth != null) {
        dispatch(
          fetchGroupCustomBudgets(String(props.budgetsYear), queryMonth, Number(group_id), signal)
        );
      }
    }

    return () => signal.cancel();
  }, []);

  useEffect(() => {
    setCustomBudgetsList(customBudgets);
  }, [customBudgets]);

  const totalBudget = () => {
    let total = 0;

    for (let i = 0; i < customBudgetsList.length; i++) {
      total += Number(customBudgetsList[i].budget);
    }

    return total === totalCustomBudget;
  };

  return (
    <CustomBudgets
      unInput={totalBudget()}
      pathName={pathName}
      budgetsYear={props.budgetsYear}
      customBudgets={customBudgetsList}
      setCustomBudgets={setCustomBudgetsList}
      yearsInPersonal={yearsInPersonal}
      totalCustomBudget={totalCustomBudget}
      backPageOperation={() =>
        history.push({
          pathname: '/budgets',
          search: `?yearly&year=${props.budgetsYear}`,
        })
      }
      editCustomBudgetOperation={() => {
        if (queryMonth != null) {
          dispatch(
            editCustomBudgets(
              String(props.budgetsYear),
              queryMonth,
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
        }
      }}
    />
  );
};
export default CustomBudgetsContainer;
