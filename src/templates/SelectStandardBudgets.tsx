import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStandardBudgets, addCustomBudgets } from '../reducks/budgets/operations';
import { State } from '../reducks/store/types';
import { StandardBudgetsList } from '../reducks/budgets/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import GenericButton from '../components/uikit/GenericButton';

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
    updateButton: {
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

const SelectStandardBudgets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const paths = pathname.split('/');
  const date = paths[2];
  const selectYear = date.slice(0, 4);
  const selectMonth = date.slice(5, 7);
  const selector = useSelector((state: State) => state);
  const standardBudgetsList = selector.budgets.standard_budgets_list;
  const [standardBudgets, setStandardBudgets] = useState<StandardBudgetsList>([]);
  const unEditBudgets = standardBudgets === standardBudgetsList;

  useEffect(() => {
    dispatch(fetchStandardBudgets());
  }, []);

  useEffect(() => {
    setStandardBudgets(standardBudgetsList);
  }, [standardBudgetsList]);

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonGroupPosition} size="large" aria-label="budgets-kind">
        <Button className={classes.buttonSize} onClick={() => dispatch(push('/standard-budgets'))}>
          標準
        </Button>
        <Button className={classes.buttonSize} onClick={() => dispatch(push('/custom-budgets'))}>
          月ごと
        </Button>
      </ButtonGroup>
      <h1>
        {selectYear}年{selectMonth}月
      </h1>
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
            {standardBudgets.map((standardBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...standardBudgets];
                newBudgets[index].budget = Number(event.target.value);
                setStandardBudgets(newBudgets);
              };
              return (
                <TableRow key={standardBudget.big_category_id}>
                  <TableCell className={classes.tableSize} component="th" scope="row">
                    {standardBudget.big_category_name}
                  </TableCell>
                  <TableCell className={classes.tableSize}>￥10,000</TableCell>
                  <TableCell className={classes.tableSize} align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={standardBudget.budget}
                      onChange={onChangeBudget}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.updateButton}>
        <GenericButton
          label={'更新する'}
          disabled={unEditBudgets}
          onClick={() =>
            dispatch(
              addCustomBudgets(
                selectYear,
                selectMonth,
                standardBudgets.map((budget) => {
                  const { big_category_name, ...rest } = budget; // eslint-disable-line
                  return rest;
                })
              )
            )
          }
        />
      </div>
    </div>
  );
};

export default SelectStandardBudgets;