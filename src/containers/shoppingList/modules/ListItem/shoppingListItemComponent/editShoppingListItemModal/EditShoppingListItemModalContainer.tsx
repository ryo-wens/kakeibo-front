import React, { useState } from 'react';
import {
  deleteShoppingListItem,
  editShoppingListItem,
} from '../../../../../../reducks/shoppingList/operations';
import {
  EditShoppingListItemReq,
  ShoppingListItem,
} from '../../../../../../reducks/shoppingList/types';
import { customDate, customMonth, year } from '../../../../../../lib/constant';
import EditShoppingListItemModal from '../../../../../../components/shoppingList/modules/listItem/ShoppingListItemComponent/EditShoppingListItemModal/EditShoppingListItemModal';
import { useDispatch } from 'react-redux';
import { executeAfterAsyncProcess } from '../../../../../../lib/function';

interface EditShoppingListItemModalContainerProps {
  listItem: ShoppingListItem;
  currentYear: string;
  currentMonth: string;
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
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  transactionAutoAdd: boolean;
  setExpectedPurchaseDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setPurchase: React.Dispatch<React.SetStateAction<string>>;
  setShop: React.Dispatch<React.SetStateAction<string | null>>;
  setAmount: React.Dispatch<React.SetStateAction<string | null>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setTransactionAutoAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditShoppingListItemModalContainer = (props: EditShoppingListItemModalContainerProps) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [associatedCategory, setAssociatedCategory] = useState('');

  const unInput = {
    unInputExpectedPurchaseDate: null,
    unInputPurchase: '',
    unInputBigCategoryId: 0,
    unInputAmount: null,
  };

  const disabledButton = () => {
    if (
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

  const handleOpenDeleteForm = () => {
    setDeleteForm(true);
  };

  const handleCloseDeleteForm = () => {
    setDeleteForm(false);
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

  const handleEditShoppingListItem = () => {
    const requestData: EditShoppingListItemReq = {
      expected_purchase_date: props.expectedPurchaseDate,
      complete_flag: props.listItem.complete_flag,
      purchase: props.purchase,
      shop: props.shop,
      amount: typeof props.amount === 'string' ? Number(props.amount) : props.amount,
      big_category_id: props.bigCategoryId,
      medium_category_id: props.mediumCategoryId,
      custom_category_id: props.customCategoryId,
      regular_shopping_list_id: props.listItem.regular_shopping_list_id,
      transaction_auto_add: props.transactionAutoAdd,
      related_transaction_data: props.listItem.related_transaction_data,
    };

    return executeAfterAsyncProcess(
      dispatch(
        editShoppingListItem(
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth,
          requestData
        )
      ),
      () => setOpen(false)
    );
  };

  const handleDeleteShoppingListItem = () => {
    return executeAfterAsyncProcess(
      dispatch(
        deleteShoppingListItem(
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth
        )
      ),
      () => setDeleteForm(false)
    );
  };

  return (
    <EditShoppingListItemModal
      open={open}
      deleteForm={deleteForm}
      expectedPurchaseDate={props.expectedPurchaseDate}
      purchase={props.purchase}
      shop={props.shop}
      amount={props.amount}
      bigCategoryId={props.bigCategoryId}
      bigCategory={props.bigCategory}
      transactionAutoAdd={props.transactionAutoAdd}
      associatedCategory={associatedCategory}
      handlePurchaseChange={handlePurchaseChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      handleShopChange={handleShopChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleOpenDeleteForm={handleOpenDeleteForm}
      handleCloseDeleteForm={handleCloseDeleteForm}
      unInput={disabledButton()}
      initialPurchase={props.initialPurchase}
      setBigCategory={props.setBigCategory}
      setBigCategoryId={props.setBigCategoryId}
      setCustomCategoryId={props.setCustomCategoryId}
      setMediumCategoryId={props.setMediumCategoryId}
      setAssociatedCategory={setAssociatedCategory}
      handleEditShoppingListItem={() => handleEditShoppingListItem()}
      handleDeleteShoppingListItem={() => handleDeleteShoppingListItem()}
    />
  );
};

export default EditShoppingListItemModalContainer;
