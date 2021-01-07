import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { CategoryInput, TextInput } from '../../../../uikit';
import { useSelector } from 'react-redux';
import {
  getExpenseCategories,
  getIncomeCategories,
} from '../../../../../reducks/categories/selectors';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Action, Dispatch } from 'redux';
import { State } from '../../../../../reducks/store/types';
import './regular-shopping-list-form.scss';
import CycleTypeSelector from '../../Selector/CycleTypeSelector/CycleTypeSelector';

interface RegularShoppingListFormProps {
  expectedPurchaseDate: Date | null;
  cycleType: 'daily' | 'weekly' | 'monthly' | 'custom';
  cycle: string | null;
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
  handleDateChange: (expectedPurchaseDate: Date | null) => void;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

const RegularShoppingListForm = (props: RegularShoppingListFormProps) => {
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
      key: '周期',
      value: (
        <CycleTypeSelector value={props.cycleType} selectChange={props.handleCycleTypeChange} />
      ),
    },
    {
      key: '周期日数',
      value: (
        <TextInput
          value={props.cycle}
          type={'tel'}
          id={'cycle'}
          label={'周期日数'}
          onChange={props.handleCycleChange}
          required={false}
          fullWidth={false}
        />
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
              <span className="regular-shopping-list-form__select-contents--key">{item.key}</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
      <label className="regular-shopping-list-form__add-transaction">
        <input
          type="checkbox"
          checked={props.transactionAutoAdd}
          onChange={props.handleAutoAddTransitionChange}
        />
        <span />
        取引履歴に自動追加
      </label>
      <div className="set-task-list-item__operation-btn">
        <button className="regular-shopping-list-form__operation-btn--add" disabled={props.unInput}>
          {props.buttonLabel}
        </button>
        {props.titleLabel === '定期買い物リストを編集' && (
          <button className="regular-shopping-list-form__operation-btn--delete">削除</button>
        )}
      </div>
    </div>
  );
};

export default RegularShoppingListForm;