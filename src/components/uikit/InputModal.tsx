import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTransactions, deleteTransactions } from '../../reducks/transactions/operations';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  GenericButton,
  DatePicker,
  ModalCategoryInput,
  TextInput,
  KindSelectBox,
} from '../uikit/index';
import { getExpenseCategories, getIncomeCategories } from '../../reducks/categories/selectors';
import { State } from '../../reducks/store/types';
import { CategoryId, CategoryName } from '../../reducks/categories/types';
import { expenseTransactionType, incomeTransactionType } from '../../lib/constant';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
  transactionDate: Date;
  amount: number;
  memo: string | null;
  shop: string | null;
  categoryName: {
    mediumCategory: string | null;
    customCategory: string | null;
  };
  transactionsType: string;
}

const InputModal = (props: InputModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const [amount, setAmount] = useState<string>(String(props.amount));
  const [memo, setMemo] = useState<string | null>(props.memo);
  const [shop, setShop] = useState<string | null>(props.shop);
  const [transactionDate, setTransactionDate] = useState<Date | null>(props.transactionDate);
  const [transactionsType, setTransactionType] = useState<string>(props.transactionsType);
  const id = props.id;

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

  const body = (
    <div className={classes.paper}>
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
        <KindSelectBox value={transactionsType} onChange={handleSelect} required={false} />
        <TextInput
          id={'amount'}
          label={'金額'}
          type={'tell'}
          required={false}
          fullWidth={false}
          onChange={handleAmountChange}
          value={amount}
        />
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
          onClick={() =>
            dispatch(
              editTransactions(
                id,
                transactionsType,
                transactionDate,
                shop,
                memo,
                amount,
                bigCategoryId,
                mediumCategoryId,
                customCategoryId
              )
            ) && props.onClose()
          }
          disabled={false}
        />
        <IconButton
          className={classes.deleteButtonPosition}
          color={'inherit'}
          onClick={() => {
            if (window.confirm('この記録を削除してもよろしいですか？')) {
              dispatch(deleteTransactions(props.id));
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
export default InputModal;
