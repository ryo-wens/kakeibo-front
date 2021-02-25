import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getExpenseCategories,
  getIncomeCategories,
} from '../../../../reducks/categories/selectors';
import { AssociatedCategory, Category } from '../../../../reducks/categories/types';
import { PurchaseCycleType } from '../../../../reducks/shoppingList/types';
import RegularShoppingListForm from '../../../../components/shoppingList/modules/form/RegularShoppingListForm/RegularShoppingListForm';

interface RegularShoppingListFormContainerProps {
  expectedPurchaseDate: Date | null;
  cycleType: PurchaseCycleType;
  cycle: string | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handleDateChange: (expectedPurchaseDate: Date | null) => void;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleLabel: string;
  buttonLabel: string;
  handleCloseModal: () => void;
  unInput: boolean;
  handleRegularShoppingListItem: () => void;
  minDate: Date;
  openDeleteForm?: () => void;
}

const RegularShoppingListFormContainer = (props: RegularShoppingListFormContainerProps) => {
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);

  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState<boolean>(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState<boolean>(false);

  const onClickCloseBigCategoryMenu = (event: Event) => {
    if (bigCategoryRef.current && !bigCategoryRef.current.contains(event.target as Node)) {
      setBigCategoryMenuOpen(false);
    }
  };

  const onClickCloseMediumCategoryMenu = (event: Event) => {
    if (mediumMenuRef.current && !mediumMenuRef.current.contains(event.target as Node)) {
      setMediumCategoryMenuOpen(false);
    }
  };

  return (
    <RegularShoppingListForm
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      expectedPurchaseDate={props.expectedPurchaseDate}
      cycleType={props.cycleType}
      cycle={props.cycle}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      bigCategoryIndex={props.bigCategoryIndex}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={props.associatedCategory}
      handleDateChange={props.handleDateChange}
      handleCycleTypeChange={props.handleCycleTypeChange}
      handleCycleChange={props.handleCycleChange}
      handlePurchaseChange={props.handlePurchaseChange}
      handleAmountChange={props.handleAmountChange}
      selectCategory={props.selectCategory}
      handleShopChange={props.handleShopChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      handleCloseModal={props.handleCloseModal}
      unInput={props.unInput}
      minDate={props.minDate}
      handleRegularShoppingListItem={props.handleRegularShoppingListItem}
      bigCategoryRef={bigCategoryRef}
      mediumMenuRef={mediumMenuRef}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      onClickCloseBigCategoryMenu={onClickCloseBigCategoryMenu}
      onClickCloseMediumCategoryMenu={onClickCloseMediumCategoryMenu}
      openDeleteForm={props.openDeleteForm}
    />
  );
};

export default RegularShoppingListFormContainer;
