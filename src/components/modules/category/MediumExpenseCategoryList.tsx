import React from 'react';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { AssociatedCategory, Categories, Category } from '../../../reducks/categories/types';
import { customCategoryType } from '../../../lib/constant';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface MediumExpenseCategoryListProps {
  bigCategoryId: number;
  bigCategoryIndex: number;
  associatedIndex: number | null;
  bigEditCategoryIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
  expenseCategories: Categories | GroupCategories;
  handleChangeAddCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEditCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  handleOpenEditCustomCategoryField: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryName: string,
    associatedCategoryIndex: number,
    bigCategoriesIndex: number,
    categoryType: string
  ) => void;
  handleAddCustomCategory: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bigCategoryId: number,
    categoryType: string
  ) => void;
  handleEditCustomCategory: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number,
    categoryType: string
  ) => void;
  handleDeleteCustomCategory: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number
  ) => void;
}

const MediumExpenseCategoryList = (props: MediumExpenseCategoryListProps) => {
  return (
    <>
      {props.expenseCategories[props.bigCategoryIndex].associated_categories_list.map(
        (expenseAssociated, expenseAssociatedIndex) => {
          const lastExpenseIndex =
            props.expenseCategories[props.bigCategoryIndex].associated_categories_list.length - 1;

          return (
            <div key={expenseAssociated.name}>
              {expenseAssociated.category_type === customCategoryType ? (
                <div key={expenseAssociated.name} className="category-input__form-position">
                  {props.bigEditCategoryIndex === props.bigCategoryIndex &&
                  props.associatedIndex === expenseAssociatedIndex ? (
                    <div className="category-input__form-position">
                      <input
                        onClick={(event) => event.stopPropagation()}
                        placeholder={expenseAssociated.name}
                        onChange={props.handleChangeEditCustomCategory}
                        className="category-input__add-form"
                        value={props.editCustomCategoryName}
                      />
                      <AddCircleOutlineIcon
                        className="category-input__icon-add"
                        type={'button'}
                        onClick={(event) => {
                          props.handleEditCustomCategory(
                            event,
                            expenseAssociated.id,
                            expenseAssociated.big_category_id,
                            'mediumCategory'
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div className="category-input__form-position category-input__menu-item--custom">
                      <li
                        className="category-input__menu-item"
                        value={expenseAssociated.name}
                        onClick={(event) => {
                          props.handleChangeCategory(
                            props.bigCategoryIndex,
                            null,
                            expenseAssociated,
                            'mediumCategory',
                            event
                          );
                        }}
                      >
                        {expenseAssociated.name}
                      </li>
                      <CreateIcon
                        className="category-input__icon-edit"
                        type={'button'}
                        onClick={(event) => {
                          props.handleOpenEditCustomCategoryField(
                            event,
                            expenseAssociated.name,
                            expenseAssociatedIndex,
                            props.bigCategoryIndex,
                            'mediumCategory'
                          );
                        }}
                      />
                      <DeleteIcon
                        className="category-input__icon-delete"
                        type={'button'}
                        onClick={(event) => {
                          props.handleDeleteCustomCategory(
                            event,
                            expenseAssociated.id,
                            expenseAssociated.big_category_id
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <li
                  className="category-input__menu-item"
                  value={expenseAssociated.name}
                  onClick={(event) => {
                    props.handleChangeCategory(
                      props.bigCategoryIndex,
                      null,
                      expenseAssociated,
                      'mediumCategory',
                      event
                    );
                  }}
                >
                  {expenseAssociated.name}
                </li>
              )}

              {lastExpenseIndex === expenseAssociatedIndex && (
                <div className="category-input__form-position">
                  <input
                    onClick={(e) => e.stopPropagation()}
                    onChange={props.handleChangeAddCustomCategory}
                    placeholder={'カテゴリーを追加'}
                    className="category-input__add-form"
                    value={props.customCategoryName}
                  />
                  <button
                    type="button"
                    disabled={props.customCategoryName === ''}
                    className="category-input__add-icon-btn category-input__add-icon-btn--plus-icon"
                    onClick={(event) => {
                      props.handleAddCustomCategory(event, props.bigCategoryId, 'mediumCategory');
                    }}
                  />
                </div>
              )}
            </div>
          );
        }
      )}
    </>
  );
};
export default MediumExpenseCategoryList;
