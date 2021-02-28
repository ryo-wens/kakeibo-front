import React from 'react';
import { GenericButton, DatePicker, TextInput, KindSelectBox, SelectPayer } from '../../uikit';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import CloseIcon from '@material-ui/icons/Close';
import { Categories } from '../../../reducks/categories/types';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { Groups } from '../../../reducks/groups/types';
import './transaction-modal.scss';
import BigCategoryListContainer from '../../../containers/modules/BigCategoryListContainer';
import MediumCategoryListContainer from '../../../containers/modules/MediumCategoryListContainer';

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
  bigCategoryMenuRef: React.RefObject<HTMLDivElement>;
  mediumCategoryMenuRef: React.RefObject<HTMLDivElement>;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
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
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setEditCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setBigEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
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
            <BigCategoryListContainer
              customCategoryName={props.customCategoryName}
              setCustomCategoryName={props.setCustomCategoryName}
              bigCategoryMenuRef={props.bigCategoryMenuRef}
              mediumCategoryMenuRef={props.mediumCategoryMenuRef}
              transactionType={props.transactionType}
              bigCategoryMenuOpen={props.bigCategoryMenuOpen}
              unEditInputForm={props.unEditInputForm}
              setBigCategoryId={props.setBigCategoryId}
              setBigCategoryIndex={props.setBigCategoryIndex}
              setMediumCategoryId={props.setMediumCategoryId}
              setCustomCategoryId={props.setCustomCategoryId}
              setAssociatedCategory={props.setAssociatedCategory}
              setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
              associatedIndex={props.associatedIndex}
              bigCategory={props.bigCategory}
              bigEditCategoryIndex={props.bigEditCategoryIndex}
              editCustomCategoryName={props.editCustomCategoryName}
              setAssociatedIndex={props.setAssociatedIndex}
              setBigCategory={props.setBigCategory}
              setBigEditCategoryIndex={props.setBigEditCategoryIndex}
              setEditCustomCategoryName={props.setEditCustomCategoryName}
              setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
            />
          </div>
          <div className="transaction-modal__form-content--spacer-medium" />
          <div className="transaction-modal__select-category">
            <MediumCategoryListContainer
              transactionType={props.transactionType}
              unEditInputForm={props.unEditInputForm}
              bigCategoryId={props.bigCategoryId}
              bigCategoryIndex={props.bigCategoryIndex}
              associatedCategory={props.associatedCategory}
              bigCategoryMenuRef={props.bigCategoryMenuRef}
              mediumCategoryMenuRef={props.mediumCategoryMenuRef}
              mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
              setBigCategoryId={props.setBigCategoryId}
              setBigCategoryIndex={props.setBigCategoryIndex}
              setCustomCategoryId={props.setCustomCategoryId}
              setMediumCategoryId={props.setMediumCategoryId}
              setAssociatedCategory={props.setAssociatedCategory}
              setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
              associatedIndex={props.associatedIndex}
              bigCategory={props.bigCategory}
              bigEditCategoryIndex={props.bigCategoryIndex}
              customCategoryName={props.customCategoryName}
              editCustomCategoryName={props.editCustomCategoryName}
              setAssociatedIndex={props.setAssociatedIndex}
              setBigCategory={props.setBigCategory}
              setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
              setBigEditCategoryIndex={props.setBigEditCategoryIndex}
              setCustomCategoryName={props.setCustomCategoryName}
              setEditCustomCategoryName={props.setEditCustomCategoryName}
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
