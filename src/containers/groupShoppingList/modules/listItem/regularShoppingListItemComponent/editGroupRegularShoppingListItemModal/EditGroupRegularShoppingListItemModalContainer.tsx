import React, { useState } from 'react';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import axios, { CancelTokenSource } from 'axios';
import { dateStringToDate } from '../../../../../../lib/date';
import { useDispatch } from 'react-redux';
import { GroupRegularShoppingListItem } from '../../../../../../reducks/groupShoppingList/types';
import { useParams } from 'react-router';
import {
  deleteGroupRegularShoppingListItem,
  editGroupRegularShoppingListItem,
} from '../../../../../../reducks/groupShoppingList/operations';
import { PurchaseCycleType } from '../../../../../../reducks/shoppingList/types';
import EditGroupRegularShoppingListItemModal from '../../../../../../components/groupShoppingList/modules/listItem/GroupRegularShoppingListItemComponent/EditGroupRegularShoppingListItemModal/EditGroupRegularShoppingListItemModal';

interface EditGroupRegularShoppingListItemModalContainerProps {
  listItem: GroupRegularShoppingListItem;
  currentYearMonth: string;
  fetchTodayOrMonthlyShoppingList: (groupId: number, signal: CancelTokenSource) => void;
}

const EditGroupRegularShoppingListItemModalContainer = (
  props: EditGroupRegularShoppingListItemModalContainerProps
) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const signal = axios.CancelToken.source();

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
    initialPaymentUser: props.listItem.payment_user_id,
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
  const [paymentUser, setPaymentUser] = useState<string | null>(initialState.initialPaymentUser);
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
      initialState.initialPaymentUser === paymentUser &&
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
    setPaymentUser(initialState.initialPaymentUser);
    setTransactionAutoAdd(initialState.initialTransactionAutoAdd);
  };

  const openDeleteForm = () => {
    setDeleteForm(true);
  };

  const closeDeleteForm = () => {
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

  const handlePaymentUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === 'string' && event.target.value === '') {
      return setPaymentUser(null);
    }
    if (typeof event.target.value === 'string') {
      return setPaymentUser(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAutoAdd(event.target.checked);
  };

  const selectCategory = (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => {
    setBigCategoryIndex(bigCategoryIndex);
    setAssociatedCategory(associatedCategory.name);

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

  const editRegularShoppingList = () => {
    const signal = axios.CancelToken.source();

    const edit = async () => {
      await dispatch(
        editGroupRegularShoppingListItem(
          Number(group_id),
          props.listItem.id,
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
      props.fetchTodayOrMonthlyShoppingList(Number(group_id), signal);
      setOpen(false);
    };
    edit();
  };

  return (
    <EditGroupRegularShoppingListItemModal
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
      paymentUser={paymentUser}
      transactionAutoAdd={transactionAutoAdd}
      associatedCategory={associatedCategory}
      handleDateChange={handleDateChange}
      handleCycleTypeChange={handleCycleTypeChange}
      handleCycleChange={handleCycleChange}
      handlePurchaseChange={handlePurchaseChange}
      handleAmountChange={handleAmountChange}
      selectCategory={selectCategory}
      handleShopChange={handleShopChange}
      handlePaymentUserChange={handlePaymentUserChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      openModal={openModal}
      closeModal={closeModal}
      openDeleteForm={openDeleteForm}
      closeDeleteForm={closeDeleteForm}
      unInput={disabledButton()}
      initialPurchase={initialState.initialPurchase}
      regularShoppingListItemOperation={() => {
        editRegularShoppingList();
      }}
      deleteOperation={() => {
        deleteGroupRegularShoppingListItem(
          Number(group_id),
          props.listItem.id,
          props.listItem.big_category_name,
          signal
        );
        closeDeleteForm();
      }}
    />
  );
};

export default EditGroupRegularShoppingListItemModalContainer;