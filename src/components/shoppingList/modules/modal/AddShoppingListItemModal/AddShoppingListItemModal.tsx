import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import './add-shopping-list-item-modal.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
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
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  unInput: boolean;
  handleAddShoppingListItem: () => void;
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
        bigCategoryIndex={props.bigCategoryIndex}
        transactionAutoAdd={props.transactionAutoAdd}
        associatedCategory={props.associatedCategory}
        handlePurchaseChange={props.handlePurchaseChange}
        handleDateChange={props.handleDateChange}
        handleAmountChange={props.handleAmountChange}
        selectCategory={props.selectCategory}
        handleShopChange={props.handleShopChange}
        handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
        handleCloseModal={props.handleCloseModal}
        unInput={props.unInput}
        minDate={date}
        handleShoppingListItem={props.handleAddShoppingListItem}
        displayInputAmountMessage={false}
      />
    </div>
  );

  return (
    <>
      <button
        className="add-shopping-list-item-modal__button"
        disabled={false}
        onClick={() => props.handleOpenModal()}
      >
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
