import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShoppingListForm from '../../uikit/ShoppingListForm/ShoppingListForm';
import AddIcon from '@material-ui/icons/Add';
import './add-shopping-list-modal.scss';
import { AssociatedCategory, Category } from '../../../../reducks/categories/types';
import { date } from '../../../../lib/constant';

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
  const [open, setOpen] = useState<boolean>(false);
  const [purchase, setPurchase] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(date);
  const [amount, setAmount] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [associatedCategory, setAssociatedCategory] = useState<string>('');
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [shop, setShop] = useState<string>('');
  const [autoAddTransaction, setAutoAddTransaction] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setPurchase('');
    setScheduledDate(date);
    setAmount('');
    setBigCategoryId(0);
    setBigCategory('');
    setMediumCategoryId(null);
    setAssociatedCategory('');
    setCustomCategoryId(null);
    setShop('');
    setAutoAddTransaction(false);
  };

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(event.target.value);
  };

  const handleDateChange = (scheduledDate: Date | null) => {
    setScheduledDate(scheduledDate as Date);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoAddTransaction(event.target.checked);
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

  const unInput = purchase === '' || amount === '' || scheduledDate === null || bigCategoryId === 0;

  const body = (
    <div className={classes.paper}>
      <ShoppingListForm
        scheduledDate={scheduledDate}
        purchase={purchase}
        shop={shop}
        amount={amount}
        bigCategoryId={bigCategoryId}
        bigCategory={bigCategory}
        bigCategoryIndex={bigCategoryIndex}
        mediumCategoryId={mediumCategoryId}
        customCategoryId={customCategoryId}
        autoAddTransaction={autoAddTransaction}
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
