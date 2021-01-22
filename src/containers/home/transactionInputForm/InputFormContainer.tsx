import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { getUserId } from '../../../reducks/users/selectors';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../reducks/groupCategories/selectors';
import { getYearlyAccountListStatus } from '../../../reducks/groupTransactions/selectors';
import { fetchCategories } from '../../../reducks/categories/operations';
import { fetchGroupCategories } from '../../../reducks/groupCategories/operations';
import { addLatestTransactions, addTransactions } from '../../../reducks/transactions/operations';
import {
  addGroupLatestTransactions,
  addGroupTransactions,
  fetchGroupYearlyAccountList,
} from '../../../reducks/groupTransactions/operations';
import { AssociatedCategory, Category } from '../../../reducks/categories/types';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import { isValidAmountFormat } from '../../../lib/validation';
import { customMonth } from '../../../lib/constant';
import InputForm from '../../../components/home/transactionInputForm/InputForm';

const initialState = {
  initialAmount: '',
  initialBigCategory: '',
  initialBigCategoryId: 0,
};

const InputFormContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const userId = useSelector(getUserId);
  const approvedGroups = useSelector(getApprovedGroups);
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const accountingStatus = useSelector(getYearlyAccountListStatus);
  const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());
  const [transactionsType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState<string>(initialState.initialAmount);
  const [bigCategory, setBigCategory] = useState<string | null>(initialState.initialBigCategory);
  const [associatedCategory, setAssociatedCategory] = useState<string>('');
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialState.initialBigCategoryId);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [paymentUserId, setPaymentUserId] = useState<string>(userId);
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);
  const [shop, setShop] = useState('');
  const emptyShop = shop === '' ? null : shop;
  const [memo, setMemo] = useState('');
  const emptyMemo = memo === '' ? null : memo;

  const addTransactionDate = {
    addTransactionYear: 0,
    addTransactionMonth: 0,
  };

  if (transactionDate) {
    addTransactionDate.addTransactionYear = transactionDate.getFullYear();
    addTransactionDate.addTransactionMonth = transactionDate.getMonth() + 1;
  }

  const displayMessage = () => {
    const displayMessageConditions = {
      canDisplayMessage: false,
    };

    if (pathName === 'group') {
      if (accountingStatus.year === addTransactionDate.addTransactionYear + '年') {
        for (const account of accountingStatus.accountedMonth) {
          if (account === addTransactionDate.addTransactionMonth + '月') {
            displayMessageConditions.canDisplayMessage = true;
          }
        }
      }
    }

    return displayMessageConditions;
  };

  const displayMessageDecision = displayMessage();

  useEffect(() => {
    setPaymentUserId(userId);
  }, [userId]);

  useEffect(() => {
    setTransactionDate(new Date());
    setShop('');
    setMemo('');
    setAmount(initialState.initialAmount);
    setBigCategoryId(initialState.initialBigCategoryId);
    setMediumCategoryId(null);
    setCustomCategoryId(null);
    setBigCategory(initialState.initialBigCategory);
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
      dispatch(fetchGroupCategories(Number(group_id), signal));
      dispatch(
        fetchGroupYearlyAccountList(Number(group_id), addTransactionDate.addTransactionYear, signal)
      );

      const interval = setInterval(() => {
        dispatch(fetchGroupCategories(Number(group_id), signal));
        dispatch(
          fetchGroupYearlyAccountList(
            Number(group_id),
            addTransactionDate.addTransactionYear,
            signal
          )
        );
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName, group_id, transactionDate]);

  const changeTransactionDate = (transactionDate: Date | null) => {
    setTransactionDate(transactionDate as Date);
  };

  const changeTransactionType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransactionType(event.target.value as string);
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const changePayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPaymentUserId(event.target.value as string);
  };

  const closeBigCategoryMenu = (event: Event) => {
    if (bigCategoryRef.current && !bigCategoryRef.current.contains(event.target as Node)) {
      setBigCategoryMenuOpen(false);
    }
  };

  const closeMediumCategoryMenu = (event: Event) => {
    if (mediumMenuRef.current && !mediumMenuRef.current.contains(event.target as Node)) {
      setMediumCategoryMenuOpen(false);
    }
  };

  const changeCategory = (
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
  };

  const changeShop = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
  };

  const changeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

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
      await dispatch(addGroupLatestTransactions(Number(group_id), groupAddRequestData));
      dispatch(addGroupTransactions(customMonth));
      resetInputForm();
    }
    addedGroupTransaction();
  };

  const unInput =
    amount === '' ||
    !isValidAmountFormat(amount) ||
    initialState.initialAmount === amount ||
    initialState.initialBigCategory === bigCategory ||
    initialState.initialBigCategoryId === bigCategoryId;

  const resetInputForm = () => {
    setShop('');
    setMemo('');
    setAmount(initialState.initialAmount);
    setBigCategory(initialState.initialBigCategory);
    setAssociatedCategory('');
    setTransactionType('expense');
  };

  return (
    <InputForm
      unInput={unInput}
      addTransactionMonth={addTransactionDate.addTransactionMonth}
      displayMessageDecision={displayMessageDecision.canDisplayMessage}
      group_id={Number(group_id)}
      pathName={pathName}
      approvedGroups={approvedGroups}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      groupIncomeCategories={groupIncomeCategories}
      groupExpenseCategories={groupExpenseCategories}
      addTransaction={addTransaction}
      addGroupTransaction={addGroupTransaction}
      changeTransactionDate={changeTransactionDate}
      changeTransactionType={changeTransactionType}
      changeAmount={changeAmount}
      changePayer={changePayer}
      closeBigCategoryMenu={closeBigCategoryMenu}
      closeMediumCategoryMenu={closeMediumCategoryMenu}
      changeCategory={changeCategory}
      changeMemo={changeMemo}
      changeShop={changeShop}
      transactionDate={transactionDate}
      transactionsType={transactionsType}
      amount={amount}
      bigCategoryRef={bigCategoryRef}
      mediumMenuRef={mediumMenuRef}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      bigCategory={bigCategory}
      associatedCategory={associatedCategory}
      bigCategoryIndex={bigCategoryIndex}
      bigCategoryId={bigCategoryId}
      customCategoryId={customCategoryId}
      mediumCategoryId={mediumCategoryId}
      paymentUserId={paymentUserId}
      shop={shop}
      memo={memo}
    />
  );
};
export default InputFormContainer;
