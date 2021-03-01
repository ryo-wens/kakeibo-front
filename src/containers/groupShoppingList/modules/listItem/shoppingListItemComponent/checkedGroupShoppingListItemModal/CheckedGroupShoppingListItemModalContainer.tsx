import React, { useState } from 'react';
import { customDate, customMonth, year } from '../../../../../../lib/constant';
import { useDispatch } from 'react-redux';
import {
  EditGroupShoppingListItemReq,
  GroupShoppingListItem,
} from '../../../../../../reducks/groupShoppingList/types';
import { editGroupShoppingListItem } from '../../../../../../reducks/groupShoppingList/operations';
import { useParams } from 'react-router';
import CheckedGroupShoppingListItemModal from '../../../../../../components/groupShoppingList/modules/listItem/shoppingListItemComponent/checkedShoppingListItemModal/CheckedGroupShoppingListItemModal';

interface CheckedGroupShoppingListItemModalContainerProps {
  listItem: GroupShoppingListItem;
  currentYear: string;
  currentMonth: string;
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
  checked: boolean;
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
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
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

const CheckedGroupShoppingListItemModalContainer = (
  props: CheckedGroupShoppingListItemModalContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();

  const [open, setOpen] = useState(false);
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
      props.transactionAutoAdd &&
      (props.amount === unInput.unInputAmount || props.paymentUser === unInput.unInputPaymentUser)
    ) {
      return true;
    } else if (
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

  const handleCloseModal = () => {
    setOpen(false);
    props.setExpectedPurchaseDate(props.initialExpectedPurchaseDate);
    props.setPurchase(props.initialPurchase);
    props.setShop(props.initialShop);
    props.setAmount(props.initialAmount);
    props.setBigCategoryId(props.initialBigCategoryId);
    props.setBigCategory(props.initialBigCategoryName);
    props.setMediumCategoryId(props.initialMediumCategoryId);
    props.setCustomCategoryId(props.initialCustomCategoryId);
    props.setPaymentUser(props.paymentUser);
    props.setTransactionAutoAdd(props.initialTransactionAutoAdd);
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
      return props.setPaymentUser(unInput.unInputAmount);
    }
    if (typeof event.target.value === 'string') {
      return props.setPaymentUser(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTransactionAutoAdd(event.target.checked);
  };

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.checked &&
      props.transactionAutoAdd &&
      (props.amount === unInput.unInputAmount || props.paymentUser === unInput.unInputPaymentUser)
    ) {
      return openModal();
    }
    props.setChecked(event.target.checked);

    const requestData: EditGroupShoppingListItemReq = {
      expected_purchase_date: props.expectedPurchaseDate,
      complete_flag: event.target.checked,
      purchase: props.purchase,
      shop: props.shop,
      amount: typeof props.amount === 'string' ? Number(props.amount) : props.amount,
      big_category_id: props.bigCategoryId,
      medium_category_id: props.mediumCategoryId,
      custom_category_id: props.customCategoryId,
      regular_shopping_list_id: props.listItem.regular_shopping_list_id,
      payment_user_id: props.paymentUser,
      transaction_auto_add: props.transactionAutoAdd,
      related_transaction_data: props.listItem.related_transaction_data,
    };

    dispatch(
      editGroupShoppingListItem(
        Number(group_id),
        props.listItem.id,
        String(year),
        customMonth,
        customDate,
        props.currentYear,
        props.currentMonth,
        requestData
      )
    );
  };

  const handleEditShoppingListItem = () => {
    const requestData: EditGroupShoppingListItemReq = {
      expected_purchase_date: props.expectedPurchaseDate,
      complete_flag: true,
      purchase: props.purchase,
      shop: props.shop,
      amount: Number(props.amount),
      big_category_id: props.bigCategoryId,
      medium_category_id: props.mediumCategoryId,
      custom_category_id: props.customCategoryId,
      regular_shopping_list_id: props.listItem.regular_shopping_list_id,
      payment_user_id: props.paymentUser,
      transaction_auto_add: props.transactionAutoAdd,
      related_transaction_data: props.listItem.related_transaction_data,
    };

    dispatch(
      editGroupShoppingListItem(
        Number(group_id),
        props.listItem.id,
        String(year),
        customMonth,
        customDate,
        props.currentYear,
        props.currentMonth,
        requestData
      )
    );
    setOpen(false);
  };

  return (
    <CheckedGroupShoppingListItemModal
      open={open}
      expectedPurchaseDate={props.expectedPurchaseDate}
      checked={props.checked}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      paymentUser={props.paymentUser}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={associatedCategory}
      handlePurchaseChange={handlePurchaseChange}
      handleCheckedChange={handleCheckedChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      handleShopChange={handleShopChange}
      handlePaymentUserChange={handlePaymentUserChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      handleCloseModal={handleCloseModal}
      unInput={disabledButton()}
      setBigCategory={props.setBigCategory}
      setAssociatedCategory={setAssociatedCategory}
      setBigCategoryId={props.setBigCategoryId}
      setMediumCategoryId={props.setMediumCategoryId}
      setCustomCategoryId={props.setCustomCategoryId}
      handleEditShoppingListItem={() => handleEditShoppingListItem()}
    />
  );
};

export default CheckedGroupShoppingListItemModalContainer;
