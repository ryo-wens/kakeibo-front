import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import {
  fetchGroupCustomBudgets,
  editGroupCustomBudgets,
} from '../reducks/groupBudgets/operations';
import { getGroupCustomBudgets } from '../reducks/groupBudgets/selectors';
import { GroupCustomBudgetsList } from '../reducks/groupBudgets/types';
import { State } from '../reducks/store/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../components/uikit/GenericButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { getGroupPathYear, getGroupPathMonth, getPathGroupId } from '../lib/path';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    tablePosition: {
      margin: '0 auto',
      marginTop: 40,
      alignItems: 'center',
      tableLayout: 'fixed',
      width: '100%',
    },
    tableSize: {
      width: 250,
      textAlign: 'center',
    },
    buttonSize: {
      width: 360,
      marginTop: 40,
      backgroundColor: '#fff',
      margin: '0 auto',
    },
    buttonGroupPosition: {
      margin: '0 auto',
      marginLeft: '7%',
    },
    centerPosition: {
      textAlign: 'center',
    },
    tableTop: {
      backgroundColor: '#4db5fa',
    },
    tableMain: {
      border: 'solid 1px #e1e3e3',
    },
  })
);

const GroupCustomBudgets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const groupInYear = getGroupPathYear(window.location.pathname);
  const groupInMonth = getGroupPathMonth(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const selector = useSelector((state: State) => state);
  const groupCustomBudgetsList = getGroupCustomBudgets(selector);
  const [groupCustomBudgets, setGroupCustomBudgets] = useState<GroupCustomBudgetsList>([]);
  const unInput = groupCustomBudgets === groupCustomBudgetsList;

  useEffect(() => {
    dispatch(fetchGroupCustomBudgets(groupInYear, groupInMonth, groupId));
  }, []);

  useEffect(() => {
    setGroupCustomBudgets(groupCustomBudgetsList);
  }, [groupCustomBudgetsList]);

  return (
    <>
      <TableContainer className={classes.tablePosition} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTop} align="center">
                カテゴリー
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                先月の支出
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                予算
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupCustomBudgets.map((groupCustomBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...groupCustomBudgets];
                newBudgets[index].budget = Number(event.target.value);
                setGroupCustomBudgets(newBudgets);
              };
              return (
                <TableRow key={groupCustomBudget.big_category_id}>
                  <TableCell className={classes.tableSize} component="th" scope="row">
                    {groupCustomBudget.big_category_name}
                  </TableCell>
                  <TableCell className={classes.tableSize}>￥10,000</TableCell>
                  <TableCell className={classes.tableSize} align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={groupCustomBudget.budget}
                      onChange={onChangeBudget}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.centerPosition}>
        <GenericButton
          label={'更新する'}
          disabled={unInput}
          onClick={() =>
            dispatch(
              editGroupCustomBudgets(
                groupInYear,
                groupInMonth,
                groupId,
                groupCustomBudgets.map((groupBudget) => {
                  const { big_category_name, ...rest } = groupBudget; // eslint-disable-line
                  return rest;
                })
              )
            ) && dispatch(push(`/group/${groupId}/yearly/budgets`))
          }
        />
      </div>
    </>
  );
};
export default GroupCustomBudgets;
