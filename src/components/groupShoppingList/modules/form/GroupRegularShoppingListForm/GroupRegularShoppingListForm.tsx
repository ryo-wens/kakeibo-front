import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { BigCategoryInput, DatePicker, MediumCategoryInput, TextInput } from '../../../../uikit';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import '../../../../shoppingList/modules/Form/RegularShoppingListForm/regular-shopping-list-form.scss';
import ShoppingListPayerSelect from '../../select/ShoppingListPayerSelect/ShoppingListPayerSelect';
import ToolTipIcon from '../../../../shoppingList/modules/ToolTip/ToolTipIcon';
import SelectPurchaseCycleTypeContainer from '../../../../../containers/shoppingList/modules/Select/SelectPurchaseCycleTypeContainer/SelectPurchaseCycleTypeContainer';
import { Groups } from '../../../../../reducks/groups/types';
import { GroupCategories } from '../../../../../reducks/groupCategories/types';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';

interface GroupRegularShoppingListFormProps {
  titleLabel: string;
  buttonLabel: string;
  approvedGroups: Groups;
  groupId: number;
  expectedPurchaseDate: Date | null;
  cycleType: PurchaseCycleType;
  cycle: string | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  associatedCategory: string;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  regularShoppingListItemOperation: () => void;
  minDate: Date;
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

const GroupRegularShoppingListForm = (props: GroupRegularShoppingListFormProps) => {
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
      key: '周期',
      value: (
        <>
          <div className="regular-shopping-list-form__select-content-value--flex">
            <SelectPurchaseCycleTypeContainer
              value={props.cycleType}
              selectChange={props.handleCycleTypeChange}
            />
            {props.cycleType === 'custom' && (
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
    {
      key: '支払人',
      value: (
        <ShoppingListPayerSelect
          value={props.paymentUser === null ? '' : props.paymentUser}
          approvedGroups={props.approvedGroups}
          groupId={props.groupId}
          onChange={props.handlePaymentUserChange}
        />
      ),
    },
  ];

  return (
    <div className="regular-shopping-list-form">
      <div className="regular-shopping-list-form__position">
        <h3>{props.titleLabel}</h3>
        <button onClick={() => props.closeModal()}>
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
        <span className="regular-shopping-list-form__tool-tip">
          <ToolTipIcon />
        </span>
      </div>
      <div className="regular-shopping-list-form__operation-btn">
        <div>
          <button
            className="regular-shopping-list-form__operation-btn--add"
            disabled={props.unInput}
            onClick={props.regularShoppingListItemOperation}
          >
            {props.buttonLabel}
          </button>
          <button
            className="regular-shopping-list-form__operation-btn--cancel"
            disabled={false}
            onClick={() => props.closeModal()}
          >
            キャンセル
          </button>
        </div>
        {props.titleLabel === '定期買い物リストアイテムを編集' && (
          <button
            className="regular-shopping-list-form__operation-btn--delete"
            onClick={() => {
              if (props.openDeleteForm) {
                props.openDeleteForm();
              }
            }}
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupRegularShoppingListForm;
