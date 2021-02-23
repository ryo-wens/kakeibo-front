import React, { useEffect } from 'react';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { AssociatedCategory, Categories, Category } from '../../../reducks/categories/types';
import MediumIncomeCategoryList from './MediumIncomeCategoryList';
import MediumExpenseCategoryList from './MediumExpenseCategoryList';
import '../../../assets/modules/category-input.scss';

interface MediumCategoryListProps {
  kind: string;
  bigCategoryId: number;
  bigCategoryIndex: number;
  bigCategory: string | null;
  associatedCategory: string;
  mediumCategoryMenuOpen: boolean;
  incomeCategories: Categories | GroupCategories;
  expenseCategories: Categories | GroupCategories;
  customCategoryName: string;
  editCustomCategoryName: string;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  disabled: boolean;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCloseMediumCategoryMenu: (event: Event) => void;
  handleChangeAddCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEditCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

const MediumCategoryList = React.forwardRef(
  (props: MediumCategoryListProps, mediumMenuRef: React.Ref<HTMLDivElement>) => {
    useEffect(() => {
      document.addEventListener('click', props.onClickCloseMediumCategoryMenu);
      return () => {
        document.removeEventListener('click', props.onClickCloseMediumCategoryMenu);
      };
    }, [props.onClickCloseMediumCategoryMenu]);

    return (
      <div
        className="category-input__btn-position"
        ref={mediumMenuRef as React.RefObject<HTMLDivElement>}
      >
        <div>
          <button
            type="button"
            disabled={props.bigCategory === '' || props.disabled}
            className="category-input__button-display"
            onClick={() => {
              !props.mediumCategoryMenuOpen
                ? props.setMediumCategoryMenuOpen(true)
                : props.setMediumCategoryMenuOpen(false);
            }}
          >
            {props.associatedCategory === '' ? '中カテゴリー(必須)' : props.associatedCategory}
          </button>
          {props.mediumCategoryMenuOpen && (
            <ul className="category-input__medium-menu">
              {props.kind === 'income' ? (
                <MediumIncomeCategoryList
                  incomeCategories={props.incomeCategories}
                  bigCategoryId={props.bigCategoryId}
                  associatedIndex={props.associatedIndex}
                  bigCategoryIndex={props.bigCategoryIndex}
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
                <MediumExpenseCategoryList
                  expenseCategories={props.expenseCategories}
                  bigCategoryId={props.bigCategoryId}
                  associatedIndex={props.associatedIndex}
                  bigCategoryIndex={props.bigCategoryIndex}
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
MediumCategoryList.displayName = 'MediumCategoryList';
export default MediumCategoryList;
