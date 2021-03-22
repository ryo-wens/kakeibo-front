import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getApprovedGroups } from '../../../../reducks/groups/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../../reducks/groupCategories/selectors';
import { autoAddTransactionMessage } from '../../../../lib/message';
import GroupRegularShoppingListForm from '../../../../components/groupShoppingList/modules/form/regularShoppingListForm/GroupRegularShoppingListForm';
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
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleLabel: string;
  buttonLabel: string;
  handleCloseModal: () => void;
  unInput: boolean;
  handleRegularShoppingListItem: () => void;
  minDate: Date;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  handleOpenDeleteForm?: () => void;
}

const GroupRegularShoppingListFormContainer = (
  props: GroupRegularShoppingListFormContainerProps
) => {
  const approvedGroups = useSelector(getApprovedGroups);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const { group_id } = useParams<{ group_id: string }>();

  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);

  const [customCategoryName, setCustomCategoryName] = useState('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState('');
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);

  const approvedGroup = approvedGroups.filter((group) => group.group_id === Number(group_id));

  return (
    <GroupRegularShoppingListForm
      message={autoAddTransactionMessage}
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      approvedGroup={approvedGroup[0]}
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
      handleShopChange={props.handleShopChange}
      handlePaymentUserChange={props.handlePaymentUserChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      handleCloseModal={props.handleCloseModal}
      unInput={props.unInput}
      handleRegularShoppingListItem={props.handleRegularShoppingListItem}
      minDate={props.minDate}
      bigCategoryMenuRef={bigCategoryRef}
      mediumCategoryMenuRef={mediumMenuRef}
      groupIncomeCategories={groupIncomeCategories}
      groupExpenseCategories={groupExpenseCategories}
      bigCategoryMenuOpen={props.bigCategoryMenuOpen}
      mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
      handleOpenDeleteForm={props.handleOpenDeleteForm}
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      setBigCategory={props.setBigCategory}
      setAssociatedCategory={props.setAssociatedCategory}
      setCustomCategoryName={setCustomCategoryName}
      setEditCustomCategoryName={setEditCustomCategoryName}
      setBigCategoryId={props.setBigCategoryId}
      setMediumCategoryId={props.setMediumCategoryId}
      setCustomCategoryId={props.setCustomCategoryId}
      setAssociatedIndex={setAssociatedIndex}
      setBigCategoryIndex={props.setBigCategoryIndex}
      setBigEditCategoryIndex={setBigEditCategoryIndex}
    />
  );
};

export default GroupRegularShoppingListFormContainer;
