import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getStandardBudgets, getTotalStandardBudget } from '../reducks/budgets/selectors';
import { fetchStandardBudgets, editStandardBudgets } from '../reducks/budgets/operations';
import { fetchGroups } from '../reducks/groups/operations';
import { StandardBudgetsList } from '../reducks/budgets/types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../components/uikit/GenericButton';
import GroupStandardBudgets from '../components/budget/GroupStandardBudgets';
import { Header } from '../components/header';
import '../components/budget/budget.scss';

const StandardBudgets = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
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
    if (path === '/standard/budgets' || path === `/group/${id}/standard/budgets`) {
      return { backgroundColor: '#ff6600', color: '#fff' };
    }
  };

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="budget__switching-btn">
          <ButtonGroup className="budget__switch-btn--color" size="large" aria-label="budgets-kind">
            <Button
              style={currentPageColor()}
              className="budget__switch-btn budget__switch-btn"
              onClick={() => {
                {
                  pathName !== 'group'
                    ? dispatch(push('/standard/budgets'))
                    : dispatch(push(`/group/${id}/standard/budgets`));
                }
              }}
            >
              標準予算
            </Button>
            <Button
              className="budget__switch-btn budget__switch-btn"
              onClick={() => {
                pathName !== 'group'
                  ? dispatch(push('/yearly/budgets'))
                  : dispatch(push(`/group/${id}/yearly/budgets`));
              }}
            >
              月別カスタム予算
            </Button>
          </ButtonGroup>
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
                総予算 ¥ {totalStandardBudget}
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
                    const onChangeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
                      const newBudgets = budgets.concat();
                      newBudgets[index].budget = Number(event.target.value);
                      setBudgets(newBudgets);
                    };
                    return (
                      <tr key={budget.big_category_id}>
                        <td className="budget__td" scope="row">
                          {budget.big_category_name}
                        </td>
                        <td className="budget__td">￥ {budget.last_month_expenses}</td>
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
