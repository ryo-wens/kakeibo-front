import React, { ReactElement } from 'react';
import { GroupCategories } from '../../reducks/groupCategories/types';
import { Categories } from '../../reducks/categories/types';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';

interface GroupCategoryInputProps {
  groupIncomeCategories: GroupCategories;
  groupExpenseCategories: GroupCategories;
  kind: string;
  value: string | null;
  menuProps: { PaperProps: { style: { maxHeight: number; width: number } } };
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onClick: (
    bigCategoryId: number,
    associatedCategoryId: number | null,
    category_type: string
  ) => void;
  required: boolean;
}

const GroupCategoryInput = (props: GroupCategoryInputProps) => {
  const groupCategories = () => {
    let groupCategories: ReactElement<Categories>[] = [];

    if (props.kind === 'income') {
      for (const groupIncomeCategory of props.groupIncomeCategories) {
        groupCategories = [
          ...groupCategories,
          <MenuItem
            key={groupIncomeCategory.name}
            value={groupIncomeCategory.name}
            onClick={() =>
              props.onClick(groupIncomeCategory.id, null, groupIncomeCategory.category_type)
            }
          >
            {groupIncomeCategory.name}
          </MenuItem>,
        ];

        for (const groupIncomeAssociatedCategory of groupIncomeCategory.associated_categories_list) {
          groupCategories = [
            ...groupCategories,
            <MenuItem
              key={groupIncomeAssociatedCategory.name}
              value={groupIncomeAssociatedCategory.name}
              onClick={() =>
                props.onClick(
                  groupIncomeAssociatedCategory.big_category_id,
                  groupIncomeAssociatedCategory.id,
                  groupIncomeAssociatedCategory.category_type
                )
              }
            >
              {groupIncomeAssociatedCategory.name}
            </MenuItem>,
          ];
        }
      }
    }

    if (props.kind === 'expense') {
      for (const groupExpenseCategory of props.groupExpenseCategories) {
        groupCategories = [
          ...groupCategories,
          <MenuItem
            key={groupExpenseCategory.name}
            value={groupExpenseCategory.name}
            onClick={() =>
              props.onClick(groupExpenseCategory.id, null, groupExpenseCategory.category_type)
            }
          >
            {groupExpenseCategory.name}
          </MenuItem>,
        ];

        for (const groupExpenseAssociatedCategory of groupExpenseCategory.associated_categories_list) {
          groupCategories = [
            ...groupCategories,
            <MenuItem
              key={groupExpenseAssociatedCategory.name}
              value={groupExpenseAssociatedCategory.name}
              onClick={() =>
                props.onClick(
                  groupExpenseAssociatedCategory.big_category_id,
                  groupExpenseAssociatedCategory.id,
                  groupExpenseAssociatedCategory.category_type
                )
              }
            >
              {groupExpenseAssociatedCategory.name}
            </MenuItem>,
          ];
        }
      }
    }

    return groupCategories;
  };

  return (
    <Select MenuProps={props.menuProps} value={props.value} onChange={props.onChange}>
      {groupCategories()}
    </Select>
  );
};
export default GroupCategoryInput;
