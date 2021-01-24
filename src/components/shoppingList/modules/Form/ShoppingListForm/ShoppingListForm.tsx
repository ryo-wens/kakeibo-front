import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { BigCategoryInput, DatePicker, MediumCategoryInput, TextInput } from '../../../../uikit';
import './shopping-list-form.scss';
import { AssociatedCategory, Categories, Category } from '../../../../../reducks/categories/types';
import ToolTipIcon from '../../ToolTip/ToolTipIcon';

interface ShoppingListFormProps {
  titleLabel: string;
  buttonLabel: string;
  expectedPurchaseDate: Date | null;
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
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  minDate: Date;
  displayInputAmountMessage: boolean;
  bigCategoryRef: React.RefObject<HTMLDivElement>;
  mediumMenuRef: React.RefObject<HTMLDivElement>;
  incomeCategories: Categories;
  expenseCategories: Categories;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCloseBigCategoryMenu: (event: Event) => void;
  onClickCloseMediumCategoryMenu: (event: Event) => void;
  openDeleteForm?: () => void;
}

const ShoppingListForm = (props: ShoppingListFormProps) => {
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
      key: 'カテゴリー',
      value: (
        <>
          <BigCategoryInput
            ref={props.bigCategoryRef}
            kind={'expense'}
            bigCategory={props.bigCategory}
            bigCategoryMenuOpen={props.bigCategoryMenuOpen}
            expenseCategories={props.expenseCategories}
            incomeCategories={props.incomeCategories}
            onClick={props.selectCategory}
            onClickCloseBigCategoryMenu={props.onClickCloseBigCategoryMenu}
            setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
            disabled={false}
          />
          <MediumCategoryInput
            ref={props.mediumMenuRef}
            kind={'expense'}
            bigCategoryId={props.bigCategoryId}
            bigCategoryIndex={props.bigCategoryIndex}
            bigCategory={props.bigCategory}
            associatedCategory={props.associatedCategory}
            expenseCategories={props.expenseCategories}
            incomeCategories={props.incomeCategories}
            mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
            onClick={props.selectCategory}
            onClickCloseMediumCategoryMenu={props.onClickCloseMediumCategoryMenu}
            setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
            disabled={false}
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
      key: '金額',
      value: (
        <>
          <TextInput
            value={props.amount}
            type={'tel'}
            id={'amount'}
            label={props.displayInputAmountMessage && props.transactionAutoAdd ? '必須' : '任意'}
            onChange={props.handleAmountChange}
            required={false}
            fullWidth={false}
            disabled={false}
          />
          {props.displayInputAmountMessage && (
            <p
              className={
                props.transactionAutoAdd && props.amount === null
                  ? 'shopping-list-form__required-input-item-message'
                  : 'shopping-list-form__required-input-item-message--hide'
              }
            >
              ※ 金額の入力が必要です。
            </p>
          )}
        </>
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
    <div className="shopping-list-form">
      <div className="shopping-list-form__position">
        <h3>{props.titleLabel}</h3>
        <button onClick={() => props.closeModal()}>
          <CloseIcon />
        </button>
      </div>
      <div>
        {inputItems.map((item) => {
          return (
            <div className="shopping-list-form__select-contents" key={item.key}>
              <span className="shopping-list-form__select-contents--key">{item.key}</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
      <div className="shopping-list-form__add-transaction">
        <label className="shopping-list-form__add-transaction-check">
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
      <div className="set-task-list-item__operation-btn">
        <div>
          <button
            className="shopping-list-form__operation-btn--add"
            disabled={props.unInput}
            onClick={props.shoppingListItemOperation}
          >
            {props.buttonLabel}
          </button>
          <button
            className="shopping-list-form__operation-btn--cancel"
            disabled={false}
            onClick={() => props.closeModal()}
          >
            キャンセル
          </button>
        </div>
        {props.openDeleteForm && (
          <button
            className="shopping-list-form__operation-btn--delete"
            onClick={() => {
              props.openDeleteForm && props.openDeleteForm();
            }}
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default ShoppingListForm;
