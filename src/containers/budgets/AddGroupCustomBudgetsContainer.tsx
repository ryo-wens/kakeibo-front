import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import {
  getGroupTotalStandardBudget,
  getInitialGroupCustomBudgets,
} from '../../reducks/groupBudgets/selectors';
import {
  addGroupCustomBudgets,
  fetchGroupStandardBudgets,
  fetchGroupCustomBudgets,
} from '../../reducks/groupBudgets/operations';
import { GroupCustomBudgetsList } from '../../reducks/groupBudgets/types';
import AddGroupCustomBudgets from '../../components/budget/AddGroupCustomBudgets';
import { useHistory } from 'react-router-dom';

interface AddGroupCustomBudgetsContainerProps {
  budgetsYear: number;
}

const AddGroupCustomBudgetsContainer = (props: AddGroupCustomBudgetsContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group_id } = useParams<{ group_id: string }>();
  const searchQuery = new URLSearchParams(useLocation().search);
  const queryMonth = searchQuery.get('month');
  const yearsInGroup = `${props.budgetsYear}年${queryMonth}月`;
  const initialGroupCustomBudgets = useSelector(getInitialGroupCustomBudgets);
  const groupTotalStandardBudget = useSelector(getGroupTotalStandardBudget);
  const [
    initialGroupCustomBudgetsList,
    setInitialGroupCustomBudgetsList,
  ] = useState<GroupCustomBudgetsList>([]);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!editing) {
      const signal = axios.CancelToken.source();

      dispatch(
        fetchGroupCustomBudgets(
          String(props.budgetsYear),
          String(queryMonth),
          Number(group_id),
          signal
        )
      );
      dispatch(fetchGroupStandardBudgets(Number(group_id), signal));

      const interval = setInterval(() => {
        dispatch(
          fetchGroupCustomBudgets(
            String(props.budgetsYear),
            String(queryMonth),
            Number(group_id),
            signal
          )
        );

        dispatch(fetchGroupStandardBudgets(Number(group_id), signal));
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [editing]);

  useEffect(() => {
    setInitialGroupCustomBudgetsList(initialGroupCustomBudgets);
  }, [initialGroupCustomBudgets]);

  const disabledAddGroupCustomBudget = () => {
    const totalGroupCustomBudget = initialGroupCustomBudgetsList.reduce(
      (prevCustomBudget, currentCustomBudget) =>
        prevCustomBudget + Number(currentCustomBudget.budget),
      0
    );

    return totalGroupCustomBudget === groupTotalStandardBudget || queryMonth === null;
  };

  const handleBackPage = () => {
    history.push({
      pathname: `/group/${group_id}/budgets`,
      search: `?yearly&year=${props.budgetsYear}`,
    });
  };

  const handleAddGroupCustomBudget = () => {
    dispatch(
      addGroupCustomBudgets(
        String(props.budgetsYear),
        String(queryMonth),
        Number(group_id),
        initialGroupCustomBudgetsList.map((groupCustomBudget) => {
          const {
            big_category_name: _big_category_name, // eslint-disable-line @typescript-eslint/no-unused-vars
            last_month_expenses: _last_month_expenses, // eslint-disable-line @typescript-eslint/no-unused-vars
            ...rest
          } = groupCustomBudget;
          return {
            big_category_id: rest.big_category_id,
            budget: Number(rest.budget),
          };
        })
      )
    );
  };

  return (
    <AddGroupCustomBudgets
      setEditing={setEditing}
      yearsInGroup={yearsInGroup}
      unAddCustomBudgets={disabledAddGroupCustomBudget()}
      groupCustomBudgets={initialGroupCustomBudgetsList}
      setGroupCustomBudgets={setInitialGroupCustomBudgetsList}
      groupTotalStandardBudget={groupTotalStandardBudget}
      backPageOperation={handleBackPage}
      addGroupCustomBudgetOperation={handleAddGroupCustomBudget}
    />
  );
};
export default AddGroupCustomBudgetsContainer;
