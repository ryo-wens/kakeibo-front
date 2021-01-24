import React, { useState } from 'react';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import { editShoppingListItem } from '../../../../../../reducks/shoppingList/operations';
import axios from 'axios';
import { ShoppingListItem } from '../../../../../../reducks/shoppingList/types';
import { date } from '../../../../../../lib/constant';
import { useDispatch } from 'react-redux';
import CheckedShoppingListItemModal from '../../../../../../components/shoppingList/modules/ListItem/ShoppingListItemComponent/CheckedShoppingListItemModal/CheckedShoppingListItemModal';

interface CheckedShoppingListItemModalContainerProps {
  listItem: ShoppingListItem;
  currentYearMonth: string;
  initialExpectedPurchaseDate: Date;
  initialPurchase: string;
  initialShop: string | null;
  initialAmount: string | null;
  initialBigCategoryId: number;
  initialBigCategoryName: string;
  initialMediumCategoryId: number | null;
  initialCustomCategoryId: number | null;
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
  setTransactionAutoAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const unInput = {
  unInputExpectedPurchaseDate: null,
  unInputPurchase: '',
  unInputBigCategoryId: 0,
  unInputAmount: null,
};

const CheckedShoppingListItemModalContainer = (
  props: CheckedShoppingListItemModalContainerProps
) => {
  const dispatch = useDispatch();
  const signal = axios.CancelToken.source();

  const [open, setOpen] = useState(false);
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [associatedCategory, setAssociatedCategory] = useState('');

  const disabledButton = () => {
    if (props.transactionAutoAdd && props.amount === unInput.unInputAmount) {
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

  const closeModal = () => {
    setOpen(false);
    props.setExpectedPurchaseDate(props.initialExpectedPurchaseDate);
    props.setPurchase(props.initialPurchase);
    props.setShop(props.initialShop);
    props.setAmount(props.initialAmount);
    props.setBigCategoryId(props.initialBigCategoryId);
    props.setBigCategory(props.initialBigCategoryName);
    props.setMediumCategoryId(props.initialMediumCategoryId);
    props.setCustomCategoryId(props.initialCustomCategoryId);
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
      props.setShop(null);
    } else {
      props.setShop(event.target.value);
    }
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTransactionAutoAdd(event.target.checked);
  };

  const selectCategory = (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => {
    setBigCategoryIndex(bigCategoryIndex);
    setAssociatedCategory(associatedCategory.name);

    if (bigCategory !== null) {
      props.setBigCategoryId(bigCategory.id);
      props.setBigCategory(bigCategory.name);
    }

    switch (associatedCategory.category_type) {
      case 'MediumCategory':
        props.setMediumCategoryId(associatedCategory.id);
        props.setCustomCategoryId(null);
        break;
      case 'CustomCategory':
        props.setMediumCategoryId(null);
        props.setCustomCategoryId(associatedCategory.id);
        break;
    }
  };

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.checked &&
      props.transactionAutoAdd &&
      props.amount === unInput.unInputAmount
    ) {
      return openModal();
    }
    props.setChecked(event.target.checked);
    dispatch(
      editShoppingListItem(
        date,
        props.currentYearMonth,
        props.listItem.id,
        props.expectedPurchaseDate,
        event.target.checked,
        props.purchase,
        props.shop,
        typeof props.amount === 'string' ? Number(props.amount) : props.amount,
        props.bigCategoryId,
        props.mediumCategoryId,
        props.customCategoryId,
        props.listItem.regular_shopping_list_id,
        props.transactionAutoAdd,
        props.listItem.related_transaction_data,
        signal
      )
    );
  };

  return (
    <CheckedShoppingListItemModal
      open={open}
      expectedPurchaseDate={props.expectedPurchaseDate}
      checked={props.checked}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      bigCategoryIndex={bigCategoryIndex}
      mediumCategoryId={props.mediumCategoryId}
      customCategoryId={props.customCategoryId}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={associatedCategory}
      handlePurchaseChange={handlePurchaseChange}
      handleCheckedChange={handleCheckedChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      selectCategory={selectCategory}
      handleShopChange={handleShopChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      openModal={openModal}
      closeModal={closeModal}
      unInput={disabledButton()}
      shoppingListItemOperation={() => {
        dispatch(
          editShoppingListItem(
            date,
            props.currentYearMonth,
            props.listItem.id,
            props.expectedPurchaseDate,
            true,
            props.purchase,
            props.shop,
            Number(props.amount),
            props.bigCategoryId,
            props.mediumCategoryId,
            props.customCategoryId,
            props.listItem.regular_shopping_list_id,
            props.transactionAutoAdd,
            props.listItem.related_transaction_data,
            signal
          )
        );
        setOpen(false);
      }}
    />
  );
};

export default CheckedShoppingListItemModalContainer;
