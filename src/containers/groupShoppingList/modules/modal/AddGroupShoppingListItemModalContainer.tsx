import React, { useState } from 'react';
import { customDate, customMonth, date, year } from '../../../../lib/constant';
import { addGroupShoppingListItem } from '../../../../reducks/groupShoppingList/operations';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import AddGroupShoppingListItemModal from '../../../../components/groupShoppingList/modules/modal/addShoppingListModal/AddGroupShoppingListItemModal';
import { AddGroupShoppingListItemReq } from '../../../../reducks/groupShoppingList/types';

interface AddGroupShoppingListItemModalContainerProps {
  currentYear: string;
  currentMonth: string;
}

const initialState = {
  initialExpectedPurchaseDate: date,
  initialPurchase: '',
  initialAmount: null,
  initialBigCategoryId: 0,
  initialBigCategoryName: '',
  initialBigCategoryIndex: 0,
  initialMediumCategoryId: null,
  initialCustomCategoryId: null,
  initialAssociatedCategory: '',
  initialShop: null,
  initialPaymentUser: null,
  initialTransactionAutoAdd: false,
};

const AddGroupShoppingListItemModalContainer = (
  props: AddGroupShoppingListItemModalContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();

  const [open, setOpen] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [purchase, setPurchase] = useState<string>(initialState.initialPurchase);
  const [amount, setAmount] = useState<string | null>(initialState.initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialState.initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(
    initialState.initialBigCategoryName
  );
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(
    initialState.initialBigCategoryIndex
  );
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(
    initialState.initialMediumCategoryId
  );
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(
    initialState.initialCustomCategoryId
  );
  const [associatedCategory, setAssociatedCategory] = useState<string>(
    initialState.initialAssociatedCategory
  );
  const [shop, setShop] = useState<string | null>(initialState.initialShop);
  const [paymentUser, setPaymentUser] = useState<string | null>(initialState.initialPaymentUser);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(
    initialState.initialTransactionAutoAdd
  );

  const handleOpenModal = () => {
    setOpen(true);
    setExpectedPurchaseDate(initialState.initialExpectedPurchaseDate);
    setPurchase(initialState.initialPurchase);
    setAmount(initialState.initialAmount);
    setBigCategoryId(initialState.initialBigCategoryId);
    setBigCategory(initialState.initialBigCategoryName);
    setMediumCategoryId(initialState.initialMediumCategoryId);
    setAssociatedCategory(initialState.initialAssociatedCategory);
    setCustomCategoryId(initialState.initialCustomCategoryId);
    setShop(initialState.initialShop);
    setPaymentUser(initialState.initialPaymentUser);
    setTransactionAutoAdd(initialState.initialTransactionAutoAdd);
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
      return setAmount(initialState.initialAmount);
    }
    return setAmount(event.target.value);
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      return setShop(initialState.initialShop);
    }
    return setShop(event.target.value);
  };

  const handlePaymentUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === 'string' && event.target.value === '') {
      return setPaymentUser(initialState.initialPaymentUser);
    }
    if (typeof event.target.value === 'string') {
      return setPaymentUser(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAutoAdd(event.target.checked);
  };

  const unInput =
    expectedPurchaseDate === null ||
    purchase === initialState.initialPurchase ||
    bigCategoryId === initialState.initialBigCategoryId;

  const handleAddShoppingListItem = async () => {
    const requestData: AddGroupShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      purchase: purchase,
      shop: shop,
      amount: typeof amount === 'string' ? Number(amount) : amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      payment_user_id: paymentUser,
      transaction_auto_add: transactionAutoAdd,
    };

    try {
      await dispatch(
        addGroupShoppingListItem(
          Number(group_id),
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth,
          requestData
        )
      );

      handleCloseModal();
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <AddGroupShoppingListItemModal
      open={open}
      expectedPurchaseDate={expectedPurchaseDate}
      purchase={purchase}
      shop={shop}
      amount={amount}
      bigCategoryId={bigCategoryId}
      bigCategory={bigCategory}
      bigCategoryIndex={bigCategoryIndex}
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
      unInput={unInput}
      setBigCategory={setBigCategory}
      setBigCategoryId={setBigCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      setBigCategoryIndex={setBigCategoryIndex}
      setAssociatedCategory={setAssociatedCategory}
      handleAddShoppingListItem={() => handleAddShoppingListItem()}
    />
  );
};

export default AddGroupShoppingListItemModalContainer;
