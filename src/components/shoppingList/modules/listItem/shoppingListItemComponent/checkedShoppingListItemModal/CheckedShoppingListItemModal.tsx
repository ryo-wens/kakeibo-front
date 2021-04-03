import React from 'react';
import Modal from '@material-ui/core/Modal';
import styles from './CheckedShoppingListItemModal.module.scss';
import ShoppingListFormContainer from '../../../../../../containers/shoppingList/modules/form/ShoppingListFormContainer';

interface CheckedShoppingListItemModalProps {
  open: boolean;
  expectedPurchaseDate: Date | null;
  checked: boolean;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  handleEditShoppingListItem: () => void;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CheckedShoppingListItemModal = (props: CheckedShoppingListItemModalProps) => {
  const body = (
    <div className={styles.modalWrapper}>
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
        handleCloseModal={props.closeModal}
        unInput={props.unInput}
        minDate={new Date('1900-01-01')}
        handleShoppingListItem={props.handleEditShoppingListItem}
        displayInputAmountMessage={true}
        setBigCategory={props.setBigCategory}
        setBigCategoryId={props.setBigCategoryId}
        setCustomCategoryId={props.setCustomCategoryId}
        setMediumCategoryId={props.setMediumCategoryId}
        setAssociatedCategory={props.setAssociatedCategory}
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
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default CheckedShoppingListItemModal;
