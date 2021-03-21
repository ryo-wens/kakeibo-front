import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getExpenseCategories,
  getIncomeCategories,
} from '../../../../reducks/categories/selectors';
import { PurchaseCycleType } from '../../../../reducks/shoppingList/types';
import { autoAddTransactionMessage } from '../../../../lib/message';
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
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleLabel: string;
  buttonLabel: string;
  handleCloseModal: () => void;
  unInput: boolean;
  handleRegularShoppingListItem: () => void;
  minDate: Date;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  handleOpenDeleteForm?: () => void;
}

const RegularShoppingListFormContainer = (props: RegularShoppingListFormContainerProps) => {
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);

  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState('');
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);

  return (
    <RegularShoppingListForm
      message={autoAddTransactionMessage}
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
      handleShopChange={props.handleShopChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      handleCloseModal={props.handleCloseModal}
      unInput={props.unInput}
      minDate={props.minDate}
      handleRegularShoppingListItem={props.handleRegularShoppingListItem}
      bigCategoryMenuRef={bigCategoryRef}
      mediumCategoryMenuRef={mediumMenuRef}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      handleOpenDeleteForm={props.handleOpenDeleteForm}
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      setBigCategoryId={props.setBigCategoryId}
      setCustomCategoryId={props.setCustomCategoryId}
      setMediumCategoryId={props.setMediumCategoryId}
      setAssociatedIndex={setAssociatedIndex}
      setBigCategoryIndex={props.setBigCategoryIndex}
      setBigEditCategoryIndex={setBigEditCategoryIndex}
      setBigCategory={props.setBigCategory}
      setAssociatedCategory={props.setAssociatedCategory}
      setCustomCategoryName={setCustomCategoryName}
      setEditCustomCategoryName={setEditCustomCategoryName}
    />
  );
};

export default RegularShoppingListFormContainer;
