import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getExpenseCategories,
  getIncomeCategories,
} from '../../../../reducks/categories/selectors';
import { AssociatedCategory, Category } from '../../../../reducks/categories/types';
import ShoppingListForm from '../../../../components/shoppingList/modules/form/ShoppingListForm/ShoppingListForm';
import { Action, Dispatch } from 'redux';
import axios from 'axios';
import {
  addCustomCategories,
  deleteCustomCategories,
  editCustomCategories,
} from '../../../../reducks/categories/operations';
import {
  addGroupCustomCategories,
  deleteGroupCustomCategories,
  editGroupCustomCategories,
} from '../../../../reducks/groupCategories/operations';
import { useLocation, useParams } from 'react-router';

interface ShoppingListFormContainerProps {
  titleLabel: string;
  buttonLabel: string;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  minDate: Date;
  displayInputAmountMessage: boolean;
  openDeleteForm?: () => void;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingListFormContainer = (props: ShoppingListFormContainerProps) => {
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const { group_id } = useParams();
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];

  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState('');
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);

  const handleCloseBigCategoryMenu = (event: Event) => {
    if (bigCategoryRef.current && !bigCategoryRef.current.contains(event.target as Node)) {
      props.setBigCategoryMenuOpen(false);
    }
  };

  const handleCloseMediumCategoryMenu = (event: Event) => {
    if (mediumMenuRef.current && !mediumMenuRef.current.contains(event.target as Node)) {
      props.setMediumCategoryMenuOpen(false);
    }
  };

  const handleChangeAddCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategoryName(event.target.value);
  };

  const handleChangeEditCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditCustomCategoryName(event.target.value);
  };

  const categoryOperationSwitching = (
    operationFunction: (dispatch: Dispatch<Action>) => Promise<void>,
    groupOperationFunction: (dispatch: Dispatch<Action>) => Promise<void>
  ) => {
    if (pathName !== 'group') {
      dispatch(operationFunction);
    } else if (pathName === 'group') {
      dispatch(groupOperationFunction);
    }
  };

  const handleOpenEditCustomCategoryField = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryName: string,
    associatedCategoryIndex: number,
    bigCategoriesIndex: number,
    categoryType: string
  ) => {
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    event.stopPropagation();
    setEditCustomCategoryName(associatedCategoryName);
    setAssociatedIndex(associatedCategoryIndex);
    setBigEditCategoryIndex(bigCategoriesIndex);
  };

  const handleAddCustomCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bigCategoryId: number,
    categoryType: string
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    setCustomCategoryName('');
    categoryOperationSwitching(
      addCustomCategories(customCategoryName, bigCategoryId, signal),
      addGroupCustomCategories(customCategoryName, bigCategoryId, Number(group_id), signal)
    );
  };

  const handleEditCustomCategory = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number,
    categoryType: string
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    setEditCustomCategoryName('');
    setAssociatedIndex(null);
    setBigEditCategoryIndex(null);

    categoryOperationSwitching(
      editCustomCategories(associatedCategoryId, editCustomCategoryName, bigCategoryId, signal),
      editGroupCustomCategories(
        associatedCategoryId,
        editCustomCategoryName,
        bigCategoryId,
        Number(group_id),
        signal
      )
    );
  };

  const handleDeleteCustomCategory = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();

    if (window.confirm('カスタムカテゴリーを削除しますか？')) {
      categoryOperationSwitching(
        deleteCustomCategories(associatedCategoryId, bigCategoryId, signal),
        deleteGroupCustomCategories(associatedCategoryId, bigCategoryId, Number(group_id), signal)
      );
    }
  };

  return (
    <ShoppingListForm
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      expectedPurchaseDate={props.expectedPurchaseDate}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      bigCategoryIndex={props.bigCategoryIndex}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={props.associatedCategory}
      handlePurchaseChange={props.handlePurchaseChange}
      handleDateChange={props.handleDateChange}
      handleAmountChange={props.handleAmountChange}
      handleChangeCategory={props.handleChangeCategory}
      handleShopChange={props.handleShopChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      closeModal={props.closeModal}
      unInput={props.unInput}
      minDate={props.minDate}
      shoppingListItemOperation={props.shoppingListItemOperation}
      bigCategoryRef={bigCategoryRef}
      mediumMenuRef={mediumMenuRef}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      bigCategoryMenuOpen={props.bigCategoryMenuOpen}
      mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
      onClickCloseBigCategoryMenu={handleCloseBigCategoryMenu}
      onClickCloseMediumCategoryMenu={handleCloseMediumCategoryMenu}
      displayInputAmountMessage={props.displayInputAmountMessage}
      openDeleteForm={props.openDeleteForm}
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      handleChangeAddCustomCategory={handleChangeAddCustomCategory}
      handleChangeEditCustomCategory={handleChangeEditCustomCategory}
      handleAddCustomCategory={handleAddCustomCategory}
      handleEditCustomCategory={handleEditCustomCategory}
      handleDeleteCustomCategory={handleDeleteCustomCategory}
      handleOpenEditCustomCategoryField={handleOpenEditCustomCategoryField}
    />
  );
};

export default ShoppingListFormContainer;
