import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchStandardBudgets, editStandardBudgets } from '../reducks/budgets/operations';
import { StandardBudgetsList } from '../reducks/budgets/types';
import { State } from '../reducks/store/types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
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

const StandardBudgets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const standardBudgets = selector.budgets.standard_budgets_list;
  const [budgets, setBudgets] = useState<StandardBudgetsList>([]);

  useEffect(() => {
    dispatch(fetchStandardBudgets());
  }, []);

  useEffect(() => {
    setBudgets(standardBudgets);
  }, [standardBudgets]);

  const unEditBudgets = budgets === standardBudgets;

  const standardBudgetsList = () => {
    let budgetsList: ReactElement<StandardBudgetsList>[] = [];
    budgets.map((budget, index) => {
      const onChangeBudget = (event: { target: { value: string } }) => {
        const newBudgets = [...budgets];
        newBudgets[index].budget = Number(event.target.value);
        setBudgets(newBudgets);
      };
      budgetsList = [
        ...budgetsList,
        <TableRow key={budget.big_category_id}>
          <TableCell className={classes.tableSize} component="th" scope="row">
            {budget.big_category_name}
          </TableCell>
          <TableCell className={classes.tableSize}>￥10,000</TableCell>
          <TableCell className={classes.tableSize} align="center">
            <TextField
              size={'small'}
              id={'budgets'}
              variant="outlined"
              type={'number'}
              value={budget.budget}
              onChange={onChangeBudget}
            />
          </TableCell>
        </TableRow>,
      ];
    });
    return budgetsList;
  };

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
          <TableBody>{standardBudgetsList()}</TableBody>
        </Table>
      </TableContainer>
      <div className={classes.updateButton}>
        <GenericButton
          label={'更新する'}
          disabled={unEditBudgets}
          onClick={() =>
            dispatch(
              editStandardBudgets(
                budgets.map((budget) => {
                  delete budget.big_category_name;
                  return budget;
                })
              )
            )
          }
        />
      </div>
    </div>
  );
};
export default StandardBudgets;
