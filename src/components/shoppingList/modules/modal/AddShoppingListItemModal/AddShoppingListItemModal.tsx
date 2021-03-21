import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import styles from './AddShoppingListItemModal.module.scss';
import { date } from '../../../../../lib/constant';
import ShoppingListFormContainer from '../../../../../containers/shoppingList/modules/form/ShoppingListFormContainer';

interface AddShoppingListModalProps {
  open: boolean;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  unInput: boolean;
  handleAddShoppingListItem: () => void;
}

const AddShoppingListItemModal = (props: AddShoppingListModalProps) => {
  const body = (
    <div className={styles.modalWrapper}>
      <ShoppingListFormContainer
        titleLabel={'買い物リストに追加'}
        buttonLabel={'追加'}
        expectedPurchaseDate={props.expectedPurchaseDate}
        purchase={props.purchase}
        shop={props.shop}
        amount={props.amount}
        bigCategoryId={props.bigCategoryId}
        bigCategory={props.bigCategory}
        transactionAutoAdd={props.transactionAutoAdd}
        associatedCategory={props.associatedCategory}
        handlePurchaseChange={props.handlePurchaseChange}
        handleDateChange={props.handleDateChange}
        handleAmountChange={props.handleAmountChange}
        handleShopChange={props.handleShopChange}
        handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
        handleCloseModal={props.handleCloseModal}
        unInput={props.unInput}
        minDate={date}
        handleShoppingListItem={props.handleAddShoppingListItem}
        displayInputAmountMessage={false}
        setBigCategory={props.setBigCategory}
        setBigCategoryId={props.setBigCategoryId}
        setCustomCategoryId={props.setCustomCategoryId}
        setMediumCategoryId={props.setMediumCategoryId}
        setAssociatedCategory={props.setAssociatedCategory}
      />
    </div>
  );

  return (
    <>
      <button className={styles.btn} disabled={false} onClick={props.handleOpenModal}>
        <AddIcon />
        買い物リストに追加
      </button>
      <Modal
        open={props.open}
        onClose={props.handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default AddShoppingListItemModal;
