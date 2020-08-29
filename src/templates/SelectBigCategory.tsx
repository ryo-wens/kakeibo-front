import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { fetchCategories } from '../reducks/categories/operations';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { State } from '../reducks/store/types';
import { Category } from '../reducks/categories/types';
import { getIncomeCategories, getExpenseCategories } from '../reducks/categories/selectors';

const useStyles = makeStyles({
  tablePosition: {
    margin:'0 auto'
  },
  tableParent: {
    maxWidth: 480,
    margin: 'auto',
  },
  table: {
    margin: '0px,auto',
  },
  tableTop: {
    backgroundColor: '#4db5fa',
    textAlign: 'center',
  },
  tableMain: {
    textAlign: 'center',
    marginTop: '80px',
  },
  tableCategory: {
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover':{
      textDecoration:'underline',
    },
  },
});

const SelectBigCategory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);

  useEffect(() => {
    if (incomeCategories.length === 0 || expenseCategories.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  const incomeBigCategories = incomeCategories.map((incomeCategory: Category) => {
    incomeCategories.filter(
      (incomeCategory) => incomeCategory.category_type === 'IncomeBigCategory'
    );
    return incomeCategory;
  });
  const expenseBigCategories = expenseCategories.map((expenseCategory: Category) => {
    expenseCategories.filter(
      (expenseCategory) => expenseCategory.category_type === 'ExpenseBigCategory'
    );
    return expenseCategory;
  });
  const bigCategories = incomeBigCategories.concat(expenseBigCategories);

  return (
    <>
      <div className={classes.tablePosition}>
      <h4 className={classes.tableMain}>カテゴリーを追加したい大カテゴリーを選択してください</h4>
      <TableContainer className={classes.tableParent} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTop}>大カテゴリー</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bigCategories.map((bigCategory) => (
              <TableRow
                key={bigCategory.name}
                onClick={() => dispatch(push(`/custom-categories/${bigCategory.id}`))}
              >
                <TableCell className={classes.tableCategory} component="th" scope="row">
                  {bigCategory.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  );
};
export default SelectBigCategory;
