import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchYearlyBudgets,
  deleteCustomBudgets,
  fetchStandardBudgets,
} from '../../reducks/budgets/operations';
import { YearlyBudgetsList } from '../../reducks/budgets/types';
import { State } from '../../reducks/store/types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { push } from 'connected-react-router';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { standardBudgetType } from '../../lib/constant';
import { getStandardBudgets, getYearlyBudgets } from '../../reducks/budgets/selectors';

const useStyles = makeStyles(() =>
  createStyles({
    tableSize: {
      width: 250,
      textAlign: 'center',
    },
  })
);

interface YearlyBudgetsRowProps {
  years: number;
}

const YearlyBudgetsRow = (props: YearlyBudgetsRowProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const year = props.years;
  const selector = useSelector((state: State) => state);
  const standardBudgets = getStandardBudgets(selector);
  const yearlyBudgets = getYearlyBudgets(selector);
  const [yearBudget, setYearBudget] = useState<YearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    if (standardBudgets) dispatch(fetchStandardBudgets());
  }, []);

  useEffect(() => {
    dispatch(fetchYearlyBudgets(year));
  }, [year]);

  useEffect(() => {
    setYearBudget(yearlyBudgets);
  }, [yearlyBudgets]);

  const customBudgetsTable = () => {
    return yearBudget.monthly_budgets.map((budget, index) => {
      const transitingBasePath =
        budget.budget_type === 'CustomBudget' ? `/custom-budgets` : `standard-budgets`;
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
                        dispatch(deleteCustomBudgets(selectYear, selectMonth));
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
