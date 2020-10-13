import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getYearlyBudgets } from '../../reducks/budgets/operations';
import { YearlyBudgetsList } from '../../reducks/budgets/types';
import { State } from '../../reducks/store/types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { push } from 'connected-react-router';
import CreateIcon from '@material-ui/icons/Create';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
    dispatch(getYearlyBudgets());
  }, []);

  useEffect(() => {
    setYearBudget(yearlyBudgets);
  }, [yearlyBudgets]);

  const customBudgetsTable = () => {
    return yearBudget.monthly_budgets.map((budget, index) => {
      const budgetType = () => {
        if (budget.budget_type === 'StandardBudget') {
          return '標準';
        }
        return 'カスタム';
      };
      const month = Number(budget.month.slice(5, 7));
      const lastDate = new Date(props.years, Number(month), 0).getDate();
      return (
        <TableRow key={index}>
          <TableCell className={classes.tableSize} component="th" scope="row">
            {month}月
          </TableCell>
          <TableCell className={classes.tableSize}>{budgetType()}</TableCell>
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
                if (budgetType() === 'カスタム') {
                  dispatch(
                    push(`/custom-budgets/${budget.month.slice(0, 4)}-${budget.month.slice(5, 7)}`)
                  );
                } else if (budgetType() === '標準') {
                  dispatch(
                    push(
                      `/standard-budgets/${budget.month.slice(0, 4)}-${budget.month.slice(5, 7)}`
                    )
                  );
                }
              }}
            >
              <CreateIcon color={'primary'} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };
  return <>{customBudgetsTable()}</>;
};
export default YearlyBudgetsRow;
