import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import {
  editGroupTransactions,
  editSearchGroupTransactions,
  deleteGroupTransactions,
  deleteSearchGroupTransactions,
  fetchGroupYearlyAccountListForModal,
} from '../../../reducks/groupTransactions/operations';
import {
  editTransactions,
  editSearchTransactions,
  deleteTransactions,
  deleteSearchTransactions,
} from '../../../reducks/transactions/operations';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../reducks/groupCategories/selectors';
import { getYearlyAccountListStatusModals } from '../../../reducks/groupTransactions/selectors';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import EditTransactionModal from '../../../components/home/modal/EditTransactionModal';
import { isValidAmountFormat } from '../../../lib/validation';
import { year, customMonth } from '../../../lib/constant';
import axios from 'axios';

interface EditTransactionModalContainerProps {
  open: boolean;
  onClose: () => void;
  id: number;
  transactionDate: string;
  amount: number;
  memo: string | null;
  shop: string | null;
  bigCategoryId: number;
  mediumCategoryId: number;
  customCategoryId: number;
  categoryName: {
    bigCategory: string;
    mediumCategory: string;
    customCategory: string;
  };
  transactionsType: string;
  paymentUserId?: string;
  submitSearch?: boolean;
  searchRequestData?: {
    transaction_type: string | null;
    start_date: Date | null;
    end_date: Date | null;
    low_amount: string | null;
    high_amount: string | null;
    memo: string | null;
    shop: string | null;
    sort: string | null;
    sort_type: string | null;
    big_category_id: number | null;
    limit: string | null;
  };
  groupSearchRequestData?: {
    transaction_type: string | null;
    payment_user_id: string | null;
    start_date: Date | null;
    end_date: Date | null;
    low_amount: string | null;
    high_amount: string | null;
    memo: string | null;
    shop: string | null;
    sort: string | null;
    sort_type: string | null;
    big_category_id: number | null;
    limit: string | null;
  };
}

const EditTransactionModalContainer = (props: EditTransactionModalContainerProps) => {
  const dispatch = useDispatch();
  const transactionId = props.id;
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const groupCurrentPage = useLocation().pathname.split('/')[2];
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const accountingStatus = useSelector(getYearlyAccountListStatusModals);
  const approvedGroup = useSelector(getApprovedGroups);
  const expenseBigCategoryIndex = props.bigCategoryId - 2;
  const adjustTransactionDate = props.transactionDate.replace('/', '-').slice(0, 10);
  const changeTypeTransactionDate = new Date(adjustTransactionDate);
  const [transactionDate, setTransactionDate] = useState<Date | null>(changeTypeTransactionDate);
  const [firstTransactionDate, setFirstTransactionDate] = useState<Date | null>(transactionDate);
  const [firstTransactionMonth, setFirstTransactionMonth] = useState(0);
  const [amount, setAmount] = useState(String(props.amount));
  const [memo, setMemo] = useState<string | null>(props.memo);
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState<string | null>(props.shop);
  const emptyShop = shop === '' ? null : shop;
  const [transactionsType, setTransactionsType] = useState<string>(props.transactionsType);
  const [paymentUserId, setPaymentUserId] = useState(String(props.paymentUserId));
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);
  const [bigCategory, setBigCategory] = useState<string | null>(props.categoryName.bigCategory);
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [bigCategoryId, setBigCategoryId] = useState<number>(props.bigCategoryId);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(props.mediumCategoryId);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(props.customCategoryId);
  const [associatedCategory, setAssociatedCategory] = useState<string>(
    props.categoryName.mediumCategory || props.categoryName.customCategory
  );
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState('');
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);

  const unEditValue = {
    unEditBigCategory: '',
    unAssociatedCategory: '',
    unEditBigCategoryId: 0,
  };

  const editTransactionDate = {
    editTransactionYear: 0,
    editTransactionMonth: 0,
  };

  if (transactionDate) {
    editTransactionDate.editTransactionYear = transactionDate.getFullYear();
    editTransactionDate.editTransactionMonth = transactionDate.getMonth() + 1;
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

  const disabledOnPayOff = () => {
    const disabledConditions = {
      editDisabled: false,
      unEditInputForm: false,
    };

    if (pathName === 'group') {
      if (accountingStatus.year === editTransactionDate.editTransactionYear + '年') {
        for (const account of accountingStatus.accountedMonth) {
          if (account === editTransactionDate.editTransactionMonth + '月') {
            disabledConditions.editDisabled = true;
          }

          if (account === firstTransactionMonth + '月') {
            disabledConditions.unEditInputForm = true;
          }
        }
      }
    }
    return disabledConditions;
  };

  const editDisabledOnPayOff = disabledOnPayOff();

  const unEditTransaction = () => {
    if (
      transactionDate?.getTime() === changeTypeTransactionDate.getTime() &&
      transactionsType === props.transactionsType &&
      amount === String(props.amount) &&
      bigCategory === props.categoryName.bigCategory &&
      memo == props.memo &&
      shop === props.shop &&
      paymentUserId === String(props.paymentUserId) &&
      associatedCategory ===
        (props.categoryName.mediumCategory || props.categoryName.customCategory)
    ) {
      return true;
    } else {
      return !isValidAmountFormat(amount) || bigCategoryId === unEditValue.unEditBigCategoryId;
    }
  };

  const editDisabled = unEditTransaction();

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName === 'group') {
      if (props.open) {
        dispatch(
          fetchGroupYearlyAccountListForModal(
            Number(group_id),
            editTransactionDate.editTransactionYear,
            signal
          )
        );

        const interval = setInterval(() => {
          dispatch(
            fetchGroupYearlyAccountListForModal(
              Number(group_id),
              editTransactionDate.editTransactionYear,
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
      setBigCategory(unEditValue.unEditBigCategory);
      setAssociatedCategory(unEditValue.unAssociatedCategory);
      setBigCategoryId(unEditValue.unEditBigCategoryId);
    }
  }, [transactionsType]);

  useEffect(() => {
    setMemo(props.memo);
  }, [props.memo]);

  useEffect(() => {
    setShop(props.shop);
  }, [props.shop]);

  useEffect(() => {
    setAmount(String(props.amount));
  }, [props.amount]);

  useEffect(() => {
    setBigCategory(props.categoryName.bigCategory);
  }, [props.categoryName.bigCategory]);

  useEffect(() => {
    setAssociatedCategory(props.categoryName.mediumCategory || props.categoryName.customCategory);
  }, [props.categoryName.mediumCategory, props.categoryName.customCategory]);

  useEffect(() => {
    setBigCategoryId(props.bigCategoryId);
  }, [props.bigCategoryId]);

  useEffect(() => {
    setBigCategoryIndex(expenseBigCategoryIndex);
  }, [props.bigCategoryId]);

  useEffect(() => {
    setMediumCategoryId(props.mediumCategoryId);
  }, [props.mediumCategoryId]);

  useEffect(() => {
    setCustomCategoryId(props.customCategoryId);
  }, [props.customCategoryId]);

  useEffect(() => {
    setTransactionDate(changeTypeTransactionDate);
  }, [props.open]);

  useEffect(() => {
    setPaymentUserId(String(props.paymentUserId));
  }, [props.paymentUserId]);

  const changeTransactionDate = (transactionDate: Date | null) => {
    setTransactionDate(transactionDate as Date);
  };

  const changeTransactionType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransactionsType(event.target.value as string);
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const changePayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPaymentUserId(event.target.value as string);
  };

  const changeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };
  const changeShop = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
  };

  const personalEditRequestData: TransactionsReq = {
    transaction_date: transactionDate,
    transaction_type: transactionsType,
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
    amount: Number(amount),
    memo: emptyMemo !== null ? emptyMemo.trim() : null,
    shop: emptyShop !== null ? emptyShop.trim() : null,
  };
  const groupEditRequestData: GroupTransactionsReq = {
    transaction_date: transactionDate,
    transaction_type: transactionsType,
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
    amount: Number(amount),
    payment_user_id: paymentUserId,
    memo: emptyMemo !== null ? emptyMemo.trim() : null,
    shop: emptyShop !== null ? emptyShop.trim() : null,
  };

  const september = 9;
  const transactionsMonth =
    editTransactionDate.editTransactionMonth <= september
      ? '0' + editTransactionDate.editTransactionMonth
      : String(editTransactionDate.editTransactionMonth);

  const personalDeleteTransaction = (): void => {
    pathName === 'home'
      ? dispatch(deleteTransactions(transactionId, year, customMonth))
      : dispatch(
          deleteTransactions(
            transactionId,
            editTransactionDate.editTransactionYear,
            transactionsMonth
          )
        );

    props.submitSearch &&
      props.searchRequestData !== undefined &&
      dispatch(deleteSearchTransactions(transactionId, props.searchRequestData));

    props.onClose();
  };

  const personalEditTransaction = (): void => {
    pathName === 'home'
      ? dispatch(editTransactions(transactionId, personalEditRequestData, year, customMonth))
      : dispatch(
          editTransactions(
            transactionId,
            personalEditRequestData,
            editTransactionDate.editTransactionYear,
            transactionsMonth
          )
        );

    props.submitSearch &&
      props.searchRequestData !== undefined &&
      dispatch(
        editSearchTransactions(transactionId, personalEditRequestData, props.searchRequestData)
      );

    props.onClose();
  };

  const groupDeleteTransaction = (): void => {
    groupCurrentPage === 'home'
      ? dispatch(deleteGroupTransactions(transactionId, Number(group_id), year, customMonth))
      : dispatch(
          deleteGroupTransactions(
            transactionId,
            Number(group_id),
            editTransactionDate.editTransactionYear,
            transactionsMonth
          )
        );

    props.submitSearch &&
      props.groupSearchRequestData !== undefined &&
      dispatch(
        deleteSearchGroupTransactions(Number(group_id), transactionId, props.groupSearchRequestData)
      );

    props.onClose();
  };

  const groupEditTransaction = (): void => {
    groupCurrentPage === 'home'
      ? dispatch(
          editGroupTransactions(
            Number(group_id),
            transactionId,
            year,
            customMonth,
            groupEditRequestData
          )
        )
      : dispatch(
          editGroupTransactions(
            transactionId,
            Number(group_id),
            editTransactionDate.editTransactionYear,
            transactionsMonth,
            groupEditRequestData
          )
        );

    props.submitSearch &&
      props.groupSearchRequestData !== undefined &&
      dispatch(
        editSearchGroupTransactions(
          Number(group_id),
          transactionId,
          groupEditRequestData,
          props.groupSearchRequestData
        )
      );

    props.onClose();
  };

  const resetForm = () => {
    setMemo(props.memo);
    setShop(props.shop);
    setAmount(String(props.amount));
    setTransactionsType(props.transactionsType);
    setTransactionDate(changeTypeTransactionDate);
    setBigCategoryId(props.bigCategoryId);
    setMediumCategoryId(props.mediumCategoryId);
    setCustomCategoryId(props.customCategoryId);
    setBigCategory(props.categoryName.bigCategory);
    setAssociatedCategory(props.categoryName.mediumCategory || props.categoryName.customCategory);
    setBigCategoryMenuOpen(false);
    setMediumCategoryMenuOpen(false);
    setPaymentUserId(String(props.paymentUserId));
  };

  return (
    <EditTransactionModal
      unInput={editDisabled}
      unEditInputForm={editDisabledOnPayOff.unEditInputForm}
      editDisabled={editDisabledOnPayOff.editDisabled}
      group_id={Number(group_id)}
      pathName={pathName}
      approvedGroups={approvedGroup}
      transactionId={transactionId}
      open={props.open}
      onClose={props.onClose}
      editTransactionMonth={editTransactionDate.editTransactionMonth}
      transactionDate={transactionDate}
      transactionsType={transactionsType}
      amount={amount}
      bigCategory={bigCategory}
      associatedCategory={associatedCategory}
      bigCategoryId={bigCategoryId}
      bigCategoryIndex={bigCategoryIndex}
      bigCategoryMenuRef={bigCategoryRef}
      mediumCategoryMenuRef={mediumMenuRef}
      bigCategoryMenuOpen={bigCategoryMenuOpen}
      mediumCategoryMenuOpen={mediumCategoryMenuOpen}
      setBigCategoryMenuOpen={setBigCategoryMenuOpen}
      setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
      paymentUserId={paymentUserId}
      memo={memo}
      shop={shop}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      groupIncomeCategories={groupIncomeCategories}
      groupExpenseCategories={groupExpenseCategories}
      resetForm={resetForm}
      personalDeleteTransaction={personalDeleteTransaction}
      personalEditTransaction={personalEditTransaction}
      groupDeleteTransaction={groupDeleteTransaction}
      groupEditTransaction={groupEditTransaction}
      changeTransactionDate={changeTransactionDate}
      changeTransactionType={changeTransactionType}
      changeAmount={changeAmount}
      changePayer={changePayer}
      changeMemo={changeMemo}
      changeShop={changeShop}
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      setTransactionType={setTransactionsType}
      setAssociatedIndex={setAssociatedIndex}
      setBigCategoryIndex={setBigCategoryIndex}
      setBigEditCategoryIndex={setBigEditCategoryIndex}
      setBigCategoryId={setBigCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      setBigCategory={setBigCategory}
      setAssociatedCategory={setAssociatedCategory}
      setCustomCategoryName={setCustomCategoryName}
      setEditCustomCategoryName={setEditCustomCategoryName}
    />
  );
};
export default EditTransactionModalContainer;
