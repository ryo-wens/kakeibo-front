import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GenericButton, DatePicker, TextInput, KindSelectBox, SelectPayer } from '../uikit/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../reducks/categories/operations';
import { fetchGroupCategories } from '../../reducks/groupCategories/operations';
import { addTransactions, addLatestTransactions } from '../../reducks/transactions/operations';
import {
  addGroupLatestTransactions,
  addGroupTransactions,
} from '../../reducks/groupTransactions/operations';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { getUserId } from '../../reducks/users/selectors';
import { getIncomeCategories, getExpenseCategories } from '../../reducks/categories/selectors';
import {
  getGroupIncomeCategories,
  getGroupExpenseCategories,
} from '../../reducks/groupCategories/selectors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TransactionsReq } from '../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../reducks/groupTransactions/types';
import { State } from '../../reducks/store/types';
import { Category, AssociatedCategory } from '../../reducks/categories/types';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { customMonth } from '../../lib/constant';
import { isValidAmountFormat } from '../../lib/validation';
import axios from 'axios';
import { BigCategoryInput, MediumCategoryInput } from '../uikit';

const InputForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const groupId = getPathGroupId(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);
  const approvedGroups = getApprovedGroups(selector);
  const userId = getUserId(selector);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const groupIncomeCategories = getGroupIncomeCategories(selector);
  const groupExpenseCategories = getGroupExpenseCategories(selector);
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState<string>('');
  const emptyShop = shop === '' ? null : shop;
  const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());
  const [transactionsType, setTransactionType] = useState<string>('expense');
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [associatedCategory, setAssociatedCategory] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [paymentUserId, setPaymentUserId] = useState<string>(userId);
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState<boolean>(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState<boolean>(false);
  const signal = axios.CancelToken.source();

  useEffect(() => {
    setPaymentUserId(userId);
  }, [userId]);

  useEffect(() => {
    setTransactionDate(new Date());
    setShop('');
    setMemo('');
    setAmount('');
    setBigCategoryId(0);
    setMediumCategoryId(null);
    setCustomCategoryId(null);
    setBigCategory('');
    setAssociatedCategory('');
  }, [transactionsType]);

  useEffect(() => {
    if (pathName !== 'group' && !incomeCategories.length && !expenseCategories.length) {
      dispatch(fetchCategories(signal));
    }
    return () => signal.cancel();
  }, [pathName]);

  useEffect(() => {
    if (pathName === 'group') {
      dispatch(fetchGroupCategories(groupId, signal));
      const interval = setInterval(() => {
        dispatch(fetchGroupCategories(groupId, signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName]);

  const handlePayerChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setPaymentUserId(event.target.value as string);
    },
    [setPaymentUserId]
  );

  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(event.target.value);
    },
    [setAmount]
  );

  const handleMemo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMemo(event.target.value);
    },
    [setMemo]
  );

  const handleShop = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setShop(event.target.value);
    },
    [setShop]
  );

  const handleSelect = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setTransactionType(event.target.value as string);
    },
    [setTransactionType]
  );

  const handleDateChange = useCallback(
    (transactionDate: Date | null) => {
      setTransactionDate(transactionDate as Date);
    },
    [setTransactionDate]
  );

  const resetInputForm = () => {
    setShop('');
    setMemo('');
    setAmount('');
    setBigCategory('');
    setAssociatedCategory('');
    setTransactionType('expense');
  };

  const selectCategory = useCallback(
    (
      bigCategoryIndex: number,
      bigCategory: Category | null,
      associatedCategory: AssociatedCategory
    ) => {
      setBigCategoryIndex(bigCategoryIndex);
      setAssociatedCategory(associatedCategory.name);

      if (bigCategory !== null) {
        setTransactionType(bigCategory.transaction_type);
        setBigCategoryId(bigCategory.id);
        setBigCategory(bigCategory.name);
      }

      switch (associatedCategory.category_type) {
        case 'MediumCategory':
          setMediumCategoryId(associatedCategory.id);
          setCustomCategoryId(null);
          break;
        case 'CustomCategory':
          setMediumCategoryId(null);
          setCustomCategoryId(associatedCategory.id);
          break;
      }
    },
    [
      setTransactionType,
      setBigCategoryIndex,
      setBigCategoryId,
      setMediumCategoryId,
      setCustomCategoryId,
    ]
  );

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

  const unInput =
    amount === '' ||
    !isValidAmountFormat(amount) ||
    bigCategory === '' ||
    bigCategoryId === 0 ||
    transactionsType === '';

  const personalAddRequestData: TransactionsReq = {
    transaction_type: transactionsType,
    transaction_date: transactionDate,
    shop: emptyShop,
    memo: emptyMemo,
    amount: Number(amount),
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
  };

  const groupAddRequestData: GroupTransactionsReq = {
    transaction_type: transactionsType,
    transaction_date: transactionDate,
    shop: emptyShop,
    memo: emptyMemo,
    amount: Number(amount),
    payment_user_id: paymentUserId,
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
  };

  const addTransaction = () => {
    async function addedTransaction() {
      await dispatch(addLatestTransactions(personalAddRequestData));
      dispatch(addTransactions(customMonth));
      resetInputForm();
    }
    addedTransaction();
  };

  const addGroupTransaction = () => {
    async function addedGroupTransaction() {
      await dispatch(addGroupLatestTransactions(groupId, groupAddRequestData));
      dispatch(addGroupTransactions(customMonth));
      resetInputForm();
    }
    addedGroupTransaction();
  };

  return (
    <form className="grid__column box__input" autoComplete="on">
      <h3>家計簿入力フォーム</h3>
      <DatePicker
        id={'date-picker-dialog'}
        label={'日付(必須)'}
        value={transactionDate}
        onChange={handleDateChange}
        required={true}
      />
      <KindSelectBox
        onChange={handleSelect}
        required={true}
        value={transactionsType}
        label={'収入or支出(必須)'}
      />
      <TextInput
        value={amount}
        type={'tel'}
        id={'amount'}
        label={'金額(必須)'}
        onChange={handleAmountChange}
        required={false}
        fullWidth={false}
      />
      {pathName === 'group' && (
        <SelectPayer
          onChange={handlePayerChange}
          required={true}
          value={paymentUserId}
          approvedGroups={approvedGroups}
          groupId={groupId}
          pathName={pathName}
        />
      )}
      <BigCategoryInput
        ref={bigCategoryRef}
        kind={transactionsType}
        bigCategory={bigCategory}
        bigCategoryMenuOpen={bigCategoryMenuOpen}
        expenseCategories={pathName !== 'group' ? expenseCategories : groupExpenseCategories}
        incomeCategories={pathName !== 'group' ? incomeCategories : groupIncomeCategories}
        onClick={selectCategory}
        onClickCloseBigCategoryMenu={onClickCloseBigCategoryMenu}
        setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      />
      <MediumCategoryInput
        ref={mediumMenuRef}
        kind={transactionsType}
        bigCategoryId={bigCategoryId}
        bigCategoryIndex={bigCategoryIndex}
        bigCategory={bigCategory}
        associatedCategory={associatedCategory}
        expenseCategories={pathName !== 'group' ? expenseCategories : groupExpenseCategories}
        incomeCategories={pathName !== 'group' ? incomeCategories : groupIncomeCategories}
        mediumCategoryMenuOpen={mediumCategoryMenuOpen}
        onClick={selectCategory}
        onClickCloseMediumCategoryMenu={onClickCloseMediumCategoryMenu}
        setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      />
      <TextInput
        value={shop}
        type={'text'}
        id={'shop'}
        label={'店名(任意)'}
        onChange={handleShop}
        required={false}
        fullWidth={false}
      />
      <TextInput
        value={memo}
        type={'text'}
        id={'memo'}
        label={'メモ(任意)'}
        onChange={handleMemo}
        required={false}
        fullWidth={false}
      />
      <GenericButton
        startIcon={<AddCircleOutlineIcon />}
        onClick={pathName !== 'group' ? addTransaction : addGroupTransaction}
        label={'入力する'}
        disabled={unInput}
      />
    </form>
  );
};
export default InputForm;
