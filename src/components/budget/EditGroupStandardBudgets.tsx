import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGroupStandardBudgets,
  addGroupCustomBudgets,
  copyGroupStandardBudgets,
} from '../../reducks/groupBudgets/operations';
import { GroupCustomBudgetsList } from '../../reducks/groupBudgets/types';
import {
  getGroupCustomBudgets,
  getGroupTotalStandardBudget,
} from '../../reducks/groupBudgets/selectors';
import TextField from '@material-ui/core/TextField';
import { push } from 'connected-react-router';
import GenericButton from '../uikit/GenericButton';
import { getGroupPathYear, getGroupPathMonth } from '../../lib/path';
import { fetchGroups } from '../../reducks/groups/operations';
import axios, { CancelTokenSource } from 'axios';
import { useParams } from 'react-router';

const EditGroupStandardBudgets = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const groupInYear = getGroupPathYear(window.location.pathname);
  const groupInMonth = getGroupPathMonth(window.location.pathname);
  const yearsInGroup = `${groupInYear}年${groupInMonth}月`;
  const groupCustomBudgetsList = useSelector(getGroupCustomBudgets);
  const groupTotalStandardBudget = useSelector(getGroupTotalStandardBudget);
  const [groupCustomBudgets, setGroupCustomBudgets] = useState<GroupCustomBudgetsList>([]);
  const unAddCustomBudgets = groupCustomBudgets === groupCustomBudgetsList;
  const [editing, setEditing] = useState<boolean>(false);

  const fetchEditGroupStandardBudgetsData = (signal: CancelTokenSource) => {
    async function fetchGroupBudgets(signal: CancelTokenSource) {
      await dispatch(fetchGroupStandardBudgets(Number(id), signal));
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
    <>
      <div className="budget__spacer budget__spacer--medium" />
      <div className="budget budget__background budget__background__table">
        <div className="budget__spacer budget__spacer--medium" />
        <div className="budget__total-budget budget__total-budget__position">標準予算設定</div>
        <div className="budget__total-budget budget__total-budget__space">{yearsInGroup}</div>
        <div className="budget__total-budget budget__total-budget__space">
          総予算 ¥ {groupTotalStandardBudget}
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
              const onChangeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
                const newBudgets = groupCustomBudgets.concat();
                newBudgets[index].budget = Number(event.target.value);
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
            disabled={unAddCustomBudgets}
            onClick={() => {
              dispatch(
                addGroupCustomBudgets(
                  groupInYear,
                  groupInMonth,
                  Number(id),
                  groupCustomBudgets.map((groupCustomBudget) => {
                    const { big_category_name, last_month_expenses, ...rest } = groupCustomBudget; // eslint-disable-line
                    return {
                      big_category_id: rest.big_category_id,
                      budget: Number(rest.budget),
                    };
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

export default EditGroupStandardBudgets;
