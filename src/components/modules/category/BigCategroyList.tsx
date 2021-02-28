import React from 'react';
import { AssociatedCategory, Categories, Category } from '../../../reducks/categories/types';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import BigIncomeCategoryList from './BigIncomeCategoryList';
import BigExpenseCategoryList from './BigExpenseCategoryList';
import '../../../assets/modules/category-input.scss';

interface BigCategoryListProps {
  transactionType: string;
  bigCategory: string | null;
  incomeCategories: Categories | GroupCategories;
  expenseCategories: Categories | GroupCategories;
  customCategoryName: string;
  editCustomCategoryName: string;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  bigCategoryMenuOpen: boolean;
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  disabled: boolean;
  incomeStyle: () => { height: string };
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeAddCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEditCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickCloseBigCategoryMenu: (event: Event) => void;
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

const BigCategoryList = React.forwardRef(
  (props: BigCategoryListProps, bigCategoryMenuRef: React.Ref<HTMLDivElement>) => {
    return (
      <div
        className="category-input__btn-position"
        ref={bigCategoryMenuRef as React.RefObject<HTMLDivElement>}
        key={props.transactionType}
      >
        <div>
          <button
            type="button"
            disabled={props.disabled}
            className="category-input__button-display"
            onClick={() => {
              !props.bigCategoryMenuOpen
                ? props.setBigCategoryMenuOpen(true)
                : props.setBigCategoryMenuOpen(false);
            }}
          >
            {props.bigCategory === '' ? '大カテゴリー(必須)' : props.bigCategory}
          </button>
          {props.bigCategoryMenuOpen && (
            <ul style={props.incomeStyle()} className="category-input__menu">
              {props.transactionType === 'income' ? (
                <BigIncomeCategoryList
                  incomeCategories={props.incomeCategories}
                  associatedIndex={props.associatedIndex}
                  bigEditCategoryIndex={props.bigEditCategoryIndex}
                  customCategoryName={props.customCategoryName}
                  editCustomCategoryName={props.editCustomCategoryName}
                  handleChangeCategory={props.handleChangeCategory}
                  handleChangeAddCustomCategory={props.handleChangeAddCustomCategory}
                  handleChangeEditCustomCategory={props.handleChangeEditCustomCategory}
                  handleAddCustomCategory={props.handleAddCustomCategory}
                  handleEditCustomCategory={props.handleEditCustomCategory}
                  handleDeleteCustomCategory={props.handleDeleteCustomCategory}
                  handleOpenEditCustomCategoryField={props.handleOpenEditCustomCategoryField}
                />
              ) : (
                <BigExpenseCategoryList
                  expenseCategories={props.expenseCategories}
                  associatedIndex={props.associatedIndex}
                  bigEditCategoryIndex={props.bigEditCategoryIndex}
                  customCategoryName={props.customCategoryName}
                  editCustomCategoryName={props.editCustomCategoryName}
                  handleChangeCategory={props.handleChangeCategory}
                  handleChangeAddCustomCategory={props.handleChangeAddCustomCategory}
                  handleChangeEditCustomCategory={props.handleChangeEditCustomCategory}
                  handleAddCustomCategory={props.handleAddCustomCategory}
                  handleEditCustomCategory={props.handleEditCustomCategory}
                  handleDeleteCustomCategory={props.handleDeleteCustomCategory}
                  handleOpenEditCustomCategoryField={props.handleOpenEditCustomCategoryField}
                />
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }
);
BigCategoryList.displayName = 'BigCategoryList';
export default BigCategoryList;
