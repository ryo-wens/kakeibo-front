import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
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
import { getYearlyAccountListStatusModals } from '../../reducks/groupTransactions/selectors';
import { fetchGroupYearlyAccountListForModal } from '../../reducks/groupTransactions/operations';
import { AssociatedCategory, Category } from '../../reducks/categories/types';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TransactionsReq } from '../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../reducks/groupTransactions/types';
import { Groups } from '../../reducks/groups/types';
import { isValidAmountFormat } from '../../lib/validation';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/modules/input-form .scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#fff',
      boxShadow: 'none',
      margin: '0 auto',
      marginTop: 10,
      width: 490,
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
  const transactionId = props.id;
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);
  const accountingStatus = useSelector(getYearlyAccountListStatusModals);
  const [amount, setAmount] = useState(String(props.amount));
  const [memo, setMemo] = useState<string | null>(props.memo);
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState<string | null>(props.shop);
  const emptyShop = shop === '' ? null : shop;
  const [transactionsType, setTransactionType] = useState<string>(props.transactionsType);
  const [paymentUserId, setPaymentUserId] = useState(String(props.paymentUserId));
  const [bigCategory, setBigCategory] = useState<string | null>(props.categoryName.bigCategory);
  const [associatedCategory, setAssociatedCategory] = useState<string>(
    props.categoryName.mediumCategory || props.categoryName.customCategory
  );
  const [bigCategoryIndex, setBigCategoryIndex] = useState(0);
  const [bigCategoryId, setBigCategoryId] = useState<number>(props.bigCategoryId);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(props.mediumCategoryId);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(props.customCategoryId);
  const adjustTransactionDate = props.transactionDate.replace('/', '-').slice(0, 10);
  const changeTypeTransactionDate = new Date(adjustTransactionDate);
  const [transactionDate, setTransactionDate] = useState<Date | null>(changeTypeTransactionDate);
  const bigCategoryRef = useRef<HTMLDivElement>(null);
  const mediumMenuRef = useRef<HTMLDivElement>(null);
  const [bigCategoryMenuOpen, setBigCategoryMenuOpen] = useState(false);
  const [mediumCategoryMenuOpen, setMediumCategoryMenuOpen] = useState(false);
  const [firstTransactionDate, setFirstTransactionDate] = useState<Date | null>(transactionDate);
  const expenseBigCategoryIndex = props.bigCategoryId - 2;
  const signal = axios.CancelToken.source();

  let editTransactionYear = 0;
  let editTransactionMonth = 0;

  if (transactionDate) {
    editTransactionYear = transactionDate.getFullYear();
    editTransactionMonth = transactionDate.getMonth() + 1;
  }

  let firstTransactionMonth = 0;

  if (firstTransactionDate) {
    firstTransactionMonth = firstTransactionDate.getMonth() + 1;
  }

  let editDisabled = false;
  let unEditInputForm = false;

  if (pathName === 'group') {
    if (accountingStatus.year === editTransactionYear + '年') {
      for (const account of accountingStatus.accountedMonth) {
        if (account === editTransactionMonth + '月') {
          editDisabled = true;
        }

        if (account === firstTransactionMonth + '月') {
          unEditInputForm = true;
        }
      }
    }
  }

  useEffect(() => {
    if (pathName === 'group') {
      setFirstTransactionDate(transactionDate);
    }
  }, [props.open, pathName]);

  useEffect(() => {
    if (pathName === 'group') {
      if (props.open) {
        dispatch(
          fetchGroupYearlyAccountListForModal(Number(group_id), editTransactionYear, signal)
        );

        const interval = setInterval(() => {
          dispatch(
            fetchGroupYearlyAccountListForModal(Number(group_id), editTransactionYear, signal)
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
      await dispatch(deleteLatestTransactions(transactionId));
      dispatch(fetchLatestTransactionsList(signal));
      dispatch(deleteTransactions(transactionId));
    }
    personalTransaction();
  };
  const personalEditTransaction = (): void => {
    dispatch(editTransactions(transactionId, personalEditRequestData));
    dispatch(editLatestTransactions(transactionId, personalEditRequestData));
    props.onClose();
  };

  const groupDeleteTransaction = (): void => {
    async function groupTransaction() {
      dispatch(deleteGroupLatestTransactions(transactionId, Number(group_id)));
      dispatch(fetchLatestGroupTransactionsList(Number(group_id), signal));
      dispatch(deleteGroupTransactions(transactionId, Number(group_id)));
    }
    groupTransaction();
  };
  const groupEditTransaction = (): void => {
    dispatch(editGroupTransactions(transactionId, Number(group_id), groupEditRequestData));
    dispatch(
      editGroupLatestTransactionsList(transactionId, Number(group_id), groupEditRequestData)
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
      {editDisabled && (
        <div className="input-form__message">
          {editTransactionMonth + '月'}は会計済みのため編集できません。
        </div>
      )}
      <div className={classes.delimiterLine} />
      <div className={classes.smallSpaceTop} />
      <form className="input-form__column">
        <div className="input-form__form-content">
          <DatePicker
            id={'date'}
            label={'日付'}
            value={transactionDate}
            onChange={handleDateChange}
            required={false}
            disabled={unEditInputForm}
            minDate={new Date('1900-01-01')}
          />
          <div className="input-form__form-content--spacer-small" />
          <KindSelectBox
            value={transactionsType}
            onChange={handleSelect}
            required={false}
            disabled={unEditInputForm}
            currentPage={''}
          />
          <div className="input-form__form-content--spacer-small" />
          <TextInput
            id={'amount'}
            label={'金額'}
            type={'tell'}
            required={false}
            fullWidth={false}
            onChange={handleAmountChange}
            value={amount}
            disabled={unEditInputForm}
          />
          <div className="input-form__form-content--spacer-medium" />
          {pathName === 'group' && (
            <>
              <SelectPayer
                approvedGroups={props.approvedGroups as Groups}
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
            id={'shop'}
            label={'店名'}
            type={'text'}
            required={false}
            fullWidth={false}
            onChange={handleShop}
            value={shop}
            disabled={unEditInputForm}
          />
          <div className="input-form__form-content--spacer-small" />
          <TextInput
            id={'memo'}
            label={'メモ'}
            type={'text'}
            required={false}
            fullWidth={false}
            onChange={handleMemo}
            value={memo}
            disabled={unEditInputForm}
          />
          <div className={classes.smallSpaceTop} />
          <div className={classes.buttonPosition}>
            <GenericButton
              label={'更新する'}
              onClick={pathName !== 'group' ? personalEditTransaction : groupEditTransaction}
              disabled={unInput || editDisabled}
            />
          </div>
        </div>
      </form>
      <IconButton
        disabled={editDisabled}
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
        削除
      </IconButton>
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
