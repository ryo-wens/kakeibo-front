import React from 'react';
import Modal from '@material-ui/core/Modal';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import './checked-shopping-list-item-modal.scss';
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
  bigCategoryIndex: number;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckedShoppingListItemModal = (props: CheckedShoppingListItemModalProps) => {
  const body = (
    <div className="checked-shopping-list-item-modal">
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
        handleChangeCategory={props.handleChangeCategory}
        handleShopChange={props.handleShopChange}
        handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
        closeModal={props.closeModal}
        unInput={props.unInput}
        minDate={new Date('1900-01-01')}
        shoppingListItemOperation={props.shoppingListItemOperation}
        displayInputAmountMessage={true}
        bigCategoryMenuOpen={props.bigCategoryMenuOpen}
        mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
        setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
        setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
      />
    </div>
  );

  return (
    <>
      <label className="checked-shopping-list-item-modal__check">
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
