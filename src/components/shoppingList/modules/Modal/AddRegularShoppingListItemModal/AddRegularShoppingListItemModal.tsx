import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { date } from '../../../../../lib/constant';
import './add-regular-shopping-list-item-modal.scss';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';
import RegularShoppingListFormContainer from '../../../../../containers/shoppingList/modules/form/RegularShoppingListFormContainer';

interface AddRegularShoppingListModalProps {
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
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handleDateChange: (expectedPurchaseDate: Date | null) => void;
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
  titleLabel: string;
  buttonLabel: string;
  openModal: () => void;
  closeModal: () => void;
  unInput: boolean;
  regularShoppingListItemOperation: () => void;
}

const AddRegularShoppingListItemModal = (props: AddRegularShoppingListModalProps) => {
  const body = (
    <div className="add-regular-shopping-list-item-modal">
      <RegularShoppingListFormContainer
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
        titleLabel={'定期買い物リストに追加'}
        buttonLabel={'追加'}
        closeModal={props.closeModal}
        unInput={props.unInput}
        minDate={date}
        regularShoppingListItemOperation={props.regularShoppingListItemOperation}
      />
    </div>
  );

  return (
    <>
      <button
        className="add-regular-shopping-list-item-modal__button"
        disabled={false}
        onClick={() => props.openModal()}
      >
        <AddIcon />
        定期買い物リストに追加
      </button>
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

export default AddRegularShoppingListItemModal;
