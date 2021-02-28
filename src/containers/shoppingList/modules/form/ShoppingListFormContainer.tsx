import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getExpenseCategories,
  getIncomeCategories,
} from '../../../../reducks/categories/selectors';
import ShoppingListForm from '../../../../components/shoppingList/modules/form/ShoppingListForm/ShoppingListForm';

interface ShoppingListFormContainerProps {
  titleLabel: string;
  buttonLabel: string;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  minDate: Date;
  displayInputAmountMessage: boolean;
  openDeleteForm?: () => void;
}

const ShoppingListFormContainer = (props: ShoppingListFormContainerProps) => {
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
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);

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
      bigCategoryIndex={bigCategoryIndex}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={props.associatedCategory}
      handlePurchaseChange={props.handlePurchaseChange}
      handleDateChange={props.handleDateChange}
      handleAmountChange={props.handleAmountChange}
      handleShopChange={props.handleShopChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      closeModal={props.closeModal}
      unInput={props.unInput}
      minDate={props.minDate}
      shoppingListItemOperation={props.shoppingListItemOperation}
      bigCategoryMenuRef={bigCategoryRef}
      mediumCategoryMenuRef={mediumMenuRef}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      displayInputAmountMessage={props.displayInputAmountMessage}
      openDeleteForm={props.openDeleteForm}
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      setAssociatedCategory={props.setAssociatedCategory}
      setAssociatedIndex={setAssociatedIndex}
      setBigCategory={props.setBigCategory}
      setBigCategoryId={props.setBigCategoryId}
      setBigCategoryIndex={setBigCategoryIndex}
      setBigEditCategoryIndex={setBigEditCategoryIndex}
      setCustomCategoryId={props.setCustomCategoryId}
      setCustomCategoryName={setCustomCategoryName}
      setEditCustomCategoryName={setEditCustomCategoryName}
      setMediumCategoryId={props.setMediumCategoryId}
    />
  );
};

export default ShoppingListFormContainer;
