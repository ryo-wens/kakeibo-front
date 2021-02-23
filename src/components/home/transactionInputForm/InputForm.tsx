import React from 'react';
import { Groups } from '../../../reducks/groups/types';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { Categories, Category, AssociatedCategory } from '../../../reducks/categories/types';
import BigCategoryList from '../../modules/category/BigCategroyList';
import MediumCategoryList from '../../modules/category/MediumCategoryList';
import { GenericButton, DatePicker, TextInput, KindSelectBox, SelectPayer } from '../../uikit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './input-form.scss';

interface InputFormProps {
  group_id: number;
  pathName: string;
  unInput: boolean;
  displayMessageDecision: boolean;
  approvedGroups: Groups;
  incomeCategories: Categories;
  expenseCategories: Categories;
  groupIncomeCategories: GroupCategories;
  groupExpenseCategories: GroupCategories;
  addTransactionMonth: number;
  transactionDate: Date | null;
  transactionsType: string;
  amount: string;
  bigCategoryRef: React.RefObject<HTMLDivElement>;
  mediumMenuRef: React.RefObject<HTMLDivElement>;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  bigCategory: string | null;
  associatedCategory: string;
  bigCategoryIndex: number;
  bigCategoryId: number;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  paymentUserId: string;
  shop: string;
  memo: string;
  addTransaction: () => void;
  addGroupTransaction: () => void;
  changeTransactionDate: (transactionDate: Date | null) => void;
  changeTransactionType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseBigCategoryMenu: (event: Event) => void;
  handleCloseMediumCategoryMenu: (event: Event) => void;
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  changeShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

const InputForm = (props: InputFormProps) => {
  return (
    <form className="input-form input-form__column" autoComplete="on">
      <div className="input-form__sub-heading">家計簿入力フォーム</div>
      {props.displayMessageDecision && (
        <div className="input-form__message input-form__message--small">
          {props.addTransactionMonth}月は会計済みのため追加できません。
        </div>
      )}
      <div>
        <DatePicker
          id={'date-picker-dialog'}
          label={'日付(必須)'}
          value={props.transactionDate}
          onChange={props.changeTransactionDate}
          required={true}
          disabled={false}
          minDate={new Date('1900-01-01')}
        />
        <div className="input-form__form-content--spacer-small" />
        <KindSelectBox
          onChange={props.changeTransactionType}
          required={true}
          value={props.transactionsType}
          disabled={false}
          currentPage={''}
        />
        <div className="input-form__form-content--spacer-small" />
        <TextInput
          value={props.amount}
          type={'tel'}
          id={'amount'}
          label={'金額(必須)'}
          onChange={props.changeAmount}
          required={false}
          fullWidth={false}
          disabled={false}
        />
        <div className="input-form__form-content--spacer-medium" />
        {props.pathName === 'group' && (
          <>
            <SelectPayer
              onChange={props.changePayer}
              required={true}
              value={props.paymentUserId}
              approvedGroups={props.approvedGroups}
              groupId={props.group_id}
              pathName={props.pathName}
              disabled={false}
              notSpecified={false}
            />
            <div className="input-form__form-content--spacer-medium" />
          </>
        )}
        <BigCategoryList
          disabled={false}
          kind={props.transactionsType}
          ref={props.bigCategoryRef}
          bigCategory={props.bigCategory}
          handleChangeCategory={props.handleChangeCategory}
          onClickCloseBigCategoryMenu={props.handleCloseBigCategoryMenu}
          bigCategoryMenuOpen={props.bigCategoryMenuOpen}
          setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
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
        <div className="input-form__form-content--spacer-medium" />
        <MediumCategoryList
          disabled={false}
          ref={props.mediumMenuRef}
          kind={props.transactionsType}
          bigCategoryId={props.bigCategoryId}
          bigCategoryIndex={props.bigCategoryIndex}
          bigCategory={props.bigCategory}
          associatedCategory={props.associatedCategory}
          handleChangeCategory={props.handleChangeCategory}
          onClickCloseMediumCategoryMenu={props.handleCloseMediumCategoryMenu}
          mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
          setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
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
        <div className="input-form__form-content--spacer-medium" />
        <TextInput
          value={props.shop}
          type={'text'}
          id={'shop'}
          label={'店名(任意)'}
          onChange={props.changeShop}
          required={false}
          fullWidth={false}
          disabled={false}
        />
        <div className="input-form__form-content--spacer-small" />
        <TextInput
          value={props.memo}
          type={'text'}
          id={'memo'}
          label={'メモ(任意)'}
          onChange={props.changeMemo}
          required={false}
          fullWidth={false}
          disabled={false}
        />
        <div className="input-form__form-content--spacer-medium" />
        <GenericButton
          startIcon={<AddCircleOutlineIcon />}
          onClick={props.pathName !== 'group' ? props.addTransaction : props.addGroupTransaction}
          label={'入力する'}
          disabled={props.unInput}
        />
      </div>
    </form>
  );
};
export default InputForm;
