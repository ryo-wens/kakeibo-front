import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import { addRegularShoppingListItem } from '../../../../../reducks/shoppingList/operations';
import axios from 'axios';
import RegularShoppingListForm from '../../Form/RegularShoppingListForm/RegularShoppingListForm';
import './add-regular-shopping-list-modal.scss';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 550,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface AddRegularShoppingListModalProps {
  selectedYear: number;
  selectedMonth: number;
}

const AddRegularShoppingListModal = (props: AddRegularShoppingListModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(new Date());
  const [cycleType, setCycleType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');
  const [cycle, setCycle] = useState<string | null>(null);
  const [purchase, setPurchase] = useState<string>('');
  const [shop, setShop] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(false);
  const [associatedCategory, setAssociatedCategory] = useState<string>('');
  const signal = axios.CancelToken.source();
  const currentMonth = `0` + `${props.selectedMonth}`.slice(-2);
  const currentYearMonth = `${props.selectedYear}/${currentMonth}`;

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setExpectedPurchaseDate(date);
    setCycleType('weekly');
    setCycle(null);
    setPurchase('');
    setAmount(null);
    setShop(null);
    setBigCategoryId(0);
    setBigCategory('');
    setMediumCategoryId(null);
    setAssociatedCategory('');
    setCustomCategoryId(null);
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
    if (cycleType !== 'custom') {
      setCycle(null);
    } else {
      setCycle(event.target.value);
    }
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

  const unInput = purchase === '' || expectedPurchaseDate === null || bigCategoryId === 0;

  const unInputCycle = () => {
    if (cycleType === 'custom') {
      return cycle === null || cycle === '';
    }
    return false;
  };

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
        unInput={unInput || unInputCycle()}
        minDate={date}
        dispatchOperation={() =>
          dispatch(
            addRegularShoppingListItem(
              date,
              currentYearMonth,
              expectedPurchaseDate,
              cycleType,
              typeof cycle === 'string' ? Number(cycle) : cycle,
              purchase,
              shop,
              typeof amount === 'string' ? Number(amount) : amount,
              bigCategoryId,
              mediumCategoryId,
              customCategoryId,
              transactionAutoAdd,
              signal
            )
          )
        }
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
