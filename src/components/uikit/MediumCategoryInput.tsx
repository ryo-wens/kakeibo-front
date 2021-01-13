import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Action, Dispatch } from 'redux';
import { State } from '../../reducks/store/types';
import { AssociatedCategory, Categories, Category } from '../../reducks/categories/types';
import { GroupCategories } from '../../reducks/groupCategories/types';
import { customCategoryType, mediumCategoryType } from '../../lib/constant';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface MediumCategoryInputProps {
  kind: string;
  bigCategoryId: number;
  bigCategoryIndex: number;
  bigCategory: string | null;
  associatedCategory: string;
  mediumCategoryMenuOpen: boolean;
  incomeCategories: Categories | GroupCategories;
  expenseCategories: Categories | GroupCategories;
  onClick: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  onClickCloseMediumCategoryMenu: (event: Event) => void;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediumCategoryInput = React.forwardRef(
  (props: MediumCategoryInputProps, mediumMenuRef: React.Ref<HTMLDivElement>) => {
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
      document.addEventListener('click', props.onClickCloseMediumCategoryMenu);
      return () => {
        document.removeEventListener('click', props.onClickCloseMediumCategoryMenu);
      };
    }, [props.onClickCloseMediumCategoryMenu]);

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
                                onClick={(event) => event.stopPropagation()}
                                placeholder={incomeAssociated.name}
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
                                    props.onClickCloseMediumCategoryMenu
                                  );
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
                          <div className="category-input__form-position category-input__menu-item--custom">
                            <li
                              className="category-input__menu-item"
                              value={incomeAssociated.name}
                              onClick={() => {
                                props.onClick(props.bigCategoryIndex, null, incomeAssociated);
                                props.setMediumCategoryMenuOpen(false);
                              }}
                            >
                              {incomeAssociated.name}
                            </li>
                            <CreateIcon
                              className="category-input__icon-edit"
                              type={'button'}
                              onClick={() => {
                                document.removeEventListener(
                                  'click',
                                  props.onClickCloseMediumCategoryMenu
                                );
                                setEditCustomCategoryName(incomeAssociated.name);
                                setAssociatedIndex(incomeAssociatedIndex);
                                setBigEditCategoryIndex(props.bigCategoryIndex);
                              }}
                            />
                            <DeleteIcon
                              className="category-input__icon-delete"
                              type={'button'}
                              onClick={(event) => {
                                event.stopPropagation();
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
                        props.setMediumCategoryMenuOpen(false);
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
                                onClick={(event) => event.stopPropagation()}
                                placeholder={expenseAssociated.name}
                                onChange={editCustomCategory}
                                className="category-input__add-form"
                                value={editCustomCategoryName}
                              />
                              <AddCircleOutlineIcon
                                className="category-input__icon-add"
                                type={'button'}
                                onClick={() => {
                                  document.removeEventListener(
                                    'click',
                                    props.onClickCloseMediumCategoryMenu
                                  );
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
                          <div className="category-input__form-position category-input__menu-item--custom">
                            <li
                              className="category-input__menu-item"
                              value={expenseAssociated.name}
                              onClick={() => {
                                props.onClick(props.bigCategoryIndex, null, expenseAssociated);
                                props.setMediumCategoryMenuOpen(false);
                              }}
                            >
                              {expenseAssociated.name}
                            </li>
                            <CreateIcon
                              className="category-input__icon-edit"
                              type={'button'}
                              onClick={() => {
                                document.removeEventListener(
                                  'click',
                                  props.onClickCloseMediumCategoryMenu
                                );
                                setEditCustomCategoryName(expenseAssociated.name);
                                setAssociatedIndex(expenseAssociatedIndex);
                                setBigEditCategoryIndex(props.bigCategoryIndex);
                              }}
                            />
                            <DeleteIcon
                              className="category-input__icon-delete"
                              type={'button'}
                              onClick={(event) => {
                                event.stopPropagation();
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
      <div
        className="category-input__btn-position"
        ref={mediumMenuRef as React.RefObject<HTMLDivElement>}
      >
        <div>
          <button
            type="button"
            disabled={props.bigCategory === ''}
            className="category-input__button-display"
            onClick={() => {
              !props.mediumCategoryMenuOpen
                ? props.setMediumCategoryMenuOpen(true)
                : props.setMediumCategoryMenuOpen(false);
            }}
          >
            {props.associatedCategory === '' ? '中カテゴリー(必須)' : props.associatedCategory}
            <ExpandMoreIcon className="input-years__icon" />
          </button>
          {props.mediumCategoryMenuOpen && mediumCategoriesList()}
        </div>
      </div>
    );
  }
);
MediumCategoryInput.displayName = 'MediumCategoryInput';
export default MediumCategoryInput;
