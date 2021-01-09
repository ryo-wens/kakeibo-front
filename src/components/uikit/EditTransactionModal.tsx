import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editTransactions,
  editLatestTransactions,
  deleteTransactions,
  deleteLatestTransactions,
  fetchLatestTransactionsList,
} from '../../reducks/transactions/operations';
import {
  editGroupTransactions,
  editGroupLatestTransactionsList,
  deleteGroupTransactions,
  deleteGroupLatestTransactions,
  fetchLatestGroupTransactionsList,
} from '../../reducks/groupTransactions/operations';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  GenericButton,
  DatePicker,
  TextInput,
  KindSelectBox,
  SelectPayer,
  BigCategoryInput,
  MediumCategoryInput,
} from '../uikit/index';
import { getExpenseCategories, getIncomeCategories } from '../../reducks/categories/selectors';
import {
  getGroupIncomeCategories,
  getGroupExpenseCategories,
} from '../../reducks/groupCategories/selectors';
import { State } from '../../reducks/store/types';
import { AssociatedCategory, Category } from '../../reducks/categories/types';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TransactionsReq } from '../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../reducks/groupTransactions/types';
import { Groups } from '../../reducks/groups/types';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { isValidAmountFormat } from '../../lib/validation';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#fff',
      boxShadow: 'none',
      margin: '0 auto',
      marginTop: '3%',
      width: 540,
      height: 'auto',
      border: '1px solid #000',
      padding: theme.spacing(1, 2, 2),
    },
    buttonPosition: {
      textAlign: 'center',
    },
    deleteButtonPosition: {
      marginRight: '80%',
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
  })
);

interface InputModalProps {
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
  approvedGroups?: Groups;
}

const EditTransactionModal = (props: InputModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = props.id;
  const groupId = getPathGroupId(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const groupIncomeCategories = getGroupIncomeCategories(selector);
  const groupExpenseCategories = getGroupExpenseCategories(selector);
  const [amount, setAmount] = useState<string>(String(props.amount));
  const [memo, setMemo] = useState<string | null>(props.memo);
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState<string | null>(props.shop);
  const emptyShop = shop === '' ? null : shop;
  const [transactionsType, setTransactionType] = useState<string>(props.transactionsType);
  const [paymentUserId, setPaymentUserId] = useState<string>(String(props.paymentUserId));
  const [bigCategory, setBigCategory] = useState<string | null>(props.categoryName.bigCategory);
  const [associatedCategory, setAssociatedCategory] = useState<string>(
    props.categoryName.mediumCategory || props.categoryName.customCategory
  );
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(0);
  const [bigCategoryId, setBigCategoryId] = useState<number>(props.bigCategoryId);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(props.mediumCategoryId);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(props.customCategoryId);
  const adjustTransactionDate = props.transactionDate.replace('/', '-').slice(0, 10);
  const changeTypeTransactionDate = new Date(adjustTransactionDate);
  const [transactionDate, setTransactionDate] = useState<Date | null>(changeTypeTransactionDate);
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState<boolean>(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState<boolean>(false);
  const signal = axios.CancelToken.source();

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
    setMediumCategoryId(props.mediumCategoryId);
  }, [props.mediumCategoryId]);

  useEffect(() => {
    setCustomCategoryId(props.customCategoryId);
  }, [props.customCategoryId]);

  useEffect(() => {
    setTransactionDate(changeTypeTransactionDate);
  }, [props.transactionDate]);

  useEffect(() => {
    setPaymentUserId(String(props.paymentUserId));
  }, [props.paymentUserId]);

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

  const handlePayerChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setPaymentUserId(event.target.value as string);
    },
    [setPaymentUserId]
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

  const personalEditRequestData: TransactionsReq = {
    transaction_date: transactionDate,
    transaction_type: transactionsType,
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
    amount: Number(amount),
    memo: emptyMemo,
    shop: emptyShop,
  };
  const groupEditRequestData: GroupTransactionsReq = {
    transaction_date: transactionDate,
    transaction_type: transactionsType,
    big_category_id: bigCategoryId,
    medium_category_id: mediumCategoryId,
    custom_category_id: customCategoryId,
    amount: Number(amount),
    payment_user_id: paymentUserId,
    memo: emptyMemo,
    shop: emptyShop,
  };

  const personalDeleteTransaction = (): void => {
    async function personalTransaction() {
      await dispatch(deleteLatestTransactions(id));
      dispatch(fetchLatestTransactionsList(signal));
      dispatch(deleteTransactions(id));
    }
    personalTransaction();
  };
  const personalEditTransaction = (): void => {
    dispatch(editTransactions(id, personalEditRequestData));
    dispatch(editLatestTransactions(id, personalEditRequestData));
    props.onClose();
  };

  const groupDeleteTransaction = (): void => {
    async function groupTransaction() {
      dispatch(deleteGroupLatestTransactions(id, groupId));
      dispatch(fetchLatestGroupTransactionsList(groupId, signal));
      dispatch(deleteGroupTransactions(id, groupId));
    }
    groupTransaction();
  };
  const groupEditTransaction = (): void => {
    dispatch(editGroupTransactions(id, groupId, groupEditRequestData));
    dispatch(editGroupLatestTransactionsList(id, groupId, groupEditRequestData));
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
    setPaymentUserId(String(props.paymentUserId));
  };

  const unInput = !isValidAmountFormat(amount);

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
      <h3 className={classes.textPosition} id="simple-modal-title">
        家計簿の編集
      </h3>
      <div className={classes.delimiterLine} />
      <div className={classes.smallSpaceTop} />
      <form className="grid__column">
        <DatePicker
          id={'date'}
          label={'日付'}
          value={transactionDate}
          onChange={handleDateChange}
          required={false}
        />
        <KindSelectBox
          value={transactionsType}
          onChange={handleSelect}
          required={false}
          label={'支出or収入'}
        />
        <TextInput
          id={'amount'}
          label={'金額'}
          type={'tell'}
          required={false}
          fullWidth={false}
          onChange={handleAmountChange}
          value={amount}
        />
        {pathName === 'group' && (
          <SelectPayer
            approvedGroups={props.approvedGroups as Groups}
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
          id={'shop'}
          label={'店名'}
          type={'text'}
          required={false}
          fullWidth={false}
          onChange={handleShop}
          value={shop}
        />
        <TextInput
          id={'memo'}
          label={'メモ'}
          type={'text'}
          required={false}
          fullWidth={false}
          onChange={handleMemo}
          value={memo}
        />
      </form>
      <div className={classes.smallSpaceTop} />
      <div className={classes.buttonPosition}>
        <GenericButton
          label={'更新する'}
          onClick={pathName !== 'group' ? personalEditTransaction : groupEditTransaction}
          disabled={unInput}
        />
        <IconButton
          className={classes.deleteButtonPosition}
          color={'inherit'}
          onClick={() => {
            if (window.confirm('この記録を削除してもよろしいですか？')) {
              if (pathName !== 'group') {
                personalDeleteTransaction();
              } else {
                groupDeleteTransaction();
              }
            } else {
              return;
            }
          }}
          size={'small'}
        >
          <DeleteIcon />
          削除する
        </IconButton>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {
          props.onClose();
          resetForm();
        }}
        onBackdropClick={props.onClose}
        disableBackdropClick={false}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default EditTransactionModal;
