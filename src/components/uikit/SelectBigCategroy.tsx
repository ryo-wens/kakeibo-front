import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getIncomeCategories, getExpenseCategories } from '../../reducks/categories/selectors';
import {
  getGroupIncomeCategories,
  getGroupExpenseCategories,
} from '../../reducks/groupCategories/selectors';
import { Categories } from '../../reducks/categories/types';
import { GroupCategories } from '../../reducks/groupCategories/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 225,
      width: 'calc(83% - 16px)',
      marginTop: 0,
      marginBottom: 16,
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

interface SelectBigCategoryProps {
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onClick: (bigCategoryId: number) => void;
  pathName: string;
  category: string;
}

const SelectBigCategory = (props: SelectBigCategoryProps) => {
  const classes = useStyles();
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const groupIncomeCategories = getGroupIncomeCategories(selector);
  const groupExpenseCategories = getGroupExpenseCategories(selector);

  const bigCategoriesList = (): ReactElement<Categories>[] => {
    let categories: ReactElement<Categories>[] = [];

    incomeCategories.map((incomeCategory) => {
      categories = [
        ...categories,
        <MenuItem
          key={incomeCategory.name}
          value={incomeCategory.id}
          onClick={() => props.onClick(incomeCategory.id)}
        >
          {incomeCategory.name}
        </MenuItem>,
      ];
    });

    expenseCategories.map((expenseCategory) => {
      categories = [
        ...categories,
        <MenuItem
          key={expenseCategory.name}
          value={expenseCategory.id}
          onClick={() => props.onClick(expenseCategory.id)}
        >
          {expenseCategory.name}
        </MenuItem>,
      ];
    });

    return categories;
  };

  const groupCategoriesList = (): ReactElement<Categories>[] => {
    let groupCategories: ReactElement<GroupCategories>[] = [];

    groupIncomeCategories.map((groupIncomeCategory) => {
      groupCategories = [
        ...groupCategories,
        <MenuItem
          key={groupIncomeCategory.name}
          value={groupIncomeCategory.id}
          onClick={() => props.onClick(groupIncomeCategory.id)}
        >
          {groupIncomeCategory.name}
        </MenuItem>,
      ];
    });

    groupExpenseCategories.map((groupExpenseCategory) => {
      groupCategories = [
        ...groupCategories,
        <MenuItem
          key={groupExpenseCategory.name}
          value={groupExpenseCategory.id}
          onClick={() => props.onClick(groupExpenseCategory.id)}
        >
          {groupExpenseCategory.name}
        </MenuItem>,
      ];
    });

    return groupCategories;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="category">カテゴリー</InputLabel>
      {props.pathName !== 'group' ? (
        <Select MenuProps={MenuProps} value={props.category} onChange={props.onChange}>
          {bigCategoriesList()}
        </Select>
      ) : (
        <Select MenuProps={MenuProps} value={props.category} onChange={props.onChange}>
          {groupCategoriesList()}
        </Select>
      )}
    </FormControl>
  );
};
export default SelectBigCategory;
