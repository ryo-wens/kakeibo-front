import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import axios, { CancelTokenSource } from 'axios';
import ShoppingListDeleteForm from '../../../../../shoppingList/modules/Form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import EditIcon from '@material-ui/icons/Edit';
import '../../../../../shoppingList/modules/Modal/EditRegularShoppingListModal/edit-regular-shopping-list-modal.scss';
import { dateStringToDate } from '../../../../../../lib/date';
import { useDispatch } from 'react-redux';
import { GroupRegularShoppingListItem } from '../../../../../../reducks/groupShoppingList/types';
import GroupRegularShoppingListForm from '../../../Form/GroupRegularShoppingListForm/GroupRegularShoppingListForm';
import { useParams } from 'react-router';
import {
  deleteGroupRegularShoppingListItem,
  editGroupRegularShoppingListItem,
} from '../../../../../../reducks/groupShoppingList/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 550,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface EditGroupRegularShoppingListItemModalProps {
  listItem: GroupRegularShoppingListItem;
  currentYearMonth: string;
  fetchTodayOrMonthlyShoppingList: (groupId: number, signal: CancelTokenSource) => void;
}

const EditGroupRegularShoppingListItemModal = (
  props: EditGroupRegularShoppingListItemModalProps
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const initialExpectedPurchaseDate: Date = dateStringToDate(props.listItem.expected_purchase_date);
  const initialCycleType = props.listItem.cycle_type;
  const initialCycle = props.listItem.cycle === null ? null : String(props.listItem.cycle);
  const initialPurchase = props.listItem.purchase;
  const initialShop = props.listItem.shop;
  const initialAmount = props.listItem.amount === null ? null : String(props.listItem.amount);
  const initialBigCategoryId = props.listItem.big_category_id;
  const initialBigCategoryName = props.listItem.big_category_name;
  const initialMediumCategoryId = props.listItem.medium_category_id;
  const initialCustomCategoryId = props.listItem.custom_category_id;
  const initialPaymentUser = props.listItem.payment_user_id;
  const initialTransactionAutoAdd = props.listItem.transaction_auto_add;

  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialExpectedPurchaseDate
  );
  const [cycleType, setCycleType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>(
    initialCycleType
  );
  const [cycle, setCycle] = useState<string | null>(initialCycle);
  const [purchase, setPurchase] = useState<string>(initialPurchase);
  const [shop, setShop] = useState<string | null>(initialShop);
  const [amount, setAmount] = useState<string | null>(initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(initialBigCategoryName);
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(initialMediumCategoryId);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(initialCustomCategoryId);
  const [paymentUser, setPaymentUser] = useState<string | null>(initialPaymentUser);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(initialTransactionAutoAdd);
  const [associatedCategory, setAssociatedCategory] = useState('');

  const { group_id } = useParams();
  const signal = axios.CancelToken.source();

  const unInputCycle = () => {
    if (cycleType === 'custom') {
      return cycle === null || cycle === '';
    }
    return false;
  };

  const disabledButton = () => {
    const unInput = purchase === '' || expectedPurchaseDate === null || bigCategoryId === 0;

    if (
      expectedPurchaseDate !== null &&
      initialExpectedPurchaseDate.getTime() === expectedPurchaseDate.getTime() &&
      initialCycleType === cycleType &&
      initialCycle === cycle &&
      initialPurchase === purchase &&
      initialShop === shop &&
      initialAmount === amount &&
      initialBigCategoryId === bigCategoryId &&
      initialBigCategoryName === bigCategory &&
      initialMediumCategoryId === mediumCategoryId &&
      initialCustomCategoryId === customCategoryId &&
      initialPaymentUser === paymentUser &&
      initialTransactionAutoAdd === transactionAutoAdd
    ) {
      return true;
    } else return unInput || unInputCycle();
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
    setCycleType(initialCycleType);
    setCycle(initialCycle);
    setPurchase(initialPurchase);
    setShop(initialShop);
    setAmount(initialAmount);
    setBigCategoryId(initialBigCategoryId);
    setBigCategory(initialBigCategoryName);
    setMediumCategoryId(initialMediumCategoryId);
    setCustomCategoryId(initialCustomCategoryId);
    setPaymentUser(initialPaymentUser);
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

  const handleCycleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCycleType(event.target.value as 'daily' | 'weekly' | 'monthly' | 'custom');
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
    };
    edit();
  };

  const body = (
    <div className={classes.paper}>
      {deleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'定期買い物リストアイテムを削除'}
          purchase={props.listItem.purchase}
          closeModal={closeModal}
          closeDeleteForm={closeDeleteForm}
          dispatchOperation={deleteGroupRegularShoppingListItem(
            Number(group_id),
            props.listItem.id,
            props.listItem.big_category_name,
            signal
          )}
        />
      ) : (
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
          titleLabel={'定期買い物リストアイテムを編集'}
          buttonLabel={'保存'}
          closeModal={closeModal}
          setOpen={setOpen}
          unInput={disabledButton()}
          minDate={new Date('1900-01-01')}
          dispatchOperation={editRegularShoppingList}
          openDeleteForm={openDeleteForm}
        />
      )}
    </div>
  );

  return (
    <>
      <EditIcon
        className="edit-regular-shopping-list-modal__edit-icon"
        onClick={() => openModal()}
      />
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

export default EditGroupRegularShoppingListItemModal;
