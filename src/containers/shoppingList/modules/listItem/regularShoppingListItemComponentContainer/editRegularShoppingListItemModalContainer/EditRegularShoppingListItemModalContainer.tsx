import React, { useState } from 'react';
import {
  deleteRegularShoppingListItem,
  editRegularShoppingListItem,
} from '../../../../../../reducks/shoppingList/operations';
import {
  EditRegularShoppingListItemReq,
  PurchaseCycleType,
  RegularShoppingListItem,
} from '../../../../../../reducks/shoppingList/types';
import { dateStringToDate } from '../../../../../../lib/date';
import { useDispatch } from 'react-redux';
import EditRegularShoppingListItemModal from '../../../../../../components/shoppingList/modules/listItem/regularShoppingListItemComponent/editRegularShoppingListItemModal/EditRegularShoppingListItemModal';
import { customDate, customMonth, year } from '../../../../../../lib/constant';

interface EditRegularShoppingListItemModalContainerProps {
  listItem: RegularShoppingListItem;
  currentYear: string;
  currentMonth: string;
}

const EditRegularShoppingListItemModalContainer = (
  props: EditRegularShoppingListItemModalContainerProps
) => {
  const dispatch = useDispatch();

  const initialState = {
    initialExpectedPurchaseDate: dateStringToDate(props.listItem.expected_purchase_date),
    initialCycleType: props.listItem.cycle_type,
    initialCycle: props.listItem.cycle === null ? null : String(props.listItem.cycle),
    initialPurchase: props.listItem.purchase,
    initialShop: props.listItem.shop,
    initialAmount: props.listItem.amount === null ? null : String(props.listItem.amount),
    initialBigCategoryId: props.listItem.big_category_id,
    initialBigCategoryName: props.listItem.big_category_name,
    initialMediumCategoryId: props.listItem.medium_category_id,
    initialCustomCategoryId: props.listItem.custom_category_id,
    initialTransactionAutoAdd: props.listItem.transaction_auto_add,
  };

  const [open, setOpen] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [cycleType, setCycleType] = useState<PurchaseCycleType>(initialState.initialCycleType);
  const [cycle, setCycle] = useState<string | null>(initialState.initialCycle);
  const [purchase, setPurchase] = useState<string>(initialState.initialPurchase);
  const [shop, setShop] = useState<string | null>(initialState.initialShop);
  const [amount, setAmount] = useState<string | null>(initialState.initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialState.initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(
    initialState.initialBigCategoryName
  );
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(
    initialState.initialMediumCategoryId
  );
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(
    initialState.initialCustomCategoryId
  );
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(
    initialState.initialTransactionAutoAdd
  );
  const [associatedCategory, setAssociatedCategory] = useState('');

  const disabledButton = () => {
    if (
      expectedPurchaseDate !== null &&
      initialState.initialExpectedPurchaseDate.getTime() === expectedPurchaseDate.getTime() &&
      initialState.initialCycleType === cycleType &&
      initialState.initialCycle === cycle &&
      initialState.initialPurchase === purchase &&
      initialState.initialShop === shop &&
      initialState.initialAmount === amount &&
      initialState.initialBigCategoryId === bigCategoryId &&
      initialState.initialBigCategoryName === bigCategory &&
      initialState.initialMediumCategoryId === mediumCategoryId &&
      initialState.initialCustomCategoryId === customCategoryId &&
      initialState.initialTransactionAutoAdd === transactionAutoAdd
    ) {
      return true;
    } else if (expectedPurchaseDate === null || purchase === '' || bigCategoryId === 0) {
      return true;
    } else if (cycleType === 'custom' && (cycle === null || cycle === '')) {
      return true;
    }
    return false;
  };

  const handleOpenModal = () => {
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
    setDeleteForm(false);
    setExpectedPurchaseDate(initialState.initialExpectedPurchaseDate);
    setCycleType(initialState.initialCycleType);
    setCycle(initialState.initialCycle);
    setPurchase(initialState.initialPurchase);
    setShop(initialState.initialShop);
    setAmount(initialState.initialAmount);
    setBigCategoryId(initialState.initialBigCategoryId);
    setBigCategory(initialState.initialBigCategoryName);
    setMediumCategoryId(initialState.initialMediumCategoryId);
    setCustomCategoryId(initialState.initialCustomCategoryId);
    setTransactionAutoAdd(initialState.initialTransactionAutoAdd);
  };

  const handleOpenDeleteForm = () => {
    setDeleteForm(true);
  };

  const handleCloseDeleteForm = () => {
    setDeleteForm(false);
  };

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(event.target.value);
  };

  const handleDateChange = (expectedPurchaseDate: Date | null) => {
    setExpectedPurchaseDate(expectedPurchaseDate);
  };

  const handleCycleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCycleType(event.target.value as PurchaseCycleType);
  };

  const handleCycleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (cycleType !== 'custom') {
      setCycle(null);
    }
    setCycle(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setAmount(null);
    } else {
      setAmount(event.target.value);
    }
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setShop(null);
    } else {
      setShop(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAutoAdd(event.target.checked);
  };

  const handleEditRegularShoppingListItem = async () => {
    const requestData: EditRegularShoppingListItemReq = {
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
        editRegularShoppingListItem(
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

  const handleDeleteRegularShoppingListItem = async () => {
    try {
      await dispatch(
        deleteRegularShoppingListItem(
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth
        )
      );

      setOpen(false);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <EditRegularShoppingListItemModal
      open={open}
      deleteForm={deleteForm}
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
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleOpenDeleteForm={handleOpenDeleteForm}
      handleCloseDeleteForm={handleCloseDeleteForm}
      unInput={disabledButton()}
      initialPurchase={initialState.initialPurchase}
      setBigCategory={setBigCategory}
      setBigCategoryId={setBigCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      setBigCategoryIndex={setBigCategoryIndex}
      setAssociatedCategory={setAssociatedCategory}
      handleEditRegularShoppingListItem={() => handleEditRegularShoppingListItem()}
      handleDeleteRegularShoppingListItem={() => handleDeleteRegularShoppingListItem()}
    />
  );
};

export default EditRegularShoppingListItemModalContainer;
