import React, { useState, useCallback, useEffect } from 'react';
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
  ModalCategoryInput,
  TextInput,
  KindSelectBox,
  SelectPayer,
} from '../uikit/index';
import { getExpenseCategories, getIncomeCategories } from '../../reducks/categories/selectors';
import { State } from '../../reducks/store/types';
import { CategoryId, CategoryName } from '../../reducks/categories/types';
import { expenseTransactionType, incomeTransactionType } from '../../lib/constant';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TransactionsReq } from '../../reducks/transactions/types';
import { GroupTransactionsReq } from '../../reducks/groupTransactions/types';
import { Groups } from '../../reducks/groups/types';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#fff',
      boxShadow: 'none',
      overflow: 'hidden',
      margin: '0 auto',
      marginTop: '10%',
      maxWidth: 550,
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
  categoryName: {
    mediumCategory: string | null;
    customCategory: string | null;
  };
  transactionsType: string;
  paymentUserId?: string;
  approvedGroups?: Groups;
}

const EditTransactionModal = (props: InputModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const id = props.id;
  const [amount, setAmount] = useState<string>(String(props.amount));
  const [memo, setMemo] = useState<string | null>(props.memo);
  const emptyMemo = memo === '' ? null : memo;
  const [shop, setShop] = useState<string | null>(props.shop);
  const emptyShop = shop === '' ? null : shop;
  const [transactionsType, setTransactionType] = useState<string>(props.transactionsType);
  const groupId = getPathGroupId(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);
  const [paymentUserId, setPaymentUserId] = useState<string>(String(props.paymentUserId));

  const categoryId = (): CategoryId => {
    const categoriesId: CategoryId = {
      bigCategoryId: 0,
      mediumCategoryId: 0,
      customCategoryId: 0,
    };

    if (props.transactionsType === expenseTransactionType) {
      for (const expenseCategory of expenseCategories) {
        for (const associatedCategory of expenseCategory.associated_categories_list) {
          if (props.categoryName.mediumCategory === associatedCategory.name) {
            categoriesId.bigCategoryId = associatedCategory.big_category_id;
            categoriesId.mediumCategoryId = associatedCategory.id;
            categoriesId.customCategoryId = null;
          } else if (props.categoryName.customCategory === associatedCategory.name) {
            categoriesId.bigCategoryId = associatedCategory.big_category_id;
            categoriesId.mediumCategoryId = null;
            categoriesId.customCategoryId = associatedCategory.id;
          }
        }
      }
    }

    if (props.transactionsType === incomeTransactionType) {
      for (const incomeCategory of incomeCategories) {
        for (const associatedCategory of incomeCategory.associated_categories_list) {
          if (props.categoryName.mediumCategory === associatedCategory.name) {
            categoriesId.bigCategoryId = associatedCategory.big_category_id;
            categoriesId.mediumCategoryId = associatedCategory.id;
            categoriesId.customCategoryId = null;
          } else if (props.categoryName.customCategory === associatedCategory.name) {
            categoriesId.bigCategoryId = associatedCategory.big_category_id;
            categoriesId.mediumCategoryId = null;
            categoriesId.customCategoryId = associatedCategory.id;
          }
        }
      }
    }

    return categoriesId;
  };

  const customTransactionDate = props.transactionDate.replace('/', '-').slice(0, 10);

  const changeTransactionDate = new Date(customTransactionDate);

  const [transactionDate, setTransactionDate] = useState<Date | null>(changeTransactionDate);

  const [category, setCategory] = useState<CategoryName>({
    mediumCategory: props.categoryName.mediumCategory,
    customCategory: props.categoryName.customCategory,
  });

  const [bigCategoryId, setBigCategoryId] = useState<number>(categoryId().bigCategoryId);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(
    categoryId().mediumCategoryId
  );
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(
    categoryId().customCategoryId
  );

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
    setCategory({
      customCategory: props.categoryName.customCategory,
      mediumCategory: props.categoryName.mediumCategory,
    });
  }, [props.categoryName.customCategory, props.categoryName.mediumCategory]);

  useEffect(() => {
    setBigCategoryId(categoryId().bigCategoryId);
  }, [categoryId().bigCategoryId]);

  useEffect(() => {
    setMediumCategoryId(categoryId().mediumCategoryId);
  }, [categoryId().mediumCategoryId]);

  useEffect(() => {
    setCustomCategoryId(categoryId().customCategoryId);
  }, [categoryId().customCategoryId]);

  useEffect(() => {
    setTransactionDate(changeTransactionDate);
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

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setCategory((...category) => {
        return {
          ...category,
          mediumCategory: event.target.value as string,
          ...category,
          customCategory: event.target.value as string,
        };
      });
    },
    [setCategory]
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
    (bigCategoryId: number, associatedCategoryId: number | null, category_type: string) => {
      switch (category_type) {
        case 'MediumCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(associatedCategoryId);
          setCustomCategoryId(null);
          break;
        case 'CustomCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(null);
          setCustomCategoryId(associatedCategoryId);
          break;
      }
    },
    [setBigCategoryId, setMediumCategoryId, setCustomCategoryId]
  );

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
      dispatch(fetchLatestTransactionsList());
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
      dispatch(fetchLatestGroupTransactionsList(groupId));
      dispatch(deleteGroupTransactions(id, groupId));
    }
    groupTransaction();
  };
  const groupEditTransaction = (): void => {
    dispatch(editGroupLatestTransactionsList(id, groupId, groupEditRequestData));
    dispatch(editGroupTransactions(id, groupId, groupEditRequestData));
    props.onClose();
  };

  const body = (
    <div className={classes.paper}>
      <button className="input-years__btn__close" onClick={props.onClose}>
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
        <ModalCategoryInput
          kind={transactionsType}
          value={category}
          onChange={handleChange}
          onClick={selectCategory}
          required={false}
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
          disabled={false}
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
        onClose={props.onClose}
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
