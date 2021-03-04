import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, TextInput } from '../../../../uikit';
import { Categories } from '../../../../../reducks/categories/types';
import './regular-shopping-list-form.scss';
import ToolTipIcon from '../../toolTip/ToolTipIcon';
import SelectPurchaseCycleTypeContainer from '../../../../../containers/shoppingList/modules/Select/SelectPurchaseCycleTypeContainer/SelectPurchaseCycleTypeContainer';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';
import BigCategoryListContainer from '../../../../../containers/modules/BigCategoryListContainer';
import MediumCategoryListContainer from '../../../../../containers/modules/MediumCategoryListContainer';

interface RegularShoppingListFormProps {
  expectedPurchaseDate: Date | null;
  cycleType: PurchaseCycleType;
  cycle: string | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handleDateChange: (expectedPurchaseDate: Date | null) => void;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleLabel: string;
  buttonLabel: string;
  handleCloseModal: () => void;
  unInput: boolean;
  handleRegularShoppingListItem: () => void;
  minDate: Date;
  bigCategoryMenuRef: React.RefObject<HTMLDivElement>;
  mediumCategoryMenuRef: React.RefObject<HTMLDivElement>;
  incomeCategories: Categories;
  expenseCategories: Categories;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
  setCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setEditCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setBigEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleOpenDeleteForm?: () => void;
}

const RegularShoppingListForm = (props: RegularShoppingListFormProps) => {
  const inputItems = [
    {
      key: '購入するもの',
      value: (
        <TextInput
          value={props.purchase}
          type={'text'}
          id={'purchase'}
          label={'必須'}
          onChange={props.handlePurchaseChange}
          required={false}
          fullWidth={false}
          disabled={false}
        />
      ),
    },
    {
      key: 'カテゴリ',
      value: (
        <>
          <BigCategoryListContainer
            customCategoryName={props.customCategoryName}
            setCustomCategoryName={props.setCustomCategoryName}
            bigCategoryMenuRef={props.bigCategoryMenuRef}
            mediumCategoryMenuRef={props.mediumCategoryMenuRef}
            transactionType={'expense'}
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
          <MediumCategoryListContainer
            transactionType={'expense'}
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
        </>
      ),
    },
    {
      key: '購入予定日',
      value: (
        <DatePicker
          id={'date'}
          label={'必須'}
          value={props.expectedPurchaseDate}
          onChange={props.handleDateChange}
          required={true}
          disabled={false}
          minDate={props.minDate}
        />
      ),
    },
    {
      key: '周期',
      value: (
        <>
          <div className="regular-shopping-list-form__select-content-value--flex">
            <SelectPurchaseCycleTypeContainer
              value={props.cycleType}
              selectChange={props.handleCycleTypeChange}
            />
            {props.cycleType === 'custom' && (
              <span className="regular-shopping-list-form__input-date-interval">
                <TextInput
                  value={props.cycle}
                  type={'tel'}
                  id={'cycle'}
                  label={'必須'}
                  onChange={props.handleCycleChange}
                  required={false}
                  fullWidth={false}
                  disabled={false}
                />
              </span>
            )}
          </div>
        </>
      ),
    },
    {
      key: '金額',
      value: (
        <TextInput
          value={props.amount}
          type={'tel'}
          id={'amount'}
          label={'任意'}
          onChange={props.handleAmountChange}
          required={false}
          fullWidth={false}
          disabled={false}
        />
      ),
    },
    {
      key: '店名',
      value: (
        <TextInput
          value={props.shop}
          type={'text'}
          id={'shop'}
          label={'任意'}
          onChange={props.handleShopChange}
          required={false}
          fullWidth={false}
          disabled={false}
        />
      ),
    },
  ];

  return (
    <div className="regular-shopping-list-form">
      <div className="regular-shopping-list-form__position">
        <h3>{props.titleLabel}</h3>
        <button onClick={props.handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
      <div>
        {inputItems.map((item) => {
          return (
            <div className="regular-shopping-list-form__select-contents" key={item.key}>
              <span className="regular-shopping-list-form__select-content-key">{item.key}</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
      <div className="regular-shopping-list-form__add-transaction">
        <label className="regular-shopping-list-form__add-transaction-check">
          <input
            type="checkbox"
            checked={props.transactionAutoAdd}
            onChange={props.handleAutoAddTransitionChange}
          />
          <span />
          家計簿に自動追加
        </label>
        <span className="shopping-list-form__tool-tip">
          <ToolTipIcon />
        </span>
      </div>
      <div className="regular-shopping-list-form__operation-btn">
        <div>
          <button
            className="regular-shopping-list-form__operation-btn--add"
            disabled={props.unInput}
            onClick={props.handleRegularShoppingListItem}
          >
            {props.buttonLabel}
          </button>
          <button
            className="regular-shopping-list-form__operation-btn--cancel"
            disabled={false}
            onClick={props.handleCloseModal}
          >
            キャンセル
          </button>
        </div>
        {props.titleLabel === '定期買い物リストアイテムを編集' && (
          <button
            className="regular-shopping-list-form__operation-btn--delete"
            onClick={() => props.handleOpenDeleteForm && props.handleOpenDeleteForm()}
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default RegularShoppingListForm;
