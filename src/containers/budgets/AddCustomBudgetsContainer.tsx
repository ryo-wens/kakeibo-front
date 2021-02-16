import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getCustomBudgets, getTotalStandardBudget } from '../../reducks/budgets/selectors';
import {
  addCustomBudgets,
  copyStandardBudgets,
  fetchStandardBudgets,
} from '../../reducks/budgets/operations';
import {
  copyGroupStandardBudgets,
  fetchGroupStandardBudgets,
} from '../../reducks/groupBudgets/operations';
import { CustomBudgetsList } from '../../reducks/budgets/types';
import AddCustomBudgets from '../../components/budget/AddCustomBudgets';

interface AddCustomBudgetsContainerProps {
  budgetsYear: number;
}

const AddCustomBudgetsContainer = (props: AddCustomBudgetsContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const searchLocation = useLocation().search;
  const getQuery = new URLSearchParams(searchLocation);
  const queryMonth = getQuery.get('month');
  const customBudgetsList = useSelector(getCustomBudgets);
  const totalStandardBudget = useSelector(getTotalStandardBudget);
  const [customBudgets, setCustomBudgets] = useState<CustomBudgetsList>([]);
  const yearsInPersonal = `${props.budgetsYear}年${queryMonth}月`;
  const unInputBudgets = customBudgets === customBudgetsList;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    async function fetch() {
      if (pathName !== 'group') {
        await dispatch(fetchStandardBudgets(signal));
        dispatch(copyStandardBudgets());
      } else {
        await dispatch(fetchGroupStandardBudgets(Number(group_id), signal));
        dispatch(copyGroupStandardBudgets());
      }
    }
    fetch();

    return () => signal.cancel();
  }, []);

  useEffect(() => {
    setCustomBudgets(customBudgetsList);
  }, [customBudgetsList]);

  return (
    <AddCustomBudgets
      pathName={pathName}
      budgetsYear={props.budgetsYear}
      customBudgets={customBudgets}
      setCustomBudgets={setCustomBudgets}
      unInputBudgets={unInputBudgets}
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
          const signal = axios.CancelToken.source();
          dispatch(
            addCustomBudgets(
              String(props.budgetsYear),
              queryMonth,
              signal,
              customBudgets.map((budget) => {
                const { big_category_name, last_month_expenses, ...rest } = budget; // eslint-disable-line
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
