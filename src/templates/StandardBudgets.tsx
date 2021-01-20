import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getStandardBudgets, getTotalStandardBudget } from '../reducks/budgets/selectors';
import { fetchStandardBudgets, editStandardBudgets } from '../reducks/budgets/operations';
import { fetchGroups } from '../reducks/groups/operations';
import { StandardBudgetsList } from '../reducks/budgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../components/uikit/GenericButton';
import GroupStandardBudgets from '../components/budget/GroupStandardBudgets';
import { Header } from '../components/header';
import '../components/budget/budget.scss';

const StandardBudgets = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const path = useLocation().pathname;
  const pathName = useLocation().pathname.split('/')[1];
  const standardBudgets = useSelector(getStandardBudgets);
  const totalStandardBudget = useSelector(getTotalStandardBudget);
  const [budgets, setBudgets] = useState<StandardBudgetsList>([]);
  const unEditBudgets = budgets === standardBudgets;

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroups(signal));
      const interval = setInterval(() => {
        dispatch(fetchGroups(signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName]);

  useEffect(() => {
    if (!standardBudgets.length && pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchStandardBudgets(signal));
      return () => signal.cancel();
    }
  }, []);

  useEffect(() => {
    setBudgets(standardBudgets);
  }, [standardBudgets]);

  const currentPageColor = () => {
    if (path === '/standard/budgets' || path === `/group/${group_id}/standard/budgets`) {
      return {
        background: 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)',
        color: '#fff',
      };
    }
  };

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="budget__spacer budget__spacer--medium" />
        <div className="switch-item-tabs__buttons budget__switch-type" aria-label="budgets-kind">
          <button
            style={currentPageColor()}
            onClick={() => {
              {
                pathName !== 'group'
                  ? dispatch(push('/standard/budgets'))
                  : dispatch(push(`/group/${group_id}/standard/budgets`));
              }
            }}
          >
            標準予算
          </button>
          <button
            onClick={() => {
              pathName !== 'group'
                ? dispatch(push('/yearly/budgets'))
                : dispatch(push(`/group/${group_id}/yearly/budgets`));
            }}
          >
            月別カスタム予算
          </button>
        </div>
        {pathName !== 'group' ? (
          <>
            <div className="budget__spacer budget__spacer--medium" />
            <div className="budget budget__background budget__background__table">
              <div className="budget__spacer budget__spacer--medium" />
              <div className="budget__total-budget budget__total-budget__position">
                標準予算設定
              </div>
              <div className="budget__total-budget budget__total-budget__space">
                総予算 ¥ {totalStandardBudget.toLocaleString()}
              </div>
              <div className="budget__spacer budget__spacer--medium" />
              <table className="budget budget__background__table">
                <tbody>
                  <tr className="budget__th">
                    <th align="center">カテゴリー</th>
                    <th align="center">先月の支出</th>
                    <th align="center">予算</th>
                  </tr>
                  {budgets.map((budget, index) => {
                    const onChangeBudget = (event: { target: { value: string } }) => {
                      const newBudgets = [...budgets];
                      newBudgets[index].budget = (event.target.value as unknown) as number;
                      setBudgets(newBudgets);
                    };
                    return (
                      <tr key={budget.big_category_id}>
                        <td className="budget__td" scope="row">
                          {budget.big_category_name}
                        </td>
                        <td className="budget__td">
                          ￥ {budget.last_month_expenses.toLocaleString()}
                        </td>
                        <td className="budget__td" align="center">
                          <TextField
                            size={'small'}
                            id={'budgets'}
                            variant="outlined"
                            type={'number'}
                            value={budget.budget}
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
                      editStandardBudgets(
                        budgets.map((budget) => {
                          const { big_category_name, last_month_expenses, ...rest } = budget; // eslint-disable-line
                          return {
                            big_category_id: rest.big_category_id,
                            budget: Number(rest.budget),
                          };
                        })
                      )
                    );
                    window.scrollTo(0, 0);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <GroupStandardBudgets />
        )}
      </main>
    </>
  );
};
export default StandardBudgets;
