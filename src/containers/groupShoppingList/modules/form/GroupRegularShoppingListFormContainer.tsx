import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AssociatedCategory, Category } from '../../../../reducks/categories/types';
import { useParams } from 'react-router';
import { getApprovedGroups } from '../../../../reducks/groups/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../../reducks/groupCategories/selectors';
import GroupRegularShoppingListForm from '../../../../components/groupShoppingList/modules/form/GroupRegularShoppingListForm/GroupRegularShoppingListForm';
import { PurchaseCycleType } from '../../../../reducks/shoppingList/types';

interface GroupRegularShoppingListFormContainerProps {
  expectedPurchaseDate: Date | null;
  cycleType: PurchaseCycleType;
  cycle: string | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  paymentUser: string | null;
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
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleLabel: string;
  buttonLabel: string;
  closeModal: () => void;
  unInput: boolean;
  regularShoppingListItemOperation: () => void;
  minDate: Date;
  openDeleteForm?: () => void;
}

const GroupRegularShoppingListFormContainer = (
  props: GroupRegularShoppingListFormContainerProps
) => {
  const approvedGroups = useSelector(getApprovedGroups);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const { group_id } = useParams();

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
    <GroupRegularShoppingListForm
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      approvedGroups={approvedGroups}
      groupId={Number(group_id)}
      expectedPurchaseDate={props.expectedPurchaseDate}
      cycleType={props.cycleType}
      cycle={props.cycle}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      bigCategoryIndex={props.bigCategoryIndex}
      paymentUser={props.paymentUser}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={props.associatedCategory}
      handleCycleTypeChange={props.handleCycleTypeChange}
      handleCycleChange={props.handleCycleChange}
      handlePurchaseChange={props.handlePurchaseChange}
      handleDateChange={props.handleDateChange}
      handleAmountChange={props.handleAmountChange}
      selectCategory={props.selectCategory}
      handleShopChange={props.handleShopChange}
      handlePaymentUserChange={props.handlePaymentUserChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      closeModal={props.closeModal}
      unInput={props.unInput}
      regularShoppingListItemOperation={props.regularShoppingListItemOperation}
      minDate={props.minDate}
      bigCategoryRef={bigCategoryRef}
      mediumMenuRef={mediumMenuRef}
      groupIncomeCategories={groupIncomeCategories}
      groupExpenseCategories={groupExpenseCategories}
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

export default GroupRegularShoppingListFormContainer;
