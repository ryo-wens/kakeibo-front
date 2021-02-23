import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, TextInput } from '../../../../uikit';
import BigCategoryList from '../../../../modules/category/BigCategroyList';
import MediumCategoryList from '../../../../modules/category/MediumCategoryList';
import '../../../../shoppingList/modules/form/ShoppingListForm/shopping-list-form.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import ShoppingListPayerSelect from '../../select/shoppingListPayerSelect/ShoppingListPayerSelect';
import ToolTipIcon from '../../../../shoppingList/modules/toolTip/ToolTipIcon';
import { GroupCategories } from '../../../../../reducks/groupCategories/types';
import { Group } from '../../../../../reducks/groups/types';

interface GroupShoppingListFormProps {
  titleLabel: string;
  buttonLabel: string;
  approvedGroup: Group;
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
  handleChangeCategory: (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
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
          <BigCategoryList
            ref={props.bigCategoryRef}
            kind={'expense'}
            bigCategory={props.bigCategory}
            bigCategoryMenuOpen={props.bigCategoryMenuOpen}
            expenseCategories={props.groupExpenseCategories}
            incomeCategories={props.groupIncomeCategories}
            handleChangeCategory={props.handleChangeCategory}
            onClickCloseBigCategoryMenu={props.onClickCloseBigCategoryMenu}
            setBigCategoryMenuOpen={props.setBigCategoryMenuOpen}
            disabled={false}
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
          <MediumCategoryList
            ref={props.mediumMenuRef}
            kind={'expense'}
            bigCategoryId={props.bigCategoryId}
            bigCategoryIndex={props.bigCategoryIndex}
            bigCategory={props.bigCategory}
            associatedCategory={props.associatedCategory}
            expenseCategories={props.groupExpenseCategories}
            incomeCategories={props.groupIncomeCategories}
            mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
            handleChangeCategory={props.handleChangeCategory}
            onClickCloseMediumCategoryMenu={props.onClickCloseMediumCategoryMenu}
            setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
            disabled={false}
            associatedIndex={props.associatedIndex}
            bigEditCategoryIndex={props.bigCategoryIndex}
            customCategoryName={props.customCategoryName}
            editCustomCategoryName={props.editCustomCategoryName}
            handleChangeAddCustomCategory={props.handleChangeAddCustomCategory}
            handleChangeEditCustomCategory={props.handleChangeEditCustomCategory}
            handleAddCustomCategory={props.handleAddCustomCategory}
            handleEditCustomCategory={props.handleEditCustomCategory}
            handleDeleteCustomCategory={props.handleDeleteCustomCategory}
            handleOpenEditCustomCategoryField={props.handleOpenEditCustomCategoryField}
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
            approvedGroup={props.approvedGroup}
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
