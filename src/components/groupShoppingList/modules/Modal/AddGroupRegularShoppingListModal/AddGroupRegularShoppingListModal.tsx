import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import '../../../../shoppingList/modules/Modal/AddShoppingListItemModal/add-shopping-list-item-modal.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import axios from 'axios';
import GroupRegularShoppingListForm from '../../form/GroupRegularShoppingListForm/GroupRegularShoppingListForm';
import { useDispatch } from 'react-redux';
import { addGroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/operations';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 450,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface AddGroupRegularShoppingListModalProps {
  currentYearMonth: string;
}

const AddGroupRegularShoppingListModal = (props: AddGroupRegularShoppingListModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const signal = axios.CancelToken.source();

  const [open, setOpen] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(date);
  const [cycleType, setCycleType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');
  const [cycle, setCycle] = useState<string | null>(null);
  const [purchase, setPurchase] = useState('');
  const [amount, setAmount] = useState<string | null>(null);
  const [bigCategoryId, setBigCategoryId] = useState(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [associatedCategory, setAssociatedCategory] = useState('');
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [shop, setShop] = useState<string | null>(null);
  const [paymentUser, setPaymentUser] = useState<string | null>(null);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState(false);

  const openModal = () => {
    setOpen(true);
    setExpectedPurchaseDate(date);
    setPurchase('');
    setAmount(null);
    setBigCategoryId(0);
    setBigCategory('');
    setMediumCategoryId(null);
    setAssociatedCategory('');
    setCustomCategoryId(null);
    setShop(null);
    setPaymentUser(null);
    setTransactionAutoAdd(false);
  };

  const closeModal = () => {
    setOpen(false);
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

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      return setAmount(null);
    }
    return setAmount(event.target.value);
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      return setShop(null);
    }
    return setShop(event.target.value);
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

  const unInput = purchase === '' || expectedPurchaseDate === null || bigCategoryId === 0;

  const body = (
    <div className={classes.paper}>
      <GroupRegularShoppingListForm
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
        titleLabel={'買い物リストに追加'}
        buttonLabel={'追加'}
        setOpen={setOpen}
        closeModal={closeModal}
        unInput={unInput}
        dispatchOperation={() =>
          dispatch(
            addGroupRegularShoppingListItem(
              Number(group_id),
              date,
              props.currentYearMonth,
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
          )
        }
        minDate={date}
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

export default AddGroupRegularShoppingListModal;
