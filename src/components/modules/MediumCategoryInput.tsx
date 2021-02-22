import React, { useEffect } from 'react';
import { AssociatedCategory, Categories, Category } from '../../reducks/categories/types';
import { GroupCategories } from '../../reducks/groupCategories/types';
import { customCategoryType, mediumCategoryType } from '../../lib/constant';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../assets/modules/category-input.scss';

interface MediumCategoryInputProps {
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

const MediumCategoryInput = React.forwardRef(
  (props: MediumCategoryInputProps, mediumMenuRef: React.Ref<HTMLDivElement>) => {
    useEffect(() => {
      document.addEventListener('click', props.onClickCloseMediumCategoryMenu);
      return () => {
        document.removeEventListener('click', props.onClickCloseMediumCategoryMenu);
      };
    }, [props.onClickCloseMediumCategoryMenu]);

    const mediumCategoriesList = () => {
      let mediumCategories!: JSX.Element[];
      if (props.kind === 'income') {
        mediumCategories = props.incomeCategories[
          props.bigCategoryIndex
        ].associated_categories_list.map((incomeAssociated, incomeAssociatedIndex) => {
          return (
            <div key={incomeAssociated.name}>
              {(() => {
                if (incomeAssociated.category_type === customCategoryType) {
                  return (
                    <div key={incomeAssociated.name} className="category-input__form-position">
                      {(() => {
                        if (
                          props.bigEditCategoryIndex === props.bigCategoryIndex &&
                          props.associatedIndex === incomeAssociatedIndex
                        ) {
                          return (
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
                          );
                        }

                        return (
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
                                props.setMediumCategoryMenuOpen(false);
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
                        );
                      })()}
                    </div>
                  );
                } else if (incomeAssociated.category_type === mediumCategoryType) {
                  return (
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
                  );
                }
              })()}

              {(() => {
                const lastExpenseIndex =
                  props.incomeCategories[props.bigCategoryIndex].associated_categories_list.length -
                  1;

                if (lastExpenseIndex === incomeAssociatedIndex) {
                  return (
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
                            props.bigCategoryId,
                            'mediumCategory'
                          );
                        }}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          );
        });
      } else if (props.kind === 'expense') {
        mediumCategories = props.expenseCategories[
          props.bigCategoryIndex
        ].associated_categories_list.map((expenseAssociated, expenseAssociatedIndex) => {
          return (
            <div key={expenseAssociated.name}>
              {(() => {
                if (expenseAssociated.category_type === customCategoryType) {
                  return (
                    <div key={expenseAssociated.name} className="category-input__form-position">
                      {(() => {
                        if (
                          props.bigEditCategoryIndex === props.bigCategoryIndex &&
                          props.associatedIndex === expenseAssociatedIndex
                        ) {
                          return (
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
                          );
                        }

                        return (
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
                        );
                      })()}
                    </div>
                  );
                } else if (expenseAssociated.category_type === mediumCategoryType) {
                  return (
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
                        props.setMediumCategoryMenuOpen(false);
                      }}
                    >
                      {expenseAssociated.name}
                    </li>
                  );
                }
              })()}
              {(() => {
                const lastExpenseIndex =
                  props.expenseCategories[props.bigCategoryIndex].associated_categories_list
                    .length - 1;

                if (lastExpenseIndex === expenseAssociatedIndex) {
                  return (
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
                          props.handleAddCustomCategory(
                            event,
                            props.bigCategoryId,
                            'mediumCategory'
                          );
                        }}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          );
        });
      }

      return (
        <ul className="category-input__medium-menu">
          {(() => {
            return mediumCategories;
          })()}
        </ul>
      );
    };

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
          {props.mediumCategoryMenuOpen && mediumCategoriesList()}
        </div>
      </div>
    );
  }
);
MediumCategoryInput.displayName = 'MediumCategoryInput';
export default MediumCategoryInput;
