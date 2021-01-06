import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import { addShoppingListItem } from '../../../../../reducks/shoppingList/operations';
import axios from 'axios';
import RegularShoppingListForm from '../../Form/RegularShoppingListForm/RegularShoppingListForm';
import './add-regular-shopping-list-modal.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 450,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const AddRegularShoppingListModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(new Date());
  const [cycleType, setCycleType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');
  const [cycle, setCycle] = useState<string | null>('');
  const [purchase, setPurchase] = useState<string>('');
  const [shop, setShop] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(false);
  const [associatedCategory, setAssociatedCategory] = useState<string>('');
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

  const handleCycleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCycleType(event.target.value as 'daily' | 'weekly' | 'monthly' | 'custom');
  };

  const handleCycleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCycle(event.target.value);
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
      <RegularShoppingListForm
        expectedPurchaseDate={expectedPurchaseDate}
        cycleType={cycleType}
        cycle={cycle}
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
        handleDateChange={handleDateChange}
        handleCycleTypeChange={handleCycleTypeChange}
        handleCycleChange={handleCycleChange}
        handlePurchaseChange={handlePurchaseChange}
        handleAmountChange={handleAmountChange}
        selectCategory={selectCategory}
        handleShopChange={handleShopChange}
        handleAutoAddTransitionChange={handleAutoAddTransitionChange}
        titleLabel={'定期買い物リストに追加'}
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
        className="add-regular-shopping-list-modal__button"
        disabled={false}
        onClick={() => openModal()}
      >
        <AddIcon />
        定期買い物リストに追加
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

export default AddRegularShoppingListModal;
