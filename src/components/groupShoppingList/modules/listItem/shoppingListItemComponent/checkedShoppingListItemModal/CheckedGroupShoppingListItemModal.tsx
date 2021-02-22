import React from 'react';
import Modal from '@material-ui/core/Modal';
import { AssociatedCategory, Category } from '../../../../../../reducks/categories/types';
import '../../../../../shoppingList/modules/listItem/ShoppingListItemComponent/CheckedShoppingListItemModal/checked-shopping-list-item-modal.scss';
import GroupShoppingListFormContainer from '../../../../../../containers/groupShoppingList/modules/form/GroupShoppingListFormContainer';

interface CheckedGroupShoppingListItemModalProps {
  open: boolean;
  checked: boolean;
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
}

const CheckedGroupShoppingListItemModal = (props: CheckedGroupShoppingListItemModalProps) => {
  const body = (
    <div className="checked-shopping-list-item-modal">
      <GroupShoppingListFormContainer
        expectedPurchaseDate={props.expectedPurchaseDate}
        purchase={props.purchase}
        shop={props.shop}
        amount={props.amount}
        bigCategoryId={props.bigCategoryId}
        bigCategory={props.bigCategory}
        bigCategoryIndex={props.bigCategoryIndex}
        paymentUser={props.paymentUser}
        transactionAutoAdd={props.transactionAutoAdd}
        associatedCategory={props.associatedCategory}
        handlePurchaseChange={props.handlePurchaseChange}
        handleDateChange={props.handleDateChange}
        handleAmountChange={props.handleAmountChange}
        handleChangeCategory={props.handleChangeCategory}
        handleShopChange={props.handleShopChange}
        handlePaymentUserChange={props.handlePaymentUserChange}
        handleAutoAddTransitionChange={props.handleAutoAddTransitionChange}
        titleLabel={'買い物リストアイテムを編集'}
        buttonLabel={'保存'}
        closeModal={props.closeModal}
        unInput={props.unInput}
        minDate={new Date('1900-01-01')}
        shoppingListItemOperation={props.shoppingListItemOperation}
        displayRequiredInputItemMessage={true}
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

export default CheckedGroupShoppingListItemModal;
