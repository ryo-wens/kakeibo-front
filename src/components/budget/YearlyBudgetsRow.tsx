import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYearlyBudgets, deleteCustomBudgets } from '../../reducks/budgets/operations';
import axios from 'axios';
import { YearlyBudgetsList } from '../../reducks/budgets/types';
import IconButton from '@material-ui/core/IconButton';
import { push } from 'connected-react-router';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { standardBudgetType } from '../../lib/constant';
import { getYearlyBudgets } from '../../reducks/budgets/selectors';
import { getPathTemplateName } from '../../lib/path';

interface YearlyBudgetsRowProps {
  years: number;
}

const YearlyBudgetsRow = (props: YearlyBudgetsRowProps) => {
  const dispatch = useDispatch();
  const year = props.years;
  const pathName = getPathTemplateName(window.location.pathname);
  const yearlyBudgets = useSelector(getYearlyBudgets);
  const [yearBudget, setYearBudget] = useState<YearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchYearlyBudgets(year, signal));
      return () => signal.cancel();
    }
  }, [year]);

  useEffect(() => {
    setYearBudget(yearlyBudgets);
  }, [yearlyBudgets]);

  const customBudgetsTable = (): JSX.Element[] => {
    return yearBudget.monthly_budgets.map((budget, index) => {
      const transitingBasePath =
        budget.budget_type === 'CustomBudget' ? `/custom/budgets` : `/standard/budgets`;
      const budgetsType = () => {
        if (budget.budget_type === standardBudgetType) {
          return '標準';
        }
        return 'カスタム';
      };
      const selectYear = budget.month.slice(0, 4);
      const selectMonth = budget.month.slice(5, 7);
      const lastDate = new Date(year, Number(selectMonth), 0).getDate();
      return (
        <tr key={index}>
          <td className="budget__td" scope="row">
            {selectMonth}月
          </td>
          <td className="budget__td">{budgetsType()}</td>
          <td className="budget__td" align="center">
            {budget.month}
            {'01'}日〜{budget.month}
            {lastDate}日
          </td>
          <td className="budget__td" align="center">
            ¥ {budget.monthly_total_budget.toLocaleString()}
          </td>
          <td className="budget__td" align="center">
            <IconButton
              size={'small'}
              onClick={() => dispatch(push(`${transitingBasePath}/${selectYear}/${selectMonth}`))}
            >
              <CreateIcon color={'primary'} />
            </IconButton>
            {budgetsType() === 'カスタム' && (
              <IconButton
                size={'small'}
                onClick={() => {
                  if (window.confirm('カスタム予算を削除しても良いですか？ ')) {
                    dispatch(deleteCustomBudgets(selectYear, selectMonth));
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
  return <>{customBudgetsTable()}</>;
};
export default YearlyBudgetsRow;
