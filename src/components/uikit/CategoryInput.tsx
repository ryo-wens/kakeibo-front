import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { State } from '../../reducks/store/types';
import {
  addCustomCategories,
  editCustomCategories,
  deleteCustomCategories,
} from '../../reducks/categories/operations';
import {
  addGroupCustomCategories,
  editGroupCustomCategories,
  deleteGroupCustomCategories,
} from '../../reducks/groupCategories/operations';
import { AssociatedCategory, Categories, Category } from '../../reducks/categories/types';
import { getPathTemplateName } from '../../lib/path';
import { GroupCategories } from '../../reducks/groupCategories/types';
import '../../assets/modules/category-input.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {
  defaultIncomeCategoryList,
  defaultExpenseCategoryList,
  customCategoryType,
  mediumCategoryType,
} from '../../lib/constant';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

interface CategoryInputProps {
  incomeCategories: Categories | GroupCategories;
  expenseCategories: Categories | GroupCategories;
  kind: string;
  bigCategory: string | null;
  bigCategoryId: number;
  associatedCategory: string;
  bigCategoryIndex: number;
  required: boolean;
  onClick: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
}

const CategoryInput = (props: CategoryInputProps) => {
  const dispatch = useDispatch();
  const pathName = getPathTemplateName(window.location.pathname);
  const [customCategoryName, setCustomCategoryName] = useState<string>('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState<string>('');
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState<boolean>(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState<boolean>(false);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);

  const clickBigMenuOpen = useCallback(() => {
    setBigCategoryMenuOpen(true);
  }, [setBigCategoryMenuOpen]);

  const clickBigMenuClose = useCallback(() => {
    setBigCategoryMenuOpen(false);
  }, [setBigCategoryMenuOpen]);

  const clickMediumMenuOpen = useCallback(() => {
    setMediumCategoryMenuOpen(true);
  }, [setMediumCategoryMenuOpen]);

  const clickMediumMenuClose = useCallback(() => {
    setMediumCategoryMenuOpen(false);
  }, [setMediumCategoryMenuOpen]);

  const addCustomCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomCategoryName(event.target.value);
    },
    [setCustomCategoryName]
  );

  const editCustomCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditCustomCategoryName(event.target.value);
    },
    [setEditCustomCategoryName]
  );

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

  const bigCategoriesList = () => {
    let bigCategoriesList!: JSX.Element[];

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
              clickBigMenuClose();
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
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder={incomeAssociatedCategory.name}
                                        onChange={editCustomCategory}
                                        className="category-input__add-form"
                                        value={editCustomCategoryName}
                                      />
                                      <AddCircleOutlineIcon
                                        className="category-input__icon-add"
                                        type={'button'}
                                        onClick={(e) => {
                                          e.stopPropagation();
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
                                  <div className="category-input__form-position">
                                    <li
                                      className="category-input__menu-item"
                                      value={incomeAssociatedCategory.name}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        props.onClick(
                                          bigCategoriesIndex,
                                          incomeCategory,
                                          incomeAssociatedCategory
                                        );
                                        clickBigMenuClose();
                                      }}
                                    >
                                      {incomeAssociatedCategory.name}
                                    </li>
                                    <CreateIcon
                                      type={'button'}
                                      className="category-input__icon-edit"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditCustomCategoryName(incomeAssociatedCategory.name);
                                        setAssociatedIndex(associatedCategoryIndex);
                                        setBigEditCategoryIndex(bigCategoriesIndex);
                                      }}
                                    />

                                    <DeleteIcon
                                      className="category-input__icon-delete"
                                      type={'button'}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm('カスタムカテゴリーを削除しますか？')) {
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
                        } else if (incomeAssociatedCategory.category_type === mediumCategoryType) {
                          return (
                            <div key={incomeAssociatedCategory.name}>
                              <li
                                className="category-input__menu-item"
                                value={incomeAssociatedCategory.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  props.onClick(
                                    bigCategoriesIndex,
                                    incomeCategory,
                                    incomeAssociatedCategory
                                  );
                                  clickBigMenuClose();
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
                                onClick={(e) => e.stopPropagation()}
                                onChange={addCustomCategory}
                                placeholder={'カテゴリーを追加'}
                                className="category-input__add-form"
                                value={customCategoryName}
                              />
                              <AddCircleOutlineIcon
                                className="category-input__icon-add"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  operationSwitching(
                                    addCustomCategories(customCategoryName, incomeCategory.id),
                                    addGroupCustomCategories(customCategoryName, incomeCategory.id)
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
            tabIndex={1}
            onClick={() => {
              props.onClick(
                bigCategoriesIndex,
                expenseCategory,
                defaultExpenseCategoryList[bigCategoriesIndex]
              );
              clickBigMenuClose();
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
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder={expenseAssociatedCategory.name}
                                        onChange={editCustomCategory}
                                        className="category-input__add-form"
                                        value={editCustomCategoryName}
                                      />
                                      <AddCircleOutlineIcon
                                        className="category-input__icon-add"
                                        type={'button'}
                                        onClick={(e) => {
                                          e.stopPropagation();
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
                                  <div className="category-input__form-position">
                                    <li
                                      className="category-input__menu-item"
                                      value={expenseAssociatedCategory.name}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        props.onClick(
                                          bigCategoriesIndex,
                                          expenseCategory,
                                          expenseAssociatedCategory
                                        );
                                        clickBigMenuClose();
                                      }}
                                    >
                                      {expenseAssociatedCategory.name}
                                    </li>
                                    <CreateIcon
                                      className="category-input__icon-edit"
                                      type={'button'}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditCustomCategoryName(expenseAssociatedCategory.name);
                                        setAssociatedIndex(associatedCategoryIndex);
                                        setBigEditCategoryIndex(bigCategoriesIndex);
                                      }}
                                    />
                                    <DeleteIcon
                                      className="category-input__icon-delete"
                                      type={'button'}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm('カスタムカテゴリーを削除しますか？')) {
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
                        } else if (expenseAssociatedCategory.category_type === mediumCategoryType) {
                          return (
                            <div key={expenseAssociatedCategory.name}>
                              <li
                                className="category-input__menu-item"
                                value={expenseAssociatedCategory.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  props.onClick(
                                    bigCategoriesIndex,
                                    expenseCategory,
                                    expenseAssociatedCategory
                                  );
                                  clickBigMenuClose();
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
                                className="category-input__add-form"
                                onClick={(e) => e.stopPropagation()}
                                onChange={addCustomCategory}
                                value={customCategoryName}
                                placeholder={'カテゴリーを追加'}
                              />
                              <AddCircleOutlineIcon
                                className="category-input__icon-add"
                                type={'button'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  operationSwitching(
                                    addCustomCategories(customCategoryName, expenseCategory.id),
                                    addGroupCustomCategories(customCategoryName, expenseCategory.id)
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
      <ul className="category-input__menu">
        {(() => {
          return bigCategoriesList;
        })()}
      </ul>
    );
  };

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
                        bigEditCategoryIndex === props.bigCategoryIndex &&
                        associatedIndex === incomeAssociatedIndex
                      ) {
                        return (
                          <div className="category-input__form-position">
                            <input
                              onClick={(e) => e.stopPropagation()}
                              placeholder={incomeAssociated.name}
                              onChange={editCustomCategory}
                              className="category-input__add-form"
                              value={editCustomCategoryName}
                            />
                            <AddCircleOutlineIcon
                              className="category-input__icon-add"
                              type={'button'}
                              onClick={(e) => {
                                e.stopPropagation();
                                operationSwitching(
                                  editCustomCategories(
                                    incomeAssociated.id,
                                    editCustomCategoryName,
                                    incomeAssociated.big_category_id
                                  ),
                                  editGroupCustomCategories(
                                    incomeAssociated.id,
                                    editCustomCategoryName,
                                    incomeAssociated.big_category_id
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
                        <div className="category-input__form-position">
                          <li
                            className="category-input__menu-item"
                            value={incomeAssociated.name}
                            onClick={() => {
                              props.onClick(props.bigCategoryIndex, null, incomeAssociated);
                              clickMediumMenuClose();
                            }}
                          >
                            {incomeAssociated.name}
                          </li>
                          <CreateIcon
                            className="category-input__icon-edit"
                            type={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditCustomCategoryName(incomeAssociated.name);
                              setAssociatedIndex(incomeAssociatedIndex);
                              setBigEditCategoryIndex(props.bigCategoryIndex);
                            }}
                          />
                          <DeleteIcon
                            className="category-input__icon-delete"
                            type={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('カスタムカテゴリーを削除しますか？')) {
                                operationSwitching(
                                  deleteCustomCategories(
                                    incomeAssociated.id,
                                    incomeAssociated.big_category_id
                                  ),
                                  deleteGroupCustomCategories(
                                    incomeAssociated.id,
                                    incomeAssociated.big_category_id
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
              } else if (incomeAssociated.category_type === mediumCategoryType) {
                return (
                  <li
                    className="category-input__menu-item"
                    value={incomeAssociated.name}
                    onClick={() => {
                      props.onClick(props.bigCategoryIndex, null, incomeAssociated);
                      clickMediumMenuClose();
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
                      onClick={(e) => e.stopPropagation()}
                      onChange={addCustomCategory}
                      placeholder={'カテゴリーを追加'}
                      className="category-input__add-form"
                      value={customCategoryName}
                    />
                    <AddCircleOutlineIcon
                      className="category-input__icon-add"
                      type={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        operationSwitching(
                          addCustomCategories(customCategoryName, props.bigCategoryId),
                          addGroupCustomCategories(customCategoryName, props.bigCategoryId)
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
                        bigEditCategoryIndex === props.bigCategoryIndex &&
                        associatedIndex === expenseAssociatedIndex
                      ) {
                        return (
                          <div className="category-input__form-position">
                            <input
                              onClick={(e) => e.stopPropagation()}
                              placeholder={expenseAssociated.name}
                              onChange={editCustomCategory}
                              className="category-input__add-form"
                              value={editCustomCategoryName}
                            />
                            <AddCircleOutlineIcon
                              className="category-input__icon-add"
                              type={'button'}
                              onClick={(e) => {
                                e.stopPropagation();
                                operationSwitching(
                                  editCustomCategories(
                                    expenseAssociated.id,
                                    editCustomCategoryName,
                                    expenseAssociated.big_category_id
                                  ),
                                  editGroupCustomCategories(
                                    expenseAssociated.id,
                                    editCustomCategoryName,
                                    expenseAssociated.big_category_id
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
                        <div className="category-input__form-position">
                          <li
                            className="category-input__menu-item"
                            value={expenseAssociated.name}
                            onClick={() => {
                              props.onClick(props.bigCategoryIndex, null, expenseAssociated);
                              clickMediumMenuClose();
                            }}
                          >
                            {expenseAssociated.name}
                          </li>
                          <CreateIcon
                            className="category-input__icon-edit"
                            type={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditCustomCategoryName(expenseAssociated.name);
                              setAssociatedIndex(expenseAssociatedIndex);
                              setBigEditCategoryIndex(props.bigCategoryIndex);
                            }}
                          />
                          <DeleteIcon
                            className="category-input__icon-delete"
                            type={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('カスタムカテゴリーを削除しますか？')) {
                                operationSwitching(
                                  deleteCustomCategories(
                                    expenseAssociated.id,
                                    expenseAssociated.big_category_id
                                  ),
                                  deleteGroupCustomCategories(
                                    expenseAssociated.id,
                                    expenseAssociated.big_category_id
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
              } else if (expenseAssociated.category_type === mediumCategoryType) {
                return (
                  <li
                    className="category-input__menu-item"
                    value={expenseAssociated.name}
                    onClick={() => {
                      props.onClick(props.bigCategoryIndex, null, expenseAssociated);
                      clickMediumMenuClose();
                    }}
                  >
                    {expenseAssociated.name}
                  </li>
                );
              }
            })()}
            {(() => {
              const lastExpenseIndex =
                props.expenseCategories[props.bigCategoryIndex].associated_categories_list.length -
                1;

              if (lastExpenseIndex === expenseAssociatedIndex) {
                return (
                  <div className="category-input__form-position">
                    <input
                      onClick={(e) => e.stopPropagation()}
                      onChange={addCustomCategory}
                      placeholder={'カテゴリーを追加'}
                      className="category-input__add-form"
                      value={customCategoryName}
                    />
                    <AddCircleOutlineIcon
                      className="category-input__icon-add"
                      type={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        operationSwitching(
                          addCustomCategories(customCategoryName, props.bigCategoryId),
                          addGroupCustomCategories(customCategoryName, props.bigCategoryId)
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
    <div className="category-input__btn-position">
      <div>
        <button
          type="button"
          onClick={bigCategoryMenuOpen ? clickBigMenuClose : clickBigMenuOpen}
          className="category-input__button-display"
        >
          {props.bigCategory === '' ? '大カテゴリー(必須)' : props.bigCategory}
          <ExpandMoreIcon className="input-years__icon" />
        </button>
        {bigCategoryMenuOpen && bigCategoriesList()}
      </div>
      <div className="category-input_spacer" />
      <div>
        <button
          disabled={props.bigCategory === ''}
          type="button"
          onClick={mediumCategoryMenuOpen ? clickMediumMenuClose : clickMediumMenuOpen}
          className="category-input__button-display"
        >
          {props.associatedCategory === '' ? '中カテゴリー(必須)' : props.associatedCategory}
          <ExpandMoreIcon className="input-years__icon" />
        </button>
        {mediumCategoryMenuOpen && mediumCategoriesList()}
      </div>
    </div>
  );
};
export default CategoryInput;
