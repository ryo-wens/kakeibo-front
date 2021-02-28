import React from 'react';
import Modal from '@material-ui/core/Modal';
import '../../../../../shoppingList/modules/listItem/ShoppingListItemComponent/EditShoppingListItemModal/edit-shopping-list-item-modal.scss';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingListDeleteForm from '../../../../../shoppingList/modules/form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import GroupShoppingListFormContainer from '../../../../../../containers/groupShoppingList/modules/form/GroupShoppingListFormContainer';

interface EditGroupShoppingListItemModalProps {
  open: boolean;
  deleteForm: boolean;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openModal: () => void;
  closeModal: () => void;
  openDeleteForm: () => void;
  closeDeleteForm: () => void;
  initialPurchase: string;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  handleDeleteShoppingListItem: () => void;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditGroupShoppingListItemModal = (props: EditGroupShoppingListItemModalProps) => {
  const body = (
    <div className="edit-shopping-list-item-modal">
      {props.deleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'買い物リストアイテムを削除'}
          purchase={props.initialPurchase}
          handleCloseModal={props.closeModal}
          closeDeleteForm={props.closeDeleteForm}
          handleDeleteShoppingListItem={props.handleDeleteShoppingListItem}
        />
      ) : (
        <GroupShoppingListFormContainer
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
          titleLabel={'買い物リストアイテムを編集'}
          buttonLabel={'保存'}
          closeModal={props.closeModal}
          unInput={props.unInput}
          minDate={new Date('1900-01-01')}
          shoppingListItemOperation={props.shoppingListItemOperation}
          displayRequiredInputItemMessage={false}
          openDeleteForm={props.openDeleteForm}
          setAssociatedCategory={props.setAssociatedCategory}
          setBigCategory={props.setBigCategory}
          setBigCategoryId={props.setBigCategoryId}
          setCustomCategoryId={props.setCustomCategoryId}
          setMediumCategoryId={props.setMediumCategoryId}
        />
      )}
    </div>
  );

  return (
    <>
      <EditIcon
        className="edit-shopping-list-item-modal__edit-icon"
        onClick={() => props.openModal()}
      />
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

export default EditGroupShoppingListItemModal;
