import React from 'react';
import {
  GenericButton,
  DatePicker,
  TextInput,
  KindSelectBox,
  SelectPayer,
  BigCategoryInput,
  MediumCategoryInput,
} from '../../uikit';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import CloseIcon from '@material-ui/icons/Close';
import { AssociatedCategory, Category, Categories } from '../../../reducks/categories/types';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { Groups } from '../../../reducks/groups/types';
import './transaction-modal.scss';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  selectDate: Date;
  year: number;
  month: number;
  resetForm: () => void;
  groupId: number;
  pathName: string;
  unInput: boolean;
  addDisabled: boolean;
  unEditInputForm: boolean;
  addTransactionMonth: number;
  transactionDate: Date | null;
  transactionType: string;
  amount: string;
  bigCategory: string | null;
  bigCategoryId: number;
  bigCategoryIndex: number;
  associatedCategory: string;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  paymentUserId: string;
  shop: string;
  memo: string;
  bigCategoryRef: React.RefObject<HTMLDivElement>;
  mediumMenuRef: React.RefObject<HTMLDivElement>;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  approvedGroup: Groups;
  incomeCategories: Categories;
  expenseCategories: Categories;
  groupIncomeCategories: GroupCategories;
  groupExpenseCategories: GroupCategories;
  personalAddRequestData: TransactionsReq;
  groupAddRequestData: GroupTransactionsReq;
  switchingAddTransaction: () => void;
  changeTransactionDate: (transactionDate: Date | null) => void;
  changeTransactionType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  closeBigCategoryMenu: (event: Event) => void;
  closeMediumCategoryMenu: (event: Event) => void;
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTransactionModal = (props: AddTransactionModalProps) => {
  const body = (
    <div className="transaction-modal transaction-modal--add">
      <button
        className="transaction-modal__close-button"
        onClick={() => {
          props.onClose();
          props.resetForm();
        }}
      >
        <CloseIcon />
      </button>
      <h3 className="transaction-modal--title">家計簿の追加</h3>
      {props.addDisabled && props.pathName === 'group' && (
        <div className="transaction-modal__message">
          {props.addTransactionMonth + '月'}は会計済みのため追加できません。
        </div>
      )}
      <div className="transaction-modal__delimiter-line" />
      <div className="transaction-modal__delimiter-line--form-spacer" />

      <form className="transaction-modal__form-column">
        <div className="transaction-modal__form-content">
          <DatePicker
            id={'date-picker-dialog'}
            label={'日付'}
            value={props.transactionDate}
            onChange={props.changeTransactionDate}
            required={true}
            disabled={props.unEditInputForm}
            minDate={new Date('1900-01-01')}
          />
          <div className="transaction-modal__form-content--spacer-small" />
          <KindSelectBox
            onChange={props.changeTransactionType}
            required={true}
            value={props.transactionType}
            disabled={props.unEditInputForm}
            currentPage={''}
          />
          <div className="transaction-modal__form-content--spacer-small" />
          <TextInput
            value={props.amount}
            type={'tel'}
            id={'amount'}
            label={'金額'}
            onChange={props.changeAmount}
            required={true}
            fullWidth={false}
            disabled={props.unEditInputForm}
          />
          <div className="transaction-modal__form-content--spacer-medium" />
          {props.pathName === 'group' && (
            <>
              <SelectPayer
                approvedGroups={props.approvedGroup}
                groupId={props.groupId}
                onChange={props.changePayer}
                pathName={props.pathName}
                required={true}
                value={props.paymentUserId}
                disabled={props.unEditInputForm}
                notSpecified={false}
              />
              <div className="transaction-modal__form-content--spacer-medium" />
            </>
          )}
          <div className="transaction-modal__select-category">
            <BigCategoryInput
              kind={props.transactionType}
              ref={props.bigCategoryRef}
              bigCategory={props.bigCategory}
              bigCategoryMenuOpen={props.bigCategoryMenuOpen}
              onClick={props.changeCategory}
              onClickCloseBigCategoryMenu={props.closeBigCategoryMenu}
              setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
              disabled={props.unEditInputForm}
              expenseCategories={
                props.pathName !== 'group' ? props.expenseCategories : props.groupExpenseCategories
              }
              incomeCategories={
                props.pathName !== 'group' ? props.incomeCategories : props.groupIncomeCategories
              }
            />
          </div>
          <div className="transaction-modal__form-content--spacer-medium" />
          <div className="transaction-modal__select-category">
            <MediumCategoryInput
              kind={props.transactionType}
              ref={props.mediumMenuRef}
              bigCategory={props.bigCategory}
              associatedCategory={props.associatedCategory}
              bigCategoryId={props.bigCategoryId}
              bigCategoryIndex={props.bigCategoryIndex}
              mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
              onClick={props.changeCategory}
              onClickCloseMediumCategoryMenu={props.closeMediumCategoryMenu}
              setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
              disabled={props.unEditInputForm}
              expenseCategories={
                props.pathName !== 'group' ? props.expenseCategories : props.groupExpenseCategories
              }
              incomeCategories={
                props.pathName !== 'group' ? props.incomeCategories : props.groupIncomeCategories
              }
            />
          </div>
          <div className="transaction-modal__form-content--spacer-medium" />
          <TextInput
            value={props.shop}
            type={'text'}
            id={'shop'}
            label={'店名'}
            onChange={props.changeShop}
            required={false}
            fullWidth={false}
            disabled={props.unEditInputForm}
          />
          <div className="transaction-modal__form-content--spacer-small" />
          <TextInput
            value={props.memo}
            type={'text'}
            id={'memo'}
            label={'メモ'}
            onChange={props.changeMemo}
            required={false}
            fullWidth={false}
            disabled={props.unEditInputForm}
          />
          <div className="transaction-modal__form-content--spacer-medium" />
          <div className="transaction-modal__delimiter-line--form-spacer" />
          <GenericButton
            label={'追加する'}
            disabled={props.unInput || props.addDisabled}
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              props.switchingAddTransaction();
            }}
          />
          <div className="transaction-modal__form-content-submit-button" />
        </div>
      </form>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.onClose();
        props.resetForm();
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};
export default AddTransactionModal;
