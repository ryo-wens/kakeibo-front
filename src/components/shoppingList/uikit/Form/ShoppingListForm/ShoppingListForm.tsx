import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { CategoryInput, TextInput } from '../../../../uikit';
import { useDispatch, useSelector } from 'react-redux';
import {
  getExpenseCategories,
  getIncomeCategories,
} from '../../../../../reducks/categories/selectors';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './shopping-list-form.scss';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { Action, Dispatch } from 'redux';
import { State } from '../../../../../reducks/store/types';

interface ShoppingListFormProps {
  expectedPurchaseDate: Date | null;
  purchase: string;
  shop: string | null;
  amount: string;
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
  titleLabel: string;
  buttonLabel: string;
  closeModal: () => void;
  unInput: boolean;
  dispatchOperation: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
  openDeleteForm?: () => void;
}

const ShoppingListForm = (props: ShoppingListFormProps) => {
  const dispatch = useDispatch();
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);

  const inputItems = [
    {
      key: '購入するもの',
      value: (
        <TextInput
          value={props.purchase}
          type={'text'}
          id={'purchase'}
          label={'(必須)'}
          onChange={props.handlePurchaseChange}
          required={false}
          fullWidth={false}
        />
      ),
    },
    {
      key: '購入予定日',
      value: (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="購入予定日"
            format="yyyy年 MM月dd日"
            value={props.expectedPurchaseDate}
            onChange={props.handleDateChange}
            minDate={new Date()}
            required={true}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      key: '金額',
      value: (
        <TextInput
          value={props.amount}
          type={'tel'}
          id={'amount'}
          label={'金額(必須)'}
          onChange={props.handleAmountChange}
          required={false}
          fullWidth={false}
        />
      ),
    },
    {
      key: 'カテゴリー',
      value: (
        <CategoryInput
          bigCategory={props.bigCategory}
          associatedCategory={props.associatedCategory}
          onClick={props.selectCategory}
          required={true}
          kind={'expense'}
          bigCategoryIndex={props.bigCategoryIndex}
          bigCategoryId={props.bigCategoryId}
          expenseCategories={expenseCategories}
          incomeCategories={incomeCategories}
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
          label={'店名(任意)'}
          onChange={props.handleShopChange}
          required={false}
          fullWidth={false}
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
      <label className="shopping-list-form__add-transaction">
        <input
          type="checkbox"
          checked={props.transactionAutoAdd}
          onChange={props.handleAutoAddTransitionChange}
        />
        <span />
        取引履歴に自動追加
      </label>
      <div className="set-task-list-item__operation-btn">
        <button
          className="shopping-list-form__operation-btn--add"
          disabled={props.unInput}
          onClick={() => {
            dispatch(props.dispatchOperation);
            props.closeModal();
          }}
        >
          {props.buttonLabel}
        </button>
        {props.titleLabel === '買い物リストを編集' && (
          <button
            className="shopping-list-form__operation-btn--delete"
            onClick={() => {
              if (props.openDeleteForm) props.openDeleteForm();
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
