import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import { date } from '../../../../../lib/constant';
import GroupRegularShoppingListFormContainer from '../../../../../containers/groupShoppingList/modules/form/GroupRegularShoppingListFormContainer';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';
import cn from 'classnames';
import styles from '../../../../shoppingList/modules/modal/addRegularShoppingListItemModal/AddRegularShoppingListItemModal.module.scss';

interface AddGroupRegularShoppingListModalProps {
  open: boolean;
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
  handleDateChange: (expectedPurchaseDate: Date | null) => void;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleLabel: string;
  buttonLabel: string;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  unInput: boolean;
  handleAddRegularShoppingListItem: () => void;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  addBtnClassName?: string;
}

const AddGroupRegularShoppingListModal = (props: AddGroupRegularShoppingListModalProps) => {
  const body = (
    <div className={styles.modalWrapper}>
      <GroupRegularShoppingListFormContainer
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
        titleLabel={'定期買い物リストに追加'}
        buttonLabel={'追加'}
        handleCloseModal={props.handleCloseModal}
        unInput={props.unInput}
        handleRegularShoppingListItem={props.handleAddRegularShoppingListItem}
        minDate={date}
        bigCategoryMenuOpen={props.bigCategoryMenuOpen}
        mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
        setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
        setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
        setBigCategory={props.setBigCategory}
        setAssociatedCategory={props.setAssociatedCategory}
        setBigCategoryId={props.setBigCategoryId}
        setCustomCategoryId={props.setCustomCategoryId}
        setMediumCategoryId={props.setMediumCategoryId}
        setBigCategoryIndex={props.setBigCategoryIndex}
      />
    </div>
  );

  return (
    <>
      <button
        className={cn(styles.btn, props.addBtnClassName)}
        disabled={false}
        onClick={props.handleOpenModal}
      >
        <AddIcon />
        定期買い物リストに追加
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

export default AddGroupRegularShoppingListModal;
