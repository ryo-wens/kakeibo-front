import React from 'react';
import { GroupYearlyBudgetsList } from '../../reducks/groupBudgets/types';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { standardBudgetType } from '../../lib/constant';

interface GroupYearlyBudgetsRowProps {
  years: number;
  groupYearlyBudgets: GroupYearlyBudgetsList;
  deleteCustomBudgets: (selectYear: string, selectMonth: string) => void;
  routingEditBudgets: (transitingBasePath: string, selectYear: string, selectMonth: string) => void;
}

const GroupYearlyBudgetsRow = (props: GroupYearlyBudgetsRowProps) => {
  const groupCustomBudgetsTable = (): JSX.Element[] => {
    return props.groupYearlyBudgets.monthly_budgets.map((groupYearlyBudget, index) => {
      const routingAddress =
        groupYearlyBudget.budget_type === 'CustomBudget' ? `custom` : `standard`;
      const budgetsType = () => {
        if (groupYearlyBudget.budget_type === standardBudgetType) {
          return '標準';
        }
        return 'カスタム';
      };
      const selectYear = groupYearlyBudget.month.slice(0, 4);
      const selectMonth = groupYearlyBudget.month.slice(5, 7);
      const lastDate = new Date(props.years, Number(selectMonth), 0).getDate();
      return (
        <tr key={index}>
          <td className="budget__td" scope="row">
            {selectMonth}月
          </td>
          <td className="budget__td">{budgetsType()}</td>
          <td className="budget__td budget__td__date" align="center">
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
                props.routingEditBudgets(routingAddress, selectYear, selectMonth);
              }}
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
  return <>{groupCustomBudgetsTable()}</>;
};
export default GroupYearlyBudgetsRow;
