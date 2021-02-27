import React from 'react';
import Modal from '@material-ui/core/Modal';
import './edit-shopping-list-item-modal.scss';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingListDeleteForm from '../../../form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import ShoppingListFormContainer from '../../../../../../containers/shoppingList/modules/form/ShoppingListFormContainer';

interface EditShoppingListItemModalProps {
  open: boolean;
  deleteForm: boolean;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openModal: () => void;
  closeModal: () => void;
  openDeleteForm: () => void;
  closeDeleteForm: () => void;
  initialPurchase: string;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  deleteOperation: () => void;
}

const EditShoppingListItemModal = (props: EditShoppingListItemModalProps) => {
  const body = (
    <div className="edit-shopping-list-item-modal">
      {props.deleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'買い物リストアイテムを削除'}
          purchase={props.initialPurchase}
          closeModal={props.closeModal}
          closeDeleteForm={props.closeDeleteForm}
          deleteOperation={props.deleteOperation}
        />
      ) : (
        <ShoppingListFormContainer
          titleLabel={'買い物リストアイテムを編集'}
          buttonLabel={'保存'}
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
          minDate={new Date('1900-01-01')}
          shoppingListItemOperation={props.shoppingListItemOperation}
          displayInputAmountMessage={false}
          openDeleteForm={props.openDeleteForm}
          setBigCategory={props.setBigCategory}
          setBigCategoryId={props.setBigCategoryId}
          setCustomCategoryId={props.setCustomCategoryId}
          setMediumCategoryId={props.setMediumCategoryId}
          setAssociatedCategory={props.setAssociatedCategory}
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

export default EditShoppingListItemModal;
