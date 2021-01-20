import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
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
import CloseIcon from '@material-ui/icons/Close';
import { AssociatedCategory, Category } from '../../reducks/categories/types';
import { customMonth } from '../../lib/constant';
import { isValidAmountFormat } from '../../lib/validation';
import { fetchGroupYearlyAccountListForModal } from '../../reducks/groupTransactions/operations';
import { getYearlyAccountListStatusModals } from '../../reducks/groupTransactions/selectors';
import '../../assets/modules/input-form .scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#fff',
      boxShadow: 'none',
      margin: '0 auto',
      marginTop: 10,
      width: 470,
      border: '1px solid #000',
      padding: theme.spacing(1, 2, 2),
    },
    buttonPosition: {
      textAlign: 'center',
    },
    smallSpaceTop: {
      marginTop: 20,
    },
    textPosition: {
      textAlign: 'center',
    },
    delimiterLine: {
      borderBottom: '1px solid',
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
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const signal = axios.CancelToken.source();
  const approvedGroup = useSelector(getApprovedGroups);
  const userId = useSelector(getUserId);
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const accountingStatus = useSelector(getYearlyAccountListStatusModals);
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState('');
  const emptyShop = shop === '' ? null : shop;
  const [transactionDate, setTransactionDate] = useState<Date | null>(props.selectDate);
  const [transactionsType, setTransactionType] = useState('expense');
  const [paymentUserId, setPaymentUserId] = useState<string>(userId);
  const [bigCategory, setBigCategory] = useState<string | null>('');
  const [bigCategoryId, setBigCategoryId] = useState(0);
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [associatedCategory, setAssociatedCategory] = useState('');
  const years = {
    selectedYear: String(props.year),
    selectedMonth: props.month <= 9 ? '0' + props.month : String(props.month),
  };
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [firstTransactionDate, setFirstTransactionDate] = useState<Date | null>(transactionDate);

  let addTransactionYear = 0;
  let addTransactionMonth = 0;

  if (transactionDate) {
    addTransactionYear = transactionDate.getFullYear();
    addTransactionMonth = transactionDate.getMonth() + 1;
  }

  let firstTransactionMonth = 0;
  if (firstTransactionDate) {
    firstTransactionMonth = firstTransactionDate.getMonth() + 1;
  }

  let addDisabled = false;
  let unEditInputForm = false;

  if (pathName === 'group') {
    if (accountingStatus.year === addTransactionYear + '年') {
      for (const account of accountingStatus.accountedMonth) {
        if (account === addTransactionMonth + '月') {
          addDisabled = true;
        }

        if (account === firstTransactionMonth + '月') {
          unEditInputForm = true;
        }
      }
    }
  }

  useEffect(() => {
    if (pathName === 'group') {
      if (props.open) {
        const signal = axios.CancelToken.source();
        dispatch(fetchGroupYearlyAccountListForModal(Number(group_id), addTransactionYear, signal));

        const interval = setInterval(() => {
          dispatch(
            fetchGroupYearlyAccountListForModal(Number(group_id), addTransactionYear, signal)
          );
        }, 3000);

        return () => {
          signal.cancel();
          clearInterval(interval);
        };
      }
    }
  }, [props.open]);

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
    setFirstTransactionDate(transactionDate);
  }, [props.open]);

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
      {addDisabled && pathName === 'group' && (
        <div className="input-form__message">
          {addTransactionMonth + '月'}は会計済みのため追加できません。
        </div>
      )}
      <div className={classes.delimiterLine} />
      <div className={classes.smallSpaceTop} />

      <form className="input-form__column">
        <div className="input-form__form-content">
          <DatePicker
            id={'date-picker-dialog'}
            label={'日付'}
            value={transactionDate}
            onChange={handleDateChange}
            required={true}
            disabled={unEditInputForm}
          />
          <div className="input-form__form-content--spacer-small" />
          <KindSelectBox
            onChange={handleSelect}
            required={true}
            value={transactionsType}
            disabled={unEditInputForm}
            currentPage={''}
          />
          <div className="input-form__form-content--spacer-small" />
          <TextInput
            value={amount}
            type={'tel'}
            id={'amount'}
            label={'金額'}
            onChange={handleAmountChange}
            required={true}
            fullWidth={false}
            disabled={unEditInputForm}
          />
          <div className="input-form__form-content--spacer-medium" />
          {pathName === 'group' && (
            <>
              <SelectPayer
                approvedGroups={approvedGroup}
                groupId={Number(group_id)}
                onChange={handlePayerChange}
                pathName={pathName}
                required={true}
                value={paymentUserId}
                disabled={unEditInputForm}
              />
              <div className="input-form__form-content--spacer-medium" />
            </>
          )}
          <div className="input-form__select-category">
            <BigCategoryInput
              ref={bigCategoryRef}
              bigCategory={bigCategory}
              bigCategoryMenuOpen={bigCategoryMenuOpen}
              expenseCategories={pathName !== 'group' ? expenseCategories : groupExpenseCategories}
              incomeCategories={pathName !== 'group' ? incomeCategories : groupIncomeCategories}
              kind={transactionsType}
              onClick={selectCategory}
              onClickCloseBigCategoryMenu={onClickCloseBigCategoryMenu}
              setBigCategoryMenuOpen={setBigCategoryMenuOpen}
              disabled={unEditInputForm}
            />
          </div>
          <div className="input-form__form-content--spacer-medium" />
          <div className="input-form__select-category">
            <MediumCategoryInput
              ref={mediumMenuRef}
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
              disabled={unEditInputForm}
            />
          </div>
          <div className="input-form__form-content--spacer-medium" />
          <TextInput
            value={shop}
            type={'text'}
            id={'shop'}
            label={'店名'}
            onChange={handleShop}
            required={false}
            fullWidth={false}
            disabled={unEditInputForm}
          />
          <div className="input-form__form-content--spacer-small" />
          <TextInput
            value={memo}
            type={'text'}
            id={'memo'}
            label={'メモ'}
            onChange={handleMemo}
            required={false}
            fullWidth={false}
            disabled={unEditInputForm}
          />
          <div className="input-form__form-content--spacer-medium" />
          <div className={classes.buttonPosition}>
            <GenericButton
              label={'追加する'}
              disabled={unInput || addDisabled}
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                switchingAddTransaction();
              }}
            />
          </div>
        </div>
      </form>
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
