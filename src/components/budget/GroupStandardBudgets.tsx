import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios, { CancelTokenSource } from 'axios';
import {
  getGroupStandardBudgets,
  getGroupTotalStandardBudget,
} from '../../reducks/groupBudgets/selectors';
import {
  editGroupStandardBudgets,
  fetchGroupStandardBudgets,
} from '../../reducks/groupBudgets/operations';
import { fetchGroups } from '../../reducks/groups/operations';
import { GroupStandardBudgetsList } from '../../reducks/groupBudgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../uikit/GenericButton';
import './budget.scss';

const GroupStandardBudgets = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const groupStandardBudgetsList = useSelector(getGroupStandardBudgets);
  const groupTotalStandardBudget = useSelector(getGroupTotalStandardBudget);
  const [groupStandardBudgets, setGroupStandardBudgets] = useState<GroupStandardBudgetsList>([]);
  const [editing, setEditing] = useState<boolean>(false);
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
    <>
      <div className="budget__spacer budget__spacer--medium" />
      <div className="budget budget__background budget__background__table">
        <div className="budget__spacer budget__spacer--medium" />
        <div className="budget__total-budget budget__total-budget__position">標準予算設定</div>
        <div className="budget__total-budget budget__total-budget__space">
          総予算 ¥ {groupTotalStandardBudget.toLocaleString()}
        </div>
        <div className="budget__spacer budget__spacer--medium" />
        <table className="budget budget__background__table">
          <tbody>
            <tr className="budget__th">
              <th align="center">カテゴリー</th>
              <th align="center">先月の支出</th>
              <th align="center">予算</th>
            </tr>
            {groupStandardBudgets.map((groupBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...groupStandardBudgets];
                newBudgets[index].budget = (event.target.value as unknown) as number;
                setGroupStandardBudgets(newBudgets);
                setEditing(true);
              };
              return (
                <tr key={groupBudget.big_category_id}>
                  <td className="budget__td" scope="row">
                    {groupBudget.big_category_name}
                  </td>
                  <td className="budget__td">
                    ￥ {groupBudget.last_month_expenses.toLocaleString()}
                  </td>
                  <td className="budget__td" align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={groupBudget.budget}
                      onChange={onChangeBudget}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="budget__spacer budget__spacer--medium" />
        <div className="budget__submit-btn">
          <GenericButton
            label={'更新する'}
            disabled={unEditBudgets}
            onClick={() => {
              dispatch(
                editGroupStandardBudgets(
                  Number(group_id),
                  groupStandardBudgets.map((groupBudget) => {
                    const { big_category_name, last_month_expenses, ...rest } = groupBudget; // eslint-disable-line
                    return {
                      big_category_id: rest.big_category_id,
                      budget: Number(rest.budget),
                    };
                  })
                )
              );
              setEditing(false);
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default GroupStandardBudgets;
