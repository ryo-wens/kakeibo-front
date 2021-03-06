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
  const groupStandardBudgets = useSelector(getGroupStandardBudgets);
  const groupTotalStandardBudget = useSelector(getGroupTotalStandardBudget);
  const [editing, setEditing] = useState<boolean>(false);
  const [
    groupStandardBudgetsList,
    setGroupStandardBudgetsList,
  ] = useState<GroupStandardBudgetsList>([]);

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
    setGroupStandardBudgetsList(groupStandardBudgets);
  }, [groupStandardBudgets]);

  const disabledEditGroupStandardBudget = () => {
    const totalStandardBudget = groupStandardBudgetsList.reduce(
      (prevBudget, currentBudget) => prevBudget + Number(currentBudget.budget),
      0
    );

    return totalStandardBudget === groupTotalStandardBudget;
  };

  const handleEditGroupStandardBudget = () => {
    dispatch(
      editGroupStandardBudgets(
        Number(group_id),
        groupStandardBudgetsList.map((groupBudget) => {
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
  };

  return (
    <GroupStandardBudgets
      setEditing={setEditing}
      unEditBudgets={disabledEditGroupStandardBudget()}
      groupStandardBudgets={groupStandardBudgetsList}
      setGroupStandardBudgets={setGroupStandardBudgetsList}
      groupTotalStandardBudget={groupTotalStandardBudget}
      editGroupStandardBudgetOperation={handleEditGroupStandardBudget}
    />
  );
};
export default GroupStandardBudgetsContainer;
