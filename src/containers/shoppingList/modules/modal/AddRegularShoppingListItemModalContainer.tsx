import React, { useState } from 'react';
import { customDate, customMonth, date, year } from '../../../../lib/constant';
import { addRegularShoppingListItem } from '../../../../reducks/shoppingList/operations';
import { useDispatch } from 'react-redux';
import AddRegularShoppingListItemModal from '../../../../components/shoppingList/modules/modal/addRegularShoppingListItemModal/AddRegularShoppingListItemModal';
import {
  AddRegularShoppingListItemModalInitialState,
  AddRegularShoppingListItemReq,
  PurchaseCycleType,
} from '../../../../reducks/shoppingList/types';
import { generateZeroPaddingMonth } from '../../../../lib/date';

interface AddRegularShoppingListModalContainerProps {
  selectedYear: number;
  selectedMonth: number;
  addBtnClassName?: string;
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
  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  const [open, setOpen] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [cycleType, setCycleType] = useState<PurchaseCycleType>(initialState.initialCycleType);
  const [cycle, setCycle] = useState<string | null>(initialState.initialCycle);
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
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(
    initialState.initialTransactionAutoAdd
  );

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
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
      setCycle(initialState.initialCycle);
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

  const handleAddRegularShoppingListItem = async () => {
    const requestData: AddRegularShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      cycle_type: cycleType,
      cycle: typeof cycle === 'string' ? Number(cycle) : cycle,
      purchase: purchase,
      shop: shop,
      amount: typeof amount === 'string' ? Number(amount) : amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      transaction_auto_add: transactionAutoAdd,
    };

    try {
      await dispatch(
        addRegularShoppingListItem(
          String(year),
          customMonth,
          customDate,
          selectedYearParam,
          selectedMonthParam,
          requestData
        )
      );

      handleCloseModal();
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
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
      handleShopChange={handleShopChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      titleLabel={'定期買い物リストに追加'}
      buttonLabel={'追加'}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      unInput={unInput()}
      setBigCategoryIndex={setBigCategoryIndex}
      setBigCategoryId={setBigCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setBigCategory={setBigCategory}
      setAssociatedCategory={setAssociatedCategory}
      handleAddRegularShoppingListItem={() => handleAddRegularShoppingListItem()}
      addBtnClassName={props.addBtnClassName}
    />
  );
};

export default AddRegularShoppingListItemModalContainer;
