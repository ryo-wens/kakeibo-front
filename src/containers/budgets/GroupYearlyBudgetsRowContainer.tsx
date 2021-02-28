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
  const groupYearlyBudgetsList = useSelector(getGroupYearlyBudgets);
  const [groupYearlyBudgets, setGroupYearlyBudgets] = useState<GroupYearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    setGroupYearlyBudgets(groupYearlyBudgetsList);
  }, [groupYearlyBudgetsList]);

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

  return (
    <GroupYearlyBudgetsRow
      years={props.budgetsYear}
      groupYearlyBudgets={groupYearlyBudgets}
      deleteCustomBudgets={(selectYear, selectMonth) => {
        const signal = axios.CancelToken.source();
        dispatch(deleteGroupCustomBudgets(selectYear, selectMonth, Number(group_id), signal));
      }}
      routingEditBudgets={(routingAddress, selectYear, selectMonth) => {
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
      }}
    />
  );
};
export default GroupYearlyBudgetsRowContainer;
