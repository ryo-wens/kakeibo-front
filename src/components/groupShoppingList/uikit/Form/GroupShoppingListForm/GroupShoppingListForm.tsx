import React, { useRef, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { BigCategoryInput, MediumCategoryInput, TextInput } from '../../../../uikit';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../../../../shoppingList/uikit/Form/ShoppingListForm/shopping-list-form.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { useParams } from 'react-router';
import { getApprovedGroups } from '../../../../../reducks/groups/selectors';
import ShoppingListPayerSelect from '../../Select/ShoppingListPayerSelect/ShoppingListPayerSelect';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../../../reducks/groupCategories/selectors';
import { Action, Dispatch } from 'redux';
import { State } from '../../../../../reducks/store/types';
import ToolTipIcon from '../../../../shoppingList/uikit/ToolTip/ToolTipIcon';

interface GroupShoppingListFormProps {
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  bigCategoryIndex: number;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
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
  titleLabel: string;
  buttonLabel: string;
  closeModal: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unInput: boolean;
  dispatchOperation: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
  minDate: Date;
  displayRequiredInputItemMessage: boolean;
  openDeleteForm?: () => void;
}

const GroupShoppingListForm = (props: GroupShoppingListFormProps) => {
  const dispatch = useDispatch();
  const approvedGroups = useSelector(getApprovedGroups);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const { group_id } = useParams();

  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);

  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState<boolean>(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState<boolean>(false);

  const onClickCloseBigCategoryMenu = (event: Event) => {
    if (bigCategoryRef.current && !bigCategoryRef.current.contains(event.target as Node)) {
      setBigCategoryMenuOpen(false);
    }
  };

  const onClickCloseMediumCategoryMenu = (event: Event) => {
    if (mediumMenuRef.current && !mediumMenuRef.current.contains(event.target as Node)) {
      setMediumCategoryMenuOpen(false);
    }
  };

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
            ref={bigCategoryRef}
            kind={'expense'}
            bigCategory={props.bigCategory}
            bigCategoryMenuOpen={bigCategoryMenuOpen}
            expenseCategories={groupExpenseCategories}
            incomeCategories={groupIncomeCategories}
            onClick={props.selectCategory}
            onClickCloseBigCategoryMenu={onClickCloseBigCategoryMenu}
            setBigCategoryMenuOpen={setBigCategoryMenuOpen}
            disabled={false}
          />
          <MediumCategoryInput
            ref={mediumMenuRef}
            kind={'expense'}
            bigCategoryId={props.bigCategoryId}
            bigCategoryIndex={props.bigCategoryIndex}
            bigCategory={props.bigCategory}
            associatedCategory={props.associatedCategory}
            expenseCategories={groupExpenseCategories}
            incomeCategories={groupIncomeCategories}
            mediumCategoryMenuOpen={mediumCategoryMenuOpen}
            onClick={props.selectCategory}
            onClickCloseMediumCategoryMenu={onClickCloseMediumCategoryMenu}
            setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
            disabled={false}
          />
        </>
      ),
    },
    {
      key: '購入予定日',
      value: (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="必須"
            format="yyyy年 MM月dd日"
            value={props.expectedPurchaseDate}
            onChange={props.handleDateChange}
            minDate={props.minDate}
            required={true}
          />
        </MuiPickersUtilsProvider>
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
            approvedGroups={approvedGroups}
            groupId={Number(group_id)}
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
      <div className="set-task-list-item__operation-btn">
        <div>
          <button
            className="shopping-list-form__operation-btn--add"
            disabled={props.unInput}
            onClick={() => {
              dispatch(props.dispatchOperation);
              props.setOpen(false);
            }}
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
