import React from 'react';
import Modal from '@material-ui/core/Modal';
import GroupShoppingListFormContainer from '../../../../../../containers/groupShoppingList/modules/form/GroupShoppingListFormContainer';
import styles from '../../../../../shoppingList/modules/listItem/ShoppingListItemComponent/CheckedShoppingListItemModal/CheckedShoppingListItemModal.module.scss';

interface CheckedGroupShoppingListItemModalProps {
  open: boolean;
  checked: boolean;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseModal: () => void;
  unInput: boolean;
  handleEditShoppingListItem: () => void;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CheckedGroupShoppingListItemModal = (props: CheckedGroupShoppingListItemModalProps) => {
  const body = (
    <div className={styles.modalWrapper}>
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
        displayRequiredInputItemMessage={true}
        setBigCategory={props.setBigCategory}
        setAssociatedCategory={props.setAssociatedCategory}
        setBigCategoryId={props.setBigCategoryId}
        setMediumCategoryId={props.setMediumCategoryId}
        setCustomCategoryId={props.setCustomCategoryId}
      />
    </div>
  );

  return (
    <>
      <label className={styles.check}>
        <input type="checkbox" checked={props.checked} onChange={props.handleCheckedChange} />
        <span />
      </label>
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

export default CheckedGroupShoppingListItemModal;
