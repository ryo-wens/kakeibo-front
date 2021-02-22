import React, { useState } from 'react';
import { AssociatedCategory, Category } from '../../../../reducks/categories/types';
import { date } from '../../../../lib/constant';
import { addRegularShoppingListItem } from '../../../../reducks/shoppingList/operations';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import AddRegularShoppingListItemModal from '../../../../components/shoppingList/modules/modal/AddRegularShoppingListItemModal/AddRegularShoppingListItemModal';
import {
  AddRegularShoppingListItemModalInitialState,
  PurchaseCycleType,
} from '../../../../reducks/shoppingList/types';

interface AddRegularShoppingListModalContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const initialState: AddRegularShoppingListItemModalInitialState = {
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
  initialTransactionAutoAdd: false,
};

const AddRegularShoppingListItemModalContainer = (
  props: AddRegularShoppingListModalContainerProps
) => {
  const dispatch = useDispatch();

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
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(
    initialState.initialTransactionAutoAdd
  );

  const signal = axios.CancelToken.source();
  const currentMonth = `0` + `${props.selectedMonth}`.slice(-2);
  const currentYearMonth = `${props.selectedYear}/${currentMonth}`;

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
    setTransactionAutoAdd(initialState.initialTransactionAutoAdd);
  };

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(event.target.value);
  };

  const handleDateChange = (expectedPurchaseDate: Date | null) => {
    setExpectedPurchaseDate(expectedPurchaseDate);
  };

  const handleCycleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCycleType(event.target.value as PurchaseCycleType);

    if (event.target.value !== 'custom') {
      setCycle(initialState.initialCycleType);
    }
  };

  const handleCycleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCycle(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setAmount(initialState.initialAmount);
    } else {
      setAmount(event.target.value);
    }
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setShop(initialState.initialShop);
    } else {
      setShop(event.target.value);
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
        setCustomCategoryId(initialState.initialCustomCategoryId);
        break;
      case 'CustomCategory':
        setMediumCategoryId(initialState.initialMediumCategoryId);
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
    <AddRegularShoppingListItemModal
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
      transactionAutoAdd={transactionAutoAdd}
      associatedCategory={associatedCategory}
      handleDateChange={handleDateChange}
      handleCycleTypeChange={handleCycleTypeChange}
      handleCycleChange={handleCycleChange}
      handlePurchaseChange={handlePurchaseChange}
      handleAmountChange={handleAmountChange}
      handleChangeCategory={handleChangeCategory}
      handleShopChange={handleShopChange}
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
          addRegularShoppingListItem(
            date,
            currentYearMonth,
            expectedPurchaseDate,
            cycleType,
            typeof cycle === 'string' ? Number(cycle) : cycle,
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

export default AddRegularShoppingListItemModalContainer;
