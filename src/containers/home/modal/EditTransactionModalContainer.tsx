import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import {
  deleteGroupTransactions,
  editGroupTransactions,
  fetchGroupYearlyAccountListForModal,
} from '../../../reducks/groupTransactions/operations';
import { deleteTransactions, editTransactions } from '../../../reducks/transactions/operations';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../../reducks/groupCategories/selectors';
import { getYearlyAccountListStatusModals } from '../../../reducks/groupTransactions/selectors';
import { AssociatedCategory, Category } from '../../../reducks/categories/types';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import EditTransactionModal from '../../../components/home/modal/EditTransactionModal';
import { isValidAmountFormat } from '../../../lib/validation';
import { year, customMonth } from '../../../lib/constant';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  addCustomCategories,
  deleteCustomCategories,
  editCustomCategories,
} from '../../../reducks/categories/operations';
import {
  addGroupCustomCategories,
  deleteGroupCustomCategories,
  editGroupCustomCategories,
} from '../../../reducks/groupCategories/operations';

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
}

const EditTransactionModalContainer = (props: EditTransactionModalContainerProps) => {
  const dispatch = useDispatch();
  const transactionId = props.id;
  const { group_id } = useParams();
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
  const [transactionsType, setTransactionType] = useState<string>(props.transactionsType);
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
  const [customCategoryName, setCustomCategoryName] = useState<string>('');
  const [editCustomCategoryName, setEditCustomCategoryName] = useState<string>('');
  const [bigEditCategoryIndex, setBigEditCategoryIndex] = useState<number | null>(null);
  const [associatedIndex, setAssociatedIndex] = useState<number | null>(null);

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

  const editTransactionDisabled = () => {
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

  const transactionDisabled = editTransactionDisabled();

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
      setBigCategory('');
      setAssociatedCategory('');
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
    setTransactionType(event.target.value as string);
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const changePayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPaymentUserId(event.target.value as string);
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

  const changeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };
  const changeShop = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
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
    const signal = axios.CancelToken.source();

    pathName === 'home'
      ? dispatch(deleteTransactions(transactionId, signal, year, customMonth))
      : dispatch(
          deleteTransactions(
            transactionId,
            signal,
            editTransactionDate.editTransactionYear,
            transactionsMonth
          )
        );
  };

  const personalEditTransaction = (): void => {
    const signal = axios.CancelToken.source();

    pathName === 'home'
      ? dispatch(
          editTransactions(transactionId, personalEditRequestData, year, customMonth, signal)
        )
      : dispatch(
          editTransactions(
            transactionId,
            personalEditRequestData,
            editTransactionDate.editTransactionYear,
            transactionsMonth,
            signal
          )
        );
    props.onClose();
  };

  const groupDeleteTransaction = (): void => {
    const signal = axios.CancelToken.source();

    groupCurrentPage === 'home'
      ? dispatch(
          deleteGroupTransactions(transactionId, Number(group_id), signal, year, customMonth)
        )
      : dispatch(
          deleteGroupTransactions(
            transactionId,
            Number(group_id),
            signal,
            editTransactionDate.editTransactionYear,
            transactionsMonth
          )
        );
  };

  const groupEditTransaction = (): void => {
    const signal = axios.CancelToken.source();

    groupCurrentPage === 'home'
      ? dispatch(
          editGroupTransactions(
            Number(group_id),
            transactionId,
            signal,
            year,
            customMonth,
            groupEditRequestData
          )
        )
      : dispatch(
          editGroupTransactions(
            transactionId,
            Number(group_id),
            signal,
            editTransactionDate.editTransactionYear,
            transactionsMonth,
            groupEditRequestData
          )
        );
    props.onClose();
  };

  const resetForm = () => {
    setMemo(props.memo);
    setShop(props.shop);
    setAmount(String(props.amount));
    setTransactionType(props.transactionsType);
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

  const unInput = !isValidAmountFormat(amount);

  return (
    <EditTransactionModal
      unInput={unInput}
      unEditInputForm={transactionDisabled.unEditInputForm}
      editDisabled={transactionDisabled.editDisabled}
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
      bigCategoryRef={bigCategoryRef}
      mediumMenuRef={mediumMenuRef}
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
      handleChangeCategory={handleChangeCategory}
      handleCloseBigCategoryMenu={handleCloseBigCategoryMenu}
      handleCloseMediumCategoryMenu={handleCloseMediumCategoryMenu}
      changeMemo={changeMemo}
      changeShop={changeShop}
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
export default EditTransactionModalContainer;
