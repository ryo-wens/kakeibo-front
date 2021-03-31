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
  const { group_id } = useParams<{ group_id: string }>();
  const groupStandardBudgetsList = useSelector(getGroupStandardBudgets);
  const groupTotalStandardBudget = useSelector(getGroupTotalStandardBudget);
  const [editing, setEditing] = useState<boolean>(false);
  const [groupStandardBudgets, setGroupStandardBudgets] = useState<GroupStandardBudgetsList>([]);

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

  const totalBudget = () => {
    let total = 0;

    for (let i = 0; i < groupStandardBudgets.length; i++) {
      total += Number(groupStandardBudgets[i].budget);
    }

    return total === groupTotalStandardBudget;
  };

  return (
    <GroupStandardBudgets
      setEditing={setEditing}
      unEditBudgets={totalBudget()}
      groupStandardBudgets={groupStandardBudgets}
      setGroupStandardBudgets={setGroupStandardBudgets}
      groupTotalStandardBudget={groupTotalStandardBudget}
      editGroupStandardBudgetOperation={() => {
        dispatch(
          editGroupStandardBudgets(
            Number(group_id),
            groupStandardBudgets.map((groupBudget) => {
              const {
                big_category_name: _big_category_name, // eslint-disable-line @typescript-eslint/no-unused-vars
                last_month_expenses: _last_month_expenses, // eslint-disable-line @typescript-eslint/no-unused-vars
                ...rest
              } = groupBudget;
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
