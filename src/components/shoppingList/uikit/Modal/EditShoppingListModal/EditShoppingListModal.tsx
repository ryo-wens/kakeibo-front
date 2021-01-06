import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShoppingListForm from '../../Form/ShoppingListForm/ShoppingListForm';
import './edit-shopping-list-modal.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import { addShoppingListItem } from '../../../../../reducks/shoppingList/operations';
import axios from 'axios';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditIcon from '@material-ui/icons/Edit';
import { dateStringToDate } from '../../../../../lib/date';
import ShoppingListDeleteForm from '../../Form/ShoppingListDeleteForm/ShoppingListDeleteForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 450,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface EditShoppingListModalProps {
  listItem: ShoppingListItem;
}

const EditShoppingListModal = (props: EditShoppingListModalProps) => {
  const classes = useStyles();
  const initialExpectedPurchaseDate: Date = dateStringToDate(props.listItem.expected_purchase_date);
  const [open, setOpen] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [purchase, setPurchase] = useState('');
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialExpectedPurchaseDate
  );
  const [amount, setAmount] = useState('');
  const [bigCategoryId, setBigCategoryId] = useState(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [associatedCategory, setAssociatedCategory] = useState('');
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [shop, setShop] = useState<string | null>(null);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(false);
  const signal = axios.CancelToken.source();
  const initialAmount = String(props.listItem.amount);

  const disabledButton = () => {
    const unInput =
      purchase === '' || amount === '' || expectedPurchaseDate === null || bigCategoryId === 0;
    if (
      expectedPurchaseDate !== null &&
      props.listItem.purchase === purchase &&
      initialExpectedPurchaseDate.getTime() === expectedPurchaseDate.getTime() &&
      initialAmount === amount &&
      props.listItem.big_category_id === bigCategoryId &&
      props.listItem.big_category_name === bigCategory &&
      props.listItem.medium_category_id === mediumCategoryId &&
      props.listItem.custom_category_id === customCategoryId &&
      props.listItem.shop === shop &&
      props.listItem.transaction_auto_add === transactionAutoAdd
    ) {
      return true;
    } else return unInput;
  };

  const openModal = () => {
    setOpen(true);
    setPurchase(props.listItem.purchase);
    setExpectedPurchaseDate(initialExpectedPurchaseDate);
    setAmount(initialAmount);
    setBigCategoryId(props.listItem.big_category_id);
    setBigCategory(props.listItem.big_category_name);
    setMediumCategoryId(props.listItem.medium_category_id);
    setCustomCategoryId(props.listItem.custom_category_id);
    setShop(props.listItem.shop);
    setTransactionAutoAdd(props.listItem.transaction_auto_add);
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

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
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

  const body = (
    <div className={classes.paper}>
      {deleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'買い物リストを削除'}
          purchase={props.listItem.purchase}
          closeModal={closeModal}
          closeDeleteForm={closeDeleteForm}
        />
      ) : (
        <ShoppingListForm
          expectedPurchaseDate={expectedPurchaseDate}
          purchase={purchase}
          shop={shop}
          amount={amount}
          bigCategoryId={bigCategoryId}
          bigCategory={bigCategory}
          bigCategoryIndex={bigCategoryIndex}
          mediumCategoryId={mediumCategoryId}
          customCategoryId={customCategoryId}
          transactionAutoAdd={transactionAutoAdd}
          associatedCategory={associatedCategory}
          handlePurchaseChange={handlePurchaseChange}
          handleDateChange={handleDateChange}
          handleAmountChange={handleAmountChange}
          selectCategory={selectCategory}
          handleShopChange={handleShopChange}
          handleAutoAddTransitionChange={handleAutoAddTransitionChange}
          titleLabel={'買い物リストを編集'}
          buttonLabel={'保存'}
          closeModal={closeModal}
          unInput={disabledButton()}
          dispatchOperation={addShoppingListItem(
            date,
            expectedPurchaseDate,
            purchase,
            shop,
            Number(amount),
            bigCategoryId,
            mediumCategoryId,
            customCategoryId,
            transactionAutoAdd,
            signal
          )}
          openDeleteForm={openDeleteForm}
        />
      )}
    </div>
  );

  return (
    <>
      <EditIcon className="edit-shopping-list-modal__edit-icon" onClick={() => openModal()} />
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default EditShoppingListModal;
