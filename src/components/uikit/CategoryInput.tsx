import React, { useEffect, useMemo, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { State } from '../../reducks/store/types';
import { getIncomeCategories, getExpenseCategories } from '../../reducks/categories/selectors';
import {
  getGroupIncomeCategories,
  getGroupExpenseCategories,
} from '../../reducks/groupCategories/selectors';
import { fetchCategories } from '../../reducks/categories/operations';
import { fetchGroupCategories } from '../../reducks/groupCategories/operations';
import { Categories } from '../../reducks/categories/types';
import { getPathTemplateName, getPathGroupId } from '../../lib/path';
import GroupCategoryInput from './GroupCategoryInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: 0,
      marginBottom: 16,
      margin: theme.spacing(1),
      minWidth: 225,
      width: 'calc(83% - 16px)',
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
  value: string | null;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onClick: (
    bigCategoryId: number,
    associatedCategoryId: number | null,
    category_type: string
  ) => void;
  required: boolean;
}

const CategoryInput = (props: CategoryProps): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const groupIncomeCategories = getGroupIncomeCategories(selector);
  const groupExpenseCategories = getGroupExpenseCategories(selector);
  const groupId = getPathGroupId(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);

  useEffect(() => {
    if (pathName !== 'group' && !incomeCategories.length && !expenseCategories.length) {
      dispatch(fetchCategories());
    } else if (pathName === 'group') {
      dispatch(fetchGroupCategories(groupId));
    }
  }, [pathName, groupId]);

  const categories = useMemo(() => {
    let tmpCategories: ReactElement<Categories>[] = [];

    if (props.kind === 'income') {
      for (const incomeCategory of incomeCategories) {
        tmpCategories = [
          ...tmpCategories,
          <MenuItem
            key={incomeCategory.name}
            value={incomeCategory.name}
            onClick={() => props.onClick(incomeCategory.id, null, incomeCategory.category_type)}
          >
            {incomeCategory.name}
          </MenuItem>,
        ];

        for (const category of incomeCategory.associated_categories_list) {
          tmpCategories = [
            ...tmpCategories,
            <MenuItem
              key={category.name}
              value={category.name}
              onClick={() =>
                props.onClick(category.big_category_id, category.id, category.category_type)
              }
            >
              {category.name}
            </MenuItem>,
          ];
        }
      }
    }

    if (props.kind === 'expense') {
      for (const expenseCategory of expenseCategories) {
        tmpCategories = [
          ...tmpCategories,
          <MenuItem
            key={expenseCategory.name}
            value={expenseCategory.name}
            onClick={() => props.onClick(expenseCategory.id, null, expenseCategory.category_type)}
          >
            {expenseCategory.name}
          </MenuItem>,
        ];

        for (const category of expenseCategory.associated_categories_list) {
          tmpCategories = [
            ...tmpCategories,
            <MenuItem
              key={category.name}
              value={category.name}
              onClick={() =>
                props.onClick(category.big_category_id, category.id, category.category_type)
              }
            >
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
      {pathName !== 'group' ? (
        <Select MenuProps={MenuProps} value={props.value} onChange={props.onChange}>
          {categories}
        </Select>
      ) : (
        <GroupCategoryInput
          groupExpenseCategories={groupExpenseCategories}
          groupIncomeCategories={groupIncomeCategories}
          kind={props.kind}
          onChange={props.onChange}
          onClick={props.onClick}
          required={props.required}
          value={props.value}
          menuProps={MenuProps}
        />
      )}
    </FormControl>
  );
};
export default CategoryInput;
