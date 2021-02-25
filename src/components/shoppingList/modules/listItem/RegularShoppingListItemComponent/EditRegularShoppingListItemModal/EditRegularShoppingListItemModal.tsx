import React from 'react';
import Modal from '@material-ui/core/Modal';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import ShoppingListDeleteForm from '../../../form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import { PurchaseCycleType } from '../../../../../../reducks/shoppingList/types';
import EditIcon from '@material-ui/icons/Edit';
import './edit-regular-shopping-list-item-modal.scss';
import RegularShoppingListFormContainer from '../../../../../../containers/shoppingList/modules/form/RegularShoppingListFormContainer';

interface EditRegularShoppingListModalProps {
  open: boolean;
  deleteForm: boolean;
  expectedPurchaseDate: Date | null;
  cycleType: PurchaseCycleType;
  cycle: string | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  handleEditRegularShoppingListItem: () => void;
  handleDeleteRegularShoppingListItem: () => void;
}

const EditRegularShoppingListItemModal = (props: EditRegularShoppingListModalProps) => {
  const body = (
    <div className="edit-regular-shopping-list-item-modal">
      {props.deleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'定期買い物リストアイテムを削除'}
          purchase={props.initialPurchase}
          handleCloseModal={props.handleCloseModal}
          closeDeleteForm={props.closeDeleteForm}
          handleDeleteShoppingListItem={props.handleDeleteRegularShoppingListItem}
        />
      ) : (
        <RegularShoppingListFormContainer
          titleLabel={'定期買い物リストアイテムを編集'}
          buttonLabel={'保存'}
          expectedPurchaseDate={props.expectedPurchaseDate}
          cycleType={props.cycleType}
          cycle={props.cycle}
          purchase={props.purchase}
          shop={props.shop}
          amount={props.amount}
          bigCategoryId={props.bigCategoryId}
          bigCategory={props.bigCategory}
          bigCategoryIndex={props.bigCategoryIndex}
          transactionAutoAdd={props.transactionAutoAdd}
          associatedCategory={props.associatedCategory}
          handleDateChange={props.handleDateChange}
          handleCycleTypeChange={props.handleCycleTypeChange}
          handleCycleChange={props.handleCycleChange}
          handlePurchaseChange={props.handlePurchaseChange}
          handleAmountChange={props.handleAmountChange}
          selectCategory={props.selectCategory}
          handleShopChange={props.handleShopChange}
          handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
          handleCloseModal={props.handleCloseModal}
          unInput={props.unInput}
          minDate={new Date('1900-01-01')}
          handleRegularShoppingListItem={props.handleEditRegularShoppingListItem}
          openDeleteForm={props.openDeleteForm}
        />
      )}
    </div>
  );

  return (
    <>
      <EditIcon
        className="edit-regular-shopping-list-item-modal__edit-icon"
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

export default EditRegularShoppingListItemModal;
