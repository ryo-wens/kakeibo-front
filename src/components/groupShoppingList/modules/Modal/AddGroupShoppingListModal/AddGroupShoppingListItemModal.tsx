import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import '../../../../shoppingList/modules/Modal/AddShoppingListItemModal/add-shopping-list-item-modal.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import GroupShoppingListFormContainer from '../../../../../containers/groupShoppingList/modules/form/GroupShoppingListFormContainer';

interface AddGroupShoppingListItemModalProps {
  open: boolean;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  paymentUser: string | null;
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
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openModal: () => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
}

const AddGroupShoppingListItemModal = (props: AddGroupShoppingListItemModalProps) => {
  const body = (
    <div className="add-shopping-list-item-modal">
      <GroupShoppingListFormContainer
        titleLabel={'買い物リストに追加'}
        buttonLabel={'追加'}
        expectedPurchaseDate={props.expectedPurchaseDate}
        purchase={props.purchase}
        shop={props.shop}
        amount={props.amount}
        bigCategoryId={props.bigCategoryId}
        bigCategory={props.bigCategory}
        bigCategoryIndex={props.bigCategoryIndex}
        paymentUser={props.paymentUser}
        transactionAutoAdd={props.transactionAutoAdd}
        associatedCategory={props.associatedCategory}
        handlePurchaseChange={props.handlePurchaseChange}
        handleDateChange={props.handleDateChange}
        handleAmountChange={props.handleAmountChange}
        selectCategory={props.selectCategory}
        handleShopChange={props.handleShopChange}
        handlePaymentUserChange={props.handlePaymentUserChange}
        handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
        closeModal={props.closeModal}
        unInput={props.unInput}
        minDate={date}
        shoppingListItemOperation={props.shoppingListItemOperation}
        displayRequiredInputItemMessage={false}
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

export default AddGroupShoppingListItemModal;
