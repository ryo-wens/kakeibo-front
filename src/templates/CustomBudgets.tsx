import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { fetchCustomBudgets, editCustomBudgets } from '../reducks/budgets/operations';
import { getCustomBudgets, getTotalCustomBudget } from '../reducks/budgets/selectors';
import { CustomBudgetsList } from '../reducks/budgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../components/uikit/GenericButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import { getPathYear, getPathMonth, getPathTemplateName } from '../lib/path';
import { fetchGroups } from '../reducks/groups/operations';
import { Header } from '../components/header';
import GroupCustomBudgets from '../components/budget/GroupCustomBudgets';
import '../components/budget/budget.scss';

const CustomBudgets = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectYear = getPathYear(window.location.pathname);
  const selectMonth = getPathMonth(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);
  const yearsInPersonal = `${selectYear}年${selectMonth}月`;
  const customBudgetsList = useSelector(getCustomBudgets);
  const totalCustomBudget = useSelector(getTotalCustomBudget);
  const [customBudgets, setCustomBudgets] = useState<CustomBudgetsList>([]);
  const unInput = customBudgets === customBudgetsList;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
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
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(fetchCustomBudgets(selectYear, selectMonth, signal));
      return () => signal.cancel();
    }
  }, []);

  useEffect(() => {
    setCustomBudgets(customBudgetsList);
  }, [customBudgetsList]);

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="budget__switching-btn">
          <ButtonGroup className="budget__switch-btn--color" size="large" aria-label="budgets-kind">
            <Button
              className="budget__switch-btn budget__switch-btn"
              onClick={() => {
                {
                  pathName !== 'group'
                    ? dispatch(push('/standard/budgets'))
                    : dispatch(push(`/group/${Number(id)}/standard/budgets`));
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
                  : dispatch(push(`/group/${Number(id)}/yearly/budgets`));
              }}
            >
              月別カスタム予算
            </Button>
          </ButtonGroup>
        </div>
        {(() => {
          if (pathName !== 'group') {
            return (
              <>
                <div className="budget__spacer budget__spacer--medium" />
                <div className="budget budget__background budget__background__table">
                  <div className="budget__spacer budget__spacer--medium" />
                  <div className="budget__total-budget budget__total-budget__position">
                    カスタム予算編集
                  </div>
                  <div className="budget__total-budget budget__total-budget__space">
                    {yearsInPersonal}
                  </div>
                  <div className="budget__spacer budget__spacer--medium" />
                  <div className="budget__total-budget budget__total-budget__space">
                    総予算 ¥ {totalCustomBudget}
                  </div>
                  <div className="budget__spacer budget__spacer--medium" />
                  <table className="budget budget__background__table">
                    <tbody>
                      <tr className="budget__th">
                        <th align="center">カテゴリー</th>
                        <th align="center">先月の支出</th>
                        <th align="center">予算</th>
                      </tr>
                      {customBudgets.map((customBudget, index) => {
                        const onChangeBudget = (event: { target: { value: string } }) => {
                          const newBudgets = [...customBudgets];
                          newBudgets[index].budget = (event.target.value as unknown) as number;
                          setCustomBudgets(newBudgets);
                        };
                        return (
                          <tr key={customBudget.big_category_id}>
                            <td className="budget__td" scope="row">
                              {customBudget.big_category_name}
                            </td>
                            <td className="budget__td">￥ {customBudget.last_month_expenses}</td>
                            <td className="budget__td" align="center">
                              <TextField
                                size={'small'}
                                id={'budgets'}
                                variant="outlined"
                                type={'number'}
                                value={customBudget.budget}
                                onChange={onChangeBudget}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="budget__submit-btn">
                    <GenericButton
                      label={'更新する'}
                      disabled={unInput}
                      onClick={() => {
                        dispatch(
                          editCustomBudgets(
                            selectYear,
                            selectMonth,
                            customBudgets.map((budget) => {
                              let { big_category_name, last_month_expenses, ...rest } = budget; // eslint-disable-line
                              rest = {
                                big_category_id: rest.big_category_id,
                                budget: Number(rest.budget),
                              };
                              return rest;
                            })
                          )
                        );
                        dispatch(push('/yearly/budgets'));
                      }}
                    />
                  </div>
                </div>
              </>
            );
          } else {
            return <GroupCustomBudgets />;
          }
        })()}
      </main>
    </>
  );
};
export default CustomBudgets;
