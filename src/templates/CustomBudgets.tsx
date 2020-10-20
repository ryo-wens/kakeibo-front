import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomBudgets, editCustomBudgets } from '../reducks/budgets/operations';
import { CustomBudgetsList } from '../reducks/budgets/types';
import { State } from '../reducks/store/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../components/uikit/GenericButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { getPathYear, getPathMonth } from '../lib/path';

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

const CustomBudgets = () => {
  const selectYear = getPathYear(window.location.pathname);
  const selectMonth = getPathMonth(window.location.pathname);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const customBudgetsList = selector.budgets.custom_budgets_list;
  const [customBudgets, setCustomBudgets] = useState<CustomBudgetsList>([]);
  const [updateMessage, setUpdateMessage] = useState<boolean>(false);
  const unInput = customBudgets === customBudgetsList;

  useEffect(() => {
    dispatch(fetchCustomBudgets(selectYear, selectMonth));
  }, []);

  useEffect(() => {
    setCustomBudgets(customBudgetsList);
  }, [customBudgetsList]);

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonGroupPosition} size="large" aria-label="budgets-kind">
        <Button className={classes.buttonSize} onClick={() => dispatch(push('/standard-budgets'))}>
          標準予算
        </Button>
        <Button className={classes.buttonSize} onClick={() => dispatch(push('/yearly-budgets'))}>
          月別カスタム予算
        </Button>
      </ButtonGroup>
      <h2 className={classes.centerPosition}>
        {updateMessage ? 'カスタム予算を更新しました' : null}
      </h2>
      <h2>
        {selectYear}年{selectMonth}月
      </h2>
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
            {customBudgets.map((customBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...customBudgets];
                newBudgets[index].budget = Number(event.target.value);
                setCustomBudgets(newBudgets);
              };
              return (
                <TableRow key={customBudget.big_category_id}>
                  <TableCell className={classes.tableSize} component="th" scope="row">
                    {customBudget.big_category_name}
                  </TableCell>
                  <TableCell className={classes.tableSize}>￥10,000</TableCell>
                  <TableCell className={classes.tableSize} align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={customBudget.budget}
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
              editCustomBudgets(
                selectYear,
                selectMonth,
                customBudgets.map((budget) => {
                  const { big_category_name, ...rest } = budget; // eslint-disable-line
                  return rest;
                })
              )
            ) && setUpdateMessage(true)
          }
        />
      </div>
    </div>
  );
};
export default CustomBudgets;
