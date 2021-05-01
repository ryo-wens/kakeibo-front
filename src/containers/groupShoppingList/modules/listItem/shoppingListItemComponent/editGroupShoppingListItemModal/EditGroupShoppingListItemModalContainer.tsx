import React, { useState } from 'react';
import {
  EditGroupShoppingListItemReq,
  GroupShoppingListItem,
} from '../../../../../../reducks/groupShoppingList/types';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import EditGroupShoppingListItemModal from '../../../../../../components/groupShoppingList/modules/listItem/shoppingListItemComponent/editShoppingListItemModal/EditGroupShoppingListItemModal';
import { customDate, customMonth, year } from '../../../../../../lib/constant';
import {
  deleteGroupShoppingListItem,
  editGroupShoppingListItem,
} from '../../../../../../reducks/groupShoppingList/operations';
import { dateStringToDate } from '../../../../../../lib/date';
import dayjs from 'dayjs';

interface EditGroupShoppingListItemModalContainerProps {
  listItem: GroupShoppingListItem;
  selectedYearParam: string;
  selectedMonthParam: string;
}

const EditGroupShoppingListItemModalContainer = (
  props: EditGroupShoppingListItemModalContainerProps
) => {
  const initialState = {
    initialExpectedPurchaseDate: dateStringToDate(props.listItem.expected_purchase_date),
    initialPurchase: props.listItem.purchase,
    initialShop: props.listItem.shop,
    initialAmount: props.listItem.amount === null ? null : String(props.listItem.amount),
    initialBigCategoryId: props.listItem.big_category_id,
    initialBigCategoryName: props.listItem.big_category_name,
    initialMediumCategoryId: props.listItem.medium_category_id,
    initialCustomCategoryId: props.listItem.custom_category_id,
    initialPaymentUser: props.listItem.payment_user_id,
    initialTransactionAutoAdd: props.listItem.transaction_auto_add,
  };

  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();

  const [open, setOpen] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [purchase, setPurchase] = useState<string>(initialState.initialPurchase);
  const [shop, setShop] = useState<string | null>(initialState.initialShop);
  const [amount, setAmount] = useState<string | null>(initialState.initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialState.initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(
    initialState.initialBigCategoryName
  );
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(
    initialState.initialMediumCategoryId
  );
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(
    initialState.initialCustomCategoryId
  );
  const [paymentUser, setPaymentUser] = useState<string | null>(initialState.initialPaymentUser);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(
    initialState.initialTransactionAutoAdd
  );
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
      expectedPurchaseDate !== null &&
      dayjs(initialState.initialExpectedPurchaseDate).isSame(expectedPurchaseDate, 'date') &&
      initialState.initialPurchase === purchase &&
      initialState.initialShop === shop &&
      initialState.initialAmount === amount &&
      initialState.initialBigCategoryId === bigCategoryId &&
      initialState.initialBigCategoryName === bigCategory &&
      initialState.initialMediumCategoryId === mediumCategoryId &&
      initialState.initialCustomCategoryId === customCategoryId &&
      initialState.initialPaymentUser === paymentUser &&
      initialState.initialTransactionAutoAdd === transactionAutoAdd
    ) {
      return true;
    } else
      return (
        expectedPurchaseDate === unInput.unInputExpectedPurchaseDate ||
        purchase === unInput.unInputPurchase ||
        bigCategoryId === unInput.unInputBigCategoryId
      );
  };

  const handleOpenModal = () => {
    if (props.listItem.medium_category_name) {
      setAssociatedCategory(props.listItem.medium_category_name);
    }
    if (props.listItem.custom_category_name) {
      setAssociatedCategory(props.listItem.custom_category_name);
    }
    setExpectedPurchaseDate(initialState.initialExpectedPurchaseDate);
    setPurchase(initialState.initialPurchase);
    setShop(initialState.initialShop);
    setAmount(initialState.initialAmount);
    setBigCategoryId(initialState.initialBigCategoryId);
    setBigCategory(initialState.initialBigCategoryName);
    setMediumCategoryId(initialState.initialMediumCategoryId);
    setCustomCategoryId(initialState.initialCustomCategoryId);
    setPaymentUser(initialState.initialPaymentUser);
    setTransactionAutoAdd(initialState.initialTransactionAutoAdd);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setOpenDeleteForm(false);
  };

  const handleOpenDeleteForm = () => {
    setOpenDeleteForm(true);
  };

  const handleCloseDeleteForm = () => {
    setOpenDeleteForm(false);
  };

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(event.target.value);
  };

  const handleDateChange = (expectedPurchaseDate: Date | null) => {
    setExpectedPurchaseDate(expectedPurchaseDate);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setAmount(unInput.unInputAmount);
    } else {
      setAmount(event.target.value);
    }
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setShop(unInput.unInputShop);
    } else {
      setShop(event.target.value);
    }
  };

  const handlePaymentUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === 'string' && event.target.value === '') {
      return setPaymentUser(unInput.unInputPaymentUser);
    }
    if (typeof event.target.value === 'string') {
      return setPaymentUser(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAutoAdd(event.target.checked);
  };

  const handleEditShoppingListItem = async () => {
    const requestData: EditGroupShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      complete_flag: props.listItem.complete_flag,
      purchase: purchase,
      shop: shop,
      amount: typeof amount === 'string' ? Number(amount) : amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      regular_shopping_list_id: props.listItem.regular_shopping_list_id,
      payment_user_id: paymentUser,
      transaction_auto_add: transactionAutoAdd,
      related_transaction_data: props.listItem.related_transaction_data,
    };

    try {
      await dispatch(
        editGroupShoppingListItem(
          Number(group_id),
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.selectedYearParam,
          props.selectedMonthParam,
          requestData
        )
      );
      setOpen(false);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  const handleDeleteShoppingListItem = async () => {
    try {
      await dispatch(
        deleteGroupShoppingListItem(
          Number(group_id),
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.selectedYearParam,
          props.selectedMonthParam
        )
      );

      setOpen(false);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <EditGroupShoppingListItemModal
      open={open}
      openDeleteForm={openDeleteForm}
      expectedPurchaseDate={expectedPurchaseDate}
      purchase={purchase}
      shop={shop}
      amount={amount}
      bigCategoryId={bigCategoryId}
      bigCategory={bigCategory}
      paymentUser={paymentUser}
      transactionAutoAdd={transactionAutoAdd}
      associatedCategory={associatedCategory}
      handlePurchaseChange={handlePurchaseChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      handleShopChange={handleShopChange}
      handlePaymentUserChange={handlePaymentUserChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleOpenDeleteForm={handleOpenDeleteForm}
      handleCloseDeleteForm={handleCloseDeleteForm}
      unInput={disabledButton()}
      initialPurchase={initialState.initialPurchase}
      setAssociatedCategory={setAssociatedCategory}
      setBigCategory={setBigCategory}
      setBigCategoryId={setBigCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      handleEditShoppingListItem={() => handleEditShoppingListItem()}
      handleDeleteShoppingListItem={() => handleDeleteShoppingListItem()}
    />
  );
};

export default EditGroupShoppingListItemModalContainer;
