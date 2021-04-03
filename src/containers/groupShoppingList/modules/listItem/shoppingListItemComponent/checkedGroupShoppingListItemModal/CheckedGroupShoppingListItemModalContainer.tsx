import React, { useEffect, useState } from 'react';
import { customDate, customMonth, year } from '../../../../../../lib/constant';
import { useDispatch } from 'react-redux';
import {
  EditGroupShoppingListItemReq,
  GroupShoppingListItem,
} from '../../../../../../reducks/groupShoppingList/types';
import { editGroupShoppingListItem } from '../../../../../../reducks/groupShoppingList/operations';
import { useParams } from 'react-router';
import CheckedGroupShoppingListItemModal from '../../../../../../components/groupShoppingList/modules/listItem/shoppingListItemComponent/checkedShoppingListItemModal/CheckedGroupShoppingListItemModal';
import { dateStringToDate } from '../../../../../../lib/date';
import dayjs from 'dayjs';

interface CheckedGroupShoppingListItemModalContainerProps {
  listItem: GroupShoppingListItem;
  currentYear: string;
  currentMonth: string;
}

const CheckedGroupShoppingListItemModalContainer = (
  props: CheckedGroupShoppingListItemModalContainerProps
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
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [checked, setChecked] = useState(false);
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

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
  }, [props.listItem.complete_flag]);

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
      transactionAutoAdd &&
      (amount === unInput.unInputAmount || paymentUser === unInput.unInputPaymentUser)
    ) {
      return true;
    } else if (
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

  const openModal = () => {
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
      return setPaymentUser(unInput.unInputAmount);
    }
    if (typeof event.target.value === 'string') {
      return setPaymentUser(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAutoAdd(event.target.checked);
  };

  const handleCheckedChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.checked &&
      initialState.initialTransactionAutoAdd &&
      (initialState.initialAmount === unInput.unInputAmount ||
        initialState.initialPaymentUser === unInput.unInputPaymentUser)
    ) {
      return openModal();
    }
    setChecked(event.target.checked);

    const requestData: EditGroupShoppingListItemReq = {
      expected_purchase_date: initialState.initialExpectedPurchaseDate,
      complete_flag: event.target.checked,
      purchase: initialState.initialPurchase,
      shop: initialState.initialShop,
      amount: props.listItem.amount,
      big_category_id: initialState.initialBigCategoryId,
      medium_category_id: initialState.initialMediumCategoryId,
      custom_category_id: initialState.initialCustomCategoryId,
      regular_shopping_list_id: props.listItem.regular_shopping_list_id,
      payment_user_id: initialState.initialPaymentUser,
      transaction_auto_add: initialState.initialTransactionAutoAdd,
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
          props.currentYear,
          props.currentMonth,
          requestData
        )
      );
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  const handleEditShoppingListItem = async () => {
    const requestData: EditGroupShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      complete_flag: true,
      purchase: purchase,
      shop: shop,
      amount: Number(amount),
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
          props.currentYear,
          props.currentMonth,
          requestData
        )
      );

      setOpen(false);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <CheckedGroupShoppingListItemModal
      open={open}
      expectedPurchaseDate={expectedPurchaseDate}
      checked={checked}
      purchase={purchase}
      shop={shop}
      amount={amount}
      bigCategoryId={bigCategoryId}
      bigCategory={bigCategory}
      paymentUser={paymentUser}
      transactionAutoAdd={transactionAutoAdd}
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
      setBigCategory={setBigCategory}
      setAssociatedCategory={setAssociatedCategory}
      setBigCategoryId={setBigCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      handleEditShoppingListItem={() => handleEditShoppingListItem()}
    />
  );
};

export default CheckedGroupShoppingListItemModalContainer;
