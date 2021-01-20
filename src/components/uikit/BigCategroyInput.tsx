import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Action, Dispatch } from 'redux';
import { State } from '../../reducks/store/types';
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
import {
  addCustomCategories,
  deleteCustomCategories,
  editCustomCategories,
} from '../../reducks/categories/operations';
import {
  addGroupCustomCategories,
  deleteGroupCustomCategories,
  editGroupCustomCategories,
} from '../../reducks/groupCategories/operations';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../assets/modules/category-input.scss';

interface BigCategoryInputProps {
  kind: string;
  bigCategory: string | null;
  incomeCategories: Categories | GroupCategories;
  expenseCategories: Categories | GroupCategories;
  bigCategoryMenuOpen: boolean;
  onClick: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCloseBigCategoryMenu: (event: Event) => void;
  disabled: boolean;
}

const BigCategoryInput = React.forwardRef(
  (props: BigCategoryInputProps, bigCategoryRef: React.Ref<HTMLDivElement>) => {
    const dispatch = useDispatch();
    const pathName = useLocation().pathname.split('/')[1];
    const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
    const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);
    const [customCategoryName, setCustomCategoryName] = useState<string>('');
    const [editCustomCategoryName, setEditCustomCategoryName] = useState<string>('');

    const addCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomCategoryName(event.target.value);
    };

    const editCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditCustomCategoryName(event.target.value);
    };

    useEffect(() => {
      document.addEventListener('click', props.onClickCloseBigCategoryMenu);
      return () => {
        document.removeEventListener('click', props.onClickCloseBigCategoryMenu);
      };
    }, [props.onClickCloseBigCategoryMenu]);

    const operationSwitching = (
      operationFunction: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>,
      groupOperationFunction: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>
    ) => {
      if (pathName !== 'group') {
        dispatch(operationFunction);
      } else if (pathName === 'group') {
        dispatch(groupOperationFunction);
      }
    };

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
              onClick={() => {
                props.onClick(
                  bigCategoriesIndex,
                  incomeCategory,
                  defaultIncomeCategoryList[bigCategoriesIndex]
                );
                props.setBigCategoryMenuOpen(false);
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
                                    bigEditCategoryIndex === bigCategoriesIndex &&
                                    associatedIndex === associatedCategoryIndex
                                  ) {
                                    return (
                                      <div className="category-input__form-position">
                                        <input
                                          onClick={(event) => event.stopPropagation()}
                                          placeholder={incomeAssociatedCategory.name}
                                          onChange={editCustomCategory}
                                          className="category-input__add-form"
                                          value={editCustomCategoryName}
                                        />
                                        <AddCircleOutlineIcon
                                          className="category-input__icon-add"
                                          type={'button'}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            document.removeEventListener(
                                              'click',
                                              props.onClickCloseBigCategoryMenu
                                            );
                                            operationSwitching(
                                              editCustomCategories(
                                                incomeAssociatedCategory.id,
                                                editCustomCategoryName,
                                                incomeAssociatedCategory.big_category_id
                                              ),
                                              editGroupCustomCategories(
                                                incomeAssociatedCategory.id,
                                                editCustomCategoryName,
                                                incomeAssociatedCategory.big_category_id
                                              )
                                            );
                                            setEditCustomCategoryName('');
                                            setAssociatedIndex(null);
                                            setBigEditCategoryIndex(null);
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
                                          event.stopPropagation();
                                          props.onClick(
                                            bigCategoriesIndex,
                                            incomeCategory,
                                            incomeAssociatedCategory
                                          );
                                          props.setBigCategoryMenuOpen(false);
                                        }}
                                      >
                                        {incomeAssociatedCategory.name}
                                      </li>
                                      <CreateIcon
                                        type={'button'}
                                        className="category-input__icon-edit"
                                        onClick={(event) => {
                                          document.removeEventListener(
                                            'click',
                                            props.onClickCloseBigCategoryMenu
                                          );
                                          event.stopPropagation();
                                          setEditCustomCategoryName(incomeAssociatedCategory.name);
                                          setAssociatedIndex(associatedCategoryIndex);
                                          setBigEditCategoryIndex(bigCategoriesIndex);
                                        }}
                                      />

                                      <DeleteIcon
                                        className="category-input__icon-delete"
                                        type={'button'}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          if (
                                            window.confirm('カスタムカテゴリーを削除しますか？')
                                          ) {
                                            operationSwitching(
                                              deleteCustomCategories(
                                                incomeAssociatedCategory.id,
                                                incomeAssociatedCategory.big_category_id
                                              ),
                                              deleteGroupCustomCategories(
                                                incomeAssociatedCategory.id,
                                                incomeAssociatedCategory.big_category_id
                                              )
                                            );
                                          }
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
                                    event.stopPropagation();
                                    props.onClick(
                                      bigCategoriesIndex,
                                      incomeCategory,
                                      incomeAssociatedCategory
                                    );
                                    props.setBigCategoryMenuOpen(false);
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
                                  onChange={addCustomCategory}
                                  placeholder={'カテゴリーを追加'}
                                  className="category-input__add-form"
                                  value={customCategoryName}
                                />
                                <button
                                  type="button"
                                  disabled={customCategoryName === ''}
                                  className="category-input__add-icon-btn category-input__add-icon-btn--plus-icon"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    operationSwitching(
                                      addCustomCategories(customCategoryName, incomeCategory.id),
                                      addGroupCustomCategories(
                                        customCategoryName,
                                        incomeCategory.id
                                      )
                                    );
                                    setCustomCategoryName('');
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
              onClick={() => {
                props.onClick(
                  bigCategoriesIndex,
                  expenseCategory,
                  defaultExpenseCategoryList[bigCategoriesIndex]
                );
                props.setBigCategoryMenuOpen(false);
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
                                    bigEditCategoryIndex === bigCategoriesIndex &&
                                    associatedIndex === associatedCategoryIndex
                                  ) {
                                    return (
                                      <div className="category-input__form-position">
                                        <input
                                          onClick={(event) => event.stopPropagation()}
                                          placeholder={expenseAssociatedCategory.name}
                                          onChange={editCustomCategory}
                                          className="category-input__add-form"
                                          value={editCustomCategoryName}
                                        />
                                        <AddCircleOutlineIcon
                                          className="category-input__icon-add"
                                          type={'button'}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            document.removeEventListener(
                                              'click',
                                              props.onClickCloseBigCategoryMenu
                                            );
                                            operationSwitching(
                                              editCustomCategories(
                                                expenseAssociatedCategory.id,
                                                editCustomCategoryName,
                                                expenseAssociatedCategory.big_category_id
                                              ),
                                              editGroupCustomCategories(
                                                expenseAssociatedCategory.id,
                                                editCustomCategoryName,
                                                expenseAssociatedCategory.big_category_id
                                              )
                                            );
                                            setEditCustomCategoryName('');
                                            setAssociatedIndex(null);
                                            setBigEditCategoryIndex(null);
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
                                          props.onClick(
                                            bigCategoriesIndex,
                                            expenseCategory,
                                            expenseAssociatedCategory
                                          );
                                          props.setBigCategoryMenuOpen(false);
                                        }}
                                      >
                                        {expenseAssociatedCategory.name}
                                      </li>
                                      <CreateIcon
                                        className="category-input__icon-edit"
                                        type={'button'}
                                        onClick={(event) => {
                                          document.removeEventListener(
                                            'click',
                                            props.onClickCloseBigCategoryMenu
                                          );
                                          event.stopPropagation();
                                          setEditCustomCategoryName(expenseAssociatedCategory.name);
                                          setAssociatedIndex(associatedCategoryIndex);
                                          setBigEditCategoryIndex(bigCategoriesIndex);
                                        }}
                                      />
                                      <DeleteIcon
                                        className="category-input__icon-delete"
                                        type={'button'}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          if (
                                            window.confirm('カスタムカテゴリーを削除しますか？')
                                          ) {
                                            operationSwitching(
                                              deleteCustomCategories(
                                                expenseAssociatedCategory.id,
                                                expenseAssociatedCategory.big_category_id
                                              ),
                                              deleteGroupCustomCategories(
                                                expenseAssociatedCategory.id,
                                                expenseAssociatedCategory.big_category_id
                                              )
                                            );
                                          }
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
                                    event.stopPropagation();
                                    props.onClick(
                                      bigCategoriesIndex,
                                      expenseCategory,
                                      expenseAssociatedCategory
                                    );
                                    props.setBigCategoryMenuOpen(false);
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
                                  onChange={addCustomCategory}
                                  value={customCategoryName}
                                  placeholder={'カテゴリーを追加'}
                                />
                                <button
                                  type="button"
                                  disabled={customCategoryName === ''}
                                  className="category-input__add-icon-btn category-input__add-icon-btn--plus-icon"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    operationSwitching(
                                      addCustomCategories(customCategoryName, expenseCategory.id),
                                      addGroupCustomCategories(
                                        customCategoryName,
                                        expenseCategory.id
                                      )
                                    );
                                    setCustomCategoryName('');
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
