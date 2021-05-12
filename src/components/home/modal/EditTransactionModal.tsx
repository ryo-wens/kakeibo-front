import React from 'react';
import { Categories } from '../../../reducks/categories/types';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { GenericButton, DatePicker, TextInput } from '../../uikit';
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import './transaction-modal.scss';
import BigCategoryListContainer from '../../../containers/modules/BigCategoryListContainer';
import MediumCategoryListContainer from '../../../containers/modules/MediumCategoryListContainer';
import { Select } from '../../uikit/Select';
import { selectTransactionsType } from '../../../lib/constant';
import { SelectItemList } from '../../../lib/types';

interface InputModalProps {
  open: boolean;
  onClose: () => void;
  transactionId: number;
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
  bigCategoryMenuRef: React.RefObject<HTMLDivElement>;
  mediumCategoryMenuRef: React.RefObject<HTMLDivElement>;
  incomeCategories: Categories;
  expenseCategories: Categories;
  groupIncomeCategories: GroupCategories;
  groupExpenseCategories: GroupCategories;
  resetForm: () => void;
  changeTransactionDate: (transactionDate: Date | null) => void;
  changeTransactionType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
  setCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setEditCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setBigEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selectUsersItemList: SelectItemList;
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
          <p className="transaction-modal__form-title">収支タイプ</p>
          <Select
            disabled={props.unEditInputForm}
            selectItemList={selectTransactionsType}
            changeItem={props.changeTransactionType}
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
          {props.pathName === 'group' && props.transactionsType === 'expense' && (
            <>
              <p className="transaction-modal__form-title">支払者</p>
              <Select
                disabled={props.unEditInputForm}
                defaultValue={props.paymentUserId}
                selectItemList={props.selectUsersItemList}
                changeItem={props.changePayer}
              />
              <div className="transaction-modal__form-content--spacer-small" />
            </>
          )}
          <div className="transaction-modal__select-category">
            <p className="transaction-modal__form-title">カテゴリー</p>
            <BigCategoryListContainer
              customCategoryName={props.customCategoryName}
              setCustomCategoryName={props.setCustomCategoryName}
              bigCategoryMenuRef={props.bigCategoryMenuRef}
              mediumCategoryMenuRef={props.mediumCategoryMenuRef}
              bigCategoryMenuOpen={props.bigCategoryMenuOpen}
              transactionType={props.transactionsType}
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
          <div className="input-form__select-category">
            <MediumCategoryListContainer
              transactionType={props.transactionsType}
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
