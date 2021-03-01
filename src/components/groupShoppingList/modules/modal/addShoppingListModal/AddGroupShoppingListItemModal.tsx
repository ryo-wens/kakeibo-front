import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import '../../../../shoppingList/modules/modal/AddShoppingListItemModal/add-shopping-list-item-modal.scss';
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
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  unInput: boolean;
  handleAddShoppingListItem: () => void;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
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
        paymentUser={props.paymentUser}
        transactionAutoAdd={props.transactionAutoAdd}
        associatedCategory={props.associatedCategory}
        handlePurchaseChange={props.handlePurchaseChange}
        handleDateChange={props.handleDateChange}
        handleAmountChange={props.handleAmountChange}
        handleShopChange={props.handleShopChange}
        handlePaymentUserChange={props.handlePaymentUserChange}
        handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
        handleCloseModal={props.handleCloseModal}
        unInput={props.unInput}
        minDate={date}
        handleShoppingListItem={props.handleAddShoppingListItem}
        displayRequiredInputItemMessage={false}
        setBigCategory={props.setBigCategory}
        setAssociatedCategory={props.setAssociatedCategory}
        setBigCategoryId={props.setBigCategoryId}
        setCustomCategoryId={props.setCustomCategoryId}
        setMediumCategoryId={props.setMediumCategoryId}
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

export default AddGroupShoppingListItemModal;
