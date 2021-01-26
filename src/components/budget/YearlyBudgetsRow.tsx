import React from 'react';
import { YearlyBudgetsList } from '../../reducks/budgets/types';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { standardBudgetType } from '../../lib/constant';

interface YearlyBudgetsRowProps {
  years: number;
  yearBudget: YearlyBudgetsList;
  deleteCustomBudgets: (selectYear: string, selectMonth: string) => void;
  routingAddCustomBudgets: (
    transitingBasePath: string,
    selectYear: string,
    selectMonth: string
  ) => void;
}

const YearlyBudgetsRow = (props: YearlyBudgetsRowProps) => {
  const customBudgetsTable = (): JSX.Element[] => {
    return props.yearBudget.monthly_budgets.map((budget, index) => {
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
      const lastDate = new Date(props.years, Number(selectMonth), 0).getDate();
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
              onClick={() =>
                props.routingAddCustomBudgets(transitingBasePath, selectYear, selectMonth)
              }
            >
              <CreateIcon color={'primary'} />
            </IconButton>
            {budgetsType() === 'カスタム' && (
              <IconButton
                size={'small'}
                onClick={() => {
                  if (window.confirm('カスタム予算を削除しても良いですか？ ')) {
                    props.deleteCustomBudgets(selectYear, selectMonth);
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
