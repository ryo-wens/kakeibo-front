import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getApprovedGroups } from '../../../../reducks/groups/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../../reducks/groupCategories/selectors';
import { autoAddTransactionMessage } from '../../../../lib/message';
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
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseModal: () => void;
  unInput: boolean;
  handleShoppingListItem: () => void;
  minDate: Date;
  displayRequiredInputItemMessage: boolean;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  handleOpenDeleteForm?: () => void;
}

const GroupShoppingListFormContainer = (props: GroupShoppingListFormContainerProps) => {
  const approvedGroups = useSelector(getApprovedGroups);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const { group_id } = useParams<{ group_id: string }>();

  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);

  const [customCategoryName, setCustomCategoryName] = useState('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState('');
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);

  const approvedGroup = approvedGroups.filter((group) => group.group_id === Number(group_id));

  return (
    <GroupShoppingListForm
      message={autoAddTransactionMessage}
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      approvedGroup={approvedGroup[0]}
      expectedPurchaseDate={props.expectedPurchaseDate}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      bigCategoryIndex={bigCategoryIndex}
      paymentUser={props.paymentUser}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={props.associatedCategory}
      handlePurchaseChange={props.handlePurchaseChange}
      handleDateChange={props.handleDateChange}
      handleAmountChange={props.handleAmountChange}
      handleShopChange={props.handleShopChange}
      handlePaymentUserChange={props.handlePaymentUserChange}
      handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
      handleCloseModal={props.handleCloseModal}
      unInput={props.unInput}
      minDate={props.minDate}
      handleShoppingListItem={props.handleShoppingListItem}
      displayRequiredInputItemMessage={props.displayRequiredInputItemMessage}
      bigCategoryMenuRef={bigCategoryRef}
      mediumCategoryMenuRef={mediumMenuRef}
      groupIncomeCategories={groupIncomeCategories}
      groupExpenseCategories={groupExpenseCategories}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      setAssociatedIndex={setAssociatedIndex}
      setBigEditCategoryIndex={setBigEditCategoryIndex}
      setCustomCategoryName={setCustomCategoryName}
      setEditCustomCategoryName={setEditCustomCategoryName}
      setBigCategoryIndex={setBigCategoryIndex}
      setAssociatedCategory={props.setAssociatedCategory}
      setBigCategory={props.setBigCategory}
      setBigCategoryId={props.setBigCategoryId}
      setCustomCategoryId={props.setCustomCategoryId}
      setMediumCategoryId={props.setMediumCategoryId}
      handleOpenDeleteForm={props.handleOpenDeleteForm}
    />
  );
};

export default GroupShoppingListFormContainer;
