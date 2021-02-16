import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  getGroupStandardBudgets,
  getGroupTotalStandardBudget,
} from '../../reducks/groupBudgets/selectors';
import { GroupStandardBudgetsList } from '../../reducks/groupBudgets/types';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../../reducks/groups/operations';
import {
  editGroupStandardBudgets,
  fetchGroupStandardBudgets,
} from '../../reducks/groupBudgets/operations';
import GroupStandardBudgets from '../../components/budget/GroupStandardBudgets';

const GroupStandardBudgetsContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const groupStandardBudgetsList = useSelector(getGroupStandardBudgets);
  const groupTotalStandardBudget = useSelector(getGroupTotalStandardBudget);
  const [editing, setEditing] = useState<boolean>(false);
  const [groupStandardBudgets, setGroupStandardBudgets] = useState<GroupStandardBudgetsList>([]);
  const unEditBudgets = groupStandardBudgets === groupStandardBudgetsList;

  const fetchGroupStandardBudgetsData = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupStandardBudgets(Number(group_id), signal));
  };

  useEffect(() => {
    if (!editing) {
      const signal = axios.CancelToken.source();

      fetchGroupStandardBudgetsData(signal);
      const interval = setInterval(() => {
        fetchGroupStandardBudgetsData(signal);
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [editing]);

  useEffect(() => {
    setGroupStandardBudgets(groupStandardBudgetsList);
  }, [groupStandardBudgetsList]);

  return (
    <GroupStandardBudgets
      setEditing={setEditing}
      unEditBudgets={unEditBudgets}
      groupStandardBudgets={groupStandardBudgets}
      setGroupStandardBudgets={setGroupStandardBudgets}
      groupTotalStandardBudget={groupTotalStandardBudget}
      editGroupStandardBudgetOperation={() => {
        const signal = axios.CancelToken.source();
        dispatch(
          editGroupStandardBudgets(
            Number(group_id),
            signal,
            groupStandardBudgets.map((groupBudget) => {
              const { big_category_name, last_month_expenses, ...rest } = groupBudget; // eslint-disable-line
              return {
                big_category_id: rest.big_category_id,
                budget: Number(rest.budget),
              };
            })
          )
        );
      }}
    />
  );
};
export default GroupStandardBudgetsContainer;
