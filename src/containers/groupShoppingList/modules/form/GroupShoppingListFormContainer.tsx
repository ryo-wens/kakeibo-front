import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AssociatedCategory, Category } from '../../../../reducks/categories/types';
import { useParams } from 'react-router';
import { getApprovedGroups } from '../../../../reducks/groups/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../../reducks/groupCategories/selectors';
import GroupShoppingListForm from '../../../../components/groupShoppingList/modules/form/shoppingListForm/GroupShoppingListForm';

interface GroupShoppingListFormContainerProps {
  titleLabel: string;
  buttonLabel: string;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  minDate: Date;
  displayRequiredInputItemMessage: boolean;
  openDeleteForm?: () => void;
}

const GroupShoppingListFormContainer = (props: GroupShoppingListFormContainerProps) => {
  const approvedGroups = useSelector(getApprovedGroups);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
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

  const approvedGroup = approvedGroups.filter((group) => group.group_id === Number(group_id));

  return (
    <GroupShoppingListForm
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      approvedGroup={approvedGroup[0]}
      expectedPurchaseDate={props.expectedPurchaseDate}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      bigCategoryIndex={props.bigCategoryIndex}
      paymentUser={props.paymentUser}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={props.associatedCategory}
      handlePurchaseChange={props.handlePurchaseChange}
      handleDateChange={props.handleDateChange}
      handleAmountChange={props.handleAmountChange}
      selectCategory={props.selectCategory}
      handleShopChange={props.handleShopChange}
      handlePaymentUserChange={props.handlePaymentUserChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      closeModal={props.closeModal}
      unInput={props.unInput}
      minDate={props.minDate}
      shoppingListItemOperation={props.shoppingListItemOperation}
      displayRequiredInputItemMessage={props.displayRequiredInputItemMessage}
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

export default GroupShoppingListFormContainer;
