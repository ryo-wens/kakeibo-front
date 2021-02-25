import React from 'react';
import Modal from '@material-ui/core/Modal';
import './edit-shopping-list-item-modal.scss';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingListDeleteForm from '../../../form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import ShoppingListFormContainer from '../../../../../../containers/shoppingList/modules/form/ShoppingListFormContainer';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';

interface EditShoppingListItemModalProps {
  open: boolean;
  deleteForm: boolean;
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
  openDeleteForm: () => void;
  closeDeleteForm: () => void;
  initialPurchase: string;
  unInput: boolean;
  handleEditShoppingListItem: () => void;
  handleDeleteShoppingListItem: () => void;
}

const EditShoppingListItemModal = (props: EditShoppingListItemModalProps) => {
  const body = (
    <div className="edit-shopping-list-item-modal">
      {props.deleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'買い物リストアイテムを削除'}
          purchase={props.initialPurchase}
          handleCloseModal={props.handleCloseModal}
          closeDeleteForm={props.closeDeleteForm}
          handleDeleteShoppingListItem={props.handleDeleteShoppingListItem}
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
          minDate={new Date('1900-01-01')}
          handleShoppingListItem={props.handleEditShoppingListItem}
          displayInputAmountMessage={false}
          openDeleteForm={props.openDeleteForm}
        />
      )}
    </div>
  );

  return (
    <>
      <EditIcon
        className="edit-shopping-list-item-modal__edit-icon"
        onClick={() => props.handleOpenModal()}
      />
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

export default EditShoppingListItemModal;
