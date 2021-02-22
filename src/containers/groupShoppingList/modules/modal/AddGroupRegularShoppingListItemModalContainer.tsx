import React, { useState } from 'react';
import { AssociatedCategory, Category } from '../../../../reducks/categories/types';
import { date } from '../../../../lib/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { PurchaseCycleType } from '../../../../reducks/shoppingList/types';
import AddGroupRegularShoppingListModal from '../../../../components/groupShoppingList/modules/modal/addRegularShoppingListModal/AddGroupRegularShoppingListModal';
import { addGroupRegularShoppingListItem } from '../../../../reducks/groupShoppingList/operations';
import { AddGroupRegularShoppingListItemModalInitialState } from '../../../../reducks/groupShoppingList/types';

interface AddGroupRegularShoppingListModalContainerProps {
  currentYearMonth: string;
}

const initialState: AddGroupRegularShoppingListItemModalInitialState = {
  initialExpectedPurchaseDate: date,
  initialCycleType: 'weekly',
  initialCycle: null,
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

const AddGroupRegularShoppingListModalContainer = (
  props: AddGroupRegularShoppingListModalContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const signal = axios.CancelToken.source();

  const [open, setOpen] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [cycleType, setCycleType] = useState<PurchaseCycleType>(initialState.initialCycleType);
  const [cycle, setCycle] = useState<string | null>(initialState.initialCycle);
  const [purchase, setPurchase] = useState<string>(initialState.initialPurchase);
  const [amount, setAmount] = useState<string | null>(initialState.initialAmount);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);
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
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(
    initialState.initialTransactionAutoAdd
  );

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setExpectedPurchaseDate(initialState.initialExpectedPurchaseDate);
    setCycleType(initialState.initialCycleType);
    setCycle(initialState.initialCycle);
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

  const handleDateChange = (expectedPurchaseDate: Date | null) => {
    setExpectedPurchaseDate(expectedPurchaseDate);
  };

  const handleCycleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCycleType(event.target.value as PurchaseCycleType);
  };

  const handleCycleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (cycleType !== 'custom') {
      setCycle(initialState.initialCycle);
    } else {
      setCycle(event.target.value);
    }
  };

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(event.target.value);
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

  const handleChangeCategory = (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setBigCategoryIndex(bigCategoryIndex);
    setAssociatedCategory(associatedCategory.name);
    categoryType === 'bigCategory'
      ? setBigCategoryMenuOpen(false)
      : setMediumCategoryMenuOpen(false);
    event.stopPropagation();

    if (bigCategory !== null) {
      setBigCategoryId(bigCategory.id);
      setBigCategory(bigCategory.name);
    }

    switch (associatedCategory.category_type) {
      case 'MediumCategory':
        setMediumCategoryId(associatedCategory.id);
        setCustomCategoryId(null);
        break;
      case 'CustomCategory':
        setMediumCategoryId(null);
        setCustomCategoryId(associatedCategory.id);
        break;
    }
  };

  const unInput = () => {
    if (
      expectedPurchaseDate === null ||
      purchase === initialState.initialPurchase ||
      bigCategoryId === initialState.initialBigCategoryId
    ) {
      return true;
    } else if (cycleType === 'custom') {
      return cycle === initialState.initialCycle || cycle === '';
    }
    return false;
  };

  return (
    <AddGroupRegularShoppingListModal
      open={open}
      expectedPurchaseDate={expectedPurchaseDate}
      cycleType={cycleType}
      cycle={cycle}
      purchase={purchase}
      shop={shop}
      amount={amount}
      bigCategoryId={bigCategoryId}
      bigCategory={bigCategory}
      bigCategoryIndex={bigCategoryIndex}
      paymentUser={paymentUser}
      transactionAutoAdd={transactionAutoAdd}
      associatedCategory={associatedCategory}
      handleDateChange={handleDateChange}
      handleCycleTypeChange={handleCycleTypeChange}
      handleCycleChange={handleCycleChange}
      handlePurchaseChange={handlePurchaseChange}
      handleAmountChange={handleAmountChange}
      handleChangeCategory={handleChangeCategory}
      handleShopChange={handleShopChange}
      handlePaymentUserChange={handlePaymentUserChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      titleLabel={'定期買い物リストに追加'}
      buttonLabel={'追加'}
      openModal={openModal}
      closeModal={closeModal}
      unInput={unInput()}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      regularShoppingListItemOperation={() => {
        dispatch(
          addGroupRegularShoppingListItem(
            Number(group_id),
            date,
            props.currentYearMonth,
            expectedPurchaseDate,
            cycleType,
            typeof cycle === 'string' ? Number(cycle) : cycle,
            purchase,
            shop,
            typeof amount === 'string' ? Number(amount) : amount,
            bigCategoryId,
            mediumCategoryId,
            customCategoryId,
            paymentUser,
            transactionAutoAdd,
            signal
          )
        );
        setOpen(false);
      }}
    />
  );
};

export default AddGroupRegularShoppingListModalContainer;
