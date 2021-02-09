import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { BigCategoryInput, DatePicker, MediumCategoryInput, TextInput } from '../../../../uikit';
import '../../../../shoppingList/modules/Form/ShoppingListForm/shopping-list-form.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import ShoppingListPayerSelect from '../../Select/ShoppingListPayerSelect/ShoppingListPayerSelect';
import ToolTipIcon from '../../../../shoppingList/modules/ToolTip/ToolTipIcon';
import { GroupCategories } from '../../../../../reducks/groupCategories/types';
import { Groups } from '../../../../../reducks/groups/types';

interface GroupShoppingListFormProps {
  titleLabel: string;
  buttonLabel: string;
  approvedGroups: Groups;
  groupId: number;
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
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (scheduledDate: Date | null) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory
  ) => void;
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  unInput: boolean;
  shoppingListItemOperation: () => void;
  minDate: Date;
  displayRequiredInputItemMessage: boolean;
  bigCategoryRef: React.RefObject<HTMLDivElement>;
  mediumMenuRef: React.RefObject<HTMLDivElement>;
  groupIncomeCategories: GroupCategories;
  groupExpenseCategories: GroupCategories;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCloseBigCategoryMenu: (event: Event) => void;
  onClickCloseMediumCategoryMenu: (event: Event) => void;
  openDeleteForm?: () => void;
}

const GroupShoppingListForm = (props: GroupShoppingListFormProps) => {
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
            expenseCategories={props.groupExpenseCategories}
            incomeCategories={props.groupIncomeCategories}
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
            expenseCategories={props.groupExpenseCategories}
            incomeCategories={props.groupIncomeCategories}
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
            label={
              props.displayRequiredInputItemMessage && props.transactionAutoAdd ? '必須' : '任意'
            }
            onChange={props.handleAmountChange}
            required={false}
            fullWidth={false}
            disabled={false}
          />
          {props.displayRequiredInputItemMessage && (
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
    {
      key: '支払人',
      value: (
        <>
          <ShoppingListPayerSelect
            value={props.paymentUser === null ? '' : props.paymentUser}
            approvedGroups={props.approvedGroups}
            groupId={props.groupId}
            onChange={props.handlePaymentUserChange}
          />
          {props.displayRequiredInputItemMessage && (
            <p
              className={
                props.transactionAutoAdd && props.paymentUser === null
                  ? 'shopping-list-form__required-input-item-message'
                  : 'shopping-list-form__required-input-item-message--hide'
              }
            >
              ※ 支払人の選択が必要です。
            </p>
          )}
        </>
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
      <div className="shopping-list-form__operation-btn">
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

export default GroupShoppingListForm;
