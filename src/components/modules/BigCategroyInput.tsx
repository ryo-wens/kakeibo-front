import React, { useEffect } from 'react';
import { AssociatedCategory, Categories, Category } from '../../reducks/categories/types';
import { GroupCategories } from '../../reducks/groupCategories/types';
import {
  customCategoryType,
  defaultExpenseCategoryList,
  defaultIncomeCategoryList,
  mediumCategoryType,
} from '../../lib/constant';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../assets/modules/category-input.scss';

interface BigCategoryInputProps {
  kind: string;
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

const BigCategoryInput = React.forwardRef(
  (props: BigCategoryInputProps, bigCategoryRef: React.Ref<HTMLDivElement>) => {
    useEffect(() => {
      document.addEventListener('click', props.onClickCloseBigCategoryMenu);
      return () => {
        document.removeEventListener('click', props.onClickCloseBigCategoryMenu);
      };
    }, [props.onClickCloseBigCategoryMenu]);

    const incomeStyle = () => {
      if (props.kind !== 'expense') {
        return { height: '30px' };
      }
    };

    const bigCategoriesList = () => {
      let bigCategoriesList: JSX.Element[] = [];

      if (props.kind === 'income') {
        bigCategoriesList = props.incomeCategories.map((incomeCategory, bigCategoriesIndex) => {
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
                    return (
                      <div key={incomeAssociatedCategory.name}>
                        {(() => {
                          if (incomeAssociatedCategory.category_type === customCategoryType) {
                            return (
                              <div className="category-input__form-position">
                                {(() => {
                                  if (
                                    props.bigEditCategoryIndex === bigCategoriesIndex &&
                                    props.associatedIndex === associatedCategoryIndex
                                  ) {
                                    return (
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
                                    );
                                  }

                                  return (
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
                                  );
                                })()}
                              </div>
                            );
                          } else if (
                            incomeAssociatedCategory.category_type === mediumCategoryType
                          ) {
                            return (
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
                            );
                          }
                        })()}
                        {(() => {
                          const lastIncomeIndex =
                            incomeCategory.associated_categories_list.length - 1;

                          if (lastIncomeIndex === associatedCategoryIndex) {
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
                                      incomeCategory.id,
                                      'bigCategory'
                                    );
                                  }}
                                />
                              </div>
                            );
                          }
                        })()}
                      </div>
                    );
                  }
                )}
              </ul>
            </li>
          );
        });
      } else if (props.kind === 'expense') {
        bigCategoriesList = props.expenseCategories.map((expenseCategory, bigCategoriesIndex) => {
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
                    return (
                      <div key={expenseAssociatedCategory.name}>
                        {(() => {
                          if (expenseAssociatedCategory.category_type === customCategoryType) {
                            return (
                              <div
                                key={expenseAssociatedCategory.name}
                                className="category-input__form-position"
                              >
                                {(() => {
                                  if (
                                    props.bigEditCategoryIndex === bigCategoriesIndex &&
                                    props.associatedIndex === associatedCategoryIndex
                                  ) {
                                    return (
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
                                    );
                                  }

                                  return (
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
                                  );
                                })()}
                              </div>
                            );
                          } else if (
                            expenseAssociatedCategory.category_type === mediumCategoryType
                          ) {
                            return (
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
                            );
                          }
                        })()}
                        {(() => {
                          const lastExpenseIndex =
                            expenseCategory.associated_categories_list.length - 1;

                          if (lastExpenseIndex === associatedCategoryIndex) {
                            return (
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
                            );
                          }
                        })()}
                      </div>
                    );
                  }
                )}
              </ul>
            </li>
          );
        });
      }

      return (
        <ul style={incomeStyle()} className="category-input__menu">
          {(() => {
            return bigCategoriesList;
          })()}
        </ul>
      );
    };

    return (
      <div
        className="category-input__btn-position"
        ref={bigCategoryRef as React.RefObject<HTMLDivElement>}
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
          {props.bigCategoryMenuOpen && bigCategoriesList()}
        </div>
      </div>
    );
  }
);
BigCategoryInput.displayName = 'BigCategoryInput';
export default BigCategoryInput;
