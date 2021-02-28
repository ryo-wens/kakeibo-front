import React from 'react';
import Modal from '@material-ui/core/Modal';
import ShoppingListDeleteForm from '../../../../../shoppingList/modules/form/ShoppingListDeleteForm/ShoppingListDeleteForm';
import EditIcon from '@material-ui/icons/Edit';
import '../../../../../shoppingList/modules/listItem/RegularShoppingListItemComponent/EditRegularShoppingListItemModal/edit-regular-shopping-list-item-modal.scss';

import GroupRegularShoppingListFormContainer from '../../../../../../containers/groupShoppingList/modules/form/GroupRegularShoppingListFormContainer';
import { PurchaseCycleType } from '../../../../../../reducks/shoppingList/types';

interface EditGroupRegularShoppingListItemModalProps {
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
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  regularShoppingListItemOperation: () => void;
  deleteOperation: () => void;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditGroupRegularShoppingListItemModal = (
  props: EditGroupRegularShoppingListItemModalProps
) => {
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
        <GroupRegularShoppingListFormContainer
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
          paymentUser={props.paymentUser}
          transactionAutoAdd={props.transactionAutoAdd}
          associatedCategory={props.associatedCategory}
          handleDateChange={props.handleDateChange}
          handleCycleTypeChange={props.handleCycleTypeChange}
          handleCycleChange={props.handleCycleChange}
          handlePurchaseChange={props.handlePurchaseChange}
          handleAmountChange={props.handleAmountChange}
          handleShopChange={props.handleShopChange}
          handlePaymentUserChange={props.handlePaymentUserChange}
          handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
          closeModal={props.closeModal}
          unInput={props.unInput}
          minDate={new Date('1900-01-01')}
          regularShoppingListItemOperation={props.regularShoppingListItemOperation}
          openDeleteForm={props.openDeleteForm}
          bigCategoryMenuOpen={props.bigCategoryMenuOpen}
          mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
          setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
          setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
          setBigCategory={props.setBigCategory}
          setBigCategoryId={props.setBigCategoryId}
          setCustomCategoryId={props.setCustomCategoryId}
          setMediumCategoryId={props.setMediumCategoryId}
          setBigCategoryIndex={props.setBigCategoryIndex}
          setAssociatedCategory={props.setAssociatedCategory}
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

export default EditGroupRegularShoppingListItemModal;
