import React from 'react';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { AssociatedCategory, Categories, Category } from '../../../reducks/categories/types';
import { customCategoryType, defaultIncomeCategoryList } from '../../../lib/constant';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import '../../../assets/modules/category-input.scss';

interface BigIncomeCategoryListProps {
  associatedIndex: number | null;
  bigEditCategoryIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
  incomeCategories: Categories | GroupCategories;
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

const BigIncomeCategoryList = (props: BigIncomeCategoryListProps) => {
  return (
    <>
      {props.incomeCategories.map((incomeCategory, bigCategoriesIndex) => {
        return (
          <li
            onClick={(event) => {
              props.handleChangeCategory(
                bigCategoriesIndex,
                incomeCategory,
                defaultIncomeCategoryList[bigCategoriesIndex],
                'bigCategory',
                event
              );
            }}
            id="income-big"
            key={incomeCategory.name}
            className="category-input__menu-item"
          >
            {incomeCategory.name}
            <ArrowRightIcon className="category-input__icon-arrow" />
            <ul id="medium-category" className="category-input__menu category-input__sub-menu">
              {incomeCategory.associated_categories_list.map(
                (incomeAssociatedCategory, associatedCategoryIndex) => {
                  const lastIncomeIndex = incomeCategory.associated_categories_list.length - 1;

                  return (
                    <div key={incomeAssociatedCategory.name}>
                      {incomeAssociatedCategory.category_type === customCategoryType ? (
                        <div className="category-input__form-position">
                          {props.bigEditCategoryIndex === bigCategoriesIndex &&
                          props.associatedIndex === associatedCategoryIndex ? (
                            <div className="category-input__form-position">
                              <input
                                onClick={(event) => event.stopPropagation()}
                                placeholder={incomeAssociatedCategory.name}
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
                                    incomeAssociatedCategory.id,
                                    incomeAssociatedCategory.big_category_id,
                                    'bigCategory'
                                  );
                                }}
                              />
                            </div>
                          ) : (
                            <div className="category-input__form-position category-input__menu-item--custom">
                              <li
                                className="category-input__menu-item"
                                value={incomeAssociatedCategory.name}
                                onClick={(event) => {
                                  props.handleChangeCategory(
                                    bigCategoriesIndex,
                                    incomeCategory,
                                    incomeAssociatedCategory,
                                    'bigCategory',
                                    event
                                  );
                                }}
                              >
                                {incomeAssociatedCategory.name}
                              </li>
                              <CreateIcon
                                type={'button'}
                                className="category-input__icon-edit"
                                onClick={(event) => {
                                  props.handleOpenEditCustomCategoryField(
                                    event,
                                    incomeAssociatedCategory.name,
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
                                    incomeAssociatedCategory.id,
                                    incomeAssociatedCategory.big_category_id
                                  );
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div key={incomeAssociatedCategory.name}>
                          <li
                            className="category-input__menu-item"
                            value={incomeAssociatedCategory.name}
                            onClick={(event) => {
                              props.handleChangeCategory(
                                bigCategoriesIndex,
                                incomeCategory,
                                incomeAssociatedCategory,
                                'bigCategory',
                                event
                              );
                            }}
                          >
                            {incomeAssociatedCategory.name}
                          </li>
                        </div>
                      )}

                      {lastIncomeIndex === associatedCategoryIndex && (
                        <div className="category-input__form-position">
                          <input
                            onClick={(event) => event.stopPropagation()}
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
                              props.handleAddCustomCategory(
                                event,
                                incomeCategory.id,
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
export default BigIncomeCategoryList;
