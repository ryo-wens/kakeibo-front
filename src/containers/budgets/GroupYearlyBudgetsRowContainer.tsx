import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router';
import { getGroupYearlyBudgets } from '../../reducks/groupBudgets/selectors';
import { GroupYearlyBudgetsList } from '../../reducks/groupBudgets/types';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../reducks/groups/operations';
import {
  deleteGroupCustomBudgets,
  fetchGroupYearlyBudgets,
} from '../../reducks/groupBudgets/operations';
import GroupYearlyBudgetsRow from '../../components/budget/GroupYearlyBudgetsRow';

interface GroupYearlyBudgetsRowContainerProps {
  years: number;
}

const GroupYearlyBudgetsRowContainer = (props: GroupYearlyBudgetsRowContainerProps) => {
  const dispatch = useDispatch();
  const year = props.years;
  const { group_id } = useParams();
  const groupYearlyBudgetsList = useSelector(getGroupYearlyBudgets);
  const [groupYearlyBudgets, setGroupYearlyBudgets] = useState<GroupYearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    setGroupYearlyBudgets(groupYearlyBudgetsList);
  }, [groupYearlyBudgetsList]);

  const fetchGroupYearlyBudgetsData = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupYearlyBudgets(Number(group_id), year, signal));
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchGroupYearlyBudgetsData(signal);
    const interval = setInterval(() => {
      fetchGroupYearlyBudgetsData(signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [year]);

  return (
    <GroupYearlyBudgetsRow
      years={props.years}
      groupYearlyBudgets={groupYearlyBudgets}
      deleteCustomBudgets={(selectYear, selectMonth) =>
        dispatch(deleteGroupCustomBudgets(selectYear, selectMonth, Number(group_id)))
      }
      routingAddCustomBudgets={(transitingBasePath, selectYear, selectMonth) =>
        dispatch(push(`/group/${group_id}${transitingBasePath}/${selectYear}/${selectMonth}`))
      }
    />
  );
};
export default GroupYearlyBudgetsRowContainer;
