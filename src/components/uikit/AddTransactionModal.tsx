import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GenericButton,
  DatePicker,
  TextInput,
  KindSelectBox,
  SelectPayer,
  BigCategoryInput,
  MediumCategoryInput,
} from '../uikit/index';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { fetchCategories } from '../../reducks/categories/operations';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { getIncomeCategories, getExpenseCategories } from '../../reducks/categories/selectors';
import {
  getGroupIncomeCategories,
  getGroupExpenseCategories,
} from '../../reducks/groupCategories/selectors';
import { getUserId } from '../../reducks/users/selectors';
import {
  addTransactions,
  addLatestTransactions,
  fetchTransactionsList,
} from '../../reducks/transactions/operations';
import {
  addGroupLatestTransactions,
  addGroupTransactions,
} from '../../reducks/groupTransactions/operations';
import { TransactionsReq } from '../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../reducks/groupTransactions/types';
import { getPathTemplateName, getPathGroupId } from '../../lib/path';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../reducks/store/types';
import { AssociatedCategory, Category } from '../../reducks/categories/types';
import { customMonth } from '../../lib/constant';
import { isValidAmountFormat } from '../../lib/validation';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#fff',
      boxShadow: 'none',
      margin: '0 auto',
      marginTop: '2%',
      width: 480,
      height: 'auto',
      border: '1px solid #000',
      padding: theme.spacing(1, 2, 2),
    },
    buttonPosition: {
      textAlign: 'center',
    },
    smallSpaceTop: {
      marginTop: 50,
    },
    textPosition: {
      textAlign: 'center',
    },
    delimiterLine: {
      borderBottom: '1px solid',
    },
    modalPosition: {
      top: '20%',
    },
  })
);

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  selectDate: Date;
  year: number;
  month: number;
}

const AddTransactionModal = (props: AddTransactionModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const signal = axios.CancelToken.source();
  const approvedGroup = getApprovedGroups(selector);
  const userId = getUserId(selector);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const groupIncomeCategories = getGroupIncomeCategories(selector);
  const groupExpenseCategories = getGroupExpenseCategories(selector);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState<string>('');
  const emptyShop = shop === '' ? null : shop;
  const [transactionDate, setTransactionDate] = useState<Date | null>(props.selectDate);
  const [transactionsType, setTransactionType] = useState<string>('expense');
  const [paymentUserId, setPaymentUserId] = useState<string>(userId);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [associatedCategory, setAssociatedCategory] = useState<string>('');
  const years = {
    selectedYear: String(props.year),
    selectedMonth: props.month <= 9 ? '0' + props.month : String(props.month),
  };
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState<boolean>(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setTransactionDate(props.selectDate);
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

  const handlePayerChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setPaymentUserId(event.target.value as string);
    },
    [setPaymentUserId]
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

  const switchingAddTransaction = () => {
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
        await dispatch(addGroupLatestTransactions(groupId, groupAddRequestData));
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
    setPaymentUserId(userId);
  };

  const body = (
    <div className={classes.paper}>
      <button
        className="input-years__btn__close"
        onClick={() => {
          props.onClose();
          resetForm();
        }}
      >
        <CloseIcon />
      </button>
      <h3 className={classes.textPosition}>家計簿の追加</h3>
      <div className={classes.delimiterLine} />
      <div className={classes.smallSpaceTop} />

      <form className="grid__column">
        <DatePicker
          id={'date-picker-dialog'}
          label={'日付'}
          value={transactionDate}
          onChange={handleDateChange}
          required={true}
        />
        <KindSelectBox
          onChange={handleSelect}
          required={true}
          value={transactionsType}
          label={'支出or収入'}
        />
        <TextInput
          value={amount}
          type={'tel'}
          id={'amount'}
          label={'金額'}
          onChange={handleAmountChange}
          required={true}
          fullWidth={false}
        />
        {pathName === 'group' && (
          <SelectPayer
            approvedGroups={approvedGroup}
            groupId={groupId}
            onChange={handlePayerChange}
            pathName={pathName}
            required={true}
            value={paymentUserId}
          />
        )}
        <BigCategoryInput
          bigCategory={bigCategory}
          bigCategoryMenuOpen={bigCategoryMenuOpen}
          expenseCategories={pathName !== 'group' ? expenseCategories : groupExpenseCategories}
          incomeCategories={pathName !== 'group' ? incomeCategories : groupIncomeCategories}
          kind={transactionsType}
          onClick={selectCategory}
          onClickCloseBigCategoryMenu={onClickCloseBigCategoryMenu}
          setBigCategoryMenuOpen={setBigCategoryMenuOpen}
        />
        <MediumCategoryInput
          associatedCategory={associatedCategory}
          bigCategory={bigCategory}
          bigCategoryId={bigCategoryId}
          bigCategoryIndex={bigCategoryIndex}
          expenseCategories={pathName !== 'group' ? expenseCategories : groupExpenseCategories}
          incomeCategories={pathName !== 'group' ? incomeCategories : groupIncomeCategories}
          kind={transactionsType}
          mediumCategoryMenuOpen={mediumCategoryMenuOpen}
          onClick={selectCategory}
          onClickCloseMediumCategoryMenu={onClickCloseMediumCategoryMenu}
          setMediumCategoryMenuOpen={setMediumCategoryMenuOpen}
        />
        <TextInput
          value={shop}
          type={'text'}
          id={'shop'}
          label={'店名'}
          onChange={handleShop}
          required={false}
          fullWidth={false}
        />
        <TextInput
          value={memo}
          type={'text'}
          id={'memo'}
          label={'メモ'}
          onChange={handleMemo}
          required={false}
          fullWidth={false}
        />
      </form>
      <div className={classes.buttonPosition}>
        <GenericButton
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            switchingAddTransaction();
          }}
          label={'追加する'}
          disabled={unInput}
        />
      </div>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.onClose();
        resetForm();
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};
export default AddTransactionModal;
