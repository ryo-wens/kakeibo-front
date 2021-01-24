import React, { useRef, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { BigCategoryInput, DatePicker, MediumCategoryInput, TextInput } from '../../../../uikit';
import { useSelector } from 'react-redux';
import {
  getExpenseCategories,
  getIncomeCategories,
} from '../../../../../reducks/categories/selectors';
import { AssociatedCategory, Category } from '../../../../../reducks/categories/types';
import './regular-shopping-list-form.scss';
import ToolTipIcon from '../../ToolTip/ToolTipIcon';
import SelectPurchaseCycleTypeContainer from '../../../../../containers/shoppingList/modules/Select/SelectPurchaseCycleTypeContainer/SelectPurchaseCycleTypeContainer';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';

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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unInput: boolean;
  dispatchOperation: () => void;
  minDate: Date;
  openDeleteForm?: () => void;
}

const RegularShoppingListForm = (props: RegularShoppingListFormProps) => {
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);

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
      key: 'カテゴリ',
      value: (
        <>
          <BigCategoryInput
            ref={bigCategoryRef}
            kind={'expense'}
            bigCategory={props.bigCategory}
            bigCategoryMenuOpen={bigCategoryMenuOpen}
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
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
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
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
        <span className="shopping-list-form__tool-tip">
          <ToolTipIcon />
        </span>
      </div>
      <div className="set-task-list-item__operation-btn">
        <button
          className="regular-shopping-list-form__operation-btn--add"
          disabled={props.unInput}
          onClick={() => {
            props.dispatchOperation();
            props.setOpen(false);
          }}
        >
          {props.buttonLabel}
        </button>
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

export default RegularShoppingListForm;
