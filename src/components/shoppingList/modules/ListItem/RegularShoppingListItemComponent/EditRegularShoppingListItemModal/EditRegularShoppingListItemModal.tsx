import React from 'react';
import Modal from '@material-ui/core/Modal';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import ShoppingListDeleteForm from '../../../Form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import { PurchaseCycleType } from '../../../../../../reducks/shoppingList/types';
import EditIcon from '@material-ui/icons/Edit';
import './edit-regular-shopping-list-item-modal.scss';
import RegularShoppingListFormContainer from '../../../../../../containers/shoppingList/modules/Form/RegularShoppingListFormContainer/RegularShoppingListFormContainer';

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
  mediumCategoryId: number | null;
  customCategoryId: number | null;
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
  openModal: () => void;
  closeModal: () => void;
  openDeleteForm: () => void;
  closeDeleteForm: () => void;
  initialPurchase: string;
  unInput: boolean;
  regularShoppingListItemOperation: () => void;
  deleteOperation: () => void;
}

const EditRegularShoppingListItemModal = (props: EditRegularShoppingListModalProps) => {
  const body = (
    <div className="edit-regular-shopping-list-item-modal">
      {props.deleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'定期買い物リストアイテムを削除'}
          purchase={props.initialPurchase}
          closeModal={props.closeModal}
          closeDeleteForm={props.closeDeleteForm}
          deleteOperation={props.deleteOperation}
        />
      ) : (
        <RegularShoppingListFormContainer
          titleLabel={'定期買い物リストアイテムを削除'}
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
          mediumCategoryId={props.mediumCategoryId}
          customCategoryId={props.customCategoryId}
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
          closeModal={props.closeModal}
          unInput={props.unInput}
          minDate={new Date('1900-01-01')}
          regularShoppingListItemOperation={props.regularShoppingListItemOperation}
          openDeleteForm={props.openDeleteForm}
        />
      )}
    </div>
  );

  return (
    <>
      <EditIcon
        className="edit-regular-shopping-list-item-modal__edit-icon"
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

export default EditRegularShoppingListItemModal;
