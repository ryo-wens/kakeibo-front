import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { getGroupYearlyBudgets } from '../../reducks/groupBudgets/selectors';
import { GroupYearlyBudgetsList } from '../../reducks/groupBudgets/types';
import axios from 'axios';
import {
  deleteGroupCustomBudgets,
  fetchGroupYearlyBudgets,
} from '../../reducks/groupBudgets/operations';
import GroupYearlyBudgetsRow from '../../components/budget/GroupYearlyBudgetsRow';

interface GroupYearlyBudgetsRowContainerProps {
  budgetsYear: number;
}

const GroupYearlyBudgetsRowContainer = (props: GroupYearlyBudgetsRowContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group_id } = useParams<{ group_id: string }>();
  const groupYearlyBudgets = useSelector(getGroupYearlyBudgets);
  const [groupYearlyBudgetsList, setGroupYearlyBudgetsList] = useState<GroupYearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    setGroupYearlyBudgetsList(groupYearlyBudgets);
  }, [groupYearlyBudgets]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroupYearlyBudgets(Number(group_id), props.budgetsYear, signal));

    const interval = setInterval(() => {
      dispatch(fetchGroupYearlyBudgets(Number(group_id), props.budgetsYear, signal));
    }, 3000);

    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [props.budgetsYear]);

  const deleteGroupCustomBudget = (selectYear: string, selectMonth: string) => {
    dispatch(deleteGroupCustomBudgets(selectYear, selectMonth, Number(group_id)));
  };

  const routingEditBudgetsPage = (
    routingAddress: string,
    selectYear: string,
    selectMonth: string
  ) => {
    if (routingAddress === 'custom') {
      history.push({
        pathname: `/group/${group_id}/budgets`,
        search: `?edit_custom&year=${props.budgetsYear}&month=${selectMonth}`,
      });
    } else {
      history.push({
        pathname: `/group/${group_id}/budgets`,
        search: `?add_custom&year=${props.budgetsYear}&month=${selectMonth}`,
      });
    }
  };

  return (
    <GroupYearlyBudgetsRow
      years={props.budgetsYear}
      groupYearlyBudgets={groupYearlyBudgetsList}
      deleteCustomBudgets={deleteGroupCustomBudget}
      routingEditBudgets={routingEditBudgetsPage}
    />
  );
};
export default GroupYearlyBudgetsRowContainer;
