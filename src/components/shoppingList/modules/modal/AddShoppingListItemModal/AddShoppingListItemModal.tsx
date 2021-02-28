import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import './add-shopping-list-item-modal.scss';
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
  openModal: () => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
}

const AddShoppingListItemModal = (props: AddShoppingListModalProps) => {
  const body = (
    <div className="add-shopping-list-item-modal">
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
        closeModal={props.closeModal}
        unInput={props.unInput}
        minDate={date}
        shoppingListItemOperation={props.shoppingListItemOperation}
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
      <button
        className="add-shopping-list-item-modal__button"
        disabled={false}
        onClick={() => props.openModal()}
      >
        <AddIcon />
        買い物リストに追加
      </button>
      <Modal
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default AddShoppingListItemModal;
