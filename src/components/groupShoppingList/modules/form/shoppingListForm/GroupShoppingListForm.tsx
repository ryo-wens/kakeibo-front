import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, TextInput } from '../../../../uikit';
import ShoppingListPayerSelect from '../../select/shoppingListPayerSelect/ShoppingListPayerSelect';
import ToolTipIcon from '../../../../shoppingList/modules/toolTip/ToolTipIcon';
import { GroupCategories } from '../../../../../reducks/groupCategories/types';
import { Group } from '../../../../../reducks/groups/types';
import BigCategoryListContainer from '../../../../../containers/modules/BigCategoryListContainer';
import MediumCategoryListContainer from '../../../../../containers/modules/MediumCategoryListContainer';
import styles from '../../../../shoppingList/modules/form/ShoppingListForm/ShoppingListForm.module.scss';
import cn from 'classnames';

interface GroupShoppingListFormProps {
  message: string;
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
  handleShopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentUserChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoAddTransitionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseModal: () => void;
  unInput: boolean;
  handleShoppingListItem: () => void;
  minDate: Date;
  displayRequiredInputItemMessage: boolean;
  bigCategoryMenuRef: React.RefObject<HTMLDivElement>;
  mediumCategoryMenuRef: React.RefObject<HTMLDivElement>;
  groupIncomeCategories: GroupCategories;
  groupExpenseCategories: GroupCategories;
  bigCategoryMenuOpen: boolean;
  mediumCategoryMenuOpen: boolean;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  customCategoryName: string;
  editCustomCategoryName: string;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setAssociatedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setBigEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  handleOpenDeleteForm?: () => void;
}

const GroupShoppingListForm = (props: GroupShoppingListFormProps) => {
  const requiredMessageClassName = (condition: boolean) => {
    return cn(styles.requiredInputItemMessage, {
      [styles.display]:
        props.displayRequiredInputItemMessage && props.transactionAutoAdd && condition,
    });
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.position}>
        <h3>{props.titleLabel}</h3>
        <button onClick={props.handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
      <dl>
        <div className={styles.selectContent}>
          <dt>購入品</dt>
          <dd>
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
          </dd>
        </div>
        <div className={styles.selectContent}>
          <dt>カテゴリー</dt>
          <dd>
            <div className={styles.selectCategory}>
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
            </div>
          </dd>
        </div>
        <div className={styles.selectContent}>
          <dt>購入予定日</dt>
          <dd>
            <DatePicker
              id={'date'}
              label={'必須'}
              value={props.expectedPurchaseDate}
              onChange={props.handleDateChange}
              required={true}
              disabled={false}
              minDate={props.minDate}
            />
          </dd>
        </div>
        <div className={styles.selectContentWithMessage}>
          <div>
            <dt>金額</dt>
            <dd>
              <TextInput
                value={props.amount}
                type={'tel'}
                id={'amount'}
                label={
                  props.displayRequiredInputItemMessage && props.transactionAutoAdd
                    ? '必須'
                    : '任意'
                }
                onChange={props.handleAmountChange}
                required={false}
                fullWidth={false}
                disabled={false}
              />
            </dd>
          </div>
          <span className={requiredMessageClassName(props.amount === null)}>
            ※ 金額の入力が必要です。
          </span>
        </div>
        <div className={styles.selectContent}>
          <dt>店名</dt>
          <dd>
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
          </dd>
        </div>
        <div className={styles.selectContentWithMessage}>
          <div>
            <dt>支払人</dt>
            <dd>
              <ShoppingListPayerSelect
                value={props.paymentUser === null ? '' : props.paymentUser}
                approvedGroup={props.approvedGroup}
                onChange={props.handlePaymentUserChange}
              />
            </dd>
          </div>
          <span className={requiredMessageClassName(props.paymentUser === null)}>
            ※ 支払人の選択が必要です。
          </span>
        </div>
      </dl>
      <div className={styles.addTransaction}>
        <label className={styles.addTransactionCheck}>
          <input
            type="checkbox"
            checked={props.transactionAutoAdd}
            onChange={props.handleAutoAddTransitionChange}
          />
          <span />
          家計簿に自動追加
        </label>
        <span className={styles.toolTip}>
          <ToolTipIcon message={props.message} />
        </span>
      </div>
      <div className={styles.operationBtn}>
        <div>
          <button
            className={styles.operationBtn__add}
            disabled={props.unInput}
            onClick={props.handleShoppingListItem}
          >
            {props.buttonLabel}
          </button>
          <button
            className={styles.operationBtn__cancel}
            disabled={false}
            onClick={props.handleCloseModal}
          >
            キャンセル
          </button>
        </div>
        {props.handleOpenDeleteForm && (
          <button
            className={styles.operationBtn__delete}
            onClick={props.handleOpenDeleteForm && props.handleOpenDeleteForm}
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupShoppingListForm;
