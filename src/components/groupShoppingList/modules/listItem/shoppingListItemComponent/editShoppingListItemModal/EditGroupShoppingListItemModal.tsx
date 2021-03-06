import React from 'react';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingListDeleteForm from '../../../../../shoppingList/modules/form/shoppingListDeleteForm/ShoppingListDeleteForm';
import GroupShoppingListFormContainer from '../../../../../../containers/groupShoppingList/modules/form/GroupShoppingListFormContainer';
import styles from '../../../../../shoppingList/modules/listItem/shoppingListItemComponent/editShoppingListItemModal/EditShoppingListItemModal.module.scss';

interface EditGroupShoppingListItemModalProps {
  open: boolean;
  openDeleteForm: boolean;
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
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleOpenDeleteForm: () => void;
  handleCloseDeleteForm: () => void;
  initialPurchase: string;
  unInput: boolean;
  handleEditShoppingListItem: () => void;
  handleDeleteShoppingListItem: () => void;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditGroupShoppingListItemModal = (props: EditGroupShoppingListItemModalProps) => {
  const body = (
    <div className={styles.modalWrapper}>
      {props.openDeleteForm ? (
        <ShoppingListDeleteForm
          titleLabel={'買い物リストアイテムを削除'}
          purchase={props.initialPurchase}
          handleCloseModal={props.handleCloseModal}
          handleCloseDeleteForm={props.handleCloseDeleteForm}
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
          handleCloseModal={props.handleCloseModal}
          unInput={props.unInput}
          minDate={new Date('1900-01-01')}
          handleShoppingListItem={props.handleEditShoppingListItem}
          displayRequiredInputItemMessage={false}
          handleOpenDeleteForm={props.handleOpenDeleteForm}
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
      <EditIcon className={styles.editIcon} onClick={props.handleOpenModal} />
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

export default EditGroupShoppingListItemModal;
