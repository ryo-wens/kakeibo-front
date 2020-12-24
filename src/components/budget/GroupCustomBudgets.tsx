import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import axios, { CancelTokenSource } from 'axios';
import { useParams } from 'react-router';
import {
  fetchGroupCustomBudgets,
  editGroupCustomBudgets,
} from '../../reducks/groupBudgets/operations';
import {
  getGroupCustomBudgets,
  getTotalGroupCustomBudget,
} from '../../reducks/groupBudgets/selectors';
import { fetchGroups } from '../../reducks/groups/operations';
import { GroupCustomBudgetsList } from '../../reducks/groupBudgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../uikit/GenericButton';
import { getGroupPathYear, getGroupPathMonth } from '../../lib/path';
import './budget.scss';

const GroupCustomBudgets = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const groupInYear = getGroupPathYear(window.location.pathname);
  const groupInMonth = getGroupPathMonth(window.location.pathname);
  const yearsInGroup = `${groupInYear}年${groupInMonth}月`;
  const groupCustomBudgetsList = useSelector(getGroupCustomBudgets);
  const groupTotalCustomBudget = useSelector(getTotalGroupCustomBudget);
  const [groupCustomBudgets, setGroupCustomBudgets] = useState<GroupCustomBudgetsList>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const unEditCustomBudget = groupCustomBudgets === groupCustomBudgetsList;

  const fetchGroupCustomBudgetsData = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupCustomBudgets(groupInYear, groupInMonth, Number(id), signal));
  };

  useEffect(() => {
    if (!editing) {
      const signal = axios.CancelToken.source();
      fetchGroupCustomBudgetsData(signal);
      const interval = setInterval(() => {
        fetchGroupCustomBudgetsData(signal);
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
    <>
      <div className="budget__spacer budget__spacer--medium" />
      <div className="budget budget__background budget__background__table">
        <div className="budget__spacer budget__spacer--medium" />
        <div className="budget__total-budget budget__total-budget__position">標準予算設定</div>
        <div className="budget__total-budget budget__total-budget__space">{yearsInGroup}</div>
        <div className="budget__total-budget budget__total-budget__space">
          総予算 ¥ {groupTotalCustomBudget}
        </div>
        <div className="budget__spacer budget__spacer--medium" />
        <table className="budget budget__background__table">
          <tbody>
            <tr className="budget__th">
              <th align="center">カテゴリー</th>
              <th align="center">先月の支出</th>
              <th align="center">予算</th>
            </tr>
            {groupCustomBudgets.map((groupCustomBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...groupCustomBudgets];
                newBudgets[index].budget = (event.target.value as unknown) as number;
                setGroupCustomBudgets(newBudgets);
                setEditing(true);
              };
              return (
                <tr key={groupCustomBudget.big_category_id}>
                  <td className="budget__td" scope="row">
                    {groupCustomBudget.big_category_name}
                  </td>
                  <td className="budget__td">￥ {groupCustomBudget.last_month_expenses}</td>
                  <td className="budget__td" align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={groupCustomBudget.budget}
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
            disabled={unEditCustomBudget}
            onClick={() => {
              dispatch(
                editGroupCustomBudgets(
                  groupInYear,
                  groupInMonth,
                  Number(id),
                  groupCustomBudgets.map((groupBudget) => {
                    let { big_category_name, last_month_expenses, ...rest } = groupBudget; // eslint-disable-line
                    rest = {
                      big_category_id: rest.big_category_id,
                      budget: Number(rest.budget),
                    };
                    return rest;
                  })
                )
              );
              dispatch(push(`/group/${id}/yearly/budgets`));
              setEditing(false);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default GroupCustomBudgets;
