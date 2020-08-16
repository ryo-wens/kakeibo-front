import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GenericButton, TextInput } from '../components/uikit/index';
import {
  fetchCategories,
  addCustomCategories,
  editCustomCategories,
  deleteCustomCategories,
} from '../reducks/categories/operations';
import { getIncomeCategories, getExpenseCategories } from '../reducks/categories/selectors';
import { State } from '../reducks/store/types';
import { AssociatedCategories } from '../reducks/categories/types';

const useStyles = makeStyles({
  tableTitle: {
    textAlign: 'center',
    marginTop: '20px',
  },
  tableMain: {
    maxWidth: 660,
    margin: 'auto',
    marginTop: '30px',
    height: 'auto',
    textAlign: 'center',
  },
  tableTop: {
    backgroundColor: '#4db5fa',
  },
});

const InputCustomCategory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const [name, setName] = useState<string>('');
  const unAddCustomCategory = name === '';

  useEffect(() => {
    if (incomeCategories.length === 0 || expenseCategories.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setName(event.target.value as string);
    },
    [setName]
  );

  const paths = window.location.pathname.split('/');
  const bigCategoryId = parseInt(paths[paths.length - 1], 10);

  const mediumCategories: AssociatedCategories|string  = useMemo(() => {
    let associatedCategories: AssociatedCategories | string = [];
    // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
    if (bigCategoryId === 1 ) {
      for (const incomeCategory of incomeCategories) {
        if (incomeCategory.id === bigCategoryId) {
          associatedCategories = incomeCategory.associated_categories_list
        }
      }
    } else {
      for (const expenseCategory of expenseCategories) {
        if (expenseCategory.id === bigCategoryId) {
          associatedCategories = expenseCategory.associated_categories_list
        }
      }
    }
    return associatedCategories
  }, [incomeCategories, expenseCategories, bigCategoryId,]);

  return (
    <>
      <h3 className={classes.tableTitle}>追加するカテゴリー名を入力してください</h3>
      <TableContainer className={classes.tableMain} component={Paper}>
        <TextInput
          label={'追加するカテゴリー名'}
          value={name}
          id={'customCategory'}
          type={'text'}
          fullWidth={false}
          required={false}
          onChange={handleChange}
        />
        <GenericButton
          onClick={() => dispatch(
            addCustomCategories(name,bigCategoryId))
          }
          label={'追加する'}
          disabled={unAddCustomCategory}
        />
        <h3 className={classes.tableTitle}>カテゴリー編集</h3>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTop} align='center'>
                中カテゴリー
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mediumCategories.map((mediumCategory) => (
              <TableRow key={mediumCategory.name}>
                <TableCell component="th" scope="row">
                  {mediumCategory.name}
                </TableCell>
                <TableCell align="right">{mediumCategory.category_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default InputCustomCategory;
