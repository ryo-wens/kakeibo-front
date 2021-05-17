import React from 'react';
import { Groups } from '../../../reducks/groups/types';
import { GroupCategories } from '../../../reducks/groupCategories/types';
import { Categories } from '../../../reducks/categories/types';
import { GenericButton, DatePicker, TextInput } from '../../uikit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './input-form.scss';
import BigCategoryListContainer from '../../../containers/modules/BigCategoryListContainer';
import MediumCategoryListContainer from '../../../containers/modules/MediumCategoryListContainer';
import { Select } from '../../uikit/Select';
import { selectTransactionsType } from '../../../lib/constant';
import { SelectItemList } from '../../../lib/types';

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
  bigCategoryMenuRef: React.RefObject<HTMLDivElement>;
  mediumCategoryMenuRef: React.RefObject<HTMLDivElement>;
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
  changeShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
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
        <p className="input-form__form-title">収支タイプ(必須)</p>
        <Select selectItemList={selectTransactionsType} changeItem={props.changeTransactionType} />
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
            <p className="input-form__form-title">支払者(必須)</p>
            <Select changeItem={props.changePayer} selectItemList={props.selectUsersItemList} />
            <div className="input-form__form-content--spacer-medium" />
          </>
        )}
        <p className="input-form__form-title">カテゴリー(必須)</p>
        <BigCategoryListContainer
          customCategoryName={props.customCategoryName}
          setCustomCategoryName={props.setCustomCategoryName}
          bigCategoryMenuRef={props.bigCategoryMenuRef}
          mediumCategoryMenuRef={props.mediumCategoryMenuRef}
          transactionType={props.transactionsType}
          bigCategoryMenuOpen={props.bigCategoryMenuOpen}
          unEditInputForm={false}
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
        <div className="input-form__form-content--spacer-medium" />
        <MediumCategoryListContainer
          transactionType={props.transactionsType}
          unEditInputForm={false}
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
