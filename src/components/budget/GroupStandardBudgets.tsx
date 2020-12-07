import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupStandardBudgets } from '../../reducks/groupBudgets/selectors';
import {
  editGroupStandardBudgets,
  fetchGroupStandardBudgets,
} from '../../reducks/groupBudgets/operations';
import { GroupStandardBudgetsList } from '../../reducks/groupBudgets/types';
import { State } from '../../reducks/store/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../uikit/GenericButton';
import { getPathGroupId } from '../../lib/path';
import { fetchGroups } from '../../reducks/groups/operations';
import axios, { CancelTokenSource } from 'axios';

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

const GroupStandardBudgets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const groupStandardBudgetsList = getGroupStandardBudgets(selector);
  const [groupStandardBudgets, setGroupStandardBudgets] = useState<GroupStandardBudgetsList>([]);
  const groupId = getPathGroupId(window.location.pathname);
  const unEditBudgets = groupStandardBudgets === groupStandardBudgetsList;
  const [editing, setEditing] = useState<boolean>(false);

  const fetchGroupStandardBudgetsData = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupStandardBudgets(groupId, signal));
  };

  useEffect(() => {
    if (!editing) {
      const signal = axios.CancelToken.source();
      fetchGroupStandardBudgetsData(signal);
      const interval = setInterval(() => {
        fetchGroupStandardBudgetsData(signal);
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [editing]);

  useEffect(() => {
    setGroupStandardBudgets(groupStandardBudgetsList);
  }, [groupStandardBudgetsList]);

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
            {groupStandardBudgets.map((groupBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...groupStandardBudgets];
                newBudgets[index].budget = (event.target.value as unknown) as number;
                setGroupStandardBudgets(newBudgets);
                setEditing(true);
              };
              return (
                <TableRow key={groupBudget.big_category_id}>
                  <TableCell className={classes.tableSize} component="th" scope="row">
                    {groupBudget.big_category_name}
                  </TableCell>
                  <TableCell className={classes.tableSize}>￥10,000</TableCell>
                  <TableCell className={classes.tableSize} align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={groupBudget.budget}
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
          disabled={unEditBudgets}
          onClick={() => {
            dispatch(
              editGroupStandardBudgets(
                groupStandardBudgets.map((groupBudget) => {
                  let { big_category_name, ...rest } = groupBudget; // eslint-disable-line
                  rest = {
                    big_category_id: rest.big_category_id,
                    budget: Number(rest.budget),
                  };
                  return rest;
                })
              )
            );
            setEditing(false);
          }}
        />
      </div>
    </>
  );
};
export default GroupStandardBudgets;
