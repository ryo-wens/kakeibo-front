import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GenericButton, DatePicker, TextInput, KindSelectBox, SelectPayer } from '../uikit/index';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { fetchCategories } from '../../reducks/categories/operations';
import { fetchGroupCategories } from '../../reducks/groupCategories/operations';
import { addTransactions, addLatestTransactions } from '../../reducks/transactions/operations';
import {
  addGroupLatestTransactions,
  addGroupTransactions,
  fetchGroupYearlyAccountList,
} from '../../reducks/groupTransactions/operations';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { getUserId } from '../../reducks/users/selectors';
import { getIncomeCategories, getExpenseCategories } from '../../reducks/categories/selectors';
import {
  getGroupIncomeCategories,
  getGroupExpenseCategories,
} from '../../reducks/groupCategories/selectors';
import { getYearlyAccountListStatus } from '../../reducks/groupTransactions/selectors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TransactionsReq } from '../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../reducks/groupTransactions/types';
import { Category, AssociatedCategory } from '../../reducks/categories/types';
import { customMonth } from '../../lib/constant';
import { isValidAmountFormat } from '../../lib/validation';
import axios from 'axios';
import { BigCategoryInput, MediumCategoryInput } from '../uikit';
import '../../assets/modules/input-form .scss';

const InputForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const approvedGroups = useSelector(getApprovedGroups);
  const userId = useSelector(getUserId);
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const accountingStatus = useSelector(getYearlyAccountListStatus);
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState<string>('');
  const emptyShop = shop === '' ? null : shop;
  const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());
  const [transactionsType, setTransactionType] = useState('expense');
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [associatedCategory, setAssociatedCategory] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [paymentUserId, setPaymentUserId] = useState<string>(userId);
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);

  let addTransactionYear = 0;
  let addTransactionMonth = 0;

  if (transactionDate) {
    addTransactionYear = transactionDate.getFullYear();
    addTransactionMonth = transactionDate.getMonth() + 1;
  }

  let canDisplayMessage = false;

  if (pathName === 'group') {
    if (accountingStatus.year === addTransactionYear + '年') {
      for (const account of accountingStatus.accountedMonth) {
        if (account === addTransactionMonth + '月') {
          canDisplayMessage = true;
        }
      }
    }
  }

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
      const signal = axios.CancelToken.source();
      dispatch(fetchCategories(signal));
      return () => signal.cancel();
    }
  }, [pathName]);

  useEffect(() => {
    if (pathName === 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroupCategories(Number(id), signal));
      dispatch(fetchGroupYearlyAccountList(Number(id), addTransactionYear, signal));

      const interval = setInterval(() => {
        dispatch(fetchGroupCategories(Number(id), signal));
        dispatch(fetchGroupYearlyAccountList(Number(id), addTransactionYear, signal));
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName, id, transactionDate]);

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
      await dispatch(addGroupLatestTransactions(Number(id), groupAddRequestData));
      dispatch(addGroupTransactions(customMonth));
      resetInputForm();
    }
    addedGroupTransaction();
  };

  return (
    <form className="input-form input-form__column" autoComplete="on">
      <div className="input-form__sub-heading">家計簿入力フォーム</div>
      {canDisplayMessage && (
        <div className="input-form__message input-form__message--small">
          {addTransactionMonth}月は会計済みのため追加できません。
        </div>
      )}
      <DatePicker
        id={'date-picker-dialog'}
        label={'日付(必須)'}
        value={transactionDate}
        onChange={handleDateChange}
        required={true}
        disabled={false}
      />
      <KindSelectBox
        onChange={handleSelect}
        required={true}
        value={transactionsType}
        label={'収入or支出(必須)'}
        disabled={false}
      />
      <TextInput
        value={amount}
        type={'tel'}
        id={'amount'}
        label={'金額(必須)'}
        onChange={handleAmountChange}
        required={false}
        fullWidth={false}
        disabled={false}
      />
      {pathName === 'group' && (
        <SelectPayer
          onChange={handlePayerChange}
          required={true}
          value={paymentUserId}
          approvedGroups={approvedGroups}
          groupId={Number(id)}
          pathName={pathName}
          disabled={false}
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
        disabled={false}
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
        disabled={false}
      />
      <TextInput
        value={shop}
        type={'text'}
        id={'shop'}
        label={'店名(任意)'}
        onChange={handleShop}
        required={false}
        fullWidth={false}
        disabled={false}
      />
      <TextInput
        value={memo}
        type={'text'}
        id={'memo'}
        label={'メモ(任意)'}
        onChange={handleMemo}
        required={false}
        fullWidth={false}
        disabled={false}
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
