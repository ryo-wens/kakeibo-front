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
import {
  addGroupCustomCategories,
  deleteGroupCustomCategories,
  editGroupCustomCategories,
  fetchGroupCategories,
} from '../../../reducks/groupCategories/operations';
import { addTransactions } from '../../../reducks/transactions/operations';
import {
  addGroupTransactions,
  fetchGroupYearlyAccountList,
} from '../../../reducks/groupTransactions/operations';
import { AssociatedCategory, Category } from '../../../reducks/categories/types';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import { isValidAmountFormat } from '../../../lib/validation';
import { year, customMonth } from '../../../lib/constant';
import InputForm from '../../../components/home/transactionInputForm/InputForm';
import { Action, Dispatch } from 'redux';
import {
  addCustomCategories,
  deleteCustomCategories,
  editCustomCategories,
} from '../../../reducks/categories/operations';

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
  const [customCategoryName, setCustomCategoryName] = useState<string>('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState<string>('');
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);

  const addTransactionDate = {
    addTransactionYear: 0,
    addTransactionMonth: 0,
  };

  if (transactionDate) {
    addTransactionDate.addTransactionYear = transactionDate.getFullYear();
    addTransactionDate.addTransactionMonth = transactionDate.getMonth() + 1;
  }

  const displayMessage = () => {
    if (pathName === 'group') {
      if (accountingStatus.year === addTransactionDate.addTransactionYear + '年') {
        for (const account of accountingStatus.accountedMonth) {
          if (account === addTransactionDate.addTransactionMonth + '月') {
            return true;
          }
        }
      }
    }

    return false;
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

  const handleCloseBigCategoryMenu = (event: Event) => {
    if (bigCategoryRef.current && !bigCategoryRef.current.contains(event.target as Node)) {
      setBigCategoryMenuOpen(false);
    }
  };

  const handleCloseMediumCategoryMenu = (event: Event) => {
    if (mediumMenuRef.current && !mediumMenuRef.current.contains(event.target as Node)) {
      setMediumCategoryMenuOpen(false);
    }
  };

  const handleChangeCategory = (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setBigCategoryIndex(bigCategoryIndex);
    setAssociatedCategory(associatedCategory.name);
    categoryType === 'bigCategory'
      ? setBigCategoryMenuOpen(false)
      : setMediumCategoryMenuOpen(false);
    event.stopPropagation();

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

  const handleChangeAddCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategoryName(event.target.value);
  };

  const handleChangeEditCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditCustomCategoryName(event.target.value);
  };

  const categoryOperationSwitching = (
    operationFunction: (dispatch: Dispatch<Action>) => Promise<void>,
    groupOperationFunction: (dispatch: Dispatch<Action>) => Promise<void>
  ) => {
    if (pathName !== 'group') {
      dispatch(operationFunction);
    } else if (pathName === 'group') {
      dispatch(groupOperationFunction);
    }
  };

  const handleOpenEditCustomCategoryField = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryName: string,
    associatedCategoryIndex: number,
    bigCategoriesIndex: number,
    categoryType: string
  ) => {
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    event.stopPropagation();
    setEditCustomCategoryName(associatedCategoryName);
    setAssociatedIndex(associatedCategoryIndex);
    setBigEditCategoryIndex(bigCategoriesIndex);
  };

  const handleAddCustomCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bigCategoryId: number,
    categoryType: string
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    setCustomCategoryName('');
    categoryOperationSwitching(
      addCustomCategories(customCategoryName, bigCategoryId, signal),
      addGroupCustomCategories(customCategoryName, bigCategoryId, Number(group_id), signal)
    );
  };

  const handleEditCustomCategory = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number,
    categoryType: string
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    setEditCustomCategoryName('');
    setAssociatedIndex(null);
    setBigEditCategoryIndex(null);

    categoryOperationSwitching(
      editCustomCategories(associatedCategoryId, editCustomCategoryName, bigCategoryId, signal),
      editGroupCustomCategories(
        associatedCategoryId,
        editCustomCategoryName,
        bigCategoryId,
        Number(group_id),
        signal
      )
    );
  };

  const handleDeleteCustomCategory = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();

    if (window.confirm('カスタムカテゴリーを削除しますか？')) {
      categoryOperationSwitching(
        deleteCustomCategories(associatedCategoryId, bigCategoryId, signal),
        deleteGroupCustomCategories(associatedCategoryId, bigCategoryId, Number(group_id), signal)
      );
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
    shop: emptyShop !== null ? emptyShop.trim() : null,
    memo: emptyMemo !== null ? emptyMemo.trim() : null,
    amount: Number(amount),
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
  };

  const groupAddRequestData: GroupTransactionsReq = {
    transaction_type: transactionsType,
    transaction_date: transactionDate,
    shop: emptyShop !== null ? emptyShop.trim() : null,
    memo: emptyMemo !== null ? emptyMemo.trim() : null,
    amount: Number(amount),
    payment_user_id: paymentUserId,
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
  };

  const addTransaction = () => {
    const signal = axios.CancelToken.source();
    dispatch(addTransactions(personalAddRequestData, year, customMonth, signal));
    resetInputForm();
  };

  const addGroupTransaction = () => {
    const signal = axios.CancelToken.source();
    dispatch(
      addGroupTransactions(Number(group_id), signal, year, customMonth, groupAddRequestData)
    );
    resetInputForm();
  };

  const unInput =
    displayMessageDecision ||
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
      displayMessageDecision={displayMessageDecision}
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
      handleCloseBigCategoryMenu={handleCloseBigCategoryMenu}
      handleCloseMediumCategoryMenu={handleCloseMediumCategoryMenu}
      handleChangeCategory={handleChangeCategory}
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
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      handleChangeAddCustomCategory={handleChangeAddCustomCategory}
      handleChangeEditCustomCategory={handleChangeEditCustomCategory}
      handleAddCustomCategory={handleAddCustomCategory}
      handleEditCustomCategory={handleEditCustomCategory}
      handleDeleteCustomCategory={handleDeleteCustomCategory}
      handleOpenEditCustomCategoryField={handleOpenEditCustomCategoryField}
    />
  );
};
export default InputFormContainer;
