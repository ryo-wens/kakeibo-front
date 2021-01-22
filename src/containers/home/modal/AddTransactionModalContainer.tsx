import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { getUserId } from '../../../reducks/users/selectors';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../reducks/groupCategories/selectors';
import { getYearlyAccountListStatusModals } from '../../../reducks/groupTransactions/selectors';
import {
  addLatestTransactions,
  addTransactions,
  fetchTransactionsList,
} from '../../../reducks/transactions/operations';
import {
  addGroupLatestTransactions,
  addGroupTransactions,
  fetchGroupYearlyAccountListForModal,
} from '../../../reducks/groupTransactions/operations';
import { fetchCategories } from '../../../reducks/categories/operations';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import { AssociatedCategory, Category } from '../../../reducks/categories/types';
import { customMonth } from '../../../lib/constant';
import { isValidAmountFormat } from '../../../lib/validation';
import AddTransactionModal from '../../../components/home/modal/AddTransactionModal';

interface AddTransactionModalContainerProps {
  open: boolean;
  onClose: () => void;
  selectDate: Date;
  year: number;
  month: number;
}

const initialState = {
  initialAmount: '',
  initialBigCategory: '',
  initialBigCategoryId: null,
};

const AddTransactionModalContainer = (props: AddTransactionModalContainerProps) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const userId = useSelector(getUserId);
  const years = {
    selectedYear: String(props.year),
    selectedMonth: props.month <= 9 ? '0' + props.month : String(props.month),
  };
  const approvedGroup = useSelector(getApprovedGroups);
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const accountingStatus = useSelector(getYearlyAccountListStatusModals);
  const [amount, setAmount] = useState(initialState.initialAmount);
  const [memo, setMemo] = useState('');
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState('');
  const emptyShop = shop === '' ? null : shop;
  const [transactionDate, setTransactionDate] = useState<Date | null>(props.selectDate);
  const [transactionsType, setTransactionType] = useState('expense');
  const [paymentUserId, setPaymentUserId] = useState<string>(userId);
  const [bigCategoryId, setBigCategoryId] = useState(0);
  const [bigCategory, setBigCategory] = useState<string | null>(initialState.initialBigCategory);
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(
    initialState.initialBigCategoryId
  );
  const [associatedCategory, setAssociatedCategory] = useState('');
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [firstTransactionDate, setFirstTransactionDate] = useState<Date | null>(transactionDate);
  const [firstTransactionMonth, setFirstTransactionMonth] = useState(0);

  const addTransactionDate = {
    addTransactionYear: 0,
    addTransactionMonth: 0,
  };

  if (pathName === 'group') {
    if (transactionDate) {
      addTransactionDate.addTransactionYear = transactionDate.getFullYear();
      addTransactionDate.addTransactionMonth = transactionDate.getMonth() + 1;
    }
  }
  useEffect(() => {
    if (pathName === 'group') {
      setFirstTransactionDate(transactionDate);
    }
  }, [props.open, pathName]);

  useEffect(() => {
    if (firstTransactionDate) {
      setFirstTransactionMonth(firstTransactionDate.getMonth() + 1);
    }
  }, [firstTransactionDate]);

  const addTransactionDisabled = () => {
    const disabledConditions = {
      addDisabled: false,
      unEditInputForm: false,
    };

    if (pathName === 'group') {
      if (accountingStatus.year === addTransactionDate.addTransactionYear + '年') {
        for (const account of accountingStatus.accountedMonth) {
          if (account === addTransactionDate.addTransactionMonth + '月') {
            disabledConditions.addDisabled = true;
          }

          if (account === firstTransactionMonth + '月') {
            disabledConditions.unEditInputForm = true;
          }
        }
      }
    }

    return disabledConditions;
  };

  const transactionsDisabled = addTransactionDisabled();

  useEffect(() => {
    if (pathName === 'group') {
      if (props.open) {
        const signal = axios.CancelToken.source();
        dispatch(
          fetchGroupYearlyAccountListForModal(
            Number(group_id),
            addTransactionDate.addTransactionYear,
            signal
          )
        );

        const interval = setInterval(() => {
          dispatch(
            fetchGroupYearlyAccountListForModal(
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
    }
  }, [props.open, transactionDate]);

  useEffect(() => {
    if (props.open) {
      setEditing(true);

      return () => {
        setEditing(false);
      };
    }
  }, [props.open]);

  useEffect(() => {
    if (!editing) {
      setTransactionDate(props.selectDate);
    }
  }, [props.selectDate]);

  useEffect(() => {
    setPaymentUserId(userId);
  }, [userId]);

  useEffect(() => {
    const signal = axios.CancelToken.source();

    if (pathName !== 'group' && !incomeCategories.length && !expenseCategories.length) {
      dispatch(fetchCategories(signal));
    }

    return () => signal.cancel();
  }, [pathName]);

  const changeTransactionDate = (transactionDate: Date | null) => {
    setTransactionDate(transactionDate as Date);
  };

  const changeTransactionType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransactionType(event.target.value as string);
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
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

  const changePayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPaymentUserId(event.target.value as string);
  };

  const changeShop = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
  };

  const changeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const unInput =
    !isValidAmountFormat(amount) ||
    initialState.initialAmount === amount ||
    initialState.initialBigCategory === bigCategory ||
    initialState.initialBigCategoryId === bigCategoryId;

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

  const switchingAddTransaction = () => {
    const signal = axios.CancelToken.source();
    const personalAddTransaction = () => {
      async function personalTransaction() {
        await dispatch(addLatestTransactions(personalAddRequestData));
        dispatch(addTransactions(customMonth));
        dispatch(fetchTransactionsList(years, signal));
        props.onClose();
        resetForm();
      }
      personalTransaction();
    };

    const groupAddTransaction = () => {
      async function groupTransaction() {
        await dispatch(addGroupLatestTransactions(Number(group_id), groupAddRequestData));
        dispatch(addGroupTransactions(customMonth));
        props.onClose();
        resetForm();
      }
      groupTransaction();
    };

    return pathName !== 'group' ? personalAddTransaction() : groupAddTransaction();
  };

  const resetForm = () => {
    setAmount('');
    setMemo('');
    setShop('');
    setTransactionType('expense');
    setBigCategory('');
    setAssociatedCategory('');
    setBigCategoryId(0);
    setMediumCategoryId(null);
    setCustomCategoryId(null);
    setBigCategoryMenuOpen(false);
    setMediumCategoryMenuOpen(false);
    setPaymentUserId(userId);
  };

  return (
    <AddTransactionModal
      year={props.year}
      month={props.month}
      open={props.open}
      onClose={props.onClose}
      selectDate={props.selectDate}
      groupId={Number(group_id)}
      pathName={pathName}
      unInput={unInput}
      addDisabled={transactionsDisabled.addDisabled}
      unEditInputForm={transactionsDisabled.unEditInputForm}
      addTransactionMonth={addTransactionDate.addTransactionMonth}
      transactionDate={transactionDate}
      transactionType={transactionsType}
      amount={amount}
      bigCategory={bigCategory}
      bigCategoryId={bigCategoryId}
      bigCategoryIndex={bigCategoryIndex}
      associatedCategory={associatedCategory}
      mediumCategoryId={mediumCategoryId}
      customCategoryId={customCategoryId}
      paymentUserId={paymentUserId}
      memo={memo}
      shop={shop}
      bigCategoryRef={bigCategoryRef}
      mediumMenuRef={mediumMenuRef}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      resetForm={resetForm}
      personalAddRequestData={personalAddRequestData}
      groupAddRequestData={groupAddRequestData}
      switchingAddTransaction={switchingAddTransaction}
      changeTransactionDate={changeTransactionDate}
      changeTransactionType={changeTransactionType}
      changeAmount={changeAmount}
      changeCategory={changeCategory}
      closeBigCategoryMenu={closeBigCategoryMenu}
      closeMediumCategoryMenu={closeMediumCategoryMenu}
      changePayer={changePayer}
      changeShop={changeShop}
      changeMemo={changeMemo}
      approvedGroup={approvedGroup}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      groupIncomeCategories={groupIncomeCategories}
      groupExpenseCategories={groupExpenseCategories}
    />
  );
};
export default AddTransactionModalContainer;
