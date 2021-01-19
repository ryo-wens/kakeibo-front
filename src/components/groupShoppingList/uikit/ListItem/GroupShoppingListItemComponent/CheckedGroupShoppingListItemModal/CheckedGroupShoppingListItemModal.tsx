import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import axios from 'axios';
import { date } from '../../../../../../lib/constant';
import '../../../../../shoppingList/uikit/ListItem/ShoppingListItemComponent/CheckedShoppingListItemModal/checked-shopping-list-item-modal.scss';
import { useDispatch } from 'react-redux';
import { GroupShoppingListItem } from '../../../../../../reducks/groupShoppingList/types';
import GroupShoppingListForm from '../../../Form/GroupShoppingListForm/GroupShoppingListForm';
import { editGroupShoppingListItem } from '../../../../../../reducks/groupShoppingList/operations';
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

interface CheckedGroupShoppingListItemModalProps {
  listItem: GroupShoppingListItem;
  currentYearMonth: string;
  initialExpectedPurchaseDate: Date;
  initialPurchase: string;
  initialShop: string | null;
  initialAmount: string | null;
  initialBigCategoryId: number;
  initialBigCategoryName: string;
  initialMediumCategoryId: number | null;
  initialCustomCategoryId: number | null;
  initialPaymentUser: string | null;
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
  paymentUser: string | null;
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
  setPaymentUser: React.Dispatch<React.SetStateAction<string | null>>;
  setTransactionAutoAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckedGroupShoppingListItemModal = (props: CheckedGroupShoppingListItemModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const signal = axios.CancelToken.source();

  const [open, setOpen] = useState(false);
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [associatedCategory, setAssociatedCategory] = useState('');

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

  const disabledButton = () => {
    const unInput =
      props.purchase === '' || props.expectedPurchaseDate === null || props.bigCategoryId === 0;

    if (props.transactionAutoAdd && (props.amount === null || props.paymentUser === null)) {
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
      props.initialPaymentUser === props.paymentUser &&
      props.initialTransactionAutoAdd === props.transactionAutoAdd
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
    props.setExpectedPurchaseDate(props.initialExpectedPurchaseDate);
    props.setPurchase(props.initialPurchase);
    props.setShop(props.initialShop);
    props.setAmount(props.initialAmount);
    props.setBigCategoryId(props.initialBigCategoryId);
    props.setBigCategory(props.initialBigCategoryName);
    props.setMediumCategoryId(props.initialMediumCategoryId);
    props.setCustomCategoryId(props.initialCustomCategoryId);
    props.setPaymentUser(props.paymentUser);
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
      props.setAmount(null);
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

  const handlePaymentUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === 'string' && event.target.value === '') {
      return props.setPaymentUser(null);
    }
    if (typeof event.target.value === 'string') {
      return props.setPaymentUser(event.target.value);
    }
  };

  const handleTransitionAutoAddChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTransactionAutoAdd(event.target.checked);
  };

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.checked &&
      props.transactionAutoAdd &&
      (props.amount === null || props.paymentUser === null)
    ) {
      return openModal();
    }
    props.setChecked(event.target.checked);
    dispatch(
      editGroupShoppingListItem(
        Number(id),
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
        props.paymentUser,
        props.transactionAutoAdd,
        props.listItem.related_transaction_data,
        signal
      )
    );
  };

  const body = (
    <div className={classes.paper}>
      <GroupShoppingListForm
        expectedPurchaseDate={props.expectedPurchaseDate}
        purchase={props.purchase}
        shop={props.shop}
        amount={props.amount}
        bigCategoryId={props.bigCategoryId}
        bigCategory={props.bigCategory}
        bigCategoryIndex={bigCategoryIndex}
        mediumCategoryId={props.mediumCategoryId}
        customCategoryId={props.customCategoryId}
        paymentUser={props.paymentUser}
        transactionAutoAdd={props.transactionAutoAdd}
        associatedCategory={associatedCategory}
        handlePurchaseChange={handlePurchaseChange}
        handleDateChange={handleDateChange}
        handleAmountChange={handleAmountChange}
        selectCategory={selectCategory}
        handleShopChange={handleShopChange}
        handlePaymentUserChange={handlePaymentUserChange}
        handleAutoAddTransitionChange={handleTransitionAutoAddChange}
        titleLabel={'買い物リストアイテムを編集'}
        buttonLabel={'保存'}
        setOpen={setOpen}
        closeModal={closeModal}
        unInput={disabledButton()}
        minDate={new Date('1900-01-01')}
        dispatchOperation={editGroupShoppingListItem(
          Number(id),
          date,
          props.currentYearMonth,
          props.listItem.id,
          props.expectedPurchaseDate,
          true,
          props.purchase,
          props.shop,
          typeof props.amount === 'string' ? Number(props.amount) : props.amount,
          props.bigCategoryId,
          props.mediumCategoryId,
          props.customCategoryId,
          props.listItem.regular_shopping_list_id,
          props.paymentUser,
          props.transactionAutoAdd,
          props.listItem.related_transaction_data,
          signal
        )}
        displayRequiredInputItemMessage={true}
      />
    </div>
  );

  return (
    <>
      <label className="checked-shopping-list-item-modal__check">
        <input type="checkbox" checked={props.checked} onChange={handleCheckedChange} />
        <span />
      </label>
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

export default CheckedGroupShoppingListItemModal;
