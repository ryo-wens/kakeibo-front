import React from 'react';
import { Categories, Category, AssociatedCategory } from '../../../reducks/categories/types';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { Groups } from '../../../reducks/groups/types';
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
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import './transaction-modal.scss';

interface InputModalProps {
  open: boolean;
  onClose: () => void;
  transactionId: number;
  group_id: number;
  pathName: string;
  editDisabled: boolean;
  unEditInputForm: boolean;
  unInput: boolean;
  editTransactionMonth: number;
  transactionDate: Date | null;
  transactionsType: string;
  amount: string;
  bigCategory: string | null;
  bigCategoryId: number;
  bigCategoryIndex: number;
  associatedCategory: string;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memo: string | null;
  shop: string | null;
  paymentUserId: string;
  bigCategoryRef: React.RefObject<HTMLDivElement>;
  mediumMenuRef: React.RefObject<HTMLDivElement>;
  approvedGroups: Groups;
  incomeCategories: Categories;
  expenseCategories: Categories;
  groupIncomeCategories: GroupCategories;
  groupExpenseCategories: GroupCategories;
  resetForm: () => void;
  changeTransactionDate: (transactionDate: Date | null) => void;
  changeTransactionType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  handleCloseBigCategoryMenu: (event: Event) => void;
  handleCloseMediumCategoryMenu: (event: Event) => void;
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  personalDeleteTransaction: () => void;
  personalEditTransaction: () => void;
  groupDeleteTransaction: () => void;
  groupEditTransaction: () => void;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
  handleChangeAddCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEditCustomCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenEditCustomCategoryField: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryName: string,
    associatedCategoryIndex: number,
    bigCategoriesIndex: number,
    categoryType: string
  ) => void;
  handleAddCustomCategory: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bigCategoryId: number,
    categoryType: string
  ) => void;
  handleEditCustomCategory: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number,
    categoryType: string
  ) => void;
  handleDeleteCustomCategory: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number
  ) => void;
}

const EditTransactionModal = (props: InputModalProps) => {
  const body = (
    <div className="transaction-modal transaction-modal--edit">
      <button
        className="transaction-modal__close-button"
        onClick={() => {
          props.onClose();
          props.resetForm();
        }}
      >
        <CloseIcon />
      </button>
      <h3 className="transaction-modal--title">家計簿の編集</h3>
      {props.editDisabled && (
        <div className="transaction-modal__message">
          {props.editTransactionMonth + '月'}は会計済みのため編集できません。
        </div>
      )}
      <div className="transaction-modal__delimiter-line" />
      <div className="transaction-modal__delimiter-line--form-spacer" />
      <form className="transaction-modal__form-column">
        <div className="transaction-modal__form-content">
          <DatePicker
            id={'date'}
            label={'日付'}
            value={props.transactionDate}
            onChange={props.changeTransactionDate}
            required={false}
            disabled={props.unEditInputForm}
            minDate={new Date('1900-01-01')}
          />
          <div className="transaction-modal__form-content--spacer-small" />
          <KindSelectBox
            value={props.transactionsType}
            onChange={props.changeTransactionType}
            required={false}
            disabled={props.unEditInputForm}
            currentPage={''}
          />
          <div className="transaction-modal__form-content--spacer-small" />
          <TextInput
            id={'amount'}
            label={'金額'}
            type={'tell'}
            required={false}
            fullWidth={false}
            onChange={props.changeAmount}
            value={props.amount}
            disabled={props.unEditInputForm}
          />
          <div className="transaction-modal__form-content--spacer-small" />
          {props.pathName === 'group' && (
            <>
              <SelectPayer
                approvedGroups={props.approvedGroups}
                groupId={props.group_id}
                onChange={props.changePayer}
                pathName={props.pathName}
                required={true}
                value={props.paymentUserId}
                disabled={props.unEditInputForm}
                notSpecified={false}
              />
              <div className="transaction-modal__form-content--spacer-small" />
            </>
          )}
          <div className="transaction-modal__select-category">
            <BigCategoryInput
              kind={props.transactionsType}
              ref={props.bigCategoryRef}
              bigCategory={props.bigCategory}
              handleChangeCategory={props.handleChangeCategory}
              onClickCloseBigCategoryMenu={props.handleCloseBigCategoryMenu}
              setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
              disabled={props.unEditInputForm}
              bigCategoryMenuOpen={props.bigCategoryMenuOpen}
              expenseCategories={
                props.pathName !== 'group' ? props.expenseCategories : props.groupExpenseCategories
              }
              incomeCategories={
                props.pathName !== 'group' ? props.incomeCategories : props.groupIncomeCategories
              }
              customCategoryName={props.customCategoryName}
              editCustomCategoryName={props.editCustomCategoryName}
              associatedIndex={props.associatedIndex}
              bigEditCategoryIndex={props.bigEditCategoryIndex}
              handleChangeAddCustomCategory={props.handleChangeAddCustomCategory}
              handleChangeEditCustomCategory={props.handleChangeEditCustomCategory}
              handleAddCustomCategory={props.handleAddCustomCategory}
              handleEditCustomCategory={props.handleEditCustomCategory}
              handleDeleteCustomCategory={props.handleDeleteCustomCategory}
              handleOpenEditCustomCategoryField={props.handleOpenEditCustomCategoryField}
            />
          </div>
          <div className="transaction-modal__form-content--spacer-medium" />
          <div className="input-form__select-category">
            <MediumCategoryInput
              kind={props.transactionsType}
              ref={props.mediumMenuRef}
              bigCategory={props.bigCategory}
              associatedCategory={props.associatedCategory}
              bigCategoryId={props.bigCategoryId}
              bigCategoryIndex={props.bigCategoryIndex}
              mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
              handleChangeCategory={props.handleChangeCategory}
              onClickCloseMediumCategoryMenu={props.handleCloseMediumCategoryMenu}
              setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
              disabled={props.unEditInputForm}
              expenseCategories={
                props.pathName !== 'group' ? props.expenseCategories : props.groupExpenseCategories
              }
              incomeCategories={
                props.pathName !== 'group' ? props.incomeCategories : props.groupIncomeCategories
              }
              associatedIndex={props.associatedIndex}
              bigEditCategoryIndex={props.bigEditCategoryIndex}
              customCategoryName={props.customCategoryName}
              editCustomCategoryName={props.editCustomCategoryName}
              handleChangeAddCustomCategory={props.handleChangeAddCustomCategory}
              handleChangeEditCustomCategory={props.handleChangeEditCustomCategory}
              handleAddCustomCategory={props.handleAddCustomCategory}
              handleEditCustomCategory={props.handleEditCustomCategory}
              handleDeleteCustomCategory={props.handleDeleteCustomCategory}
              handleOpenEditCustomCategoryField={props.handleOpenEditCustomCategoryField}
            />
          </div>
          <div className="transaction-modal__form-content--spacer-medium" />
          <TextInput
            id={'shop'}
            label={'店名'}
            type={'text'}
            required={false}
            fullWidth={false}
            onChange={props.changeShop}
            value={props.shop}
            disabled={props.unEditInputForm}
          />
          <div className="transaction-modal__form-content--spacer-small" />
          <TextInput
            id={'memo'}
            label={'メモ'}
            type={'text'}
            required={false}
            fullWidth={false}
            onChange={props.changeMemo}
            value={props.memo}
            disabled={props.unEditInputForm}
          />
          <div className="transaction-modal__delimiter-line--form-spacer" />
          <GenericButton
            label={'更新する'}
            onClick={
              props.pathName !== 'group'
                ? props.personalEditTransaction
                : props.groupEditTransaction
            }
            disabled={props.unInput || props.editDisabled}
          />
        </div>
      </form>
      <IconButton
        disabled={props.editDisabled}
        className="transaction-modal__delete-button-position"
        color={'inherit'}
        onClick={() => {
          if (window.confirm('この記録を削除してもよろしいですか？')) {
            if (props.pathName !== 'group') {
              props.personalDeleteTransaction();
            } else {
              props.groupDeleteTransaction();
            }
          } else {
            return;
          }
        }}
        size={'small'}
      >
        <DeleteIcon />
        削除
      </IconButton>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {
          props.onClose();
          props.resetForm();
        }}
        onBackdropClick={props.onClose}
        disableBackdropClick={false}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default EditTransactionModal;
