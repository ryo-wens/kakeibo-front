import React, { useEffect, useMemo, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { State } from '../../reducks/store/types';
import {
  getIncomeCategories,
  getExpenseCategories,
} from '../../reducks/categories/selectors';
import { fetchCategories } from '../../reducks/categories/operations';
import { Categories } from '../../reducks/categories/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bigcategory: {
      padding: 8,
    },
    formControl: {
      marginTop: 0,
      marginBottom: 16,
      margin: theme.spacing(1),
      minWidth: 225,
    },
  })
);

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 225,
    },
  },
};

interface CategoryProps {
  kind: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  required: boolean;
}

const CategoryInput = (props: CategoryProps) => {
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

  const categories = useMemo(() => {
    let tmpCategories: ReactElement<Categories>[] = [];

    if (props.kind === '収入') {
      for (const incomeCategory of incomeCategories) {
        tmpCategories = [
          ...tmpCategories,
          <MenuItem key={incomeCategory.name} value={incomeCategory.name}>
            {incomeCategory.name}
          </MenuItem>,
        ];

        for (const category of incomeCategory.associated_categories_list) {
          tmpCategories = [
            ...tmpCategories,
            <MenuItem key={category.name} value={category.name}>
              {category.name}
            </MenuItem>,
          ];
        }
      }
    }

    if (props.kind === '支出') {
      for (const expenseCategory of expenseCategories) {
        tmpCategories = [
          ...tmpCategories,
          <MenuItem key={expenseCategory.name} value={expenseCategory.name}>
            {expenseCategory.name}
          </MenuItem>,
        ];

        for (const category of expenseCategory.associated_categories_list) {
          tmpCategories = [
            ...tmpCategories,
            <MenuItem key={category.name} value={category.name}>
              {category.name}
            </MenuItem>,
          ];
        }
      }
    }

    return tmpCategories;
  }, [incomeCategories, expenseCategories, props.kind]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="category" required={props.required}>
        カテゴリー(必須)
      </InputLabel>
      <Select
        MenuProps={MenuProps}
        value={props.value}
        onChange={props.onChange}
      >
        {categories}
      </Select>
    </FormControl>
  );
};
export default CategoryInput;
