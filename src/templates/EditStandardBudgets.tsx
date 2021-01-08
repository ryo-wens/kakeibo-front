import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import axios from 'axios';
import {
  fetchStandardBudgets,
  addCustomBudgets,
  copyStandardBudgets,
} from '../reducks/budgets/operations';
import { CustomBudgetsList } from '../reducks/budgets/types';
import { getCustomBudgets, getTotalStandardBudget } from '../reducks/budgets/selectors';
import TextField from '@material-ui/core/TextField';
import { push } from 'connected-react-router';
import GenericButton from '../components/uikit/GenericButton';
import { getPathYear, getPathMonth } from '../lib/path';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditGroupStandardBudgets from '../components/budget/EditGroupStandardBudgets';
import { fetchGroups } from '../reducks/groups/operations';
import { Header } from '../components/header';
import '../components/budget/budget.scss';

const EditStandardBudgets = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const selectYear = getPathYear(window.location.pathname);
  const selectMonth = getPathMonth(window.location.pathname);
  const customBudgetsList = useSelector(getCustomBudgets);
  const totalStandardBudget = useSelector(getTotalStandardBudget);
  const [customBudgets, setCustomBudgets] = useState<CustomBudgetsList>([]);
  const yearsInPersonal = `${selectYear}年${selectMonth}月`;
  const unInputBudgets = customBudgets === customBudgetsList;

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
    async function fetch() {
      if (pathName !== 'group') {
        await dispatch(fetchStandardBudgets(signal));
        dispatch(copyStandardBudgets());

        return () => signal.cancel();
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    setCustomBudgets(customBudgetsList);
  }, [customBudgetsList]);

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="budget__spacer budget__spacer--medium" />
        {pathName !== 'group' ? (
          <>
            <div className="budget__spacer budget__spacer--medium" />
            <div className="budget budget__background budget__background__table">
              <div className="budget__back-btn--position">
                <button
                  className="budget__back-btn"
                  onClick={() => dispatch(push('/yearly/budgets'))}
                >
                  <ChevronLeftIcon />
                </button>
              </div>
              <div className="budget__spacer budget__spacer--medium" />
              <div className="budget__total-budget budget__total-budget__position">
                カスタム予算追加
              </div>
              <div className="budget__total-budget budget__total-budget__space">
                {yearsInPersonal}
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
                  {customBudgets.map((customBudget, index) => {
                    const onChangeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
                      const newBudgets = customBudgets.concat();
                      newBudgets[index].budget = Number(event.target.value);
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
              <div className="budget__spacer budget__spacer--medium" />
              <div className="budget__submit-btn">
                <GenericButton
                  label={'更新する'}
                  disabled={unInputBudgets}
                  onClick={() => {
                    dispatch(
                      addCustomBudgets(
                        selectYear,
                        selectMonth,
                        customBudgets.map((budget) => {
                          const { big_category_name, last_month_expenses, ...rest } = budget; // eslint-disable-line
                          return {
                            big_category_id: rest.big_category_id,
                            budget: Number(rest.budget),
                          };
                        })
                      )
                    );
                    dispatch(push('/yearly/budgets'));
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <EditGroupStandardBudgets />
        )}
      </main>
    </>
  );
};

export default EditStandardBudgets;
