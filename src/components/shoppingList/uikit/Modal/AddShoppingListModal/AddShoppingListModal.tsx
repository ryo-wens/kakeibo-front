import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShoppingListForm from '../../Form/ShoppingListForm/ShoppingListForm';
import AddIcon from '@material-ui/icons/Add';
import './add-shopping-list-modal.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import { addShoppingListItem } from '../../../../../reducks/shoppingList/operations';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 450,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const AddShoppingListModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [purchase, setPurchase] = useState('');
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(date);
  const [amount, setAmount] = useState('');
  const [bigCategoryId, setBigCategoryId] = useState(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [associatedCategory, setAssociatedCategory] = useState('');
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [shop, setShop] = useState('');
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(false);
  const signal = axios.CancelToken.source();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setPurchase('');
    setExpectedPurchaseDate(date);
    setAmount('');
    setBigCategoryId(0);
    setBigCategory('');
    setMediumCategoryId(null);
    setAssociatedCategory('');
    setCustomCategoryId(null);
    setShop('');
    setTransactionAutoAdd(false);
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

  const unInput =
    purchase === '' || amount === '' || expectedPurchaseDate === null || bigCategoryId === 0;

  const body = (
    <div className={classes.paper}>
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
        titleLabel={'買い物リストに追加'}
        buttonLabel={'追加'}
        closeModal={closeModal}
        unInput={unInput}
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
      />
    </div>
  );

  return (
    <>
      <button
        className="add-shopping-list-modal__button"
        disabled={false}
        onClick={() => openModal()}
      >
        <AddIcon />
        買い物リストに追加
      </button>
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

export default AddShoppingListModal;
