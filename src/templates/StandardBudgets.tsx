import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchStandardBudgets } from '../reducks/budgets/operations';
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
    buttonPosition: {
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
  const [budget, setBudget] = useState<string[]>(['']);

  useEffect(() => {
    if (standardBudgets.length === 0) {
      dispatch(fetchStandardBudgets());
    }
  }, []);

  const inputBudget = useCallback(
    (event) => {
      setBudget(event.target.value);
    },
    [setBudget]
  );

  const standardBudgetsList = useMemo(() => {
    let budgetsList: ReactElement<StandardBudgetsList>[] = [];
    standardBudgets.map((standardBudget) => {
      budgetsList = [
        ...budgetsList,
        <TableRow key={standardBudget.big_category_id}>
          <TableCell className={classes.tableSize} component="th" scope="row">
            {standardBudget.big_category_name}
          </TableCell>
          <TableCell className={classes.tableSize}>{standardBudget.big_category_id}</TableCell>
          <TableCell className={classes.tableSize} align="center">
            <TextField
              size={'small'}
              id={'budgets'}
              variant="outlined"
              type={'tell'}
              value={budget}
              onChange={inputBudget}
            >
              {standardBudget.budget}
            </TextField>
          </TableCell>
        </TableRow>,
      ];
    });
    return budgetsList;
  }, [standardBudgets]);

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonPosition} size="large" aria-label="budgets-kind">
        <Button className={classes.buttonSize} onClick={() => dispatch(push('/standard-budgets'))}>
          標準
        </Button>
        <Button className={classes.buttonSize}>月ごと</Button>
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
          <TableBody>{standardBudgetsList}</TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttonPosition}>
        <GenericButton
          label={'更新する'}
          disabled={false}
          onClick={() => console.log('予算編集')}
        />
      </div>
    </div>
  );
};
export default StandardBudgets;
