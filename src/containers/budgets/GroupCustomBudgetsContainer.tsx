import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  getGroupCustomBudgets,
  getTotalGroupCustomBudget,
} from '../../reducks/groupBudgets/selectors';
import {
  editGroupCustomBudgets,
  fetchGroupCustomBudgets,
} from '../../reducks/groupBudgets/operations';
import { GroupCustomBudgetsList } from '../../reducks/groupBudgets/types';
import GroupCustomBudgets from '../../components/budget/GroupCustomBudgets';

interface GroupCustomBudgetsContainerProps {
  budgetsYear: number;
}

const GroupCustomBudgetsContainer = (props: GroupCustomBudgetsContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group_id } = useParams();
  const searchLocation = useLocation().search;
  const getQuery = new URLSearchParams(searchLocation);
  const queryMonth = getQuery.get('month');
  const yearsInGroup = `${props.budgetsYear}年${queryMonth}月`;
  const groupCustomBudgetsList = useSelector(getGroupCustomBudgets);
  const groupTotalCustomBudget = useSelector(getTotalGroupCustomBudget);
  const [groupCustomBudgets, setGroupCustomBudgets] = useState<GroupCustomBudgetsList>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const unEditCustomBudget = groupCustomBudgets === groupCustomBudgetsList;

  useEffect(() => {
    if (!editing) {
      const signal = axios.CancelToken.source();
      if (queryMonth != null) {
        dispatch(
          fetchGroupCustomBudgets(String(props.budgetsYear), queryMonth, Number(group_id), signal)
        );
      }
      const interval = setInterval(() => {
        if (queryMonth != null) {
          dispatch(
            fetchGroupCustomBudgets(String(props.budgetsYear), queryMonth, Number(group_id), signal)
          );
        }
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
    <GroupCustomBudgets
      setEditing={setEditing}
      yearsInGroup={yearsInGroup}
      groupCustomBudgets={groupCustomBudgets}
      setGroupCustomBudgets={setGroupCustomBudgets}
      unEditCustomBudget={unEditCustomBudget}
      groupTotalCustomBudget={groupTotalCustomBudget}
      backPageOperation={() =>
        history.push({
          pathname: `/group/${group_id}/budgets`,
          search: `?yearly&year=${props.budgetsYear}`,
        })
      }
      editGroupCustomBudgetOperation={() => {
        if (queryMonth != null) {
          dispatch(
            editGroupCustomBudgets(
              String(props.budgetsYear),
              queryMonth,
              Number(group_id),
              groupCustomBudgets.map((groupBudget) => {
                const { big_category_name, last_month_expenses, ...rest } = groupBudget; // eslint-disable-line
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
export default GroupCustomBudgetsContainer;