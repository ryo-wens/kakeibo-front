import React, { useState } from 'react';
import axios from 'axios';
import { GroupShoppingListItem } from '../../../../../../reducks/groupShoppingList/types';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import EditGroupShoppingListItemModal from '../../../../../../components/groupShoppingList/modules/listItem/shoppingListItemComponent/editShoppingListItemModal/EditGroupShoppingListItemModal';
import { date } from '../../../../../../lib/constant';
import {
  deleteGroupShoppingListItem,
  editGroupShoppingListItem,
} from '../../../../../../reducks/groupShoppingList/operations';

interface EditGroupShoppingListItemModalContainerProps {
  listItem: GroupShoppingListItem;
  currentYearMonth: string;
  initialExpectedPurchaseDate: Date;
  initialPurchase: string;
  initialShop: string | null;
  initialAmount: string | null;
  initialBigCategoryId: number;
  initialBigCategoryName: string;
  initialMediumCategoryId: number | null;
  initialCustomCategoryId: number | null;
  initialPaymentUser: string | null;
  initialTransactionAutoAdd: boolean;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  setExpectedPurchaseDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setPurchase: React.Dispatch<React.SetStateAction<string>>;
  setShop: React.Dispatch<React.SetStateAction<string | null>>;
  setAmount: React.Dispatch<React.SetStateAction<string | null>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setPaymentUser: React.Dispatch<React.SetStateAction<string | null>>;
  setTransactionAutoAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditGroupShoppingListItemModalContainer = (
  props: EditGroupShoppingListItemModalContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const signal = axios.CancelToken.source();

  const [open, setOpen] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [associatedCategory, setAssociatedCategory] = useState('');

  const unInput = {
    unInputExpectedPurchaseDate: null,
    unInputPurchase: '',
    unInputBigCategoryId: 0,
    unInputAmount: null,
    unInputShop: null,
    unInputPaymentUser: null,
  };

  const disabledButton = () => {
    if (
      props.expectedPurchaseDate !== null &&
      props.initialExpectedPurchaseDate.getTime() === props.expectedPurchaseDate.getTime() &&
      props.initialPurchase === props.purchase &&
      props.initialShop === props.shop &&
      props.initialAmount === props.amount &&
      props.initialBigCategoryId === props.bigCategoryId &&
      props.initialBigCategoryName === props.bigCategory &&
      props.initialMediumCategoryId === props.mediumCategoryId &&
      props.initialCustomCategoryId === props.customCategoryId &&
      props.initialPaymentUser === props.paymentUser &&
      props.initialTransactionAutoAdd === props.transactionAutoAdd
    ) {
      return true;
    } else
      return (
        props.expectedPurchaseDate === unInput.unInputExpectedPurchaseDate ||
        props.purchase === unInput.unInputPurchase ||
        props.bigCategoryId === unInput.unInputBigCategoryId
      );
  };

  const openModal = () => {
    setOpen(true);
    if (props.listItem.medium_category_name) {
      setAssociatedCategory(props.listItem.medium_category_name);
    }
    if (props.listItem.custom_category_name) {
      setAssociatedCategory(props.listItem.custom_category_name);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setDeleteForm(false);
    props.setExpectedPurchaseDate(props.initialExpectedPurchaseDate);
    props.setPurchase(props.initialPurchase);
    props.setShop(props.initialShop);
    props.setAmount(props.initialAmount);
    props.setBigCategoryId(props.initialBigCategoryId);
    props.setBigCategory(props.initialBigCategoryName);
    props.setMediumCategoryId(props.initialMediumCategoryId);
    props.setCustomCategoryId(props.initialCustomCategoryId);
    props.setPaymentUser(props.initialPaymentUser);
    props.setTransactionAutoAdd(props.initialTransactionAutoAdd);
  };

  const openDeleteForm = () => {
    setDeleteForm(true);
  };

  const closeDeleteForm = () => {
    setDeleteForm(false);
  };

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPurchase(event.target.value);
  };

  const handleDateChange = (expectedPurchaseDate: Date | null) => {
    props.setExpectedPurchaseDate(expectedPurchaseDate);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      props.setAmount(unInput.unInputAmount);
    } else {
      props.setAmount(event.target.value);
    }
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      props.setShop(unInput.unInputShop);
    } else {
      props.setShop(event.target.value);
    }
  };

  const handlePaymentUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === 'string' && event.target.value === '') {
      return props.setPaymentUser(unInput.unInputPaymentUser);
    }
    if (typeof event.target.value === 'string') {
      return props.setPaymentUser(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTransactionAutoAdd(event.target.checked);
  };

  return (
    <EditGroupShoppingListItemModal
      open={open}
      deleteForm={deleteForm}
      expectedPurchaseDate={props.expectedPurchaseDate}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      paymentUser={props.paymentUser}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={associatedCategory}
      handlePurchaseChange={handlePurchaseChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      handleShopChange={handleShopChange}
      handlePaymentUserChange={handlePaymentUserChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      openModal={openModal}
      closeModal={closeModal}
      openDeleteForm={openDeleteForm}
      closeDeleteForm={closeDeleteForm}
      unInput={disabledButton()}
      initialPurchase={props.initialPurchase}
      setAssociatedCategory={setAssociatedCategory}
      setBigCategory={props.setBigCategory}
      setBigCategoryId={props.setBigCategoryId}
      setCustomCategoryId={props.setCustomCategoryId}
      setMediumCategoryId={props.setMediumCategoryId}
      shoppingListItemOperation={() => {
        dispatch(
          editGroupShoppingListItem(
            Number(group_id),
            date,
            props.currentYearMonth,
            props.listItem.id,
            props.expectedPurchaseDate,
            props.listItem.complete_flag,
            props.purchase,
            props.shop,
            typeof props.amount === 'string' ? Number(props.amount) : props.amount,
            props.bigCategoryId,
            props.mediumCategoryId,
            props.customCategoryId,
            props.listItem.regular_shopping_list_id,
            props.paymentUser,
            props.transactionAutoAdd,
            props.listItem.related_transaction_data,
            signal
          )
        );
        setOpen(false);
      }}
      deleteOperation={() => {
        dispatch(
          deleteGroupShoppingListItem(
            Number(group_id),
            props.listItem.id,
            props.listItem.big_category_name,
            signal
          )
        );
        closeDeleteForm();
      }}
    />
  );
};

export default EditGroupShoppingListItemModalContainer;
