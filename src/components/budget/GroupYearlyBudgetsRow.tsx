import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGroupYearlyBudgets,
  fetchGroupStandardBudgets,
  deleteGroupCustomBudgets,
} from '../../reducks/groupBudgets/operations';
import { GroupYearlyBudgetsList } from '../../reducks/groupBudgets/types';
import { State } from '../../reducks/store/types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { push } from 'connected-react-router';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { standardBudgetType } from '../../lib/constant';
import {
  getGroupYearlyBudgets,
  getGroupStandardBudgets,
} from '../../reducks/groupBudgets/selectors';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';

const useStyles = makeStyles(() =>
  createStyles({
    tableSize: {
      width: 250,
      textAlign: 'center',
    },
  })
);

interface GroupYearlyBudgetsRowProps {
  years: number;
}

const GroupYearlyBudgetsRow = (props: GroupYearlyBudgetsRowProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const year = props.years;
  const groupId = getPathGroupId(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);
  const selector = useSelector((state: State) => state);
  const groupYearlyBudgetsList = getGroupYearlyBudgets(selector);
  const groupStandardBudgetsList = getGroupStandardBudgets(selector);
  const [groupYearlyBudgets, setGroupYearlyBudgets] = useState<GroupYearlyBudgetsList>({
    year: '',
    yearly_total_budget: 0,
    monthly_budgets: [],
  });

  useEffect(() => {
    if (pathName === 'group' && !groupYearlyBudgetsList.monthly_budgets.length) {
      dispatch(fetchGroupYearlyBudgets(groupId, year));
    }
  }, [year]);

  useEffect(() => {
    if (pathName === 'group' && !groupStandardBudgetsList.length) {
      dispatch(fetchGroupStandardBudgets(groupId));
    }
  }, []);

  useEffect(() => {
    setGroupYearlyBudgets(groupYearlyBudgetsList);
  }, [groupYearlyBudgetsList]);

  const groupCustomBudgetsTable = (): JSX.Element[] => {
    return groupYearlyBudgets.monthly_budgets.map((groupYearlyBudget, index) => {
      const transitingBasePath =
        groupYearlyBudget.budget_type === 'CustomBudget' ? `/custom/budgets` : `/standard/budgets`;
      const budgetsType = () => {
        if (groupYearlyBudget.budget_type === standardBudgetType) {
          return '標準';
        }
        return 'カスタム';
      };
      const selectYear = groupYearlyBudget.month.slice(0, 4);
      const selectMonth = groupYearlyBudget.month.slice(5, 7);
      const lastDate = new Date(year, Number(selectMonth), 0).getDate();
      return (
        <TableRow key={index}>
          <TableCell className={classes.tableSize} component="th" scope="row">
            {selectMonth}月
          </TableCell>
          <TableCell className={classes.tableSize}>{budgetsType()}</TableCell>
          <TableCell className={classes.tableSize} align="center">
            {groupYearlyBudget.month}
            {'01'}日〜{groupYearlyBudget.month}
            {lastDate}日
          </TableCell>
          <TableCell className={classes.tableSize} align="center">
            ¥{groupYearlyBudget.monthly_total_budget}
          </TableCell>
          <TableCell className={classes.tableSize} align="center">
            <IconButton
              size={'small'}
              onClick={() => {
                dispatch(
                  push(`/group/${groupId}${transitingBasePath}/${selectYear}/${selectMonth}`)
                );
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
                        dispatch(deleteGroupCustomBudgets(selectYear, selectMonth, groupId));
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
  return <>{groupCustomBudgetsTable()}</>;
};
export default GroupYearlyBudgetsRow;
