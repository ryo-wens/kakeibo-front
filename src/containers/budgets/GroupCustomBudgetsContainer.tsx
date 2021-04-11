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
  const { group_id } = useParams<{ group_id: string }>();
  const searchQuery = new URLSearchParams(useLocation().search);
  const queryMonth = searchQuery.get('month');
  const yearsInGroup = `${props.budgetsYear}年${queryMonth}月`;
  const groupCustomBudgets = useSelector(getGroupCustomBudgets);
  const groupTotalCustomBudget = useSelector(getTotalGroupCustomBudget);
  const [groupCustomBudgetsList, setGroupCustomBudgetsList] = useState<GroupCustomBudgetsList>([]);
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

      const interval = setInterval(() => {
        dispatch(
          fetchGroupCustomBudgets(
            String(props.budgetsYear),
            String(queryMonth),
            Number(group_id),
            signal
          )
        );
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [editing]);

  useEffect(() => {
    setGroupCustomBudgetsList(groupCustomBudgets);
  }, [groupCustomBudgets]);

  const disabledGroupEditCustomBudget = () => {
    const totalCustomBudget = groupCustomBudgetsList.reduce(
      (prevBudget, currentBudget) => prevBudget + Number(currentBudget.budget),
      0
    );

    return totalCustomBudget === groupTotalCustomBudget || queryMonth === null;
  };

  const handleBackPage = () => {
    history.push({
      pathname: `/group/${group_id}/budgets`,
      search: `?yearly&year=${props.budgetsYear}`,
    });
  };

  const handleEditCustomBudget = () => {
    dispatch(
      editGroupCustomBudgets(
        String(props.budgetsYear),
        String(queryMonth),
        Number(group_id),
        groupCustomBudgetsList.map((groupBudget) => {
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
    <GroupCustomBudgets
      setEditing={setEditing}
      yearsInGroup={yearsInGroup}
      groupCustomBudgets={groupCustomBudgetsList}
      setGroupCustomBudgets={setGroupCustomBudgetsList}
      unEditCustomBudget={disabledGroupEditCustomBudget()}
      groupTotalCustomBudget={groupTotalCustomBudget}
      backPageOperation={handleBackPage}
      editGroupCustomBudgetOperation={handleEditCustomBudget}
    />
  );
};
export default GroupCustomBudgetsContainer;
