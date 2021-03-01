import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios, { CancelTokenSource } from 'axios';
import {
  getGroupCustomBudgets,
  getGroupTotalStandardBudget,
} from '../../reducks/groupBudgets/selectors';
import {
  addGroupCustomBudgets,
  copyGroupStandardBudgets,
  fetchGroupStandardBudgets,
} from '../../reducks/groupBudgets/operations';
import { fetchGroups } from '../../reducks/groups/operations';
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
  const searchLocation = useLocation().search;
  const getQuery = new URLSearchParams(searchLocation);
  const queryMonth = getQuery.get('month');
  const yearsInGroup = `${props.budgetsYear}年${queryMonth}月`;
  const groupCustomBudgetsList = useSelector(getGroupCustomBudgets);
  const groupTotalStandardBudget = useSelector(getGroupTotalStandardBudget);
  const [groupCustomBudgets, setGroupCustomBudgets] = useState<GroupCustomBudgetsList>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const unAddCustomBudgets = groupCustomBudgets === groupCustomBudgetsList;

  const fetchEditGroupStandardBudgetsData = (signal: CancelTokenSource) => {
    async function fetchGroupBudgets(signal: CancelTokenSource) {
      await dispatch(fetchGroupStandardBudgets(Number(group_id), signal));
      dispatch(copyGroupStandardBudgets());
      dispatch(fetchGroups(signal));
    }
    fetchGroupBudgets(signal);
  };

  useEffect(() => {
    if (!editing) {
      const signal = axios.CancelToken.source();

      fetchEditGroupStandardBudgetsData(signal);
      const interval = setInterval(() => {
        fetchEditGroupStandardBudgetsData(signal);
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [editing]);

  useEffect(() => {
    setGroupCustomBudgets(groupCustomBudgetsList);
  }, [groupCustomBudgetsList]);

  return (
    <AddGroupCustomBudgets
      setEditing={setEditing}
      yearsInGroup={yearsInGroup}
      unAddCustomBudgets={unAddCustomBudgets}
      groupCustomBudgets={groupCustomBudgets}
      setGroupCustomBudgets={setGroupCustomBudgets}
      groupTotalStandardBudget={groupTotalStandardBudget}
      backPageOperation={() =>
        history.push({
          pathname: `/group/${group_id}/budgets`,
          search: `?yearly&year=${props.budgetsYear}`,
        })
      }
      addGroupCustomBudgetOperation={() => {
        if (queryMonth != null) {
          const signal = axios.CancelToken.source();
          dispatch(
            addGroupCustomBudgets(
              String(props.budgetsYear),
              queryMonth,
              Number(group_id),
              signal,
              groupCustomBudgets.map((groupCustomBudget) => {
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
        }
      }}
    />
  );
};
export default AddGroupCustomBudgetsContainer;
