import React, { useState } from 'react';
import { date } from '../../../../lib/constant';
import axios from 'axios';
import AddShoppingListItemModal from '../../../../components/shoppingList/modules/modal/AddShoppingListItemModal/AddShoppingListItemModal';
import { useDispatch } from 'react-redux';
import { addShoppingListItem } from '../../../../reducks/shoppingList/operations';

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
  initialTransactionAutoAdd: false,
};

const AddShoppingListItemModalContainer = () => {
  const dispatch = useDispatch();
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
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(
    initialState.initialTransactionAutoAdd
  );

  const signal = axios.CancelToken.source();

  const openModal = () => {
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
    setTransactionAutoAdd(initialState.initialTransactionAutoAdd);
  };

  const closeModal = () => {
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

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAutoAdd(event.target.checked);
  };

  const unInput =
    expectedPurchaseDate === null ||
    purchase === initialState.initialPurchase ||
    bigCategoryId === initialState.initialBigCategoryId;

  return (
    <AddShoppingListItemModal
      open={open}
      expectedPurchaseDate={expectedPurchaseDate}
      purchase={purchase}
      shop={shop}
      amount={amount}
      bigCategoryId={bigCategoryId}
      bigCategory={bigCategory}
      bigCategoryIndex={bigCategoryIndex}
      transactionAutoAdd={transactionAutoAdd}
      associatedCategory={associatedCategory}
      handlePurchaseChange={handlePurchaseChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      handleShopChange={handleShopChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      openModal={openModal}
      closeModal={closeModal}
      unInput={unInput}
      setBigCategory={setBigCategory}
      setBigCategoryId={setBigCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      setBigCategoryIndex={setBigCategoryIndex}
      setAssociatedCategory={setAssociatedCategory}
      shoppingListItemOperation={() => {
        dispatch(
          addShoppingListItem(
            date,
            expectedPurchaseDate,
            purchase,
            shop,
            typeof amount === 'string' ? Number(amount) : amount,
            bigCategoryId,
            mediumCategoryId,
            customCategoryId,
            transactionAutoAdd,
            signal
          )
        );
        setOpen(false);
      }}
    />
  );
};

export default AddShoppingListItemModalContainer;
