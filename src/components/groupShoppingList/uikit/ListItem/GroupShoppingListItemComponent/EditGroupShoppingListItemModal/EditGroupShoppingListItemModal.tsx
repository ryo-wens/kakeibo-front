import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import '../../../../../shoppingList/uikit/ListItem/ShoppingListItemComponent/EditShoppingListModal/edit-shopping-list-modal.scss';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import {
  deleteShoppingListItem,
  editShoppingListItem,
} from '../../../../../../reducks/shoppingList/operations';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingListDeleteForm from '../../../../../shoppingList/uikit/Form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import { date } from '../../../../../../lib/constant';
import GroupShoppingListForm from '../../../Form/GroupShoppingListForm/GroupShoppingListForm';
import { GroupShoppingListItem } from '../../../../../../reducks/groupShoppingList/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 450,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface EditGroupShoppingListItemModalProps {
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

const EditGroupShoppingListItemModal = (props: EditGroupShoppingListItemModalProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [associatedCategory, setAssociatedCategory] = useState('');
  const signal = axios.CancelToken.source();

  const disabledButton = () => {
    const unInput =
      props.purchase === '' || props.expectedPurchaseDate === null || props.bigCategoryId === 0;

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
    setDeleteForm(false);
    props.setExpectedPurchaseDate(props.initialExpectedPurchaseDate);
    props.setPurchase(props.initialPurchase);
    props.setShop(props.initialShop);
    props.setAmount(props.initialAmount);
    props.setBigCategoryId(props.initialBigCategoryId);
    props.setBigCategory(props.initialBigCategoryName);
    props.setMediumCategoryId(props.initialMediumCategoryId);
    props.setCustomCategoryId(props.initialCustomCategoryId);
    props.setPaymentUser(props.initialPaymentUser);
    props.setTransactionAutoAdd(props.initialTransactionAutoAdd);
  };

  const openDeleteForm = () => {
    setDeleteForm(true);
  };

  const closeDeleteForm = () => {
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

  const body = (
    <div className={classes.paper}>
      {/*仮実装として、deleteShoppingListItem() と editShoppingListItem() を定義*/}
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
          dispatchOperation={editShoppingListItem(
            date,
            props.currentYearMonth,
            props.listItem.id,
            props.expectedPurchaseDate,
            props.listItem.complete_flag,
            props.purchase,
            props.shop,
            typeof props.amount === 'string' ? Number(props.amount) : props.amount,
            props.bigCategoryId,
            props.mediumCategoryId,
            props.customCategoryId,
            props.listItem.regular_shopping_list_id,
            props.transactionAutoAdd,
            props.listItem.related_transaction_data,
            signal
          )}
          displayInputAmountMessage={false}
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

export default EditGroupShoppingListItemModal;
