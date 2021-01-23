import React from 'react';
import Modal from '@material-ui/core/Modal';
import ShoppingListForm from '../../Form/ShoppingListForm/ShoppingListForm';
import AddIcon from '@material-ui/icons/Add';
import './add-shopping-list-modal.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import { addShoppingListItem } from '../../../../../reducks/shoppingList/operations';
import { CancelTokenSource } from 'axios';

interface AddShoppingListModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openModal: () => void;
  closeModal: () => void;
  unInput: boolean;
  signal: CancelTokenSource;
}

const AddShoppingListModal = (props: AddShoppingListModalProps) => {
  const body = (
    <div className="add-shopping-list-modal">
      <ShoppingListForm
        expectedPurchaseDate={props.expectedPurchaseDate}
        purchase={props.purchase}
        shop={props.shop}
        amount={props.amount}
        bigCategoryId={props.bigCategoryId}
        bigCategory={props.bigCategory}
        bigCategoryIndex={props.bigCategoryIndex}
        mediumCategoryId={props.mediumCategoryId}
        customCategoryId={props.customCategoryId}
        transactionAutoAdd={props.transactionAutoAdd}
        associatedCategory={props.associatedCategory}
        handlePurchaseChange={props.handlePurchaseChange}
        handleDateChange={props.handleDateChange}
        handleAmountChange={props.handleAmountChange}
        selectCategory={props.selectCategory}
        handleShopChange={props.handleShopChange}
        handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
        titleLabel={'買い物リストに追加'}
        buttonLabel={'追加'}
        setOpen={props.setOpen}
        closeModal={props.closeModal}
        unInput={props.unInput}
        minDate={date}
        dispatchOperation={addShoppingListItem(
          date,
          props.expectedPurchaseDate,
          props.purchase,
          props.shop,
          typeof props.amount === 'string' ? Number(props.amount) : props.amount,
          props.bigCategoryId,
          props.mediumCategoryId,
          props.customCategoryId,
          props.transactionAutoAdd,
          props.signal
        )}
        displayInputAmountMessage={false}
      />
    </div>
  );

  return (
    <>
      <button
        className="add-shopping-list-modal__button"
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

export default AddShoppingListModal;
