import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYearlyBudgets, copyStandardBudgets } from '../../reducks/budgets/operations';
import { YearlyBudgetsList } from '../../reducks/budgets/types';
import { State } from '../../reducks/store/types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { push } from 'connected-react-router';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { budgetType } from '../../lib/constant';

const useStyles = makeStyles(() =>
  createStyles({
    tableSize: {
      width: 250,
      textAlign: 'center',
    },
  })
);

interface CustomBudgetsRowProps {
  years: number;
}

const YearlyBudgetsRow = (props: CustomBudgetsRowProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const yearlyBudgets = selector.budgets.yearly_budgets_list;
  const [yearBudget, setYearBudget] = useState<YearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    dispatch(fetchYearlyBudgets());
  }, []);

  useEffect(() => {
    setYearBudget(yearlyBudgets);
  }, [yearlyBudgets]);

  const customBudgetsTable = () => {
    return yearBudget.monthly_budgets.map((budget, index) => {
      const transitingBasePath =
        budget.budget_type === 'CustomBudget' ? `/custom-budgets` : `standard-budgets`;
      const budgetsType = () => {
        if (budget.budget_type === budgetType) {
          return '標準';
        }
        return 'カスタム';
      };
      const selectYear = budget.month.slice(0, 4);
      const selectMonth = budget.month.slice(5, 7);
      const lastDate = new Date(props.years, Number(selectMonth), 0).getDate();
      return (
        <TableRow key={index}>
          <TableCell className={classes.tableSize} component="th" scope="row">
            {selectMonth}月
          </TableCell>
          <TableCell className={classes.tableSize}>{budgetsType()}</TableCell>
          <TableCell className={classes.tableSize} align="center">
            {budget.month}
            {'01'}日〜{budget.month}
            {lastDate}日
          </TableCell>
          <TableCell className={classes.tableSize} align="center">
            ¥{budget.monthly_total_budget}
          </TableCell>
          <TableCell className={classes.tableSize} align="center">
            <IconButton
              size={'small'}
              onClick={() => {
                dispatch(push(`${transitingBasePath}/${selectYear}-${selectMonth}`));
                if (budgetsType() === '標準') {
                  dispatch(copyStandardBudgets());
                }
              }}
            >
              <CreateIcon color={'primary'} />
            </IconButton>
            {(() => {
              if (budgetsType() === 'カスタム') {
                return (
                  <IconButton
                    size={'small'}
                    onClick={() => {
                      if (window.confirm('カスタム予算を削除しても良いですか？ ')) {
                        alert('削除');
                      } else {
                        alert('削除を中止しました');
                      }
                    }}
                  >
                    <DeleteIcon color={'primary'} />
                  </IconButton>
                );
              }
            })()}
          </TableCell>
        </TableRow>
      );
    });
  };
  return <>{customBudgetsTable()}</>;
};
export default YearlyBudgetsRow;
