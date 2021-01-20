import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupYearlyBudgets,
  deleteGroupCustomBudgets,
} from '../../reducks/groupBudgets/operations';
import { GroupYearlyBudgetsList } from '../../reducks/groupBudgets/types';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { standardBudgetType } from '../../lib/constant';
import { getGroupYearlyBudgets } from '../../reducks/groupBudgets/selectors';
import { fetchGroups } from '../../reducks/groups/operations';

interface GroupYearlyBudgetsRowProps {
  years: number;
}

const GroupYearlyBudgetsRow = (props: GroupYearlyBudgetsRowProps) => {
  const dispatch = useDispatch();
  const year = props.years;
  const { group_id } = useParams();
  const groupYearlyBudgetsList = useSelector(getGroupYearlyBudgets);
  const [groupYearlyBudgets, setGroupYearlyBudgets] = useState<GroupYearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

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

  useEffect(() => {
    setGroupYearlyBudgets(groupYearlyBudgetsList);
  }, [groupYearlyBudgetsList]);

  const groupCustomBudgetsTable = (): JSX.Element[] => {
    return groupYearlyBudgets.monthly_budgets.map((groupYearlyBudget, index) => {
      const transitingBasePath =
        groupYearlyBudget.budget_type === 'CustomBudget' ? `/custom/budgets` : `/standard/budgets`;
      const budgetsType = () => {
        if (groupYearlyBudget.budget_type === standardBudgetType) {
          return '標準';
        }
        return 'カスタム';
      };
      const selectYear = groupYearlyBudget.month.slice(0, 4);
      const selectMonth = groupYearlyBudget.month.slice(5, 7);
      const lastDate = new Date(year, Number(selectMonth), 0).getDate();
      return (
        <tr key={index}>
          <td className="budget__td" scope="row">
            {selectMonth}月
          </td>
          <td className="budget__td">{budgetsType()}</td>
          <td className="budget__td" align="center">
            {groupYearlyBudget.month}
            {'01'}日〜{groupYearlyBudget.month}
            {lastDate}日
          </td>
          <td className="budget__td" align="center">
            ¥{groupYearlyBudget.monthly_total_budget.toLocaleString()}
          </td>
          <td className="budget__td" align="center">
            <IconButton
              size={'small'}
              onClick={() => {
                dispatch(
                  push(`/group/${group_id}${transitingBasePath}/${selectYear}/${selectMonth}`)
                );
              }}
            >
              <CreateIcon color={'primary'} />
            </IconButton>
            {budgetsType() === 'カスタム' && (
              <IconButton
                size={'small'}
                onClick={() => {
                  if (window.confirm('カスタム予算を削除しても良いですか？ ')) {
                    dispatch(deleteGroupCustomBudgets(selectYear, selectMonth, Number(group_id)));
                  }
                }}
              >
                <DeleteIcon color={'primary'} />
              </IconButton>
            )}
          </td>
        </tr>
      );
    });
  };
  return <>{groupCustomBudgetsTable()}</>;
};
export default GroupYearlyBudgetsRow;
