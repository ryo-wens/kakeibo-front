import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShoppingListForm from '../../Form/ShoppingListForm/ShoppingListForm';
import './edit-shopping-list-modal.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import {
  addShoppingListItem,
  deleteShoppingListItem,
} from '../../../../../reducks/shoppingList/operations';
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
  const [open, setOpen] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const initialExpectedPurchaseDate: Date = dateStringToDate(props.listItem.expected_purchase_date);
  const initialPurchase = props.listItem.purchase;
  const initialShop = props.listItem.shop;
  const initialAmount = props.listItem.amount === null ? null : String(props.listItem.amount);
  const initialBigCategoryId = props.listItem.big_category_id;
  const initialBigCategoryName = props.listItem.big_category_name;
  const initialMediumCategoryId = props.listItem.medium_category_id;
  const initialCustomCategoryId = props.listItem.custom_category_id;
  const initialTransactionAutoAdd = props.listItem.transaction_auto_add;

  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialExpectedPurchaseDate
  );
  const [purchase, setPurchase] = useState<string>(initialPurchase);
  const [shop, setShop] = useState<string | null>(initialShop);
  const [amount, setAmount] = useState<string | null>(initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(initialBigCategoryName);
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(initialMediumCategoryId);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(initialCustomCategoryId);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(initialTransactionAutoAdd);
  const [associatedCategory, setAssociatedCategory] = useState('');
  const signal = axios.CancelToken.source();

  const disabledButton = () => {
    const unInput =
      purchase === '' || amount === '' || expectedPurchaseDate === null || bigCategoryId === 0;
    if (
      expectedPurchaseDate !== null &&
      initialExpectedPurchaseDate.getTime() === expectedPurchaseDate.getTime() &&
      initialPurchase === purchase &&
      initialShop === shop &&
      initialAmount === amount &&
      initialBigCategoryId === bigCategoryId &&
      initialBigCategoryName === bigCategory &&
      initialMediumCategoryId === mediumCategoryId &&
      initialCustomCategoryId === customCategoryId &&
      initialTransactionAutoAdd === transactionAutoAdd
    ) {
      return true;
    } else return unInput;
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
    setExpectedPurchaseDate(initialExpectedPurchaseDate);
    setPurchase(initialPurchase);
    setShop(initialShop);
    setAmount(initialAmount);
    setBigCategoryId(initialBigCategoryId);
    setBigCategory(initialBigCategoryName);
    setMediumCategoryId(initialMediumCategoryId);
    setCustomCategoryId(initialCustomCategoryId);
    setTransactionAutoAdd(initialTransactionAutoAdd);
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
          titleLabel={'買い物リストアイテムを削除'}
          purchase={props.listItem.purchase}
          closeModal={closeModal}
          closeDeleteForm={closeDeleteForm}
          dispatchOperation={deleteShoppingListItem(
            props.listItem.id,
            props.listItem.big_category_name,
            signal
          )}
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
          titleLabel={'買い物リストアイテムを編集'}
          buttonLabel={'保存'}
          closeModal={closeModal}
          unInput={disabledButton()}
          minDate={new Date('1900-01-01')}
          // 仮実装として addShoppingListItem() を記述
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
