import React from 'react';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { AssociatedCategory, Categories, Category } from '../../../reducks/categories/types';
import { customCategoryType, defaultExpenseCategoryList } from '../../../lib/constant';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import '../../../assets/modules/category-input.scss';

interface BigExpenseCategoryListProps {
  customCategoryName: string;
  editCustomCategoryName: string;
  associatedIndex: number | null;
  bigEditCategoryIndex: number | null;
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

const BigExpenseCategoryList = (props: BigExpenseCategoryListProps) => {
  return (
    <>
      {props.expenseCategories.map((expenseCategory, bigCategoriesIndex) => {
        return (
          <li
            onClick={(event) => {
              props.handleChangeCategory(
                bigCategoriesIndex,
                expenseCategory,
                defaultExpenseCategoryList[bigCategoriesIndex],
                'bigCategory',
                event
              );
            }}
            key={expenseCategory.name}
            id="expense-big"
            className="category-input__menu-item"
          >
            {expenseCategory.name}
            <ArrowRightIcon className="category-input__icon-arrow" />
            <ul id="medium-category" className="category-input__menu category-input__sub-menu">
              {expenseCategory.associated_categories_list.map(
                (expenseAssociatedCategory, associatedCategoryIndex) => {
                  const lastExpenseIndex = expenseCategory.associated_categories_list.length - 1;

                  return (
                    <div key={expenseAssociatedCategory.name}>
                      {expenseAssociatedCategory.category_type === customCategoryType ? (
                        <div
                          key={expenseAssociatedCategory.name}
                          className="category-input__form-position"
                        >
                          {props.bigEditCategoryIndex === bigCategoriesIndex &&
                          props.associatedIndex === associatedCategoryIndex ? (
                            <div className="category-input__form-position">
                              <input
                                onClick={(event) => event.stopPropagation()}
                                placeholder={expenseAssociatedCategory.name}
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
                                    expenseAssociatedCategory.id,
                                    expenseAssociatedCategory.big_category_id,
                                    'bigCategory'
                                  );
                                }}
                              />
                            </div>
                          ) : (
                            <div className="category-input__form-position category-input__menu-item--custom">
                              <li
                                className="category-input__menu-item"
                                value={expenseAssociatedCategory.name}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  props.handleChangeCategory(
                                    bigCategoriesIndex,
                                    expenseCategory,
                                    expenseAssociatedCategory,
                                    'bigCategory',
                                    event
                                  );
                                }}
                              >
                                {expenseAssociatedCategory.name}
                              </li>
                              <CreateIcon
                                className="category-input__icon-edit"
                                type={'button'}
                                onClick={(event) => {
                                  props.handleOpenEditCustomCategoryField(
                                    event,
                                    expenseAssociatedCategory.name,
                                    associatedCategoryIndex,
                                    bigCategoriesIndex,
                                    'bigCategory'
                                  );
                                }}
                              />
                              <DeleteIcon
                                className="category-input__icon-delete"
                                type={'button'}
                                onClick={(event) => {
                                  props.handleDeleteCustomCategory(
                                    event,
                                    expenseAssociatedCategory.id,
                                    expenseAssociatedCategory.big_category_id
                                  );
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div key={expenseAssociatedCategory.name}>
                          <li
                            className="category-input__menu-item"
                            value={expenseAssociatedCategory.name}
                            onClick={(event) => {
                              props.handleChangeCategory(
                                bigCategoriesIndex,
                                expenseCategory,
                                expenseAssociatedCategory,
                                'bigCategory',
                                event
                              );
                            }}
                          >
                            {expenseAssociatedCategory.name}
                          </li>
                        </div>
                      )}

                      {lastExpenseIndex === associatedCategoryIndex && (
                        <div className="category-input__form-position">
                          <input
                            type="text"
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                            className="category-input__add-form"
                            onChange={props.handleChangeAddCustomCategory}
                            value={props.customCategoryName}
                            placeholder={'カテゴリーを追加'}
                          />
                          <button
                            type="button"
                            disabled={props.customCategoryName === ''}
                            className="category-input__add-icon-btn category-input__add-icon-btn--plus-icon"
                            onClick={(event) => {
                              props.handleAddCustomCategory(
                                event,
                                expenseCategory.id,
                                'bigCategory'
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </ul>
          </li>
        );
      })}
    </>
  );
};
export default BigExpenseCategoryList;
