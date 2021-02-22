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
import { addTransactions } from '../../../reducks/transactions/operations';
import {
  addGroupTransactions,
  fetchGroupYearlyAccountListForModal,
} from '../../../reducks/groupTransactions/operations';
import {
  addCustomCategories,
  deleteCustomCategories,
  editCustomCategories,
  fetchCategories,
} from '../../../reducks/categories/operations';
import { TransactionsReq } from '../../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../../reducks/groupTransactions/types';
import { AssociatedCategory, Category } from '../../../reducks/categories/types';
import { customMonth, year } from '../../../lib/constant';
import { isValidAmountFormat } from '../../../lib/validation';
import AddTransactionModal from '../../../components/home/modal/AddTransactionModal';
import { Action, Dispatch } from 'redux';
import {
  addGroupCustomCategories,
  deleteGroupCustomCategories,
  editGroupCustomCategories,
} from '../../../reducks/groupCategories/operations';

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
  initialBigCategoryId: 0,
};

const AddTransactionModalContainer = (props: AddTransactionModalContainerProps) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const groupCurrentPage = useLocation().pathname.split('/')[2];
  const userId = useSelector(getUserId);
  const approvedGroup = useSelector(getApprovedGroups);
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const accountingStatus = useSelector(getYearlyAccountListStatusModals);
  const [amount, setAmount] = useState<string>(initialState.initialAmount);
  const [memo, setMemo] = useState('');
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState('');
  const emptyShop = shop === '' ? null : shop;
  const [transactionDate, setTransactionDate] = useState<Date | null>(props.selectDate);
  const [transactionsType, setTransactionType] = useState('expense');
  const [paymentUserId, setPaymentUserId] = useState<string>(userId);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialState.initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(initialState.initialBigCategory);
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [associatedCategory, setAssociatedCategory] = useState('');
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [firstTransactionDate, setFirstTransactionDate] = useState<Date | null>(transactionDate);
  const [firstTransactionMonth, setFirstTransactionMonth] = useState(0);
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

    if (pathName !== 'group') {
      dispatch(fetchCategories(signal));
    }

    return () => signal.cancel();
  }, [pathName]);

  useEffect(() => {
    setBigCategory(initialState.initialBigCategory);
    setAssociatedCategory('');
  }, [transactionsType]);

  const changeTransactionDate = (transactionDate: Date | null) => {
    setTransactionDate(transactionDate as Date);
  };

  const changeTransactionType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransactionType(event.target.value as string);
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
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

  const switchingAddTransaction = () => {
    const signal = axios.CancelToken.source();
    const september = 9;
    const transactionsMonth =
      addTransactionDate.addTransactionMonth <= september
        ? '0' + addTransactionDate.addTransactionMonth
        : String(addTransactionDate.addTransactionMonth);

    const personalAddTransaction = () => {
      pathName === 'home'
        ? dispatch(addTransactions(personalAddRequestData, year, customMonth, signal))
        : dispatch(
            addTransactions(
              personalAddRequestData,
              addTransactionDate.addTransactionYear,
              String(transactionsMonth),
              signal
            )
          );
      props.onClose();
      resetForm();
    };

    const groupAddTransaction = () => {
      groupCurrentPage === 'home'
        ? dispatch(addGroupTransactions(group_id, signal, year, customMonth, groupAddRequestData))
        : dispatch(
            addGroupTransactions(
              group_id,
              signal,
              addTransactionDate.addTransactionYear,
              transactionsMonth,
              groupAddRequestData
            )
          );

      props.onClose();
      resetForm();
    };

    return pathName !== 'group' ? personalAddTransaction() : groupAddTransaction();
  };

  const resetForm = () => {
    setAmount(initialState.initialAmount);
    setMemo('');
    setShop('');
    setTransactionType('expense');
    setBigCategory(initialState.initialBigCategory);
    setAssociatedCategory('');
    setBigCategoryId(initialState.initialBigCategoryId);
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
      handleChangeCategory={handleChangeCategory}
      closeBigCategoryMenu={handleCloseBigCategoryMenu}
      closeMediumCategoryMenu={handleCloseMediumCategoryMenu}
      changePayer={changePayer}
      changeShop={changeShop}
      changeMemo={changeMemo}
      approvedGroup={approvedGroup}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      groupIncomeCategories={groupIncomeCategories}
      groupExpenseCategories={groupExpenseCategories}
      customCategoryName={customCategoryName}
      editCustomCategoryName={editCustomCategoryName}
      associatedIndex={associatedIndex}
      bigEditCategoryIndex={bigEditCategoryIndex}
      handleChangeAddCustomCategory={handleChangeAddCustomCategory}
      handleChangeEditCustomCategory={handleChangeEditCustomCategory}
      handleOpenEditCustomCategoryField={handleOpenEditCustomCategoryField}
      handleAddCustomCategory={handleAddCustomCategory}
      handleEditCustomCategory={handleEditCustomCategory}
      handleDeleteCustomCategory={handleDeleteCustomCategory}
    />
  );
};
export default AddTransactionModalContainer;
