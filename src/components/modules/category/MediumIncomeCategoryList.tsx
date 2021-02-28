import React from 'react';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { AssociatedCategory, Categories, Category } from '../../../reducks/categories/types';
import { customCategoryType } from '../../../lib/constant';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface MediumIncomeCategoryListProps {
  incomeCategories: Categories | GroupCategories;
  bigCategoryId: number;
  bigCategoryIndex: number;
  associatedIndex: number | null;
  bigEditCategoryIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
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

const MediumIncomeCategoryList = (props: MediumIncomeCategoryListProps) => {
  return (
    <>
      {props.incomeCategories[props.bigCategoryIndex].associated_categories_list.map(
        (incomeAssociated, incomeAssociatedIndex) => {
          const lastExpenseIndex =
            props.incomeCategories[props.bigCategoryIndex].associated_categories_list.length - 1;

          return (
            <div key={incomeAssociated.name}>
              {incomeAssociated.category_type === customCategoryType ? (
                <div key={incomeAssociated.name} className="category-input__form-position">
                  {props.bigEditCategoryIndex === props.bigCategoryIndex &&
                  props.associatedIndex === incomeAssociatedIndex ? (
                    <div className="category-input__form-position">
                      <input
                        onClick={(event) => event.stopPropagation()}
                        placeholder={incomeAssociated.name}
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
                            incomeAssociated.id,
                            incomeAssociated.big_category_id,
                            'mediumCategory'
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div className="category-input__form-position category-input__menu-item--custom">
                      <li
                        className="category-input__menu-item"
                        value={incomeAssociated.name}
                        onClick={(event) => {
                          props.handleChangeCategory(
                            props.bigCategoryIndex,
                            null,
                            incomeAssociated,
                            'mediumCategory',
                            event
                          );
                        }}
                      >
                        {incomeAssociated.name}
                      </li>
                      <CreateIcon
                        className="category-input__icon-edit"
                        type={'button'}
                        onClick={(event) => {
                          props.handleOpenEditCustomCategoryField(
                            event,
                            incomeAssociated.name,
                            incomeAssociatedIndex,
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
                            incomeAssociated.id,
                            incomeAssociated.big_category_id
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <li
                  className="category-input__menu-item"
                  value={incomeAssociated.name}
                  onClick={(event) => {
                    props.handleChangeCategory(
                      props.bigCategoryIndex,
                      null,
                      incomeAssociated,
                      'mediumCategory',
                      event
                    );
                  }}
                >
                  {incomeAssociated.name}
                </li>
              )}

              {lastExpenseIndex === incomeAssociatedIndex && (
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
export default MediumIncomeCategoryList;
